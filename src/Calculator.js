import React from "react";
import "./calculator.css";

function Calculator() {
  const [num1, setNum1] = React.useState("");
  const [num2, setNum2] = React.useState("");
  const [operator, setOperator] = React.useState("+");
  const [result, setResult] = React.useState("");
  const [error, setError] = React.useState("");

  const handleInput = (setter) => (e) => {
    const value = e.target.value;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setter(value);
      setError("");
    } else {
      setError("Please enter valid numbers!");
    }
  };

  const handleOperatorClick = (op) => {
    setOperator(op);
    setError("");
  };

  const calculate = () => {
    if (num1 === "" || num2 === "") {
      setError("Both numbers are required!");
      setResult("");
      return;
    }
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setError("Please enter valid numbers!");
      setResult("");
      return;
    }
    let output;
    switch (operator) {
      case "+":
        output = a + b;
        break;
      case "-":
        output = a - b;
        break;
      case "*":
        output = a * b;
        break;
      case "/":
        output = b !== 0 ? a / b : "Cannot divide by zero";
        break;
      default:
        output = "Invalid operator";
    }
    setResult(output);
    setError("");
  };

  const clear = () => {
    setNum1("");
    setNum2("");
    setOperator("+");
    setResult("");
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") calculate();
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Simple_Calculator</h2>
      <div className="calculator-row">
        <input
          type="text"
          value={num1}
          onChange={handleInput(setNum1)}
          onKeyDown={handleKeyDown}
          placeholder="Number 1"
          className="calculator-input"
          aria-label="First number"
        />
        <input
          type="text"
          value={num2}
          onChange={handleInput(setNum2)}
          onKeyDown={handleKeyDown}
          placeholder="Number 2"
          className="calculator-input"
          aria-label="Second number"
        />
      </div>
      <div className="calculator-row">
        <button
          className={`calculator-button${
            operator === "+" ? " active-operator" : ""
          }`}
          onClick={() => handleOperatorClick("+")}
          type="button"
          aria-label="Add"
        >
          +
        </button>
        <button
          className={`calculator-button${
            operator === "-" ? " active-operator" : ""
          }`}
          onClick={() => handleOperatorClick("-")}
          type="button"
          aria-label="Subtract"
        >
          −
        </button>
        <button
          className={`calculator-button${
            operator === "*" ? " active-operator" : ""
          }`}
          onClick={() => handleOperatorClick("*")}
          type="button"
          aria-label="Multiply"
        >
          ×
        </button>
        <button
          className={`calculator-button${
            operator === "/" ? " active-operator" : ""
          }`}
          onClick={() => handleOperatorClick("/")}
          type="button"
          aria-label="Divide"
        >
          ÷
        </button>
      </div>
      <div className="calculator-row">
        <button
          onClick={calculate}
          className="calculator-button"
          aria-label="Equals"
        >
          =
        </button>
        <button
          onClick={clear}
          className="calculator-button"
          type="button"
          aria-label="Clear"
        >
          CLEAR
        </button>
      </div>
      <div className="calculator-result">
        {error && <div>{error}</div>}
        {result !== "" && !error && <b>Result: {result}</b>}
      </div>
    </div>
  );
}

export default Calculator;
