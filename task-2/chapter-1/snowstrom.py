import os,random,time,sys

TOP=chr(9600)
BOTTOM=chr(9604)
FULL=chr(9608)

d=4
if len(sys.argv)>1:
    d=int(sys.argv[1])

while True:
    os.system('cls' if os.name=='nt' else 'clear')
    for y in range(20):
        for x in range(40):
            if random.randint(0,99)<d:
                print(random.choice([TOP,BOTTOM]),end='')
            else:
                print(' ',end='')
        print()
    print(FULL*40)
    print(FULL*40)
    time.sleep(0.2)