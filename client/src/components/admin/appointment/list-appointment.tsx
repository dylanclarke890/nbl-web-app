import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ToastContext } from '../../../contexts/toast-context/toast-context';
import { LoadingContext } from '../../../contexts/loading-context/loading-context';
import { getAllAppointments } from '../../../services/appointmentService';
import Appointment from '../../../models/appointment';
import Header from '../../shared/header/header';
import TitleAndDesc from '../../shared/title-and-desc/title-and-desc';
import PaginationTable from '../../shared/pagination-table/pagination.table';

export default function ListAppointments(): JSX.Element {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tableRows, setTableRows] = useState<JSX.Element[]>([])

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while loading appointments."), []);
  useEffect(() => {
    if (loading) return;
    const fetchData = async () => {
      isLoading();
      await getAllAppointments(setAppointments);
      loaded();
    }
    fetchData().catch(() => { onError(); loaded(); });
  }, []);
  /* eslint-enable */

  useEffect(() => {
    setTableRows(appointments.map(el =>
    (<tr key={el.id}>
      <td>{el.date?.toDateString()}</td>
      <td>{el.appointmentTime(' - ')}</td>
      <td>{el.person?.name}</td>
      <td>{el.treatment?.type}</td>
      <td>
        <Link className="custom-link" to={`${URLPREFIX}view/${el.id}`}>View</Link>
        <Link className="custom-link" to={`${URLPREFIX}edit/${el.id}`}>Edit</Link>
        <Link className="custom-link" to={`${URLPREFIX}delete/${el.id}`}>Delete</Link>
      </td>
    </tr>)
    ))
  }, [appointments])

  const tableHeader = (
    <tr>
      <th>Date</th>
      <th>Time</th>
      <th>Name</th>
      <th>Treatment Type</th>
      <th></th>
    </tr>
  )

  const URLPREFIX = '/admin/appointments/'

  return (
    <>
      <TitleAndDesc title="View All Appointments" />
      <Header headerTitle='Appointments' />
      <PaginationTable tableHeaderRow={tableHeader} tableRows={tableRows} />
      <div className='flex justify-center mt-1'>
        <Link className="custom-link" to={`${URLPREFIX}new`}>New</Link>
      </div>
    </>
  );
}