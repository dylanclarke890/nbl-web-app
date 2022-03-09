import React from 'react';
import { Route } from 'react-router-dom';

import DeleteAppointmentType from '../../admin/delete-appointment-type';
import EditAppointmentType from '../../admin/edit-appointment-type';
import ListAppointmentTypes from '../../admin/list-appointment-types';
import NewAppointmentType from '../../admin/new-appointment-type';
import ViewAppointmentType from '../../admin/view-appointment-type';


const adminRouter = [
  <Route key={0} path="admin/appointment-types" element={<ListAppointmentTypes />} />,
  <Route key={1} path="admin/appointment-types/new" element={<NewAppointmentType />} />,
  <Route key={2} path="admin/appointment-types/edit/:id" element={<EditAppointmentType />} />,
  <Route key={3} path="admin/appointment-types/delete/:id" element={<DeleteAppointmentType />} />,
  <Route key={4} path="admin/appointment-types/view/:id" element={<ViewAppointmentType />} />,
];

export default adminRouter;