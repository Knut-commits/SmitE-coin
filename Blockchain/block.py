import hashlib
import time
import json
#nonce means number only used once and is a cyrpto currency term.
class block:
    def_init_(self,index,previoushash,transactions,timestamp = none,nonce=0):
        # Block properties
        self.index = index  # Position of the block in the chain
        self.previoushash = previoushash  # Hash of the previous block
        self.transactions = transactions  # List of transactions in the block
        self.timestamp = timestamp or time.time()  # Timestamp of block creation
        self.nonce = nonce  # Nonce for Proof of Work
        self.hash = self.calculate_hash()  # Hash of the block
    def calculate_hash():
