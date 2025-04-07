import time

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) #copilot told me to do this so i can run the tests form any directory
from blockchain import Blockchain
from block import Block
def test_add_block():
    blockchain = Blockchain()
    transactions = [{ "sender" : "kuzey","reciever": "Knut","amount": 10}]
    contracts = []
    new_block = Block(1,blockchain.chain[-1].hash,transactions,contracts) #initilize a block to add.


    #simultating mining
    while not new_block.hash.startswith("0" * blockchain.difficulty) : # loop until the hash is mined 
        new_block.nonce +=1 
        new_block.hash = new_block.calculateHash() 
    
    blockchain.addBlock(new_block)
    assert len(blockchain.chain) == 2 #should ahve 2 blocks (geneisis and added)
    assert blockchain.chain[-1].transactions == transactions # transactiosn should be up to date with last block