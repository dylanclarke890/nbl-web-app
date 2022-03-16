import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllSchedules} from '../../../services/scheduleService';
import Schedule from '../../../models/schedule';

import Header from '../../shared/header/header';
import '../styles/admin.css'


export default function ListSchedules(): JSX.Element {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAllSchedules(setSchedules, console.error);
    }
    fetchData();
  }, []);

  const URLPREFIX = '/admin/schedules/'

  let displayTypes: JSX.Element[] = [];
  schedules.forEach(el => {
    displayTypes.push(<tr key={el._id}>
      <td>{el.name}</td>
      <td>{el.starts.toDateString()}</td>
      <td>{el.ends != null ? el.ends.toDateString() : "N/A"}</td>
      <td>{el.availability.length}</td>
      <td>
        <Link className="custom-link" to={`${URLPREFIX}view/${el._id}`}>View</Link>
        <Link className="custom-link" to={`${URLPREFIX}edit/${el._id}`}>Edit</Link>
        <Link className="custom-link" to={`${URLPREFIX}delete/${el._id}`}>Delete</Link>
      </td>
    </tr>)
  })

  return (
    <>
      <Header headerTitle='Schedules' />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Active From</th>
              <th>Expires</th>
              <th>Days Specified</th>
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