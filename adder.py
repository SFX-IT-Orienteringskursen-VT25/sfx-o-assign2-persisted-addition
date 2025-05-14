# adder.py

def persist_and_sum(a, b):
    result = a + b
    with open("data.txt", "w") as f:
        f.write(f"{a},{b},{result}")
    return result

if __name__ == "__main__":
    a = int(input("Enter first number: "))
    b = int(input("Enter second number: "))
    result = persist_and_sum(a, b)
    print(f"Sum is: {result}")
