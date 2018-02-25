import * as React from "react";
import { IPoint } from "../../models/Point";
import "./Map.scss";

export interface IMapProps {
  points: IPoint[];
}

export default class Map extends React.Component<IMapProps, any> {

  constructor(props: IMapProps) {
    super(props);
  }

  render() {
    return (
      <div className="map">

      </div>
    );
  }
}
