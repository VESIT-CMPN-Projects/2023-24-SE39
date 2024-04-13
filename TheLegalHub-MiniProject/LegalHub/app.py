from flask import Flask, redirect, render_template, request, jsonify, session, send_from_directory, url_for
import google.generativeai as genai
from pymongo import MongoClient
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Set a secret key for session management

genai.configure(api_key="AIzaSyBd385XupzEu4oYXmWC2aZxBGj5pja4kHI")
model = genai.GenerativeModel("gemini-pro")

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['user']  # Change this to your database name
users_collection = db['users']  # Change this to your collection name


@app.route('/')
def index():
    logged_in = session.get('logged_in', False)
    return render_template('index.html', logged_in=logged_in)

@app.route('/page2')
def page2():
    logged_in = session.get('logged_in', False)
    return render_template('page2.html', logged_in=logged_in)

@app.route('/templatess')
def templatess():
    logged_in = session.get('logged_in', False)
    return render_template('templatess.html', logged_in=logged_in)

@app.route('/pdfs/<path:filename>')
def pdfs(filename):
    return send_from_directory('static/pdfs', filename)


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        password = request.form['password']
        try:
            users_collection.insert_one({'fullname': fullname, 'email': email, 'password': password})
            return redirect(url_for('login'))  # Redirect to the login page after signup
        except Exception as e:
            print("Error inserting user data:", e)
            return "An error occurred while signing up. Please try again."

        # Insert the user data into MongoDB
    #     users_collection.insert_one({'fullname': fullname, 'email': email, 'password': password})
    #     return redirect(url_for('login'))  # Redirect to the login page after signup
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        fullname = request.form['fullname']
        password = request.form['password']
        # Check if the username and password match a record in MongoDB
        user = users_collection.find_one({'fullname': fullname, 'password': password})
        if user:
            # Successful login
            session['logged_in'] = True
            return render_template('index.html', logged_in=True)
        else:
            # Login failed, render the login page again with an alert message
            return render_template('login.html', alert_message='Invalid username or password')
    return render_template('login.html', alert_message=None)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)  # Remove the 'logged_in' session variable
    return redirect(url_for('index'))  # Redirect to the index page after logout


@app.route('/legalCases')
def legalCases():
    logged_in = session.get('logged_in', False)
    return render_template('legalCases.html', logged_in=logged_in)

@app.route('/lawyersPage')
def lawyersPage():
    logged_in = session.get('logged_in', False)
    return render_template('lawyersPage.html', logged_in=logged_in)

@app.route('/lawinfoo')
def lawinfoo():
    logged_in = session.get('logged_in', False)
    return render_template('lawinfoo.html', logged_in=logged_in)

@app.route('/applicationForm')
def applicationForm():
    logged_in = session.get('logged_in', False)
    return render_template('applicationForm.html', logged_in=logged_in)

@app.route('/process_input', methods=['POST'])
def process_input():
    data = request.get_json()
    print("text processing")
    input_text = data['inputText']

    response_text = get_query(input_text)

    return jsonify({'response': response_text})

def get_query(query):
    print(query)
    prompt = "You are now an AI bot integrated into a law website. You have to answer the following question as an Indian Lawyer. So you are my lawyer.{}".format(query)
    response = model.generate_content(prompt)
    print(response.text)
    print("response generating")
    return response.text

if __name__ == '__main__':
    app.run(debug=True, port=3000)
