import ITitleAndDescRouteMapping from "../interfaces/ITitleAndDescRouteMapping";

export const pageTitlesAndDescriptions: ITitleAndDescRouteMapping = {
  "/": {
    title: "Nails, Brows and Lashes by Tanya",
    description: "High quality treatments available at low prices. Book now!",
  },
  "/booking-options": {
    title: "Select a treatment",
    description: "Book your treatment today!",
  },
  "/booking-options/make-a-booking/:treatmentId": {
    title: "Make a booking",
    description: "Book your treatment today!",
  },
  "/cancel-booking": {
    title: "Cancel a booking",
    description: "Cancel an existing appointment.",
  },
  "/treatments": {
    title: "Treatments",
    description: "Check out the services on offer!",
  },
  "/gallery": {
    title: "Gallery",
    description: "Check out my work!",
  },
  "/contact": {
    title: "Contact us",
    description: "Got a question? Get in touch!",
  },
  "/admin": {
    title: "Admin Dashboard",
    description: "",
  },
  "/admin/register": {
    title: "Register",
    description: "Sign up an account.",
  },
  "/admin/login": {
    title: "Login",
    description: "Sign into your account.",
  },
  "/admin/appointments": {
    title: "View All Appointments",
    description: "",
  },
  "/admin/appointments/new": {
    title: "New Appointment",
    description: "",
  },
  "/admin/appointments/edit/:id": {
    title: "Edit Appointment",
    description: "",
  },
  "/admin/appointments/delete/:id": {
    title: "Delete Appointment",
    description: "",
  },
  "/admin/appointments/view/:id": {
    title: "View Appointment",
    description: "",
  },
  "/admin/schedules": {
    title: "View All Schedules",
    description: "",
  },
  "/admin/schedules/new": {
    title: "New Schedule",
    description: "",
  },
  "/admin/schedules/edit/:id": {
    title: "Edit Schedule",
    description: "",
  },
  "/admin/schedules/delete/:id": {
    title: "Delete Schedule",
    description: "",
  },
  "/admin/schedules/view/:id": {
    title: "View Schedule",
    description: "",
  },
  "/admin/treatments": {
    title: "View All Treatments",
    description: "",
  },
  "/admin/treatments/new": {
    title: "New Treatment",
    description: "",
  },
  "/admin/treatments/edit/:id": {
    title: "Edit Treatment",
    description: "",
  },
  "/admin/treatments/delete/:id": {
    title: "Delete Treatment",
    description: "",
  },
  "/admin/treatments/view/:id": {
    title: "View Treatment",
    description: "",
  },
};
