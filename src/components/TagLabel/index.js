'use client';

export const TagLabel = ({ label, className }) => {
  return (
    <span 
      className={className}
      style={{
        borderRadius: '4px',
        padding: '2px 8px',
        fontSize: '12px',
        display: 'inline-block'
    }}>
      {label}
    </span>
  );
}