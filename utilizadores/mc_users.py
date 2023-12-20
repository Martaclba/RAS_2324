#!/usr/bin/python
import sqlite3
import json


try:
    conn = sqlite3.connect('db/users.db')
    print("Opened database successfully")
except:
    print("FAILED opening database")



# type 1 → utilizador académico
# type 2 → utilizador gestor
# type 3 → ambos  ( caso seja docente e aluno)

def getPerfil(user_id):
    query = "SELECT * FROM utilizador WHERE id = ?"
    user = conn.execute(query, (user_id,)).fetchone()
    
    if user:
        id,name,email,password,type = user
        dic = dict()
        dic["id"]       = id
        dic["name"]     = name
        dic["email"]    = email
        dic["password"] = password
        dic["type"]     = type

        # type 1 → utilizador académico
        if   type == 1:
            dic["frequents"] = getUc_aluno(id)

        # type 2 → utilizador gestor
        elif type == 2:
            pass
            #FIXME

        # type 3 → ambos  ( caso seja docente e aluno)
        elif type == 3:
            pass
            #FIXME

        return dic

    else:
        print(f"USER {user_id} not found")
        # FIXME RETORNAR ERRO 
        return None

def getUc_aluno(user_id):
    query = "SELECT * FROM aluno WHERE id = ?"
    ucs   = conn.execute(query, (user_id,)).fetchall()
    
    all_uc = []
    if ucs:
        for _,uc_id in ucs:
            all_uc.append(uc_id)
        all_descriptions = []
        for uc_id in all_uc:
            all_descriptions.append(getUc(uc_id))

        return all_descriptions
    else:
        print(f"USER {user_id} not found")
        return None

def getUc(uc_id):
    "Return the description of a uc"
    query = "SELECT * FROM uc WHERE n = ?"
    uc = conn.execute(query, (uc_id,)).fetchone()
    if uc:
        return uc[1]
    else:
        print(f"UC {uc_id} not found")
        # FIXME RETORNAR ERRO 


def all_users(): 
    users = conn.execute("SELECT * from utilizador").fetchall()
    all = []
    for id,name,email,password,type in users:
        dic = dict()
        dic["id"]       = id
        dic["name"]     = name
        dic["email"]    = email
        dic["password"] = password
        dic["type"]     = type
        all.append(dic)

    return all
#json_string = json.dumps(all, indent=2)
#    return json_string


js = all_users()
print(js)
js = getPerfil('a95191')
print(js)

conn.close()
