import time

print("Press ENTER to start the timer")
input()

start=time.time()
last=start
lap=1

try:
    while True:
        input()
        now=time.time()
        l=round(now-last,2)
        t=round(now-start,2)
        print("YOur",lap,t,l)
        lap+=1
        last=now
except KeyboardInterrupt:
    print("Done")
