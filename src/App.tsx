import React, { CSSProperties, useEffect } from "react";
import snapIcon from "./snapicon.png";

const circleIconStyle: CSSProperties = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  overflow: "hidden",
  position: "fixed",
  top: "10px",
  right: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
};

const logoStyle: CSSProperties = {
  width: "100%",
  height: "auto",
};

function App() {
  useEffect(() => {
    const handleFocus = () => {
      // Handle focus event if needed
    };

    const handleLoad = () => {
      // Handle load event if needed
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("load", handleLoad);
    };
  }, []);


  return (
    <div style={circleIconStyle}>
      <img src={snapIcon} alt="Logo" style={logoStyle} />
    </div>
  );
}

export default App;


