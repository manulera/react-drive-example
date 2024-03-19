import React from "react";
import "./App.css";
import GoogleDriveComponent from "./GoogleDriveComponent";
import {
  readFileFromGooglePicker,
  submitFileToGoogleDrive,
} from "./googlePickerFunctions";

function App() {
  const [scriptVars, setScriptVars] = React.useState({ loaded: false });
  const [inTextArea, setInTextArea] = React.useState("");
  const [userFileName, setUserFileName] = React.useState("");

  const onClickButton = () => {
    readFileFromGooglePicker(scriptVars, setInTextArea);
  };

  const onClickSubmitButton = () => {
    submitFileToGoogleDrive(scriptVars, userFileName, inTextArea);
  };

  return (
    <div className="App">
      <GoogleDriveComponent setScriptVars={setScriptVars} />

      <div>Hello</div>
      <button onClick={onClickButton}>Read File</button>

      <textarea
        value={inTextArea}
        onChange={(e) => setInTextArea(e.target.value)}
      ></textarea>

      <input
        value={userFileName}
        onChange={(e) => setUserFileName(e.target.value)}
      ></input>

      <button onClick={onClickSubmitButton}>Submit File</button>

      <div>{scriptVars.loaded ? "loaded" : "not loaded"}</div>
    </div>
  );
}

export default App;
