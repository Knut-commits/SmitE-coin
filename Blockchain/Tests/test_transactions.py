from transactions import Transactions
def test_transactions():
    transaction = Transaction("knut", "kuzey", 25)
    
    assert transaction.sender == "knut"
    assert transaction.recipient == "kuzey"
    assert transaction.amount == 25