export class Profile {

  id: number;
  name: string;
  email: string;
  level: number = 1;
  currentExperience: number = 0;
  challengesCompleted: number = 0;
  imageUrl: string;

  constructor(json?: Partial<Profile>) {
    Object.assign(this, json);
  }
}
