import React from 'react';
import { Route } from 'react-router-dom';

import DeleteAppointmentType from '../../admin/appointment-type/delete-appointment-type';
import EditAppointmentType from '../../admin/appointment-type/edit-appointment-type';
import ListAppointmentTypes from '../../admin/appointment-type/list-appointment-types';
import NewAppointmentType from '../../admin/appointment-type/new-appointment-type';
import ViewAppointmentType from '../../admin/appointment-type/view-appointment-type';

import ListAppointments from '../../admin/appointment/list-appointment';


const adminRouter = [
  <Route key={0} path="admin/appointment-types" element={<ListAppointmentTypes />} />,
  <Route key={1} path="admin/appointment-types/new" element={<NewAppointmentType />} />,
  <Route key={2} path="admin/appointment-types/edit/:id" element={<EditAppointmentType />} />,
  <Route key={3} path="admin/appointment-types/delete/:id" element={<DeleteAppointmentType />} />,
  <Route key={4} path="admin/appointment-types/view/:id" element={<ViewAppointmentType />} />,
  <Route key={5} path="admin/appointments" element={<ListAppointments />} />,
];

export default adminRouter;