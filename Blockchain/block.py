import hashlib
import time
import json #crypto currency libarary.
#nonce means number only used once and is a cyrpto currency term.
class Block:
    def __init__(self,index,previousHash,transactions,timestamp = None,nonce=0):
        # Block properties
        self.index = index  # Position of the block in the chain
        self.previousHash = previousHash  # Hash of the previous block
        self.transactions = transactions  # List of transactions in the block
        self.timestamp = timestamp or time.time()  # timestamp of when block is created
        self.nonce = nonce  # nonce for Proof of Work
        self.hash = self.calculateHash()  # hash of the block
    def calculateHash(self): # call self
        #Generate SHA 256 hash
        blockString = json.dumps(self.__dict__,sort_keys = True)
        return hashlib.sha256(blockString.encode()).hexdigest()
    
