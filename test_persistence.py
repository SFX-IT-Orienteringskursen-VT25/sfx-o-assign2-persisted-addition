import unittest
import os
import json
from persistence import persist_and_calculate

class TestPersistence(unittest.TestCase):
    def setUp(self):
        self.test_file = "test_numbers.json"
        if os.path.exists(self.test_file):
            os.remove(self.test_file)
    
    def tearDown(self):
        if os.path.exists(self.test_file):
            os.remove(self.test_file)
    
    def test_no_existing_file(self):
        result = persist_and_calculate([1, 2, 3])
        self.assertEqual(result, 6)
    
    def test_with_existing_numbers(self):
        # Create existing data first
        with open(self.test_file, 'w') as f:
            json.dump([4, 5], f)
        
        result = persist_and_calculate([6])
        self.assertEqual(result, 15)
    
    def test_read_only(self):
        with open(self.test_file, 'w') as f:
            json.dump([10, 20], f)
        
        result = persist_and_calculate()
        self.assertEqual(result, 30)

if __name__ == '__main__':
    unittest.main()