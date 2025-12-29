'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import DashboardCard from './card';
import ChartCard from './chart';

import { project, customer } from '@/services/redux/actions';

const Dashboard = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.summary);
  const customers = useSelector((state) => state.customer.summary);

  useEffect(() => {
    dispatch(project.get_project_summmary_request(2025));
    dispatch(customer.get_customer_summary_request(2025));
  }, [dispatch]);

  return (
    <div>
        <div className="border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <span >Project and Client Management</span>
          </div>
        </div>
        <div className="px-6 py-4 overflow-auto"> 
          <DashboardCard projects={projects} customers={customers} />
          <ChartCard projects={projects} customers={customers} />
        </div>
    </div>
  );
}

export default Dashboard