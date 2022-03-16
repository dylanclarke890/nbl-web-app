export default class AppointmentType {
  _id: string;
  appointmentType: string;
  duration: number;
  price: number;
  isActive: boolean;

  public constructor(
    _id: string,
    appointmentType: string,
    duration: number,
    price: number,
    isActive: boolean
  ) {
    this._id = _id;
    this.appointmentType = appointmentType;
    this.duration = duration;
    this.price = price;
    this.isActive = isActive;
  }

  display = (): string => {
    return `${this.appointmentType} - ${this.duration} - ${this.price} - ${this.isActive}`;
  };
}
