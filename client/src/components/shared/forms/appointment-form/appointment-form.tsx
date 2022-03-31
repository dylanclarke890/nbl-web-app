import React, { useCallback, useContext, useEffect, useState } from "react";

import * as Validation from '../../../../helpers/validation';
import { getAppointment } from "../../../../services/appointmentService";
import Appointment from "../../../../models/appointment";

import CustomInput from "../../input/custom-input/custom-input";
import IAppointmentForm from "./IAppointmentForm";

import "./appointment-form.css";
import Treatment from "../../../../models/treatment";
import useOnInitialized from "../../../../custom-hooks/useOnInitialized";
import { getTimeStampAsDate, to24hr, toMeridian } from "../../../../helpers/timeSort";
import CustomTimeInput from "../../input/custom-time-input/custom-time-input";
import CustomDateInput from "../../input/custom-date-input/custom-date-input";
import { ToastContext } from "../../../../contexts/toast-context/toast-context";
import { LoadingContext } from "../../../../contexts/loading-context/loading-context";

export default function AppointmentForm({ id, onSubmit, readOnly }: IAppointmentForm): JSX.Element {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);
  
  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while loading appointment."), []);
  useEffect(() => {
    if (!id || loading) return;
    isLoading();
    const fetchData = async () => {
      const result = await getAppointment(id);
      setFrom(result.from);
      setTo(result.to);
      setDate(result.date!);
      setTreatment(result.treatment!);
      setTreatmentPrice(result.treatment!.price.toString());
      setName(result.person?.name!);
      setEmail(result.person?.email!);
      setPhone(result.person?.phone!);
    };
    fetchData().catch(onError);
    loaded();
  }, [id]);
  /* eslint-enable */

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [treatment, setTreatment] = useState(new Treatment("", "", 0, 0, false));
  const [treatmentPrice, setTreatmentPrice] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [modelValidation, setModelValidation] = useState({
    name: "",
    phone: "",
    email: "",
    timeSlot: "",
    treatmentType: "",
    treatmentDuration: "",
    treatmentPrice: "",
    error: false
  });

  const validateName = useCallback((): boolean => {
    if (!name) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        name: "Must provide a name.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        name: "",
        error: false
      }));
    }
    return true;
  }, [name, setModelValidation]);
  useEffect(() => { validateName(); }, [name, validateName]);

  const validateEmail = useCallback((): boolean => {
    if (!email) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        email: "Must provide an email.",
        error: true
      }));
      return false;
    } else if (email && !Validation.validateEmail(email)) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        email: "Must provide a valid email.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        email: "",
        error: false
      }));
    }
    return true;
  }, [email, setModelValidation]);
  useEffect(() => { validateEmail(); }, [email, validateEmail]);

  const validatePhone = useCallback((): boolean => {
    if (!phone) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        phone: "Must provide a phone number.",
        error: true
      }));
      return false;
    } else if (phone && !Validation.validatePhone(phone)) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        phone: "Must provide a valid number.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        phone: "",
        error: false
      }));
    }
    return true;
  }, [phone, setModelValidation]);
  useEffect(() => { validatePhone(); }, [phone, validatePhone]);

  const validateTreatmentType = useCallback((): boolean => {
    if (!treatment.type) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        treatmentType: "Must provide a treatment name.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        treatmentType: "",
        error: false
      }));
    }
    return true;
  }, [treatment.type]);
  useEffect(() => { validateTreatmentType(); }, [treatment.type, validateTreatmentType]);
  const updateType = (t: string) => {
    setTreatment(curr => new Treatment(curr._id, t, curr.duration, curr.price, curr.isActive));
  }

  const validateTreatmentDuration = useCallback((): boolean => {
    if (!treatment.duration) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        treatmentDuration: "Must provide treatment duration.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        treatmentDuration: "",
        error: false
      }));
    }
    return true;
  }, [treatment.duration]);
  useEffect(() => { validateTreatmentDuration(); }, [treatment.duration, validateTreatmentDuration]);
  const updateDuration = (d: string) => {
    setTreatment(curr => new Treatment(curr._id, curr.type, parseInt(d), curr.price, curr.isActive));
  }

  const validateTreatmentPrice = useCallback((): boolean => {
    if (!treatmentPrice) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        treatmentPrice: "Must provide treatment price.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        treatmentPrice: "",
        error: false
      }));
    }
    const pointIndex = treatmentPrice.indexOf(".");
    if (pointIndex !== treatmentPrice.lastIndexOf(".") || (pointIndex !== -1 && (treatmentPrice.length - 1) - pointIndex !== 2)) {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        treatmentPrice: "Invalid price.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((modelValidation) => ({
        ...modelValidation,
        treatmentPrice: "",
        error: false
      }));
      setTreatment(curr => new Treatment(curr._id, curr.type, curr.duration, parseFloat(treatmentPrice), curr.isActive));
    }
    return true;
  }, [treatmentPrice]);
  useEffect(() => { validateTreatmentPrice(); }, [treatment.price, validateTreatmentPrice]);

  const validateTime = useCallback((): boolean => {
    if (from === "" || to === "") {
      setModelValidation((curr) => ({
        ...curr,
        timeSlot: "Need both times for a slot.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((curr) => ({
        ...curr,
        timeSlot: "",
        error: false
      }));
    }

    if (getTimeStampAsDate(from).valueOf() > getTimeStampAsDate(to).valueOf()) {
      setModelValidation((curr) => ({
        ...curr,
        timeSlot: "Till time should come after from time.",
        error: true
      }));
      return false;
    } else {
      setModelValidation((curr) => ({
        ...curr,
        timeSlot: "",
        error: false
      }));
    };
    return true;
  }, [from, to]);
  useEffect(() => { validateTime(); }, [from, to, validateTime])
  useOnInitialized(() => {
    setModelValidation({
      name: "",
      phone: "",
      email: "",
      timeSlot: "",
      treatmentType: "",
      treatmentDuration: "",
      treatmentPrice: "",
      error: false
    })
  }, []);

  const forwardClick = () => {
    if (!onSubmit) return;
    if (modelValidation.error) return;
    if (!validateName() || !validateEmail() || !validatePhone()
      || !validateTime() || !validateTreatmentType() || !validateTreatmentDuration()
      || !validateTreatmentPrice()) return;
    const model = new Appointment(
      id!,
      toMeridian(from),
      toMeridian(to),
      { name, phone, email },
      treatment,
      date
    );
    onSubmit!(model);
  };
  const submitButton = onSubmit ? <button className="btn" onClick={forwardClick}>Save</button> : null;

  return (
    <>
      <div className="treatment-form">
        <CustomInput inputId={"name"}
          value={name}
          active={name !== ""}
          error={modelValidation.name}
          onChange={setName}
          readonly={readOnly}
        />
        <CustomInput inputId={"email"}
          value={email}
          active={email !== ""}
          error={modelValidation.email}
          onChange={setEmail}
          readonly={readOnly}
        />
        <CustomInput inputId={"phone"}
          value={phone}
          active={phone !== ""}
          error={modelValidation.phone}
          onChange={setPhone}
          readonly={readOnly}
        />
        <div className="flex justify-center mb-1">
          <CustomDateInput inputId="date"
            error=""
            labelText="Date"
            value={date}
            onChange={setDate}
            readOnly={readOnly}
          />
        </div>
        <div className="flex justify-between mb-1">
          <CustomTimeInput inputId="from"
            labelText="Start Time"
            value={to24hr(from)}
            onChange={setFrom}
            error=""
            readOnly={readOnly}
          />
          <CustomTimeInput inputId="to"
            labelText="End Time"
            value={to24hr(to)}
            onChange={setTo}
            error=""
            readOnly={readOnly}
          />
        </div>
        <p className="text-error text-center">{modelValidation.timeSlot}</p>
        <CustomInput inputId={"treatment-type"}
          value={treatment.type}
          labelText={"treatment name"}
          active={treatment.type !== ""}
          error={modelValidation.treatmentType}
          onChange={updateType}
          readonly={readOnly}
        />
        <CustomInput inputId={"duration"}
          value={treatment.duration ? treatment.duration.toString() : ""}
          labelText="duration (mins)"
          active={treatment.duration !== 0}
          error={modelValidation.treatmentDuration}
          onKeyPress={Validation.handleNumberKeyPress}
          onChange={updateDuration}
          readonly={readOnly}
        />
        <CustomInput inputId={"price"}
          value={treatmentPrice}
          active={treatmentPrice !== ""}
          error={modelValidation.treatmentPrice}
          onKeyPress={Validation.handlePriceNumberKeyPress}
          onChange={setTreatmentPrice}
          readonly={readOnly}
        />
        <div className="flex justify-center">
          {submitButton}
        </div>
      </div>
    </>
  )
}
