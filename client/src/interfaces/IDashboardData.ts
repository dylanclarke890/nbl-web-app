export default interface IDashboardData {
  allTime: { appointments: number; earnings: number };
  yearToDate: { appointments: number; earnings: number };
  thisMonth: { appointments: number; earnings: number };
  thisWeek: { appointments: number; earnings: number };
  today: { appointments: number; earnings: number };
}
