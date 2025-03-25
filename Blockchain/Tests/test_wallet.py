import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
import rsa
from Blockchain.wallet import Wallet  # assuming Wallet class is in wallet.py

def test_wallet_initialization():
    # Initialize a Wallet instance
    wallet = Wallet()
    
    # Check that the public and private keys are generated
    assert wallet.public_key is not None
    assert wallet.private_key is not None
    
    # Check that the keys are valid RSA keys (you can also validate the key length)
    assert isinstance(wallet.public_key, rsa.key.PublicKey)
    assert isinstance(wallet.private_key, rsa.key.PrivateKey)

def test_sign_transaction():
    # Initialize a Wallet instance
    wallet = Wallet()
    
    # Create a mock transaction (this can be any object you want to sign)
    class Transaction:
        def __init__(self, sender, receiver, amount):
            self.sender = sender
            self.receiver = receiver
            self.amount = amount

    transaction = Transaction('Alice', 'Bob', 100)

    # Sign the transaction using the wallet
    signature = wallet.sign_transaction(transaction)
    
    # Verify that the signature is valid
    try:
        # Verify the signature with the public key
        rsa.verify(str(transaction.__dict__).encode(), signature, wallet.public_key)
        valid_signature = True
    except rsa.pkcs1.VerificationError:
        valid_signature = False

    # Assert that the signature is valid
    assert valid_signature is True

