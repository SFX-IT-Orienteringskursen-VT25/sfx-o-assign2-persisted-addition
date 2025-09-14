import json
import os

def persist_and_calculate(numbers=None):
    """
    Persists numbers to storage and returns the sum of all persisted numbers.
    If no numbers provided, returns the sum of existing numbers.
    """
    filename = "numbers.json"
    
    # Read existing numbers
    if os.path.exists(filename):
        with open(filename, 'r') as f:
            try:
                existing_numbers = json.load(f)
            except json.JSONDecodeError:
                existing_numbers = []
    else:
        existing_numbers = []
    
    # Add new numbers if provided
    if numbers:
        existing_numbers.extend(numbers)
        with open(filename, 'w') as f:
            json.dump(existing_numbers, f)
    
    # Return sum of all numbers
    return sum(existing_numbers)