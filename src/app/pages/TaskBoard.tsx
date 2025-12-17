import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { TaskCard } from '../components/TaskCard';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockTasks } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { AccountType, TaskStatus } from '../types';

export function TaskBoard() {
  const navigate = useNavigate();
  const [accountFilter, setAccountFilter] = useState<'all' | AccountType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');
  
  const filteredTasks = mockTasks.filter(task => {
    if (accountFilter !== 'all' && task.account !== accountFilter) return false;
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    return true;
  });
  
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 h-14">
          <h1>Shortvideo</h1>
          <button 
            onClick={() => navigate('/admin')}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex gap-3 overflow-x-auto">
          <Select value={accountFilter} onValueChange={(value) => setAccountFilter(value as any)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="账号" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部账号</SelectItem>
              <SelectItem value="beauty">美妆号</SelectItem>
              <SelectItem value="sports">运动号</SelectItem>
              <SelectItem value="tech">科技号</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="processing">处理中</SelectItem>
              <SelectItem value="ready">就绪</SelectItem>
              <SelectItem value="error">异常</SelectItem>
              <SelectItem value="published">已发布</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Task List */}
      <div className="p-4 space-y-3 pb-20">
        {filteredTasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task}
            onViewDetails={(id) => navigate(`/workbench/${id}`)}
            onAction={(id) => navigate(`/workbench/${id}`)}
          />
        ))}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            暂无任务
          </div>
        )}
      </div>
      
      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/new-task')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
