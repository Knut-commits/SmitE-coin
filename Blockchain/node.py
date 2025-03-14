#implement a flask based blockchain node

from flask import Flask, request, jsonify

app = FLask(_name_)
blockchain = Blockchain()

@app.route('/mine',methods=['GET'])#allows users to access the mine url via a Get request
def mine():
    blockchain.mine_pending_transactions("1stMiner")
    return jsonify({"message"}:)