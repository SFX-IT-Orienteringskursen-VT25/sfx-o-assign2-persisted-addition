from persistence import persist_and_calculate

def main():
    print("Persisted Addition System")
    print("Enter numbers one by one (press Enter without input to finish):")
    
    numbers = []
    while True:
        user_input = input("Enter a number: ")
        if user_input == "":
            break
        try:
            numbers.append(float(user_input))
        except ValueError:
            print("Please enter a valid number")
    
    total = persist_and_calculate(numbers)
    print(f"Numbers added: {numbers}")
    print(f"Total sum of all persisted numbers: {total}")

if __name__ == "__main__":
    main()