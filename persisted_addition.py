import json
import os

DATA_FILE = 'data.json'

def persist_and_summarize(new_number: int) -> int:
    try:
        with open(DATA_FILE, 'r') as f:
            numbers = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        numbers = []

    numbers.append(new_number)

    with open(DATA_FILE, 'w') as f:
        json.dump(numbers, f)

    return sum(numbers)
