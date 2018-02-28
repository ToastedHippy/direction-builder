import * as React from "react";
import { } from "@types/googlemaps";

export interface ILineProps {
  map: google.maps.Map | null;
  coordinates: google.maps.LatLng[];
}

export interface ILineState {
  polyLine: google.maps.Polyline | null;
}

export default class Line extends React.Component<ILineProps, ILineState> {
  constructor(props: ILineProps) {
    super(props);

    this.state = { polyLine: null };
  }

  createPolyline() {
    const map = this.props.map;

    if (map) {
      const polyLineProps: google.maps.PolylineOptions = {
        map,
        path: this.props.coordinates,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      };
      const polyLine = new google.maps.Polyline(polyLineProps);
      this.setState({ polyLine });
      console.log("create polyline", polyLine.getPath());
    }
  }

  repaintPolyline() {
    if (this.state.polyLine) {
      this.state.polyLine.setPath(this.props.coordinates);
      console.log("repaint polyline", this.state.polyLine.getPath());
    }
  }

  componentDidMount() {
    this.createPolyline();
  }

  componentDidUpdate(prevProps: ILineProps) {
    if (prevProps.map !== this.props.map) {
      if (this.state.polyLine) {
        this.state.polyLine.setMap(this.props.map);
      } else {
        this.createPolyline();
      }
    } else {
      this.repaintPolyline();
    }

  }

  componentWillUnmount() {
    if (this.state.polyLine) {
      this.state.polyLine.setMap(null);
    }
  }

  render() { return null; }
}
