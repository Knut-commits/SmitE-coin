from block import Block

class Blockchain:

def _init_ (self):
    #we are intiizing the blockchain iwth teh genesis Block(first block)
    self.chain = [self.CreateGenesisBlock()]
    self.pending_transactions= [] #this si teh tranactions that need to be minded, starts empty
    slef.difficulty= 4 # this is minning diffculty and this menas 4 zeros is reuired at teh end of hash

def CreateGenesisBlock