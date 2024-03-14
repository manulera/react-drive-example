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
    // Do whatever to get the token
    const token = "blahblahblah";

    setScriptVars({
      loaded: true,
      gapi: loadedGapi,
      google: loadedGoogle,
      apiKey,
      clientId,
      token,
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
