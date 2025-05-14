# test_adder.py

from adder import persist_and_sum

def test_persist_and_sum():
    result = persist_and_sum(3, 4)
    assert result == 7
    with open("data.txt", "r") as f:
        assert f.read() == "3,4,7"
