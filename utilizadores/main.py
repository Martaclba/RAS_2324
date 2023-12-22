#!/usr/bin/python
import json
from flask import Flask, request, jsonify

from settings import *
from insert   import *
from ucs      import *
from update   import *


#js = getPerfil('a95191')
#print(js)
#insert_aluno('a95191', 3)
 
k = {'id': 'a12345', 'name': 'JNO', 'email': 'JNO@gmail.com', 'password': 'correctinside', 'type': 3, 'attends': None, 'gives': ['Desenvolvimento de Aplicações']}
insert_user_dic(k)


#js = all_users()
#print(js)

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


# http://127.0.0.1:5000/registarAluno?id=a99999&name=Marta&password=novapass&email=email@hotmail.com&type=3&gives=1&gives=3
# Route with a 2 arguments 'id' ans 'password'
@app.route('/registarAluno', methods=['GET','POST'])
def registaAluno():
    id       = request.args.get    ('id'      , type=str)
    name     = request.args.get    ('name'    , type=str)
    password = request.args.get    ('password', type=str)
    email    = request.args.get    ('email'   , type=str)
    type     = request.args.get    ('type'    , type=int)
    attends  = request.args.getlist('attends'           )
    gives    = request.args.getlist('gives'             )

    gives_values   = [int(x) for x in gives]
    attends_values = [int(x) for x in attends]

    if id is None or password is None or name is None or email is None or type is None:
        return jsonify(error="Missing parameter"), 400
    try:
        print(gives_values, attends_values)
        insert_user(id, name, email,  password, type, attends_values, gives_values)
        return jsonify({})
    except:
        return jsonify(error="An exception occurred while inserting into the database"), 500

# http://127.0.0.1:5000/getAll
@app.route('/getAll', methods=['GET'])
def getAll():
    return jsonify(all_users())




@app.route('/registarAlunoLista', methods=['POST'])
def registaAlunoLista():
    try:
        file = request.files['file']  # Assuming you're sending the file in the request as 'file'
        if file and file.filename.endswith('.json'):
            data = json.load(file)
            for student in data:
                insert_user_dic(student)
            return jsonify({})
        else:
            return jsonify(error="Invalid file format. Please provide a JSON file."), 400

    except Exception as e:
        print(str(e))
        return jsonify(error="An exception occurred while processing the file"), 500



@app.route('/getResgistoDocenteForm', methods=['GET'])
def getResgistoDocenteForm():
    dict = {'id': None, 'name': None, 'email': None, 'password': None, 'type': 3, 'attends': None, 'gives': None}
    return jsonify(dict)









if __name__ == '__main__':
    app.run(debug=True)

conn.close()