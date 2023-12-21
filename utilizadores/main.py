#!/usr/bin/python
import sqlite3
import json
from settings import *
from insert   import *
from ucs      import * 
from flask import Flask, render_template, request, jsonify

js = getPerfil('a95191')
print(js)
insert_aluno('a95191', 3)
k = {'id': 'a12345', 'name': 'JNO', 'email': 'JNO@gmail.com', 'password': 'correctinside', 'type': 3, 'attends': None, 'gives': ['Desenvolvimento de Aplicações']}
insert_user_dic(k)
js = all_users()
print(js)

app = Flask(__name__)


# Route with a single argument 'id'
@app.route('/getPerfil', methods=['GET'])
def getPerfil_r():
    # Get the 'x' argument from the request parameters
    id = request.args.get('id', type=str)
    print(id,type(id))
    if id is None:
        return jsonify(error="Missing 'id' parameter"), 400

    result = getPerfil(id)

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)





conn.close()