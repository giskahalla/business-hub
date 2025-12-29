
'use client';

import { Grid }from '@mui/material';
import { Card } from '@mui/joy';    
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts';


const ChartBar = ({ projects }) => {

    const chartSetting = {
        series: [
            { dataKey: 'completed', label: 'Completed' },
            { dataKey: 'active', label: 'Active'},
        ],
        height: 300,
        margin: { left: 0 },
    };


  return (
    <Card orientation="horizontal" variant='outlined' style={{ boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1)', display: 'block' }} sx={{ backgroundColor: 'white'}}>
        <h3 className="text-lg font-bold m-4">Project Monthly Summary</h3>
        <BarChart
            dataset={projects?.monthlySummary || []}
            xAxis={[{ dataKey: 'month' }]}
            {...chartSetting}
        />
    </Card>
  );
}

const ChartLine = ({ customers }) => {

    const chartSetting = {
        series: [
            { data: customers?.monthlySummary?.map(item => item.total) || [], label: 'Total Customers' },
        ],
        height: 300,
        margin: { left: 0 },
    };

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


  return (
    <Card orientation="horizontal" variant='outlined' style={{ boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1)',display: 'block' }} sx={{ backgroundColor: 'white'}}>
        <h3 className="text-lg font-bold m-4">Customer Monthly Summary</h3>
        <LineChart
            xAxis={[{ scaleType: 'point', data: months }]}
            {...chartSetting}
            />
    </Card>
  );
}


const ChartCard = ({ customers, projects }) => { 

  return (
    <Grid container spacing={2} className='mb-4'>
      <ChartBar projects={projects} />
      <ChartLine customers={customers} />
    </Grid>
  );
}

export default ChartCard