import * as React from "react";
import { Point, IPoint } from "../../models/Point";

interface INewPointForm {
  onPointAdded?: (newPoint: IPoint) => any;
}

export default class NewPointForm extends React.Component<INewPointForm> {

  submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameElement: HTMLInputElement = e.currentTarget.elements.namedItem("name") as HTMLInputElement;
    const name = nameElement ? nameElement.value : "";

    e.currentTarget.reset();
    this.props.onPointAdded && this.props.onPointAdded(new Point(name));
  }

  render() {
    return (
      <form className="new-point-form" onSubmit={this.submitForm}>
        <input type="text" name="name" className="new-point-form__input" placeholder="Новая точка" />
      </form>
    );
  }
}
