#entry point to run the blockchain
from blockchain import Blockchain

if __name__ == '__main__':
    blockchain= Blockchain()
    blockchain.mine_pending_transactions("miner1")
    print("blockchain mined succesfully")