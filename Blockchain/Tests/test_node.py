import pytest

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))  #copilot told me to do this so i can run the tests from any directory
from node import app,db,User   




@pytest.fixture #this ensures this methos runs before the tests
def client():
    # create a test client for the Flask app and a databse
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'  # In-memory database for testing
    with app.test_client() as client:
        with app.app_context():
            db.create_all()  #creates tables
        yield client
        with app.app_context():
            db.drop_all()  #dleets tables after tests are done
    
def test_mine_block(client): 
    # Sends a GET request to /mine to simulate mining a block
    response = client.get('/mine')
    json_data = response.get_json()

    # Check if the response is OK and contains the expected message
    assert response.status_code == 200
    assert json_data["message"] == "New block mined"

def test_execute_smart_contract(client):
    # Sends a POST request to execute a smart contratc function
    response = client.post('/execute_contract/1/test_function', json={"context": {"x": 2}})
    json_data = response.get_json()

    # check if the response is OK and includes a message
    assert response.status_code == 200  #200 means succesfull
    assert "message" in json_data


def test_register(client):
    # send a post request to /registr to register a new user
    response = client.post('/register', json={'username' : 'user','password': '123', 'picture':'http://examplepic.com/example.jpg'})
    json_data = response.get_json()

    assert response.status_code == 201 # this means it has been created
    assert json_data == {"message": "User registered successfully"}

    #check if the user is in the dtaabase

    with app.app_context():
        user = User.query.filter_by(username='user').first()
        assert user != None #user is in database
        assert user.username == "user"

def test_login(client):
    #testing a sucesful login
    client.post('/register',json={'username':'user','password':'123','picture':'http://examplepic.com/example.jpg'})
    response = client.post('/login',json={'username':'user','password':'123'})
    json_data = response.get_json()
    assert response.status_code == 200 # this means the request was sucessfull
    assert json_data == ({'message': 'Login successful', 'username': 'user', 'picture': 'http://examplepic.com/example.jpg'})

