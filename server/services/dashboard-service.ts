import { endOfWeek, startOfWeek } from "date-fns";

import IAppointment from "../interfaces/IAppointment";
import IDashboardData from "../interfaces/IDashboardData";
import { getAllAppointments } from "./appointment-service";

export async function getDashboard(req: any) {
  const allAppointments: IAppointment[] = await getAllAppointments();

  const today = getDayWithoutTimestamp(new Date());
  const weekStart = startOfWeek(today);
  const weekEnd = endOfWeek(today);

  const appointmentsYTD = allAppointments.filter(
    (a) => a.date.getFullYear() === today.getFullYear()
  );
  const appointmentsMonth = appointmentsYTD.filter(
    (a) => a.date.getMonth() === today.getMonth()
  );
  const appointmentsWeek = appointmentsMonth.filter(
    (a) => weekStart <= a.date && a.date >= weekEnd
  );
  const appointmentsToday = appointmentsWeek.filter((a) => a.date === today);

  const dashboardData: IDashboardData = {
    allTime: {
      appointments: allAppointments.length,
      earnings: calculateEarnings(allAppointments),
    },
    yearToDate: {
      appointments: appointmentsYTD.length,
      earnings: calculateEarnings(appointmentsYTD),
    },
    thisMonth: {
      appointments: appointmentsMonth.length,
      earnings: calculateEarnings(appointmentsMonth),
    },
    thisWeek: {
      appointments: appointmentsWeek.length,
      earnings: calculateEarnings(appointmentsWeek),
    },
    today: {
      appointments: appointmentsToday.length,
      earnings: calculateEarnings(appointmentsToday),
    },
  };

  return dashboardData;
}

function calculateEarnings(appointments: IAppointment[]) {
  let total = 0;
  for (let i = 0; i < appointments.length; i++) {
    const curr = appointments[i];
    total += curr.treatment.price;
  }
  
  return parseFloat(total.toPrecision(4));
}

const getDayWithoutTimestamp = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
