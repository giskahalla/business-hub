
export const getInitials = (name) => {
  const words = name?.split(' ');

  const initials = words?.map(word => word[0].toUpperCase()).join('');

  return initials;
};

export const formatCurrency = (value) =>{
  if (value == null) return 0;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export const calculateSummary = (source) => {

  const totalSpent = source?.reduce((sum, c) => sum + c?.summary?.total_spent, 0);
  const activeCustomers = source?.filter(c => c?.status === 1).length;
  const departments = [...new Set(source.map(item => item.department))]?.length

  return {
    total_revenue: totalSpent || 0,
    active_customers: activeCustomers || 0,
    total_departments: departments || 0
  };
}