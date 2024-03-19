import React from "react";
import { useScript } from "usehooks-ts";

function GoogleDriveComponent({ setScriptVars }) {
  const status = useScript(`https://apis.google.com/js/api.js`, {
    removeOnUnmount: false,
    id: "gapi",
  });

  const status2 = useScript(`https://accounts.google.com/gsi/client`, {
    removeOnUnmount: false,
    id: "google",
  });

  const handleLoad = async (loadedGapi, loadedGoogle) => {
    const { apiKey, clientId } = await fetch("/keys.json").then((res) => res.json());
    const tokenClient = loadedGoogle.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive",
      callback: "", // defined later
    });
    console.log(loadedGapi.load("picker"));
    return;
    console.log(tokenClient);

    setScriptVars({
      loaded: true,
      gapi: loadedGapi,
      loadedGoogle: loadedGoogle,
      apiKey,
      clientId,
      tokenClient,
    });
  };

  React.useEffect(() => {
    if (typeof gapi !== "undefined" && typeof google !== "undefined") {
      handleLoad(gapi, google);
    }
  }, [status, status2]);
  return <></>;
}

export default GoogleDriveComponent;
