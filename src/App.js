import React from "react";
import "./App.css";
import {
  readFileFromGooglePicker,
  submitFileToGoogleDrive,
} from "./googlePickerFunctions";
import useGoogleDriveApi from "./useGoogleDriveApi";

function App() {
  const [inTextArea, setInTextArea] = React.useState("");
  const [userFileName, setUserFileName] = React.useState("");
  const scriptVars = useGoogleDriveApi();

  const onClickButton = () => {
    readFileFromGooglePicker(scriptVars, setInTextArea);
  };

  const onClickSubmitButton = () => {
    submitFileToGoogleDrive(scriptVars, userFileName, inTextArea);
  };

  return (
    <div className="App">
      <div>Hello</div>

      {scriptVars.loaded && <button onClick={onClickButton}>Read File</button>}

      <textarea
        value={inTextArea}
        onChange={(e) => setInTextArea(e.target.value)}
      ></textarea>

      <input
        value={userFileName}
        onChange={(e) => setUserFileName(e.target.value)}
      ></input>

      {scriptVars.loaded && (
        <button onClick={onClickSubmitButton}>Submit File</button>
      )}

      <div>{scriptVars.loaded ? "loaded" : "not loaded"}</div>
    </div>
  );
}

export default App;
