#!/usr/bin/python
from flask import Flask, render_template, request, jsonify

from settings import *
from insert   import *
from ucs      import *
from update   import *

import sqlite3
import json

js = getPerfil('a95191')
print(js)
insert_aluno('a95191', 3)

k = {'id': 'a12345', 'name': 'JNO', 'email': 'JNO@gmail.com', 'password': 'correctinside', 'type': 3, 'attends': None, 'gives': ['Desenvolvimento de Aplicações']}
insert_user_dic(k)


js = all_users()
print(js)

app = Flask(__name__)

# http://127.0.0.1:5000/getPerdil?id=a95191
# Route with a single argument 'id'
@app.route('/getPerfil', methods=['GET'])
def getPerfil_r():
    id = request.args.get('id', type=str)
    if id is None:
        return jsonify(error="Missing 'id' parameter"), 400
    try:
        result = getPerfil(id)
        return jsonify(result)
    except:
        return jsonify(error="An exception occurred"), 500
    


# http://127.0.0.1:5000/editarEmail?id=a95191&email=emailfixe@gmail.com
# Route with a 2 arguments 'id' ans 'email'
@app.route('/editarEmail', methods=['GET','POST'])
def editarEmail_r():
    id = request.args.get('id', type=str)
    email = request.args.get('email', type=str)

    if id is None or email is None:
        return jsonify(error="Missing parameter"), 400
    try:
        updateEmail(id,email)
        return jsonify({})
    except:
        return jsonify(error="An exception occurred"), 500


# http://127.0.0.1:5000/editarPassword?id=a95191&password=novapass
# Route with a 2 arguments 'id' ans 'password'
@app.route('/editarPassword', methods=['GET','POST'])
def editarPassword_r():
    id = request.args.get('id', type=str)
    password = request.args.get('password', type=str)

    if id is None or password is None:
        return jsonify(error="Missing parameter"), 400
    try:
        updatePassword(id,password)
        return jsonify({})
    except:
        return jsonify(error="An exception occurred"), 500


# http://127.0.0.1:5000/autentica?id=a95191&password=novapass
# Route with a 2 arguments 'id' ans 'password'
@app.route('/autentica', methods=['GET'])
def autentica():
    id = request.args.get('id', type=str)
    password = request.args.get('password', type=str)

    if id is None or password is None:
        return jsonify(error="Missing parameter"), 400
    try:
        real_password = getPassword(id)
        if real_password == password:
            return jsonify({})
        else: 
            return jsonify(error="Wrong password"), 500
    except:
        return jsonify(error="An exception occurred"), 500








if __name__ == '__main__':
    app.run(debug=True)

conn.close()