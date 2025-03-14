from block import Block

class Blockchain:

def __init__ (self):
    #we are intiizing the blockchain iwth teh genesis Block(first block)
    self.chain = [self.CreateGenesisBlock()]
    self.pending_transactions= [] #this si teh tranactions that need to be mined, starts empty
    slef.difficulty= 4 # this is minning diffculty and this menas 4 zeros is reuired at teh end of hash

def CreateGenesisBlock():
    return Block(0,"0",[],time.time())


def addBlock(self, block):
    # this will add a block to the chain as long as it is valid
    if block.previousHash == self.chain[-1].hash and block.hash.startswith("0" * self.difficulty):#we are checking if the previous hash matches previous hash in chain and if teh 4 zeros are at start of hash
        self.chain.append(block)

def  mine_pending_transactions(self,Miner_address):
    #mines a new block and adds it
    NewBlock = Block(len(self.chain),self.chain[-1].hash,self.pending_transactions)
    while not newBlock.hash.startswith("0" * self.difficulty):
        NewBlock.nonce +=1
        Newblock.hash = newBlock.calculate_hash()    
    self.addBlock(NewBlock)
    #now the miner needs rewards    
    self.pending_transactions=[{"from": "network", "to": Miner_address, "amount": 10}]
    

