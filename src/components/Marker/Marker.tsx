import * as React from "react";
import { } from "@types/googlemaps";
import { IPoint } from "../../models/Point";

export interface IMarkerProps {
  name: string;
  map: google.maps.Map | null;
  position?: google.maps.LatLng;
  onMarkerCreated?: (coordinate: google.maps.LatLng) => any;
  onMarkerMoved?: (coordinate: google.maps.LatLng) => any;
  onMarkerDeleted?: () => any;
}

interface IMarkerState {
  marker: google.maps.Marker | null;
}

export default class Marker extends React.Component<IMarkerProps, IMarkerState> {

  constructor(props: IMarkerProps) {
    super(props);
    this.state = { marker: null };
    console.log("construct", this.props);
  }

  createGMMarker() {
    const map = this.props.map;
    if (map) {
      const markerProps: google.maps.MarkerOptions = {
        map,
        position: this.props.position || { lat: -25.363, lng: 131.044 },
        draggable: true,
        title: this.props.name || "",
      };
      const marker = new google.maps.Marker(markerProps);

      marker.addListener("dragend",
        () => this.props.onMarkerMoved && this.props.onMarkerMoved(marker.getPosition()));

      this.setState({ marker });
      this.props.onMarkerCreated && this.props.onMarkerCreated(marker.getPosition());
    }
  }

  componentDidMount() {
    this.createGMMarker();
  }

  componentDidUpdate(prevProps: IMarkerProps) {
    if (this.props.map !== prevProps.map) {
      if (this.state.marker) {
        this.state.marker.setMap(this.props.map);
      } else {
        this.createGMMarker();
      }
    }
  }

  componentWillUnmount() {
    console.log(this.props);
    if (this.state.marker) {
      this.state.marker.setMap(null);
    }
    this.props.onMarkerDeleted && this.props.onMarkerDeleted();
  }

  render() {
    return null;
  }
}
