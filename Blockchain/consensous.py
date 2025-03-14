# consensus.py - This file implements the Proof-of-Work consensus mechanism
from blockchain import Blockchain # Importing the blockchain class
# This class will be used to mine blocks and add them to the chain

class ProofOfWork: # Used to implement the Proof-of-Work mining process for the blockchain
    @staticmethod # Declares that the method is static and does not require an instance of the class
    def mine(blockchain, miner_address): # Defines the mine method with the blockchain and miner address as parameters
        blockchain.mine_pending_transactions(miner_address) # Processes all pending transactions and adds a new block to the chain