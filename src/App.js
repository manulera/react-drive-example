import React from "react";
import "./App.css";
import { useScript } from "usehooks-ts";
import GoogleDriveComponent from "./GoogleDriveComponent";

async function createPicker(scriptVars) {
  const { gapi, apiKey, clientId, token } = scriptVars;
}

function App() {
  const [scriptVars, setScriptVars] = React.useState({ loaded: false });
  const onClickButton = () => {
    createPicker(scriptVars);
  };
  return (
    <div className="App">
      <GoogleDriveComponent setScriptVars={setScriptVars} />
      <div>Hello</div>
      <button onClick={onClickButton}></button>
      <div>{scriptVars.loaded ? "loaded" : "not loaded"}</div>
    </div>
  );
}

export default App;
