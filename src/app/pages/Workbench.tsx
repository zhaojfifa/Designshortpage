import React from 'react';
import { ArrowLeft, Download, Copy } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { mockTasks } from '../data/mockData';
import { toast } from 'sonner';

const accountColors = {
  beauty: '#F472B6',
  sports: '#22C55E',
  tech: '#60A5FA',
};

const accountWarnings = {
  beauty: '当前为【美妆号 – MM】任务，请确认使用该账号专用设备发布',
  sports: '当前为【运动号】任务，请确认使用该账号专用设备发布',
  tech: '当前为【科技号】任务，请确认使用该账号专用设备发布',
};

export function Workbench() {
  const navigate = useNavigate();
  const { id } = useParams();
  const task = mockTasks.find(t => t.id === id);
  
  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">任务不存在</p>
          <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    );
  }
  
  const accountColor = accountColors[task.account];
  const warningText = accountWarnings[task.account];
  
  const handleCopyText = () => {
    const text = `${task.title}\n\n这是一个示例文案内容，包含标题、口播稿和相关的 hashtag 标签。\n\n#美妆 #化妆教程 #日常妆容`;
    navigator.clipboard.writeText(text);
    toast.success('文案已复制');
  };
  
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1>剪辑工作台</h1>
        </div>
      </header>
      
      {/* Warning Banner */}
      <div 
        className="px-4 py-4 text-white"
        style={{ backgroundColor: accountColor }}
      >
        <div className="flex gap-2">
          <span className="text-lg">⚠️</span>
          <p className="text-sm leading-relaxed">{warningText}</p>
        </div>
      </div>
      
      <div className="p-4 space-y-4 pb-24">
        {/* Video Source Card */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <h3>视频源</h3>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-sm">{task.duration}</p>
            </div>
          </div>
          <Button className="w-full" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            下载视频
          </Button>
        </div>
        
        {/* Audio Card */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <h3>缅甸语配音</h3>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                ▶
              </div>
              <div className="flex-1">
                <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3"></div>
                </div>
              </div>
              <span className="text-sm text-gray-600">00:58 / {task.duration}</span>
            </div>
          </div>
          <Button className="w-full" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            下载音频
          </Button>
        </div>
        
        {/* Copy Card */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <h3>推荐文案</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p>{task.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              这是一个示例文案内容，包含视频的核心卖点和关键信息。适用于各个平台的发布需求。
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">#美妆</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">#化妆教程</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">#日常妆容</span>
            </div>
          </div>
          <Button className="w-full" onClick={handleCopyText}>
            <Copy className="w-4 h-4 mr-2" />
            复制全部文案
          </Button>
        </div>
      </div>
      
      {/* Fixed Footer Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button 
          className="w-full" 
          size="lg"
          onClick={() => toast.info('此功能将在后续版本开放')}
        >
          剪辑完成，回填发布链接
        </Button>
      </div>
    </div>
  );
}
