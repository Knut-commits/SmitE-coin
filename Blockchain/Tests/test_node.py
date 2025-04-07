import pytest

from node import app



@pytest.fixture #this ensures this methos runs before the tests
def client():
    # create a test client for the Flask app
    app.testing = True
    return app.test_client()

def test_mine_block(client): 
    # Sends a GET request to /mine to simulate mining a block
    response = client.get('/mine')
    json_data = response.get_json()

    # Check if the response is OK and contains the expected message
    assert response.status_code == 200
    assert "New block mined!" in json_data["message"]

def test_execute_smart_contract(client):
    # Sends a POST request to execute a smart contract function
    response = client.post('/execute_contract/1/test_function', json={"context": {"x": 2}})
    json_data = response.get_json()

    # Check if the response is OK and includes a message
    assert response.status_code == 200  #200 means succesfull6
    assert "message" in json_data
