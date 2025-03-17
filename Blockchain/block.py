import hashlib
import time
import json #so we can transport data 
#nonce means number only used once and is a cyrpto currency term.
class Block:
    def __init__(self,index,previousHash,transactions,contracts,timestamp = None,nonce=0):
        # Block properties
        self.index = index  # Position of the block in the chain
        self.previousHash = previousHash  # Hash of the previous block
        self.transactions = transactions  # List of transactions in the block
        self.contracts = contracts #list of contracts in block
        self.timestamp = timestamp or time.time()  # timestamp of when block is created
        self.nonce = nonce  # nonce for Proof of Work
        self.hash = self.calculateHash()  # hash of the block
    def calculateHash(self): # call self
        #Generate SHA 256 hash
        blockString = json.dumps(self.__dict__,sort_keys = True)#converts the attributes of the block to a json string
        return hashlib.sha256(blockString.encode()).hexdigest()
    
