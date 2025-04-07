from blockchain import Blockchain
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'  # SQLite database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

blockchain = Blockchain()

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    picture = db.Column(db.String(200), nullable=True)  # Path to the user's picture

# Initialize the database
with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    picture = data.get('picture')  # Assume this is a URL or file path

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Check if the username already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Create a new user
    new_user = User(username=username, password=hashed_password, picture=picture)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Find the user by username
    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({"message": "Login successful", "username": user.username, "picture": user.picture}), 200

@app.route('/mine', methods=['GET'])
def mine():
    blockchain.mine_pending_transactions("Miner1")
    return jsonify({"message": "New block mined"})

@app.route('/deploy_contract', methods=['POST'])
def deploy_contract():
    contract_code = request.json.get('code')
    response = blockchain.deploy_contract(contract_code)
    return jsonify({"message": response})

@app.route('/execute_contract/<int:contract_id>/<string:function_name>', methods=['POST'])
def execute_contract(contract_id, function_name):
    context = request.json.get('context', {})
    response = blockchain.execute_contract(contract_id, function_name, context)
    return jsonify({"message": response})

if __name__ == '__main__':
    app.run(debug=True)
    print("* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)")
