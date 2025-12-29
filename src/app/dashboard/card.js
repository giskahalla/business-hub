
'use client';

import { Grid, Stack }from '@mui/material';
import { Card } from '@mui/joy';    
import { DollarSign, Folder, User2, TrendingUp } from 'lucide-react';
import dayjs from 'dayjs';

import { formatCurrency } from '@/handler';


const DashboardCard = ({ projects, customers }) => {

const currentMonth = dayjs().format('MMM')

 const cards = [ 
    {
      id: 1,
      title: 'Total Revenue',
      total: formatCurrency(projects?.total_revenue),
      description: 'from last month',
      icon:( <DollarSign className="size-5" />)
    },
    {
      id: 2,
      title: 'Active Projects',
      total: projects?.monthlySummary?.find(item => item.month === currentMonth)?.active,
      description: 'from last month',
      icon:( <Folder className="size-5" />)
    },
    {
      id: 3,
      title: 'Total Customers',
      total: customers?.total_customers,
      description: 'from last month',
      icon:( <User2 className="size-5" />)
    },
    {
      id: 4,
      title: 'Completion Rate',
      total: projects?.total_revenue,
      description: 'from last month',
      icon:( <TrendingUp className="size-5" />)
    },
  ];

  return (
    <Grid container spacing={2} className='mb-4'>
        {cards.map((card, i) => (
        <Grid key={i} size={3}>
            <Card orientation="horizontal" variant='outlined' key={i} style={{ boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.1)' }} sx={{ backgroundColor: 'white'}} invertedColors>
                <Stack style={{ width: '100%'}}>
                    <div className='flex justify-between mb-4'>
                    <p className="text-base text-muted-foreground">{card.title}</p>
                    {card.icon}
                    </div>
                    <p className="text-xl font-bold text-foreground">{card.total}</p>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                </Stack>
            </Card>
        </Grid>
        ))}
    </Grid>
  );
}

export default DashboardCard
