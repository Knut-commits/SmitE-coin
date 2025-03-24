from smart_contracts import Smart_contracts

def test_smartcontract():
    contract_code = '''def execute(self,x,y):
    return x+y '''  #this is teh code the contrcat need to execute and it is inside stirng and does nothing until execute calls it
    
    contract = Smart_contracts(contract_code)
    context = {"x": 5, "y": 10}  
    

    assert  contract.execute(context) = 15  # if it is executed properrly then  5+10 would equal 15


