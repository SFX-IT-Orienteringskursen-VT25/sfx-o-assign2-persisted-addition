from flask import Flask, request, jsonify, send_file
import json
import os

app = Flask(__name__)

PERSISTENCE_FILE = 'numbers.json'

def persist_and_summarize(new_number=None):
    numbers = []
    if os.path.exists(PERSISTENCE_FILE):
        with open(PERSISTENCE_FILE, 'r') as f:
            try:
                numbers = json.load(f)
            except Exception:
                numbers = []
    if new_number is not None:
        if not isinstance(new_number, int):
            raise ValueError("Only integers allowed")
        numbers.append(new_number)
    with open(PERSISTENCE_FILE, 'w') as f:
        json.dump(numbers, f)
    return numbers, sum(numbers)

@app.route('/numbers', methods=['GET', 'POST'])
def numbers():
    if request.method == 'POST':
        data = request.get_json()
        number = data.get('number')
        try:
            numbers, total = persist_and_summarize(number)
        except Exception as e:
            return jsonify({'error': str(e)}), 400
        return jsonify({'numbers': numbers, 'total': total})
    else:
        numbers, total = persist_and_summarize()
        return jsonify({'numbers': numbers, 'total': total})

@app.route('/')
def index():
    return send_file('persisted-addition.html')

if __name__ == '__main__':
    app.run(debug=True)
