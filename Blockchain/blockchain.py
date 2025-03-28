from block import Block
import time
from smart_contracts import Smart_contract

class Blockchain:

    def __init__ (self):
        #we are intiizing the blockchain iwth teh genesis Block(first block)
        self.chain = [self.CreateGenesisBlock()]
        self.pending_transactions= [] #this si teh tranactions that need to be mined, starts empty
        self.pending_contracts=[] #contracts waitin to be mined
        self.deployed_contracts=[] 
        self.difficulty= 4  # this is minning diffculty and this menas 4 zeros is reuired at teh end of hash

    def CreateGenesisBlock(self): 
        return Block(0,"0",[],[],time.time())


    def addBlock(self, block):
        # this will add a block to the chain as long as it is valid
        if block.previousHash == self.chain[-1].hash and block.hash.startswith("0" * self.difficulty):#we are checking if the previous hash matches previous hash in chain and if teh 4 zeros are at start of hash
            self.chain.append(block)

    def  mine_pending_transactions(self,miner_address):
        #mines a new block and adds it
        NewBlock = Block(len(self.chain),(self.chain[-1]).hash,self.pending_transactions,self.pending_contracts)
        while not NewBlock.hash.startswith("0" * self.difficulty):
            NewBlock.nonce +=1
            NewBlock.hash = NewBlock.calculateHash()    
        self.addBlock(NewBlock)
        # use contrcacts from block
        for contract in self.pending_contracts:
            contract_id = len(self.deployed_contracts) + 1
            self.deployed_contracts[contract_id]= contract
        #now the miner needs rewards    
        self.pending_transactions=[{ "network",  miner_address,  10}]
        self.pending_contracts=[]

    def deploy_contract(self, contract_code):
        # adds a contrat to the pending list
        contract = Smart_Contract(contract_code)
        self.pending_contracts.append(contract)
        return "Contract dpeloyed pending mining"

    def execute_contract(self, contract_id, function_name, context={}):
        # executes a deployed smart contract function
        if contract_id in self.deployed_contracts:
            return self.deployed_contracts[contract_id].execute(function_name, context)
        return "Contract not found"


        

