import * as React from "react";
import * as ReactDOM from "react-dom";
import DirectionEditor from "../DirectionEditor/DirectionEditor";
import "./App.scss";

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <DirectionEditor />
      </div>

    );
  }
}
