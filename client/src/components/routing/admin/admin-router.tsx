import React from 'react';
import { Route } from 'react-router-dom';
import DeleteAppointmentType from '../../admin/delete-appointment-type';
import EditAppointmentType from '../../admin/edit-appointment-type';
import ListAppointmentTypes from '../../admin/list-appointment-types';
import NewAppointmentType from '../../admin/new-appointment-type';
import ViewAppointmentType from '../../admin/view-appointment-type';

const adminRouter = [
  <Route path="admin/appointment-types" element={<ListAppointmentTypes />}>
    <Route path="new" element={<NewAppointmentType />} />
    <Route path="edit:id" element={<EditAppointmentType />} />
    <Route path="delete:id" element={<DeleteAppointmentType />} />
    <Route path="view:id" element={<ViewAppointmentType />} />
  </Route>,
];

export default adminRouter;