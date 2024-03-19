import React from "react";
import "./App.css";
import { useScript } from "usehooks-ts";
import GoogleDriveComponent from "./GoogleDriveComponent";

let accessToken = null;

async function pickerCallback(data) {
  console.log(data);
  let url = "nothing";
  const resp = await fetch("/keys.json");
  const { apiKey } = await resp.json();
  if (
    data[google.picker.Response.ACTION] == google.picker.Action.PICKED
  ) {
    let doc = data[google.picker.Response.DOCUMENTS][0];
    console.log(data.docs[0].id);
    url = doc[google.picker.Document.URL];
    
    fetch(
      `https://www.googleapis.com/drive/v3/files/${data.docs[0].id}?key={apiKey}&alt=media`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return JSON.stringify(data)})
      .then((data) => {
        console.log(data);
        setInTextArea(data);
      });
  }
}

async function createPicker(scriptVars) {
  console.log(scriptVars);
  const { loaded, gapi, apiKey, tokenClient, loadedGoogle } = scriptVars;
  return;
  if (loaded === true) {
        const showPicker = async () => {
          // TODO(developer): Replace with your API key
          const picker = new google.picker.PickerBuilder()
            .addView(google.picker.ViewId.DOCS)
            .setOAuthToken(accessToken)
            .setDeveloperKey(apiKey)
            .setCallback(pickerCallback)
            .build();
          picker.setVisible(true);
        }; 

        // Request an access token.
        tokenClient.callback = async (response) => {
          if (response.error !== undefined) {
            throw response;
          }
          accessToken = response.access_token;
          showPicker();
        };

        if (accessToken === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.requestAccessToken({ prompt: "consent" });
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.requestAccessToken({ prompt: "" });
        }
      }
    }

async function createSubmitPicker(scriptVars) {
  console.log(scriptVars);
  const { loaded, gapi, apiKey, tokenClient, google } = scriptVars;
 
  if (loaded === true) {
    const showPicker = () => {
      // TODO(developer): Replace with your API key
      const view = new google.picker.DocsView(
        google.picker.ViewId.FOLDERS
      ).setSelectFolderEnabled(true);
      const picker = new google.picker.PickerBuilder()
        .addView(view)
        .setOAuthToken(accessToken)
        .setDeveloperKey(apiKey)
        .setCallback(pickerSubmitCallback)
        .build();
      picker.setVisible(true);
    };

    // Request an access token.
    tokenClient.callback = async (response) => {
      if (response.error !== undefined) {
        throw response;
      }
      accessToken = response.access_token;
      showPicker();
    };

    if (accessToken === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: "" });
    }
  }
}

async function pickerSubmitCallback(data) {
  console.log(data);
        let url = "nothing";
        const resp = await fetch("/keys.json");
        const { apiKey } = await resp.json();
        if (
          data[google.picker.Response.ACTION] == google.picker.Action.PICKED
        ) {
          let doc = data[google.picker.Response.DOCUMENTS][0];
          let folderID = data.docs[0].id;
          url = doc[google.picker.Document.URL];
          
          let fileName = fileName;
          let fileNameJSON = fileName + ".json";
          let fileContent = inTextArea;
          const file = new Blob([fileContent], { type: "text/plain" });
        const metadata = {
          name: fileNameJSON,
          mimeType: "text/plain",
          parents: [folderID], // Google Drive folder id
        };
        const form = new FormData();
        form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        form.append("file", file);

        const updateUrl = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&key=${apiKey}&uploadType=media`;
        fetch(updateUrl, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          body: form,
        })
          .then((res) => {
            return res.json();
          })
          .then(function (val) {
            console.log(val);
          });
        }
}





function App() {
  const [scriptVars, setScriptVars] = React.useState({ loaded: false });
  const [inTextArea, setInTextArea] = React.useState("");
  const [fileName, setFileName] = React.useState("");


  const onClickButton = () => {
    createPicker(scriptVars);
  };

  const onClickSubmitButton = ()  => {
    createSubmitPicker(scriptVars);
  }




  return (
    <div className="App">
      <GoogleDriveComponent setScriptVars={setScriptVars} />



      <div>Hello</div>
      <button onClick={onClickButton}>Read File</button>

      <textarea value={inTextArea} onChange={(e) => setInTextArea(e.target.value)}></textarea>
      <input value={fileName} onChange={(e) => setFileName(e.target.value)}></input>

      <button onClick={onClickSubmitButton}>Submit File</button>
      

      <div>{scriptVars.loaded ? "loaded" : "not loaded"}</div>
    </div>
  );
}

export default App;
