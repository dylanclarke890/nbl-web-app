import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllSchedules } from '../../../services/scheduleService';
import Schedule from '../../../models/schedule';

import Header from '../../shared/header/header';
import '../styles/admin.css'
import { differenceInCalendarDays } from 'date-fns';
import { ToastContext } from '../../../contexts/toast-context/toast-context';
import { LoadingContext } from '../../../contexts/loading-context/loading-context';
import TitleAndDesc from '../../shared/title-and-desc/title-and-desc';


export default function ListSchedules(): JSX.Element {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [schedules, setSchedules] = useState<Schedule[]>([]);

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while loading schedules."), []);
  useEffect(() => {
    if (loading) return;
    const fetchData = async () => {
      isLoading();
      await getAllSchedules(setSchedules);
      loaded();
    }
    fetchData().catch(() => { onError(); loaded(); });;
  }, []);
  /* eslint-enable */
  const URLPREFIX = '/admin/schedules/'

  let displayTypes: JSX.Element[] = [];
  schedules.forEach(el => {
    const diffInDaysVal = (ends: Date | undefined) => {
      const diff = differenceInCalendarDays(el.ends!, el.starts)
      return ends !== undefined ? diff > 0 ? diff : "Expired" : "Indefinite";
    };
    displayTypes.push(<tr key={el._id}>
      <td>{el.name}</td>
      <td>{el.starts.toDateString()}</td>
      <td>{el.ends != null ? el.ends.toDateString() : "N/A"}</td>
      <td>{diffInDaysVal(el.ends)}</td>
      <td>
        <Link className="custom-link" to={`${URLPREFIX}view/${el._id}`}>View</Link>
        <Link className="custom-link" to={`${URLPREFIX}edit/${el._id}`}>Edit</Link>
        <Link className="custom-link" to={`${URLPREFIX}delete/${el._id}`}>Delete</Link>
      </td>
    </tr>)
  })

  return (
    <>
      <TitleAndDesc title="View All Schedules"  />
      <Header headerTitle='Schedules' />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Active From</th>
              <th>Expires</th>
              <th>Active Days Left</th>
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