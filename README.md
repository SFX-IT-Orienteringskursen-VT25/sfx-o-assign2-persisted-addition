# sfx-o-assign2-persisted-addition

This project is a simple web application that allows users to add numbers, persist them between sessions, and display their sum. It features both backend logic (Python/Flask) and a frontend interface (HTML/JavaScript). The project includes comprehensive unit tests to ensure data integrity and correct behavior.

---

## 🚀 How to Run the Project

### 1. Clone the Repository

`git clone <your-repo-url>`
`cd <your-repo-directory>`

### 2. Create and Activate a Virtual Environment

python3 -m venv venv
source venv/bin/activate

### 3. Install Dependencies

pip install Flask

### 4. Run the Application

python app.py

The server will start at [http://127.0.0.1:5000](http://127.0.0.1:5000).  
Open this URL in your browser to use the app.

---

## 🧪 How to Run the Tests

To run the unit tests, make sure your virtual environment is activated and execute:
python test_app.py

For a more detailed test output, use:
python -m unittest -v test_app.py

---

## ✅ What is Tested

The project includes unit tests that check:

- **Invalid Input Handling:** Ensures only integers are accepted.
- **Data Persistence:** Checks that numbers are saved and loaded correctly.
- **Multiple Entries:** Verifies correct summing of several numbers.
- **Negative Numbers:** Ensures negative values are handled properly.
- **Zero as Input:** Checks that zero can be added and persisted.
- **Large Number of Entries:** Verifies the system works with many numbers.
- **Corrupted File Handling:** Ensures the app gracefully recovers from a corrupted data file.

You can find all test cases in the `test_app.py` file.

---

## 📝 Notes

- All numbers are persisted in a `numbers.json` file in the project directory.
- For development and testing only; do not use the built-in Flask server in production.
