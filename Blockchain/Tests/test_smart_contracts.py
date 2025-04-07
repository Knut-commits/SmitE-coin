
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) #copilot told me to do this so i can run the tests form any directory

from smart_contracts import Smart_contracts
def test_smartcontract():
    contract_code = '''def execute(self,x,y):
    return x+y '''  #this is teh code the contrcat need to execute and it is inside stirng and does nothing until execute calls it
    
    contract = Smart_contracts(contract_code)
    context = {"x": 5, "y": 10}  
    

    assert  contract.execute(context) == 15  # if it is executed properrly then  5+10 would equal 15


