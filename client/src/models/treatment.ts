export default class Treatment {
  _id: string;
  type: string;
  duration: number;
  price: number;
  isActive: boolean;
  description?: string;

  public constructor(
    _id: string,
    type: string,
    duration: number,
    price: number,
    isActive: boolean,
    description?: string
  ) {
    this._id = _id;
    this.type = type;
    this.duration = duration;
    this.price = price;
    this.isActive = isActive;
    this.description = description;
  }
}
