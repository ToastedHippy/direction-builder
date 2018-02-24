import * as React from 'react';

export interface PointProps {
  id: number;
  name: string;
}

export default class Point extends React.Component<PointProps, any> {

  constructor(props: PointProps) {
    super(props);
    this.state = {id: props.id};
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
