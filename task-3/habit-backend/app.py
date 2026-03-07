from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'your-secret-key-change-this'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

users = {}
habits = []
completions = []

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email', '').lower()
    password = data.get('password', '')
    name = data.get('name', '')
    
    if not email or not password or not name:
        return jsonify({'error': 'All fields required'}), 400
    
    if email in users:
        return jsonify({'error': 'User exists'}), 409
    
    users[email] = {
        'email': email,
        'name': name,
        'password': generate_password_hash(password)
    }
    
    token = create_access_token(identity=email)
    return jsonify({'access_token': token, 'user': {'email': email, 'name': name}}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email', '').lower()
    password = data.get('password', '')
    
    user = users.get(email)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    token = create_access_token(identity=email)
    return jsonify({'access_token': token, 'user': {'email': user['email'], 'name': user['name']}}), 200

@app.route('/api/habits', methods=['GET'])
@jwt_required()
def get_habits():
    user_email = get_jwt_identity()
    user_habits = []

    for h in habits:
        if h['user'] == user_email:
            user_habits.append(h)
    return jsonify({'habits': user_habits}), 200

@app.route('/api/habits', methods=['POST'])
@jwt_required()
def create_habit():
    user_email = get_jwt_identity()
    data = request.json
    
    habit = {
        'id': len(habits) + 1,
        'name': data['name'],
        'user': user_email,
        'created_at': datetime.now().isoformat()
    }
    habits.append(habit)
    return jsonify(habit), 201

@app.route('/api/habits/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_habit(id):
    global habits
    new_habits = []

    for h in habits:
        if h['id'] != id:
            new_habits.append(h)

    habits = new_habits
    return jsonify({'message': 'Deleted'}), 200


@app.route('/api/habits/<int:id>/complete', methods=['POST'])
@jwt_required()
def complete_habit(id):
    user_email = get_jwt_identity()
    completion = {
        'id': len(completions) + 1,
        'habit_id': id,
        'user': user_email,
        'date': datetime.now().date().isoformat()
    }
    completions.append(completion)
    return jsonify(completion), 201

@app.route('/api/habits/<int:id>/completions', methods=['GET'])
@jwt_required()
def get_completions(id):
    user_email = get_jwt_identity()
    habit_completions = []

    for c in completions:
        if c['habit_id'] == id and c['user'] == user_email:
            habit_completions.append(c)
    return jsonify({'completions': habit_completions}), 200

@app.route('/api/habits/<int:id>/streak', methods=['GET'])
@jwt_required()
def get_streak(id):
    user_email = get_jwt_identity()
    habit_completions = []

    for c in completions:
        if c['habit_id'] == id and c['user'] == user_email:
            habit_completions.append(c)    
    if not habit_completions:
        return jsonify({'current': 0, 'longest': 0}), 200
    
    dates = sorted([c['date'] for c in habit_completions])
    current = longest = temp = 1
    
    for i in range(1, len(dates)):
        if dates[i] == dates[i-1]:
            continue
        prev = datetime.fromisoformat(dates[i-1])
        curr = datetime.fromisoformat(dates[i])
        if (curr - prev).days == 1:
            temp += 1
            longest = max(longest, temp)
        else:
            temp = 1
    
    last_date = datetime.fromisoformat(dates[-1])
    if (datetime.now() - last_date).days <= 1:
        current = temp
    else:
        current = 0
    
    return jsonify({'current': current, 'longest': longest}), 200

@app.route('/api/analytics', methods=['GET'])
@jwt_required()
def get_analytics():
    user_email = get_jwt_identity()
    user_habits = []

    for h in habits:
        if h['user'] == user_email:
            user_habits.append(h)    
    user_completions = []

    for c in completions:
        if c['user'] == user_email:
            user_completions.append(c)    
    return jsonify({
        'total_habits': len(user_habits),
        'total_completions': len(user_completions),
        'completion_rate': round((len(user_completions) / max(len(user_habits), 1)) * 100, 1)
    }), 200

if __name__ == '__main__':
   
    app.run(debug=True, port=5000)