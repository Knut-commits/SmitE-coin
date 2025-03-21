import time
from block import Block

def test_block_creation():# testing that our program creates a block and we use assert so that if the condition is false we know it failed
    transactions = [{ "kuzey","Knut",10}]
    contracts = []
    block = Block(1,"prev_hash",transactions,contracts,time.time())
    
    #the conditions
    assert block.index == 1
    assert block.previous_hash == "prev_hash"
    assert block.transactions == transactions
    assert isinstance(block.timestamp, float)
    assert isinstance(block.hash, str)