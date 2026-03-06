import requests
out=requests.get("https://www.gutenberg.org/files/11/11-0.txt")
text=open("output.txt","wb")
for parts in out.iter_content(1000):
    text.write(parts)
text.close