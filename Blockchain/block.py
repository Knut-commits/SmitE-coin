import hashlib
import time
import json #crypto currency libarary.
#nonce means number only used once and is a cyrpto currency term.
class Block:
    def _init_(self,index,previoushash,transactions,timestamp = None,nonce=0):
        # Block properties
        self.index = index  # Position of the block in the chain
        self.previoushash = previoushash  # Hash of the previous block
        self.transactions = transactions  # List of transactions in the block
        self.timestamp = timestamp or time.time()  # timestamp of when block is created
        self.nonce = nonce  # nonce for Proof of Work
        self.hash = self.calculate_hash()  # hash of the block
    def calculate_hash(self): # call self
        #Generate SHA 256 hash
        blockString = json.dumps(self._.dict_,sort_keys = True)
        return hashlib.sha256(blockString.encode()).hexdigest()
    
