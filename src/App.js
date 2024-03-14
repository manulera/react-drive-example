import React from "react";
import "./App.css";
import { useScript } from "usehooks-ts";

function App() {
  const status = useScript(`https://apis.google.com/js/api.js`, {
    removeOnUnmount: false,
    id: "gapi",
  });

  const status2 = useScript(`https://accounts.google.com/gsi/client`, {
    removeOnUnmount: false,
    id: "google",
  });

  React.useEffect(() => {
    if (typeof gapi !== "undefined") {
      console.log("gapi is", gapi.load);
    }
    if (typeof google !== "undefined") {
      console.log("google is", google.accounts);
    }
  }, [status, status2]);
  return (
    <div className="App">
      <div>Hello</div>
    </div>
  );
}

export default App;
