import axios from "axios";
import AppointmentType from "../models/appointment-type";

const APIENDPOINT = "/api/appointment-types/";

export async function getAllAppointmentTypes(
  onSuccess: (data: AppointmentType[]) => void,
  onError: (arg0: any) => void
) {
  let res: any = {};
  try {
    res = await axios.get(`${APIENDPOINT}all`);
  } catch (err) {
    onError(err);
  }

  let appointmentTypes: AppointmentType[] = [];

  res.data.types.forEach(
    (el: {
      _id: string;
      appointmentType: string;
      duration: number;
      price: number;
      isActive: boolean;
    }) => {
      appointmentTypes.push(
        new AppointmentType(
          el._id,
          el.appointmentType,
          el.duration,
          el.price,
          el.isActive
        )
      );
    }
  );
  onSuccess(appointmentTypes);
}

export async function getAppointmentType(
  id: string,
  onError: (arg0: any) => void
) {
  let res: any = {};

  try {
    res = await axios.get(`${APIENDPOINT}/${id}`);
  } catch (err) {
    onError(err);
  }

  return res.data;
}

export async function addAppointmentType(
  name: string,
  duration: number,
  price: number,
  isActive: boolean,
  onError: (arg0: any) => void
) {
  let res: any = {};
  try {
    res = await axios.post(`${APIENDPOINT}new`, {
      name,
      duration,
      price,
      isActive,
    });
  } catch (err) {
    onError(err);
  }

  return res.data;
}

export async function editAppointmentType(
  appointmentType: AppointmentType,
  onError: (arg0: any) => void
) {
  let res: any = {};

  try {
    res = await axios.put(`${APIENDPOINT}edit/${appointmentType._id}`, {
      appointmentType,
    });
  } catch (err) {
    onError(err);
  }

  return res;
}

export async function deleteAppointmentType(
  id: string,
  onError: (arg0: any) => void
) {
  let res: any = {};
  try {
    res = await axios.delete(`${APIENDPOINT}delete/${id}`);
  } catch (err) {
    onError(err);
  }

  return res.data;
}
