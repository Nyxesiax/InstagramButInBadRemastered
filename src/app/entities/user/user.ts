export class User
{

  constructor(
    private _id: number,
    private _name: string,
    private _email: string,
    private _password: string,
    private _bio: string,
    private _score: number,
    private _loggedIn: boolean
  )
  {
    this._id = _id;
    this._name = _name;
    this._email = _email;
    this._password = _password;
    this._bio = _bio;
    this._score = _score;
    this._loggedIn = false;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get bio(): string {
    return this._bio;
  }

  set bio(value: string) {
    this._bio = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }
}
