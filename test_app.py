import unittest
import os
from app import persist_and_summarize, PERSISTENCE_FILE

class TestPersistAndSummarize(unittest.TestCase):
    def setUp(self):
        if os.path.exists(PERSISTENCE_FILE):
            os.remove(PERSISTENCE_FILE)

    def tearDown(self):
        if os.path.exists(PERSISTENCE_FILE):
            os.remove(PERSISTENCE_FILE)

    def test_invalid_input(self):
        with self.assertRaises(ValueError):
            persist_and_summarize("invalid")

    def test_data_persistence(self):
        persist_and_summarize(10)
        self.assertEqual(persist_and_summarize()[0], [10])

    def test_multiple_entries(self):
        persist_and_summarize(1)
        persist_and_summarize(2)
        self.assertEqual(persist_and_summarize()[1], 3)

    def test_negative_numbers(self):
        persist_and_summarize(-5)
        numbers, total = persist_and_summarize()
        self.assertEqual(numbers, [-5])
        self.assertEqual(total, -5)

    def test_add_zero(self):
        persist_and_summarize(0)
        numbers, total = persist_and_summarize()
        self.assertEqual(numbers, [0])
        self.assertEqual(total, 0)

    def test_many_numbers(self):
        for i in range(100):
            persist_and_summarize(i)
        numbers, total = persist_and_summarize()
        self.assertEqual(len(numbers), 100)
        self.assertEqual(total, sum(range(100)))

    def test_corrupted_file(self):
        # Имитация повреждённого файла
        with open(PERSISTENCE_FILE, 'w') as f:
            f.write('corrupted data')
        numbers, total = persist_and_summarize()
        self.assertEqual(numbers, [])
        self.assertEqual(total, 0)

if __name__ == '__main__':
    unittest.main()
