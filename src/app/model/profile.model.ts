export class Profile {
  public id: number;
  public name: string;
  public email: string;
  public level: number;
  public currentExperience: number;
  public challengesCompleted: number;
  public imageUrl: string;

  constructor(json?: Partial<Profile>) {
    Object.assign(this, json);
  }
}
