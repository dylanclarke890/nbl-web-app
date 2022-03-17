import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllAppointments } from '../../../services/appointmentService';
import Appointment from '../../../models/appointment';

import Header from '../../shared/header/header';

import '../styles/admin.css'

export default function ListAppointments(): JSX.Element {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllAppointments(setAppointments, console.error);
    }
    fetchData();
  }, []);

  const URLPREFIX = '/admin/appointments/'

  let displayTypes: JSX.Element[] = [];
  appointments.forEach(el => {
    displayTypes.push(<tr key={el.id}>
      <td>{el.date?.toDateString()}</td>
      <td>{el.appointmentTime(' - ')}</td>
      <td>{el.person?.name}</td>
      <td>{el.appointmentType}</td>
      <td>
        <Link className="custom-link" to={`${URLPREFIX}view/${el.id}`}>View</Link>
        <Link className="custom-link" to={`${URLPREFIX}edit/${el.id}`}>Edit</Link>
        <Link className="custom-link" to={`${URLPREFIX}delete/${el.id}`}>Delete</Link>
      </td>
    </tr>)
  })

  return (
    <>
      <Header headerTitle='Appointments' />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Treatment Type</th>
            </tr>
          </thead>
          <tbody>
            {displayTypes}
          </tbody>
        </table>
      </div>
      <div className='new-btn'>
        <Link className="custom-link" to={`${URLPREFIX}new`}>New</Link>
      </div>
    </>
  );
}