import axios from "axios";
import Treatment from "../models/treatment";

const APIENDPOINT = "/api/treatments/";

export async function getAllTreatments(
  onSuccess: (data: Treatment[]) => void,
  onError: (arg0: any) => void
) {
  let res: any = {};
  try {
    res = await axios.get(`${APIENDPOINT}all/true`);
  } catch (err) {
    onError(err);
  }

  let treatments: Treatment[] = [];

  res.data.forEach(
    (el: {
      _id: string;
      type: string;
      duration: number;
      price: number;
      isActive: boolean;
    }) => {
      treatments.push(
        new Treatment(
          el._id,
          el.type,
          el.duration,
          el.price,
          el.isActive
        )
      );
    }
  );
  onSuccess(treatments);
}

export async function getTreatment(
  id: string,
  onError: (arg0: any) => void
) {
  let res: any = {};

  try {
    res = await axios.get(`${APIENDPOINT}${id}`);
  } catch (err) {
    onError(err);
  }

  return res.data;
}

export async function addTreatment(
  treatment: Treatment,
  onError: (arg0: any) => void
) {
  let res: any = {};
  try {
    res = await axios.post(`${APIENDPOINT}new`, { data: treatment });
  } catch (err) {
    onError(err);
  }

  return res.data;
}

export async function editTreatment(
  treatment: Treatment,
  onError: (arg0: any) => void
) {
  let res: boolean = false;

  try {
    res = await axios.put(`${APIENDPOINT}edit/${treatment._id}`, {
      treatment: treatment,
    });
  } catch (err) {
    onError(err);
  }

  return res;
}

export async function deleteTreatment(
  id: string,
  onError: (arg0: any) => void
) {
  let res: boolean = false;
  try {
    res = await axios.delete(`${APIENDPOINT}delete/${id}`);
  } catch (err) {
    onError(err);
  }

  return res;
}
