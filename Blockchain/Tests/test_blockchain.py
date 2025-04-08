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


def test_buy_tokens():
    blockchain = Blockchain()
    user = "1user"
    fiat_amount = 100
    token_price = 20

    result = blockchain.buy_tokens(user,fiat_amount,token_price) #the result is buying some tokens

    assert result == True # this should be  true if trnasaction was sucessfull
    
    # checking user balance

    new_tokens = fiat_amount/ token_price

    assert blockchain.balances[user] == new_tokens #balance should equal fiat amoiutn / token price

def test_sell_tokens():
    blockchain= Blockchain()
    user = "1user"
    token_amount = 10
    token_price = 5

    blockchain.balances[user]= 20 # give user teh tokens to sell

    result = blockchain.sell_tokens(user,token_amount,token_price)

    assert result == True # this would be true if transaction wnet through
    assert blockchain.balances[user] == 10 # user should only have 10 as 10 have been sold
