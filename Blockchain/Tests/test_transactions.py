from transactions import Transaction, Transactions

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))) #copilot told me to do this so i can run the tests form any directory
def test_transactions():
    transaction = Transaction({ "sender" : "kuzey","reciever": "Knut","amount": 10})
    
    assert transaction.sender == "knut"
    assert transaction.recipient == "kuzey"
    assert transaction.amount == 25