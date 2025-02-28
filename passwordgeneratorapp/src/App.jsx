import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [Password, setPassword] = useState();

  // useRef hook
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numberAllowed) str += "0123456789";
    if (symbolAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed, setPassword]);


  // copy to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99); // select the text from 0 to 99 index
    window.navigator.clipboard.writeText(Password);
  }, [Password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, symbolAllowed, setPassword]);
  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500
      bg-gray-700 py-5"
      >
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white my-5">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />

          <button
          onClick={copyPasswordToClipboard} 
           className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={8}
              max={64}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range">Length : {length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              id="characterInput"
              onChange={() => {
                setSymbolAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
