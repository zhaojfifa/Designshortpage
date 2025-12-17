import React from 'react';
import { AccountType } from '../types';

const accountConfig = {
  beauty: {
    color: '#F472B6',
    label: '美妆号',
  },
  sports: {
    color: '#22C55E',
    label: '运动号',
  },
  tech: {
    color: '#60A5FA',
    label: '科技号',
  },
};

interface AccountChipProps {
  account: AccountType;
  selected?: boolean;
}

export function AccountChip({ account, selected = false }: AccountChipProps) {
  const config = accountConfig[account];
  
  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${
        selected ? 'ring-2 ring-offset-2' : ''
      }`}
      style={{ 
        backgroundColor: selected ? `${config.color}20` : 'transparent',
        ...(selected && { ringColor: config.color })
      }}
    >
      <div 
        className="w-2 h-2 rounded-full" 
        style={{ backgroundColor: config.color }}
      />
      <span className="text-sm">{config.label}</span>
    </div>
  );
}
