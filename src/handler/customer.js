
export const getInitials = (name) => {
  const words = name?.split(' ');

  const initials = words?.map(word => word[0].toUpperCase()).join('');

  return initials;
};

export const formatCurrency = (value) =>{
  if (value == null) return '-';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export const calculateSummary = (customers) => {

  const totalRevenue = customers?.reduce((sum, c) => sum + c?.summary?.total_spent, 0);
  const averageSpend = totalRevenue / customers?.length;
  const activeCustomers = customers?.filter(c => c?.status === 1).length;

  return {
    total_revenue: totalRevenue,
    average_spend: averageSpend,
    active_customers: activeCustomers
  };
}