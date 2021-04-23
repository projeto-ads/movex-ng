export class Challenge {
  public id: number;
  public description: string;
  public amount: number;
  public type: string;

  constructor(json?: Partial<Challenge>) {
    Object.assign(this, json);
  }
}
