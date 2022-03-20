import React from 'react';
import { Route } from 'react-router-dom';

import DeleteTreatment from '../../admin/treatment/delete-treatment';
import EditTreatment from '../../admin/treatment/edit-treatment';
import ListTreatments from '../../admin/treatment/list-treatments';
import NewTreatment from '../../admin/treatment/new-treatment';
import ViewTreatment from '../../admin/treatment/view-treatment';

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
  <Route key={0} path="admin/treatments" element={<ListTreatments />} />,
  <Route key={1} path="admin/treatments/new" element={<NewTreatment />} />,
  <Route key={2} path="admin/treatments/edit/:id" element={<EditTreatment />} />,
  <Route key={3} path="admin/treatments/delete/:id" element={<DeleteTreatment />} />,
  <Route key={4} path="admin/treatments/view/:id" element={<ViewTreatment />} />,
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