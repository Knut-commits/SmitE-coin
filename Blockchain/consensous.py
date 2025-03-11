# consensus.py - Implements the Proof-of-Work consensus mechanism
from blockchain import Blockchain

class ProofOfWork:
    @staticmethod
    def mine(blockchain, miner_address):
        # Mines transactions and adds a block to the chain
        blockchain.mine_pending_transactions(miner_address)