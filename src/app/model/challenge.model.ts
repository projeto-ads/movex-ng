export class Challenge {

  id: number;
  description: string;
  amount: number;
  type: string;

  constructor(json?: Partial<Challenge>) {
    Object.assign(this, json);
  }
}
