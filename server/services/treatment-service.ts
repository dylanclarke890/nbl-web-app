import * as mongoose from "mongoose";

let TreatmentModel = require("../models/treatment");
import ITreatment from "../interfaces/ITreatment";

export async function getAllTreatments(
  includeInActive = false
): Promise<ITreatment[]> {
  return includeInActive
    ? await TreatmentModel.find()
    : await TreatmentModel.where("isActive").equals(true);
}

export async function getTreatment(_id: string): Promise<ITreatment> {
  return await TreatmentModel.findById(_id).exec();
}

export async function addTreatment(req: any): Promise<ITreatment> {
  let result = new TreatmentModel({ ...req.body.data });
  try {
    await result.save();
  } catch (e) {
    console.error(e);
  }

  return result;
}

export async function editTreatment(id: string, item: any) {
  let success = false;
  const update = item.treatment;
  try {
    const doc = await TreatmentModel.findById(id).exec();
    doc.type = update.type;
    doc.duration = update.duration;
    doc.price = update.price;
    doc.isActive = update.isActive;
    doc.description = update.description;
    await doc.save();
    success = true;
  } catch (e) {
    console.error(e);
  }

  return success;
}

export async function deleteTreatment(id: string) {
  let success = false;

  try {
    const res = await TreatmentModel.deleteOne({ _id: id });
    success = res.deletedCount > 0;
  } catch (e) {
    console.error(e);
  }

  return success;
}
