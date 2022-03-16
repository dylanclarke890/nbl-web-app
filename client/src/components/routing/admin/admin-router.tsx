import React from 'react';
import { Route } from 'react-router-dom';

import DeleteAppointmentType from '../../admin/appointment-type/delete-appointment-type';
import EditAppointmentType from '../../admin/appointment-type/edit-appointment-type';
import ListAppointmentTypes from '../../admin/appointment-type/list-appointment-types';
import NewAppointmentType from '../../admin/appointment-type/new-appointment-type';
import ViewAppointmentType from '../../admin/appointment-type/view-appointment-type';

import DeleteAppointment from '../../admin/appointment/delete-appointment';
import EditAppointment from '../../admin/appointment/edit-appointment';
import ListAppointments from '../../admin/appointment/list-appointment';
import NewAppointment from '../../admin/appointment/new-appointment';
import ViewAppointment from '../../admin/appointment/view-appointment';

import DeleteSchedule from '../../admin/schedule/delete-schedule';
import EditSchedule from '../../admin/schedule/edit-schedule';
import ListSchedules from '../../admin/schedule/list-schedules';
import NewSchedule from '../../admin/schedule/new-schedule';
import ViewSchedule from '../../admin/schedule/view-schedule';


const adminRouter = [
  <Route key={0} path="admin/appointment-types" element={<ListAppointmentTypes />} />,
  <Route key={1} path="admin/appointment-types/new" element={<NewAppointmentType />} />,
  <Route key={2} path="admin/appointment-types/edit/:id" element={<EditAppointmentType />} />,
  <Route key={3} path="admin/appointment-types/delete/:id" element={<DeleteAppointmentType />} />,
  <Route key={4} path="admin/appointment-types/view/:id" element={<ViewAppointmentType />} />,
  <Route key={5} path="admin/appointments" element={<ListAppointments />} />,
  <Route key={6} path="admin/appointments/new" element={<NewAppointment />} />,
  <Route key={7} path="admin/appointments/edit/:id" element={<EditAppointment />} />,
  <Route key={8} path="admin/appointments/delete/:id" element={<DeleteAppointment />} />,
  <Route key={9} path="admin/appointments/view/:id" element={<ViewAppointment />} />,
  <Route key={10} path="admin/schedules" element={<ListSchedules />} />,
  <Route key={11} path="admin/schedules/new" element={<NewSchedule />} />,
  <Route key={12} path="admin/schedules/edit/:id" element={<EditSchedule />} />,
  <Route key={13} path="admin/schedules/delete/:id" element={<DeleteSchedule />} />,
  <Route key={14} path="admin/schedules/view/:id" element={<ViewSchedule />} />,
];

export default adminRouter;