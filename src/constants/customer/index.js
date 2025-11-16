


export const CUSTOMER_STATUS = {
  1: { 
    label: 'Active', 
    value: 1, 
    style: { backgroundColor: '#dcfce7', color: '#166534' } 
  },
  2: { 
    label: 'Inactive', 
    value: 2, 
    style: { backgroundColor: '#f3f4f6', color: '#1f2937' }
  },
  // 0: { 
  //   label: 'Prospect', 
  //   value: 0, 
  //   style: { backgroundColor: '#dbeafe', color: '#1e40af' } 
  // },
};

export const STATUS_UPDATE_CUSTOMER_CONTENT = (row, status) => {
  const statusContent = {
    active: {
      title: 'Mark as active',
      desc: `Are you sure you want to mark ${row.name} as active? This change will update their status to active.`,
      type: 'customer',
      data: {...row, status: 1}
    },
    inactive: {
      title: 'Mark as inactive',
      desc: `Are you sure you want to mark ${row.name} as inactive? This change will remove them from the active list.`,
      type: 'customer',
      data: {...row, status: 2}
    },
  };

  return statusContent[status]; 
}