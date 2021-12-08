from flask import Flask, flash, render_template, redirect, request, session
from werkzeug.exceptions import default_exceptions, HTTPException, InternalServerError
import sqlite3 as sql
from flask_session import Session
from tempfile import mkdtemp

#configure application
app = Flask(__name__)

#add function to connect to getbase and get back dictionary for each row
def get_db():
    conn = sql.connect('climbs.db')
    conn.row_factory = sql.Row
    return conn

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


#welcome page
@app.route('/', methods = ['GET', 'POST'])
def login():
    #forget old user id
    session.clear()

    if request.method == "GET":
        return render_template("login.html")

    else: 
        user_name = request.form.get('username')

        conn = get_db()
        rows = conn.execute('SELECT * FROM users WHERE username = ?', (user_name, )).fetchall()
        conn.close()

        #check that username is valid
        if len(rows) != 1: 
            return redirect("/") #add error message
        
        #remember which user logged in
        session['user_id'] = rows[0]['user_id']
    
        #redirect user to main page
        return redirect("/homepage")


@app.route("/register", methods = ['GET', 'POST'])
def register():
    if request.method == "GET":
        return render_template("login.html")
    
    else:
        name = request.form.get('username')

        conn = get_db()
        rows = conn.execute("SELECT username FROM users").fetchall()
        conn.close()

        #see if the name is already taken
        for row in rows:
            if name == row['username']:
                return redirect("/") #add error message - username already taken

        #if the name is free, add it to the database and redirect user to login
        conn = get_db()
        conn.execute("INSERT INTO users (username) VALUES (?)", (name, ))
        conn.commit()
        conn.close()
        return redirect("/")

        


#main page
@app.route("/homepage", methods =['GET', 'POST'])
def homepage():

    user = session['user_id']

    if request.method == "POST":
        route_name = request.form.get('route_name')
        grade = request.form.get('grade')
        location = request.form.get('location')
        date = request.form.get('date')

        conn = get_db()
        #add new climb to DB
        conn.execute("INSERT INTO log (user_id, date, grade, name, location) VALUES (?, ?, ?, ?, ?)", (user, date, grade, route_name, location))
        conn.commit()
        conn.close()

        return redirect("/homepage")

    #Reached via GET
    else:
        conn = get_db()
        #get all climbs in DB to pass to html
        rows = conn.execute('SELECT * FROM log WHERE user_id = ?', (user,) ).fetchall()
        users = conn.execute("SELECT username FROM users WHERE user_id = ?", (user, )).fetchall()
        person = users[0]['username']
        conn.close()

        return render_template('index.html', person = person, rows = rows)


@app.route("/logout")
def logout():
    #end session and return to login page
    session.clear()
    redirect("/")


        



    