import pyperclip

text = pyperclip.paste()
new_text = text.upper()

pyperclip.copy(new_text)
print(pyperclip.paste())
print("Converted to uppercase and copied back!")