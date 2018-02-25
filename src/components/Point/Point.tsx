import * as React from "react";
import { IPoint } from "../../models/Point";

export interface IPointProps extends IPoint {
}

export default class Point extends React.Component<IPointProps, any> {

  constructor(props: IPointProps) {
    super(props);
    this.state = { id: props.id };
  }

  render() {
    return (
      <div className="point">
        <span className="point__name">{this.props.name}</span>
        <button className="point__del">удалить</button>
      </div>
    );
  }
}
