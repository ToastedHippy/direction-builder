import * as React from "react";
import * as ReactDOM from "react-dom";
import PointsList from "../PointsList/PointsList";
import "./App.scss";

export class App extends React.Component {
  render() {
    return (
    <div className="app">
      <div className="app__points-list">
        <PointsList/>
      </div>
      <div className="app__map">
      </div>
    </div>
    
    
    )
  }
}