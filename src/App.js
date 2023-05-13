import "./App.css";
import { useState } from "react";

function App() {
  let [message, setMessage] = useState("");
  let [result, setResult] = useState("");
  let [num1, setNum1] = useState("");
  let [num2, setNum2] = useState("");
  let [color, setColor] = useState("");

  function calculate(e) {
    let op = e.target.value;
    //check if num1 input field is empty
    if (num1 === "" || isNaN(num1)) {
      //isNaN is used coz some time even if field is empty its value is NaN
      setMessage("Error: num1 cannot be empty");
      setColor("red");
      return;
    }

    //check if num2 input field is empty
    if (num2 === "" || isNaN(num2)) {
      setMessage("Error: num2 cannot be empty");
      setColor("red");
      return;
    }

    //calculate the result
    setResult(eval(num1 + op + num2));
    setColor("rgba(71, 245, 88, 1)"); //on success message text is green
    setMessage("Success : Your result is shown above!"); //success message
  }

  //fuction for input fields validation
  //it is called by each input field and the beauty of this function
  // is that it recognize from which field it has been called and take
  //action for that specific field.
  function validate(e) {
    setMessage("");
    setResult("");

    try {
      let value = e.target.value;

      if (isNaN(value) && value !== "-") throw Error;
      if (e.target.name === "num1") setNum1(value);
      else setNum2(value);
    } catch (Error) {
      setMessage("Error: Only numbers are allowed !");
      setColor("red");

      //here I use setTimeout function to just look for a second that
      //what wrong the user had inputed and then it get deleted to
      // enter the new value after 1 second. feels good to the user. ;)
      if (e.target.name === "num1")
        setTimeout(() => {
          setNum1("");
          e.target.value = "";
        }, 1000);
      else
        setTimeout(() => {
          setNum2("");
          e.target.value = "";
        }, 1000);
    }
  }

  return (
    <div className="App">
      <header className="App-header">React Calculator</header>
      <div className="contianer">
        <input
          type="text"
          placeholder="Num 1"
          name="num1"
          onChange={validate}
        ></input>
        <input
          type="text"
          placeholder="Num 2"
          name="num2"
          onChange={validate}
        ></input>
        <div className="btn-container">
          <button value="+" onClick={calculate}>
            +
          </button>
          <button value="-" onClick={calculate}>
            -
          </button>
          <button value="/" onClick={calculate}>
            /
          </button>
          <button value="*" onClick={calculate}>
            *
          </button>
        </div>
      </div>
      <p>{isNaN(result) ? "" : "Result = " + result}</p>
      <p style={{ color: color }}>{message}</p>
    </div>
  );
}

export default App;
