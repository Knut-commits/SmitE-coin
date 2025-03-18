#implement a flask based blockchain node acts as a bridge between blockchain and api rewuets
from blockchain import Blockchain
from flask import Flask, request, jsonify

app = Flask(__name__)
blockchain = Blockchain()

@app.route('/mine',methods=['GET'])#allows users to access the mine url via a Get request
def mine():
    blockchain.mine_pending_transactions("Miner1")
    return jsonify({"message":"new block mined"})

@app.route('/deploy_contract', methods=['POST'])# only repsonds to post reqeusts which sends data rtaher than recieves
def deploy_contract():
    # deploys a new smart contract
    contract_code = request.json.get('code') 
    response = blockchain.deploy_contract(contract_code)
    return jsonify({"message": response})


@app.route('/execute_contract/<int:contract_id>/<string:function_name>', methods=['POST'])
    # execute a functoin in a deployed smart contract
def execute_contract(contract_id,function_name):
    context = request.json.get('context', {}) # if not context is provided it defualts to empty
    response = blockchain.execute_contract(contract_id, function_name, context)
    return jsonify({"message": response}) #converts to json format so there cna be a API response

if __name__ == '__main__':
    app.run(debug=True)