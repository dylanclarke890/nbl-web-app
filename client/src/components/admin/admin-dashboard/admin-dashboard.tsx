import React, { useCallback, useContext, useEffect, useState } from "react";

import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import { ToastContext } from "../../../contexts/toast-context/toast-context";

import IDashboardData from "../../../interfaces/IDashboardData";
import { getDashboard } from "../../../services/dashboardService";

import './admin-dashboard.css';

export default function AdminDashboard() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [dashboardData, setDashboardData] = useState<IDashboardData>()

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while loading dashboard."), []);
  useEffect(() => {
    if (loading) return;
    const getData = async () => {
      isLoading();
      const res = await getDashboard();
      setDashboardData(res);
      loaded();
    }
    getData().catch(() => { onError(); loaded(); });;
  }, []);
  /* eslint-enable */

  return (
    <>
      <section className="admin-dashboard">
        <div className="flex justify-between">
          <section className="summary-box">
            <h2 className="text-center">Appointments</h2>
            <p>Appointments Today : <span className="data-figure">{dashboardData?.today.appointments}</span></p>
            <p>Appointments This Week : <span className="data-figure">{dashboardData?.thisWeek.appointments}</span></p>
            <p>Appointments This Month : <span className="data-figure">{dashboardData?.thisMonth.appointments}</span></p>
            <p>Appointments YTD : <span className="data-figure">{dashboardData?.yearToDate.appointments}</span></p>
            <p>Appointments All Time : <span className="data-figure">{dashboardData?.allTime.appointments}</span></p>
          </section>
          <section className="summary-box">
            <h2 className="text-center">Earnings</h2>
            <p>Earnings Today : <span className="data-figure">&#163; {dashboardData?.today.earnings}</span></p>
            <p>Earnings This Week : <span className="data-figure">&#163; {dashboardData?.thisWeek.earnings}</span></p>
            <p>Earnings This Month : <span className="data-figure">&#163; {dashboardData?.thisMonth.earnings}</span></p>
            <p>Earnings YTD : <span className="data-figure">&#163; {dashboardData?.yearToDate.earnings}</span></p>
            <p>Earnings All Time : <span className="data-figure">&#163; {dashboardData?.allTime.earnings}</span></p>
          </section>
        </div>
      </section>
    </>
  )
}