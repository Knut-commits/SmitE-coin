import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import pytest
from unittest.mock import MagicMock
from Blockchain.consensous import ProofOfWork
from Blockchain.blockchain import Blockchain

# Test for the mine method in ProofOfWork
def test_mine_method():
    # Create a mock Blockchain instance
    mock_blockchain = MagicMock(spec=Blockchain)
    
    # Set up the miner address (just a string for testing)
    miner_address = "miner1"
    
    # Call the mine method from ProofOfWork
    ProofOfWork.mine(mock_blockchain, miner_address)
    
    # Assert that mine_pending_transactions is called once with the correct miner address
    mock_blockchain.mine_pending_transactions.assert_called_once_with(miner_address)
