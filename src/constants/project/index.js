
export const PROJECT_STATUS = {
  1: { 
    label: 'Created', 
    value: 1, 
    style: { backgroundColor: '#f3f4f6', color: '#1f2937' }
  },
  2: { 
    label: 'In Progress', 
    value: 2, 
    style: { backgroundColor: '#dbeafe', color: '#1e40af' } 
  },
  3: { 
    label: 'Paused', 
    value: 3, 
    style: { backgroundColor: '#fee6c3ff', color: '#be632fff' } 
  },
  4: { 
    label: 'Completed', 
    value: 4, 
    style: { backgroundColor: '#dcfce7', color: '#166534' }
  },
  0: { 
    label: 'Cancelled', 
    value: 0, 
    style: { backgroundColor: '#fec3c3ff', color: '#78350f' } 
  },
};


export const PROJECT_PRIORITY = {
  1: { 
    label: 'Low', 
    value: 1, 
    style: { backgroundColor: '#f3f4f6', color: '#374151' } 
  },
  2: { 
    label: 'Medium', 
    value: 2, 
    style: { backgroundColor: '#ffedd5', color: '#9a3412' } 
  },
  3: { 
    label: 'High', 
    value: 3, 
    style: { backgroundColor: '#fee2e2', color: '#991b1b' } 
  },
};

export const STATUS_UPDATE_PROJECT_CONTENT = (row, status) => {
  const statusContent = {
    paused: {
      title: 'Mark as paused',
      desc: `Are you sure you want to mark ${row.name} as paused? This change will update the project status to paused.`,
      type: 'project',
      data: {...row, status: 0}
    },
    cancelled: {
      title: 'Mark as cancelled',
      desc: `Are you sure you want to mark ${row.name} as cancelled? This change will update the project status to cancelled.`,
      type: 'project',
      data: {...row, status: 3}
    },
  };

  return statusContent[status]; 
}