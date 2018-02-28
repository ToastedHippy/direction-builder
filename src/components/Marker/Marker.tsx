import * as React from "react";
import { } from "@types/googlemaps";
import { IPoint } from "../../models/Point";

export interface IMarkerProps extends IPoint {
    map: google.maps.Map;
    position?: google.maps.LatLng;
}

interface IMarkerState {
  marker: google.maps.Marker | null;
}

export default class Marker extends React.Component<IMarkerProps, IMarkerState> {

  constructor(props: IMarkerProps) {
    super(props);
    this.state = {marker: null};
    console.log("construct", this.props);
  }

  createGMMarker() {
    const map = this.props.map;
    if (map) {
      const markerProps: google.maps.MarkerOptions = {
        map,
        position: this.props.position || {lat: -25.363, lng: 131.044},
        draggable: true,
        title: this.props.name || "",
      };
      const marker = new google.maps.Marker(markerProps);
      this.setState({marker});
    }
  }

  componentDidMount() {
    this.createGMMarker();
  }

  componentDidUpdate(prevProps: IMarkerProps) {
    if (this.props.map !== prevProps.map) {
      this.createGMMarker();
    }
  }

  componentWillUnmount() {
    console.log(this.props);
    if (this.state.marker) {
      this.state.marker.setMap(null);
    }
  }

  render() {
    return null;
  }
}
