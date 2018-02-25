export interface IPoint {
  id: number;
  name: string;
}

export class Point implements IPoint {

  id: number;

  constructor(public name: string) {
    this.id = this.generateId();
  }

  // Pseudo-random id. Just for simplicity.
  private generateId(): number {
    return Math.floor(Math.random() * Math.pow(10, 10));
  }

}
