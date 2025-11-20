import React, { useState } from "react";
import "./App.css";

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<"+" | "-" | "*" | "÷" | null>(
    null
  );
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  const inputNumber = (num: number): void => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputDecimal = (): void => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = (): void => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const deleteLast = (): void => {
    if (waitingForNewValue || display.length <= 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const performOperation = (nextOp: "+" | "-" | "*" | "÷"): void => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOp);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "÷":
        return b !== 0 ? a / b : 0;
      default:
        return b;
    }
  };

  const equals = (): void => {
    if (!operation || previousValue === null) return;

    const currentValue = parseFloat(display);
    const result = calculate(previousValue, currentValue, operation);

    setDisplay(String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };

  // Format previous value + operation for display
  const getPreview = (): string => {
    if (previousValue === null) return "";
    return `${previousValue} ${operation || ""}`;
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display-container">
          <div className="preview">{getPreview()}</div>
          <div className="display">{display}</div>
        </div>

        <div className="keypad">
          <button className="btn clear" onClick={clear}>
            AC
          </button>
          <button className="btn clear" onClick={deleteLast}>
            ⌫
          </button>
          <button
            className="btn operator"
            onClick={() => performOperation("÷")}
          >
            ÷
          </button>
          <button
            className="btn operator"
            onClick={() => performOperation("*")}
          >
            x
          </button>

          <button className="btn number" onClick={() => inputNumber(7)}>
            7
          </button>
          <button className="btn number" onClick={() => inputNumber(8)}>
            8
          </button>
          <button className="btn number" onClick={() => inputNumber(9)}>
            9
          </button>
          <button
            className="btn operator"
            onClick={() => performOperation("-")}
          >
            -
          </button>

          <button className="btn number" onClick={() => inputNumber(4)}>
            4
          </button>
          <button className="btn number" onClick={() => inputNumber(5)}>
            5
          </button>
          <button className="btn number" onClick={() => inputNumber(6)}>
            6
          </button>
          <button
            className="btn operator"
            onClick={() => performOperation("+")}
          >
            +
          </button>

          <button className="btn number" onClick={() => inputNumber(1)}>
            1
          </button>
          <button className="btn number" onClick={() => inputNumber(2)}>
            2
          </button>
          <button className="btn number" onClick={() => inputNumber(3)}>
            3
          </button>
          <button className="btn equals" onClick={equals}>
            =
          </button>

          <button className="btn number zero" onClick={() => inputNumber(0)}>
            0
          </button>
          <button className="btn number" onClick={inputDecimal}>
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
