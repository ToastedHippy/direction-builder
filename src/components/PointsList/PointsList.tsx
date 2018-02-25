import * as React from "react";
import Point from "../PointComponent/PointComponent";
import { IPoint } from "../../models/Point";
import "./PointsList.scss";

interface IPointsListProps {
  points: IPoint[];
  onPointDeleted?: (points: IPoint[]) => any;
}

export default class PointsList extends React.Component<IPointsListProps> {

  constructor(props: IPointsListProps) {
    super(props);
  }

  deletePoint = (id: number) => {
    const remainedPoints = this.props.points.filter(p => p.id !== id);
    this.props.onPointDeleted && this.props.onPointDeleted(remainedPoints);
  }

  render() {
    return (
      <div className="points-list">
        {this.props.points.map((p) => <Point key={p.id} id={p.id} name={p.name} onPointDeleted={this.deletePoint} />)}
      </div>
    );
  }
}
