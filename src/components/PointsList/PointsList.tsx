import * as React from "react";
import Point from "../Point/Point";
import { IPoint } from "../../models/Point";
import "./PointsList.scss";

interface IPointsListProps {
  points: IPoint[];
}

interface IPointsListState {
  points: IPoint[];
}

export default class PointsList extends React.Component<IPointsListProps, IPointsListState> {

  constructor(props: IPointsListProps) {
    super(props);
    this.state = { points: props.points };
  }

  render() {
    return (
      <div className="points-list">
        {this.state.points.map((p) => <Point key={p.id} id={p.id} name={p.name} />)}
      </div>
    );
  }
}
