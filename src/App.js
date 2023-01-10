//import logo from "./logo.svg";
import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import Countdown from "./components/Countdown";
import CommentBox from "./components/CommentBox";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>hello</h1>
      </header> */}
      <body>
        <div>
          <Countdown />
          <CommentBox />
        </div>
      </body>
    </div>
  );
}

export default App;
