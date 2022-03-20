export default class Treatment {
  _id: string;
  type: string;
  duration: number;
  price: number;
  isActive: boolean;

  public constructor(
    _id: string,
    type: string,
    duration: number,
    price: number,
    isActive: boolean
  ) {
    this._id = _id;
    this.type = type;
    this.duration = duration;
    this.price = price;
    this.isActive = isActive;
  }

  display = (): string => {
    return `${this.type} - ${this.duration} - ${this.price} - ${this.isActive}`;
  };
}
