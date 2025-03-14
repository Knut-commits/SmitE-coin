class Smart_contract:
    def __init__(self,code):
        #this stores the code for teh contract
        self.code= code
        self.state = {}
    
    def execute(self, function_name,context={}):#execute the smart contract in sepcfiic contexts
        local_vars = {"state": self.state}  # provide contract state to execution
        exec(self.code, {}, local_vars)  # execute contract code
        if function_name in local_vars:
            return local_vars[function_name](self, **context)
        return "function not found"
        
