import IAppointmentType from "../interfaces/IAppointmentType";

let mongoose = require("mongoose");
let AppointmentTypeModel = require("../models/appointment-type");

// export async function getAppointmentTypes(){
//   return await AppointmentTypeModel.where('isActive').equals(true);
// }

export async function getAppointmentTypes(): Promise<{
  types: IAppointmentType[];
}> {
  return {
    types: [
      {
        _id: "1",
        appointmentType: "Nails",
        duration: 60,
        price: 4.99,
        isActive: true,
      },
      {
        _id: "2",
        appointmentType: "Brows",
        duration: 45,
        price: 9.99,
        isActive: true,
      },
      {
        _id: "3",
        appointmentType: "Lashes",
        duration: 75,
        price: 14.99,
        isActive: true,
      },
    ],
  };
}

export async function addAppointmentType(req: any): Promise<IAppointmentType> {
  let result = new AppointmentTypeModel({ ...req.body });

  try {
    await result.save();
  } catch (e) {
    console.error(e);
  }

  return result;
}
