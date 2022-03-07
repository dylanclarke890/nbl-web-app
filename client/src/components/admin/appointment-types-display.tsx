import React, { useEffect, useState } from 'react';
import AppointmentType from '../../models/appointment-type';
import { getAll } from '../../services/appointmentTypeService';


export default function AppointmentTypesDisplay(): JSX.Element {
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAll(setAppointmentTypes, console.log);
    }
    fetchData();
  }, []);

  let displayTypes: JSX.Element[] = [];
  appointmentTypes.forEach(el => {
    displayTypes.push(<p key={el._id} className='text-center'>{el.display()}</p>)
  })

  return (
    <>
      <h3 className='text-center'>Appointment Types</h3>
      {displayTypes}
    </>
  );
}