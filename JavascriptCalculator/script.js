document.addEventListener("DOMContentLoaded", function() {

    const formulaScreen = document.querySelector(".formulaScreen");
    const outputScreen = document.querySelector(".outputScreen");
    let currentInput = "";
    let currentFormula = "";
    
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function() {

            let btnValue = this.value;

            // Handle zero and decimal specially
            if (btnValue === '0' && currentInput === '0') {
                return;
            }
            if (btnValue === '.' && currentInput.includes('.')) {
                return;
            }

            if (["+", "-", "x", "/"].includes(btnValue)) {
                if (["+", "-", "x", "/"].includes(currentFormula.slice(-1))) {
                    currentFormula = currentFormula.slice(0, -1); // Remove the last operator if present
                }
                if (btnValue === "x") {
                    btnValue = "*";
                }
            }

            switch (btnValue) {
                case "=":
                    try {
                        let result = eval(currentFormula);
                        outputScreen.textContent = result % 1 === 0 ? result : parseFloat(result.toFixed(4));
                        currentFormula = outputScreen.textContent;
                        currentInput = "";
                    } catch (e) {
                        outputScreen.textContent = "Error";
                        currentFormula = "";
                        currentInput = "";
                    }
                    break;

                case "AC":
                    currentFormula = "";
                    currentInput = "";
                    formulaScreen.textContent = "";
                    outputScreen.textContent = "0";
                    break;

                default:
                    if (["+", "-", "*", "/"].includes(btnValue) && outputScreen.textContent !== "0") {
                        currentInput = "";
                    } else {
                        currentInput += btnValue;
                    }
                    currentFormula += btnValue;
                    formulaScreen.textContent = currentFormula;
                    outputScreen.textContent = currentInput;
                    break;
            }
        });
    });
});
