import axios from "axios";
import Treatment from "../models/treatment";

const APIENDPOINT = "/api/treatments/";

export async function getAllTreatments(
  onSuccess: (data: Treatment[]) => void,
  includeInActive?: boolean
) {
  let res: any = {};
  res = await axios.get(`${APIENDPOINT}all${includeInActive ? "/admin" : ""}`);
  let treatments: Treatment[] = [];

  res.data.forEach((el: Treatment) => {
    treatments.push(
      new Treatment(el._id, el.type, el.duration, el.price, el.isActive)
    );
  });
  onSuccess(treatments);
}

export async function getTreatment(id: string) {
  let res: any = {};
  res = await axios.get(`${APIENDPOINT}${id}`);
  return res.data;
}

export async function addTreatment(treatment: Treatment) {
  let res: any = {};
  res = await axios.post(`${APIENDPOINT}new`, { data: treatment });
  return res.data;
}

export async function editTreatment(treatment: Treatment) {
  let res: boolean = false;
  res = await axios.put(`${APIENDPOINT}edit/${treatment._id}`, {
    treatment: treatment,
  });
  return res;
}

export async function deleteTreatment(id: string) {
  let res: boolean = false;
  res = await axios.delete(`${APIENDPOINT}delete/${id}`);
  return res;
}
