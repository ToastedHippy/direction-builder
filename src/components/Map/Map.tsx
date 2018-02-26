import * as React from "react";
import { } from "@types/googlemaps";
import { IPoint } from "../../models/Point";
import "./Map.scss";

export interface IMapProps {
  points: IPoint[];
}

const API_KEY = "AIzaSyA2E6gObCM5rS5SB1apN5C2szQHjlHg084";
const GOOGLE_MAP_API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

export default class Map extends React.Component<IMapProps, any> {

  constructor(props: IMapProps) {
    super(props);
  }

  initGoogleMap = () => {
    console.log(google.maps.Map);
  }

  createGMScript() {
    const script = document.createElement("script");
    script.src = GOOGLE_MAP_API_URL;
    script.async = true;

    script.addEventListener("load", this.initGoogleMap);

    return script;
  }

  componentDidMount() {
    document.body.appendChild(this.createGMScript());
  }

  render() {
    return (
      <div className="map">
      </div>
    );
  }
}
