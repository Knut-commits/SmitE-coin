#implement a flask based blockchain node
from blockchain import Blockchain
from flask import Flask, request, jsonify

app = Flask(__name__)
blockchain = Blockchain()

@app.route('/mine',methods=['GET'])#allows users to access the mine url via a Get request
def mine():
    blockchain.mine_pending_transactions("Miner1")
    return jsonify({"message":"new block mined"})
if __name__ == '__main__':
    app.run(debug=True)