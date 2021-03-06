import IDashboardData from "../interfaces/IDashboardData";
import { getDashboard } from "../services/dashboard-service";

export async function dashboard(req: any, res: any) {
  let result: IDashboardData;
  try {
    result = await getDashboard(req);
  } catch {
    return res.status(500).send(`Internal error`);
  }
  return res.json(result);
}
