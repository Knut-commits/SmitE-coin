# wallet.py - Implements wallet functionality with cryptographic signing
import rsa

class Wallet:
    def __init__(self):
        # Generates a public-private key pair for the wallet
        self.public_key, self.private_key = rsa.newkeys(512)
    
    def sign_transaction(self, transaction):
        # Signs a transaction using the private key
        return rsa.sign(str(transaction.__dict__).encode(), self.private_key, 'SHA-1')