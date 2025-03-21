import time
from blockchain import Blockchain
from block import Block

def test_add_block():
    blockchain = Blockchain()
    transactions = [{"kuzey","Knut",10}]
    contracts = []
    new_block = Block(1,blockchain.chain[-1].hash,transactions,contracts) #initilize a block to add.


    #simultating mining
    while not new_block.hash.startswith("0" * blockchain.difficulty) : # loop until the hash is mined 
        new_block.nonce +=1 
        new_block.hash = new_block.calculate_hash() 
    
    blockchain.addBlock(new_block)
    assert len(blockchain) == 2 #should ahve 2 blocks (geneisis and added)
    assert blockchain.chain[-1].transactions == transactions # transactiosn should be up to date with last block