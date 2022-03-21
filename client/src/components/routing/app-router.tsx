import React from 'react';
import { Route, Routes } from 'react-router-dom';

import DeleteTreatment from '../admin/treatment/delete-treatment';
import EditTreatment from '../admin/treatment/edit-treatment';
import ListTreatments from '../admin/treatment/list-treatments';
import NewTreatment from '../admin/treatment/new-treatment';
import ViewTreatment from '../admin/treatment/view-treatment';

import DeleteAppointment from '../admin/appointment/delete-appointment';
import EditAppointment from '../admin/appointment/edit-appointment';
import ListAppointments from '../admin/appointment/list-appointment';
import NewAppointment from '../admin/appointment/new-appointment';
import ViewAppointment from '../admin/appointment/view-appointment';

import DeleteSchedule from '../admin/schedule/delete-schedule';
import EditSchedule from '../admin/schedule/edit-schedule';
import ListSchedules from '../admin/schedule/list-schedules';
import NewSchedule from '../admin/schedule/new-schedule';
import ViewSchedule from '../admin/schedule/view-schedule';
import Booking from "../booking/booking";
import BookingOptions from '../booking/booking-options/booking-options';
import CancelBooking from '../booking/cancel-appointment/cancel-booking';
import Contact from "../contact/contact";
import Gallery from "../gallery/gallery";
import Home from "../home/home";
import Treatments from "../treatments/treatments";

import NotFound from '../shared/error/not-found';
import MainLayout from '../layouts/main-layout/main-layout';
import AdminLayout from '../layouts/admin-layout/admin-layout';

export default function AppRouter() {
  const customerRoutes: [string, JSX.Element][] =
    [["/", <Home />],
    ["/booking-options", <BookingOptions />],
    ["/booking-options/make-a-booking/:treatmentId", <Booking />],
    ["/cancel-booking", <CancelBooking />],
    ["/treatments", <Treatments />],
    ["/gallery", <Gallery />],
    ["/contact", <Contact />],
    ];

  const adminRoutes: [string, JSX.Element][] =
    [["/appointments", <ListAppointments />],
    ["/appointments/new", <NewAppointment />],
    ["/appointments/edit/:id", <EditAppointment />],
    ["/appointments/delete/:id", <DeleteAppointment />],
    ["/appointments/view/:id", <ViewAppointment />],
    ["/schedules", <ListSchedules />],
    ["/schedules/new", <NewSchedule />],
    ["/schedules/edit/:id", <EditSchedule />],
    ["/schedules/delete/:id", <DeleteSchedule />],
    ["/schedules/view/:id", <ViewSchedule />],
    ["/treatments", <ListTreatments />],
    ["/treatments/new", <NewTreatment />],
    ["/treatments/edit/:id", <EditTreatment />],
    ["/treatments/delete/:id", <DeleteTreatment />],
    ["/treatments/view/:id", <ViewTreatment />],
    ];
  return (
    <Routes>
      {customerRoutes.map(pr => (
        <Route path={pr[0]} element={<MainLayout>{pr[1]}</MainLayout>} />
      ))}
      {adminRoutes.map(pr => (
        <Route path={`admin${pr[0]}`} element={<AdminLayout>{pr[1]}</AdminLayout>} />
      ))}
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  )
}