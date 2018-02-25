import * as React from "react";
import { IPoint } from "../../models/Point";

export interface IPointComponentProps extends IPoint {
  onPointDeleted?: (id: number) => any;
}

export default class PointComponent extends React.Component<IPointComponentProps, any> {

  constructor(props: IPointComponentProps) {
    super(props);
  }

  deletePoint = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = this.props.id;

    this.props.onPointDeleted && this.props.onPointDeleted(id);
  }

  render() {
    return (
      <div className="point">
        <span className="point__name">{this.props.name}</span>
        <button className="point__del-btn" onClick={this.deletePoint}>удалить</button>
      </div>
    );
  }
}
