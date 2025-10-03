import os
import json
import unittest
from persisted_addition import persist_and_summarize, DATA_FILE


class TestPersistedAddition(unittest.TestCase):
    def setUp(self):
        # Setup a clean file before each test
        with open(DATA_FILE, 'w') as f:
            json.dump([], f)

    def tearDown(self):
        # Cleanup after each test
        if os.path.exists(DATA_FILE):
            os.remove(DATA_FILE)

    def test_add_single_number(self):
        result = persist_and_summarize(5)
        self.assertEqual(result, 5)

    def test_add_multiple_numbers(self):
        persist_and_summarize(10)
        result = persist_and_summarize(15)
        self.assertEqual(result, 25)

if __name__ == '__main__':
    unittest.main()
