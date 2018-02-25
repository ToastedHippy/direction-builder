import * as React from "react";
import NewPointForm from "../NewPointForm/NewPointForm";
import PointsList from "../PointsList/PointsList";
import Map from "../Map/Map";
import { IPoint } from "../../models/Point";
import "./DirectionEditor.scss";

interface IDirectionEditorState {
  points: IPoint[];
}

export default class DirectionEditor extends React.Component<{}, IDirectionEditorState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      points: [],
    };
  }

  addPoint = (newPoint: IPoint) => {
    const points = this.state.points;

    this.setState({ points: points.concat(newPoint) });
  }

  render() {

    return (
      <div className="direction-editor">
        <div className="direction-editor__points">
          <div className="direction-editor__new-point-form">
            <NewPointForm onPointAdded={this.addPoint} />
          </div>
          <div className="direction-editor__points-list">
            <PointsList points={this.state.points} onPointDeleted={(points) => this.setState({ points })} />
          </div>
        </div>
        <div className="direction-editor__map">
          <Map points={this.state.points} />
        </div>
      </div>
    );
  }
}
