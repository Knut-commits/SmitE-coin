import time

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) #copilot told me to do this so i can run the tests form any directory
from block import Block

def test_block_creation():# testing that our program creates a block and we use assert so that if the condition is false we know it failed
    transactions = [{ "sender" : "kuzey","reciever": "Knut","amount": 10}]
    contracts = []
    block = Block(1,"prev_hash",transactions,contracts,time.time())
    
    #the conditions
    assert block.index == 1
    assert block.previousHash == "prev_hash"
    assert block.transactions == transactions
    assert isinstance(block.timestamp, float)
    assert isinstance(block.hash, str)