from gpiozero import Button
from time import sleep
import requests
button = Button(2)

while True:
    if button.is_pressed:
        print("Calling webservice")
        requests.get('http://localhost:3000/api/takevideo')
        sleep(1)

