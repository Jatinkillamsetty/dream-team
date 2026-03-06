import json
import requests
import sys

if len(sys.argv)<2:
    print("error give the location properly")
location = " ".join(sys.argv[1:])

API_id="c1b06b514cf453a07a4f9c755b344c96"

url = f"https://api.openweathermap.org/data/2.5/weather?q={location}&appid={API_id}&units=metric"
response = requests.get(url)
data = response.json()
print(f"The temperature in {location} is {data["main"]["temp"]}°C")