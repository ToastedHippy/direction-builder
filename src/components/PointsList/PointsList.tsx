import * as React from 'react';
import Point from "../Point/Point";
import "./PointsList.scss";

export default class PointsList extends React.Component {

  pointsData: {id: number; name: string}[] = [
    {
      id: 1,
      name: 'point 1'
    },
    {
      id: 2,
      name: 'point 2'
    }
  ]

  get pointsItems() {
    return this.pointsData.map(pd => <Point id={pd.id} name={pd.name}/>)
  }

  render() {
    return (
      <div className="points-list">
        <input type="text" className="points-list__input"/>
        {this.pointsItems}
      </div>
    );
  }
}
