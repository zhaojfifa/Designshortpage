import React from 'react';
import { Task, AccountType } from '../types';
import { StatusBadge } from './StatusBadge';
import { AccountChip } from './AccountChip';
import { MoreVertical } from 'lucide-react';
import { Button } from './ui/button';

const accountColors = {
  beauty: '#F472B6',
  sports: '#22C55E',
  tech: '#60A5FA',
};

const videoTypeLabels = {
  'quick-makeup': '快速妆教',
  'workout': '快速训练',
  'product-review': '产品测评',
  'scene-makeup': '场景化妆',
  'immersive-makeup': '沉浸式化妆',
};

const templateLabels = {
  'fast-pace': '快节奏模板',
  'standard': '标准步骤',
  'voice-only': '原声为主',
  'high-intensity': '高燃训练',
  'instructional': '教学分解',
};

interface TaskCardProps {
  task: Task;
  onViewDetails?: (id: string) => void;
  onAction?: (id: string) => void;
}

export function TaskCard({ task, onViewDetails, onAction }: TaskCardProps) {
  const accountColor = accountColors[task.account];
  
  const getActionLabel = () => {
    switch (task.status) {
      case 'ready':
        return '开始剪辑';
      case 'processing':
        return '查看进度';
      case 'error':
        return '重试';
      case 'published':
        return '查看数据';
      default:
        return '查看';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 relative">
      {/* Account color bar */}
      <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: accountColor }} />
      
      <div className="p-4 pl-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="flex-1 pr-4 truncate">{task.title}</h3>
          <StatusBadge status={task.status} />
        </div>
        
        {/* Meta info */}
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <AccountChip account={task.account} />
          <span>·</span>
          <span>{videoTypeLabels[task.videoType]}</span>
          <span>·</span>
          <span>{templateLabels[task.template]}</span>
        </div>
        
        {/* Details */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <span>{task.platform}</span>
          <span>·</span>
          <span>{task.duration}</span>
          <span>·</span>
          <span>{task.createdAt}</span>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onViewDetails?.(task.id)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            查看详情
          </button>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onAction?.(task.id)}
              variant={task.status === 'ready' ? 'default' : 'outline'}
              size="sm"
            >
              {getActionLabel()}
            </Button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
