import * as React from "react";
import * as ReactDOM from "react-dom";
import { } from "@types/googlemaps";
import { IPoint } from "../../models/Point";
import Marker from "../../components/Marker/Marker";
import Line from "../../components/Line/Line";
import "./Map.scss";

export interface IMapProps {
  points: IPoint[];
}

interface IWaypoint {
  pointId: number;
  coordinate: google.maps.LatLng;
}

interface IMapState {
  map: google.maps.Map | null;
  waypoints: IWaypoint[];
}

const API_KEY = "AIzaSyA2E6gObCM5rS5SB1apN5C2szQHjlHg084";
const GOOGLE_MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&language=ru&region=RU`;

export default class Map extends React.Component<IMapProps, IMapState> {

  constructor(props: IMapProps) {
    super(props);

    this.state = {
      map: null,
      waypoints: [],
    };
  }

  initGoogleMap = () => {
    const mapNode = ReactDOM.findDOMNode(this.refs.gmap);
    const mapOpts: google.maps.MapOptions = {
      center: { lat: -25.363, lng: 131.044 },
      zoom: 4,
    };
    const map = new google.maps.Map(mapNode, mapOpts);
    this.setState({ map });
  }

  createGMScript() {
    const script = document.createElement("script");
    script.src = GOOGLE_MAP_API_URL;
    script.async = true;

    script.addEventListener("load", this.initGoogleMap);

    return script;
  }

  addWaypoint = (pointId: number, coordinate: google.maps.LatLng) => {
    const waypoints = this.state.waypoints.concat({ pointId, coordinate } as IWaypoint);
    this.setState({ waypoints });
  }

  deleteWaypoint = (pointId: number) => {
    const waypoints = this.state.waypoints.filter(wp => wp.pointId !== pointId);
    this.setState({ waypoints });
  }

  changeWaypointCoordinate = (pointId: number, coordinate: google.maps.LatLng) => {
    const waypoints = this.state.waypoints.map(wp => {
      return wp.pointId === pointId ? Object.assign({}, wp, { coordinate }) : wp;
    });
    this.setState({ waypoints });
  }

  componentDidMount() {
    if (!("google" in window)) {
      document.body.appendChild(this.createGMScript());
    } else {
      this.initGoogleMap();
    }
  }

  render() {
    const markers = this.props.points.map(p => {
      return <Marker key={p.id}
        map={this.state.map}
        name={p.name}
        onMarkerCreated={(coordinate: google.maps.LatLng) => this.addWaypoint(p.id, coordinate)}
        onMarkerMoved={(coordinate: google.maps.LatLng) => this.changeWaypointCoordinate(p.id, coordinate)}
        onMarkerDeleted={() => this.deleteWaypoint(p.id)} />;
    });

    return (
      <div className="map">
        <div ref="gmap" className="gmap"></div>
        {markers}
        <Line map={this.state.map}
          coordinates={this.state.waypoints.map(wp => wp.coordinate)} />
      </div>
    );
  }
}
