import React, { useCallback, useContext, useEffect } from "react";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { getDashboard } from "../../../services/dashboardService";

import './admin-dashboard.css';


export default function AdminDashboard() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while loading dashboard."), []);
  useEffect(() => {
    if (loading) return;
    const getData = async () => {
      isLoading();
      const res = await getDashboard();
      if (res) alert(res);
      loaded();
    }
    getData().catch(() => { onError(); loaded(); });;
  }, []);
  /* eslint-enable */

  return (
    <>
      <div className="admin-dashboard">
        <div className="flex justify-between">
          <div className="past-appointments-summary summary-box">
            <h2 className="text-center">Past Appointments</h2>
            <p>Appointments Today: <span className="data-figure">0</span></p>
            <p>Appointments This Week: <span className="data-figure">4</span></p>
            <p>Appointments This Month: <span className="data-figure">19</span></p>
            <p>Appointments YTD: <span className="data-figure">87</span></p>
            <p>Total Past Appointments: <span className="data-figure">219</span></p>
          </div>
          <div className="past-earnings-summary summary-box">
            <h2 className="text-center">Past Earnings</h2>
            <p>Earnings Today: <span className="data-figure">&#163; 0</span></p>
            <p>Earnings This Week: <span className="data-figure">&#163; 12.32</span></p>
            <p>Earnings This Month: <span className="data-figure">&#163; 84.43</span></p>
            <p>Earnings YTD: <span className="data-figure">&#163; 983.32</span></p>
            <p>Total Past Earnings: <span className="data-figure">&#163; 12843.52</span></p>
          </div>
        </div>
      </div>
    </>
  )
}