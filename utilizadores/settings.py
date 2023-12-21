#!/usr/bin/python
import sqlite3
global conn

try:
    # check_same_thread=False because of flask
    conn = sqlite3.connect('db/users.db', check_same_thread=False)
    print("Opened database successfully")
except:
    print("FAILED opening database")
