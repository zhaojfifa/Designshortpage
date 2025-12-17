import React from 'react';
import { TaskStatus } from '../types';

const statusConfig = {
  processing: {
    color: '#F59E0B',
    label: '处理中',
  },
  ready: {
    color: '#10B981',
    label: '就绪',
  },
  published: {
    color: '#3B82F6',
    label: '已发布',
  },
  error: {
    color: '#EF4444',
    label: '异常',
  },
};

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-gray-100">
      <div 
        className="w-2 h-2 rounded-full" 
        style={{ backgroundColor: config.color }}
      />
      <span className="text-xs text-gray-700">{config.label}</span>
    </div>
  );
}
