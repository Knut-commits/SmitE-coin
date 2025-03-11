from block import Block

class Blockchain:

    def _init_ (self):
    #we are intializing the blockchain with the genesis Block (first block)
        self.chain = [self.create_genesis_block()]
        self.pending_transactions= [] #this is the transactions that need to be mined, starts empty
        self.difficulty = 4 # this is mining diffculty and this means 4 zeros is required at the end of hash