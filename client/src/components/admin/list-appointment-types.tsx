import React, { useEffect, useState } from 'react';
import AppointmentType from '../../models/appointment-type';
import { getAllAppointmentTypes } from '../../services/appointmentTypeService';
import Header from '../shared/header/header';

import './list-appointment-types.css'

export default function ListAppointmentTypes(): JSX.Element {
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllAppointmentTypes(setAppointmentTypes, console.error);
    }
    fetchData();
  }, []);

  const newType = () => {
    window.location.href = "/admin/appointment-types/new";
  }

  const editType = (id: string) => {
    window.location.href = `/admin/appointment-types/edit/${id}`;
  }

  const deleteType = (id: string) => {
    window.location.href = `/admin/appointment-types/delete/${id}`;
  }

  let displayTypes: JSX.Element[] = [];
  appointmentTypes.forEach(el => {
    displayTypes.push(<tr key={el._id}>
      <td>{el.appointmentType}</td>
      <td>{el.duration}</td>
      <td>{el.price}</td>
      <td>{String(el.isActive)}</td>
      <td>
        <button className='btn' onClick={() => editType(el._id)}>Edit</button>
        <button className='btn' onClick={() => deleteType(el._id)}>Delete</button>
      </td>
    </tr>)
  })

  return (
    <>
      <Header headerTitle='Appointment Types' />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration (mins)</th>
              <th>Price (GBP)</th>
              <th>Visible</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayTypes}
          </tbody>
        </table>
      </div>
      <div className='new-btn'>
        <button className='btn' onClick={() => newType()}>New</button>
      </div>
    </>
  );
}