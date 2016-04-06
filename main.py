import random
import os
from flask import Flask, request, Response

from key import API_KEY
from kik import KikApi
from kik.messages import messages_from_json, TextMessage

app = Flask(__name__)
kik = KikApi('is13bot', API_KEY)

IS13 = ['Indeed your number is 13', '{input} == 13', 'Congratulations! You entered 13']
ISNOT13 = ['Your number is not 13', '{input} != 13', 'Unfortunately that was not 13']


@app.route('/receive', methods=['POST'])
def incoming():
    if not kik.verify_signature(request.headers.get('X-Kik-Signature'), request.get_data()):
        return Response(status=403)

    messages = messages_from_json(request.json['messages'])

    for message in messages:
            print message.body
            body = ''
            if message.type and message.type == 'start-chatting':
                body = 'Hello {0}, give me an input and I will tell you if it\'s 13'.format(message['from'])
            elif isinstance(message, TextMessage) or (message.mention and message.mention == 'is13bot'):
                message_body = message.body.lower()
                if message_body == 'thirteen' or message_body == '13' or message_body == ('1101'):
                    body = random.choice(IS13).format(input=message_body)
                else:
                    body = random.choice(ISNOT13)

            kik.send_messages([
                TextMessage(
                    to=message.from_user,
                    chat_id=message.chat_id,
                    body=body
                )
            ])

            return Response(status=200)

port = int(os.environ.get("PORT", 5000))
if __name__ == "__main__":
    app.run(port=port, debug=True)

