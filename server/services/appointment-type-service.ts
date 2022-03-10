import * as mongoose from "mongoose";

let AppointmentTypeModel = require("../models/appointment-type");
import IAppointmentType from "../interfaces/IAppointmentType";

export async function getAllAppointmentTypes(
  includeInActive = false
): Promise<IAppointmentType[]> {
  return includeInActive
    ? await AppointmentTypeModel.find()
    : await AppointmentTypeModel.where("isActive").equals(true);
}

export async function getAppointmentType(
  _id: string
): Promise<IAppointmentType> {
  return await AppointmentTypeModel.findById(_id).exec();
}

export async function addAppointmentType(req: any): Promise<IAppointmentType> {
  let result = new AppointmentTypeModel({ ...req.body.data });
  try {
    await result.save();
  } catch (e) {
    console.error(e);
  }

  return result;
}

export async function editAppointmentType(id: string, item: any) {
  let success = false;
  const update = item.appointmentType;
  try {
    const doc = await AppointmentTypeModel.findById(id).exec();
    doc.appointmentType = update.appointmentType;
    doc.duration = update.duration;
    doc.price = update.price;
    doc.isActive = update.isActive;
    await doc.save();
    success = true;
  } catch (e) {
    console.error(e);
  }

  return success;
}

export async function deleteAppointmentType(id: string) {
  let success = false;

  try {
    const res = await AppointmentTypeModel.deleteOne({ _id: id });
    success = res.deletedCount > 0;
  } catch (e) {
    console.error(e);
  }

  return success;
}
