import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllTreatments } from '../../../services/treatmentService';
import Treatment from '../../../models/treatment';

import Header from '../../shared/header/header';
import '../styles/admin.css'


export default function ListTreatments(): JSX.Element {
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllTreatments(setTreatments, console.error);
    }
    fetchData();
  }, []);

  const URLPREFIX = '/admin/treatments/'

  let displayTypes: JSX.Element[] = [];
  treatments.forEach(el => {
    displayTypes.push(<tr key={el._id}>
      <td>{el.type}</td>
      <td>{el.duration}</td>
      <td>{el.price}</td>
      <td>{el.isActive.toString()}</td>
      <td>
        <Link className="custom-link" to={`${URLPREFIX}view/${el._id}`}>View</Link>
        <Link className="custom-link" to={`${URLPREFIX}edit/${el._id}`}>Edit</Link>
        <Link className="custom-link" to={`${URLPREFIX}delete/${el._id}`}>Delete</Link>
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
        <Link className="custom-link" to={`${URLPREFIX}new`}>New</Link>
      </div>
    </>
  );
}