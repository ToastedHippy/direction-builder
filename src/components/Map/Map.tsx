import * as React from "react";
import * as ReactDOM from "react-dom";
import { } from "@types/googlemaps";
import { IPoint } from "../../models/Point";
import Marker from "../../components/Marker/Marker";
import "./Map.scss";

export interface IMapProps {
  points: IPoint[];
}

interface IMapState {
  map: google.maps.Map | null;
}

const API_KEY = "AIzaSyA2E6gObCM5rS5SB1apN5C2szQHjlHg084";
const GOOGLE_MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&language=ru&region=RU`;

export default class Map extends React.Component<IMapProps, any> {

  constructor(props: IMapProps) {
    super(props);

    this.state = {map: null};
  }

  initGoogleMap = () => {
    const mapNode = ReactDOM.findDOMNode(this.refs.gmap);
    const mapOpts: google.maps.MapOptions = {
      center: {lat: -25.363, lng: 131.044 },
      zoom: 4,
    };
    const map = new google.maps.Map(mapNode, mapOpts);
    this.setState({map});
  }

  createGMScript() {
    const script = document.createElement("script");
    script.src = GOOGLE_MAP_API_URL;
    script.async = true;

    script.addEventListener("load", this.initGoogleMap);

    return script;
  }

  componentDidMount() {
    if (!("google" in window)) {
      document.body.appendChild(this.createGMScript());
    } else {
      this.initGoogleMap();
    }
  }

  render() {
    const markers = this.props.points.map(p => <Marker key={p.id} map={this.state.map} id={p.id} name={p.name}/>);
    return (
      <div className="map">
        <div ref="gmap" className="gmap"></div>
        {markers}
      </div>
    );
  }
}
