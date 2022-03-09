import IAppointmentType from "../interfaces/IAppointmentType";

import * as mongoose from "mongoose";
let AppointmentTypeModel = require("../models/appointment-type");

// export async function getAppointmentTypes(){
//   return await AppointmentTypeModel.where('isActive').equals(true);
// }

export async function getAppointmentTypes(): Promise<{
  types: IAppointmentType[];
}> {
  return types;
}

export async function getAppointmentType(
  _id: string
): Promise<IAppointmentType> {
  return types.types.find((el) => el._id == _id)!;
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

export async function editAppointmentType(appointmentType: IAppointmentType) {
  let success = false;

  const filter = { _id: appointmentType._id };
  const update = appointmentType;

  try {
    const oldDoc = await AppointmentTypeModel.updateOne(filter, update);
    console.log(oldDoc.n);
    console.log(oldDoc.nModified);
    success = true;
  } catch (e) {
    console.error(e);
  }

  return success;
}

export async function deleteAppointmentType(id: string) {
  let success = false;

  try {
    await AppointmentTypeModel.deleteOne(
      { _id: id },
      function (
        err: any,
        res: { n: number; ok: number; deletedCount: number }
      ) {
        if (err) {
          success = false;
        } else {
          console.log(res.n);
          console.log(res.ok);
          console.log(res.deletedCount);
          success = true;
        }
      }
    );
  } catch (e) {
    console.error(e);
  }

  return success;
}

let types = {
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
