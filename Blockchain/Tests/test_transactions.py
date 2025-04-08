

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) #copilot told me to do this so i can run the tests form any directory
from transactions import Transaction 
def test_transactions():
    transaction = Transaction( "kuzey", "knut", 25)
    
    assert transaction.sender == "kuzey"
    assert transaction.reciever == "knut"
    assert transaction.amount == 25