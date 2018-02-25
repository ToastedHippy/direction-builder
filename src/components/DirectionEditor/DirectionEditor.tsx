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
      points: [
        {
          id: 1,
          name: "point 1",
        },
        {
          id: 2,
          name: "point 2",
        },
      ],
    };
  }

  render() {

    return (
      <div className="direction-editor">
        <div className="direction-editor__points">
          <div className="direction-editor__new-point-form">
            <NewPointForm />
          </div>
          <div className="direction-editor__points-list">
            <PointsList points={this.state.points} />
          </div>
        </div>
        <div className="direction-editor__map">
          <Map points={this.state.points} />
        </div>
      </div>
    );
  }
}
