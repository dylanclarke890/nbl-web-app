import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ToastContext } from '../../../contexts/toast-context/toast-context';
import { LoadingContext } from '../../../contexts/loading-context/loading-context';
import { getAllTreatments } from '../../../services/treatmentService';
import Treatment from '../../../models/treatment';
import Header from '../../shared/header/header';
import TitleAndDesc from '../../shared/title-and-desc/title-and-desc';
import PaginationTable from '../../shared/pagination-table/pagination.table';

export default function ListTreatments(): JSX.Element {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [tableRows, setTableRows] = useState<JSX.Element[]>([]);

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while loading treatments."), []);
  useEffect(() => {
    if (loading) return;
    const fetchData = async () => {
      isLoading();
      await getAllTreatments(setTreatments, true);
      loaded();
    }
    fetchData().catch(() => { onError(); loaded(); });;
  }, []);
  /* eslint-disable */

  useEffect(() => {
    setTableRows(treatments.map(el => (
      <tr key={el._id}>
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
    ))
  }, [treatments])

  const tableHeader = (
    <tr>
      <th>Type</th>
      <th>Duration (mins)</th>
      <th>Price (GBP)</th>
      <th>Visible</th>
      <th></th>
    </tr>
  )

  const URLPREFIX = '/admin/treatments/'

  return (
    <>
      <TitleAndDesc title="View All Treatments" />
      <Header headerTitle='Treatments' />
      <PaginationTable tableHeaderRow={tableHeader} tableRows={tableRows} />
      <div className='flex justify-center mt-1'>
        <Link className="custom-link" to={`${URLPREFIX}new`}>New</Link>
      </div>
    </>
  );
}