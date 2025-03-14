# wallet.py - Implements wallet functionality with cryptographic signing
import rsa # Import the RSA library for generating public-private key pairs

class Wallet: # Represents a digital wallet that can sign transactions
    def __init__(self): # Defines the constructor for the Wallet class
        self.public_key, self.private_key = rsa.newkeys(512) # Generates a public-private key pair for the wallet
    
    def sign_transaction(self, transaction): # Signs a transaction using the private key of the wallet
        return rsa.sign(str(transaction.__dict__).encode(), self.private_key, 'SHA-1') # Signs the transaction using the private key