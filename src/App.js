import { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [payload, setPayload] = useState({});

  const [pinIsValid, setPinIsValid] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setFormIsValid(nameIsValid && pinIsValid);
  }, [nameIsValid, pinIsValid]);

  const clearPayload = () => {
    setPayload((prev) => ({}));
  };

  const handleName = (e) => {
    let _name = e.target.value;
    if (_name !== "" && _name.length <= 10 && _name.length >= 5) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
    setName(_name);
    clearPayload();
  };

  const handlePin = (e) => {
    let _pin = e.target.value;
    if (_pin !== "" && /^\d\d\d\d$/.test(_pin)) {
      setPinIsValid(true);
    } else {
      setPinIsValid(false);
    }
    setPin(_pin);
    clearPayload();
  };

  const handleEmail = (e) => {
    let _email = e.target.value;
    if (_email !== "" && /(.+)@(.+){2,}\.(.+){2,}/.test(_email)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    setEmail(_email);
    clearPayload();
  };


  const handleButton = (e) => {
    e.preventDefault();
    setPayload((prev) => ({
      ...prev,
      name,
      pin,
    }));
  };
  return (
    <div className="App">
      <form>
        <fieldset>
          <legend>Order Form</legend>
          <div className={"row " + (nameIsValid ? "valid" : "invalid")}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={handleName} />
          </div>
          <div className={"note " + (nameIsValid ? "valid" : "invalid")}>
            required, maximum 10 characters
          </div>

          <div className={"row " + (pinIsValid ? "valid" : "invalid")}>
            <label htmlFor="pin">Pin</label>
            <input type="text" id="pin" onChange={handlePin} value={pin} />
          </div>
          <div className={"note " + (pinIsValid ? "valid" : "invalid")}>
            e.g. nnnn
          </div>

          <div className={"row " + (emailIsValid ? "valid" : "invalid")}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={handleEmail} value={email} />
          </div>
          <div className={"note " + (emailIsValid ? "valid" : "invalid")}>
            e.g. xxxx@xxxx.xx
          </div>

          <div className="buttonRow">
            <button disabled={!formIsValid} onClick={handleButton}>
              Send
            </button>
          </div>
        </fieldset>
      </form>
      {Object.keys(payload).length !== 0 && (
        <pre>payload: {JSON.stringify(payload, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
