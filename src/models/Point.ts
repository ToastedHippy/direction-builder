export type PointId = number;

export interface IPoint {
  id: PointId;
  name: string;
}

export class Point implements IPoint {

  id: PointId;

  constructor(public name: string) {
    this.id = this.generateId();
  }

  // Pseudo-random id. Just for simplicity.
  private generateId(): PointId {
    return Math.floor(Math.random() * Math.pow(10, 10));
  }

}
