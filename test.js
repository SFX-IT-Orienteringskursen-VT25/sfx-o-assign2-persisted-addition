QUnit.module("Number Operations", hooks => {
    hooks.beforeEach(() => {
        localStorage.clear();
        document.getElementById('qunit-fixture').innerHTML = `
            <div class="list">
                <div id="numberList">No numbers yet</div>
                <h3><span id="totalSum">0</span></h3>
                <input type="text" id="numberInput">
            </div>
        `;
        window.alert = () => {}; // Mock alert to avoid pop-ups during testing
    });

    QUnit.test("UpdateNumbers initializes correctly", assert => {
        UpdateNumbers();
        assert.strictEqual(document.getElementById('numberList').textContent.trim(), "No numbers yet", "Should initialize with 'No numbers yet'");
        assert.strictEqual(document.getElementById('totalSum').textContent.trim(), "0", "Should initialize with sum 0");
    });

    QUnit.test("addNumber adds valid numbers and updates UI", assert => {
        document.getElementById('numberInput').value = "5";
        addNumber();
        assert.strictEqual(document.getElementById('numberList').textContent.trim(), "5", "Should display '5'");
        assert.strictEqual(document.getElementById('totalSum').textContent.trim(), "5", "Sum should update to 5");
    });


    QUnit.test("addNumber rejects invalid input", assert => {
        document.getElementById('numberInput').value = "abc";
        addNumber();
        assert.strictEqual(document.getElementById('numberList').textContent.trim(), "No numbers yet", "Should not add invalid input");
        assert.strictEqual(document.getElementById('totalSum').textContent.trim(), "0", "Sum should remain 0");
    });

    QUnit.test("CleanStorage resets the numbers and UI", assert => {
        document.getElementById('numberInput').value = "10";
        addNumber();
        CleanStorage();
        assert.strictEqual(document.getElementById('numberList').textContent.trim(), "No numbers yet", "Should reset list");
        assert.strictEqual(document.getElementById('totalSum').textContent.trim(), "0", "Sum should reset to 0");
        assert.strictEqual(localStorage.getItem('numbers'), null, "LocalStorage should be cleared");
    });
});
