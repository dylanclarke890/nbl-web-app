import React from 'react';
import { Route } from 'react-router-dom';
import AppointmentTypesDisplay from '../../admin/appointment-types-display';

const appointmentTypeRouter = [
  <Route path="/admin/appointment-types" element={<AppointmentTypesDisplay />} />,
  //<Route path="/admin/appointment-types/new" element={<AppointmentTypesDisplay />} />,
  //<Route path="/admin/appointment-types/edit" element={<AppointmentTypesDisplay />} />,
  //<Route path="/admin/appointment-types/delete" element={<AppointmentTypesDisplay />} />,
];

export default appointmentTypeRouter;