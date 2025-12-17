import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { AccountType, VideoType, TemplateType } from '../types';
import { toast } from 'sonner';

const accounts = [
  { id: 'beauty', name: '美妆号 – MM', desc: 'TikTok MM / Douyin CN', color: '#F472B6' },
  { id: 'sports', name: '运动号', desc: 'TikTok Fitness', color: '#22C55E' },
  { id: 'tech', name: '科技号', desc: 'YouTube / XHS', color: '#60A5FA' },
];

const videoTypes = [
  { id: 'quick-makeup', name: '快速妆教', available: true },
  { id: 'workout', name: '运动训练', available: true, beta: true },
  { id: 'product-review', name: '产品测评', available: false },
  { id: 'scene-makeup', name: '场景化妆', available: false },
  { id: 'immersive-makeup', name: '沉浸式化妆', available: false },
];

const templates: Record<string, Array<{ id: string; name: string; icon: string }>> = {
  beauty: [
    { id: 'fast-pace', name: '快节奏教程', icon: '⚡' },
    { id: 'standard', name: '标准步骤', icon: '📖' },
    { id: 'voice-only', name: '原声为主', icon: '📦' },
  ],
  sports: [
    { id: 'high-intensity', name: '高燃训练', icon: '🔥' },
    { id: 'instructional', name: '教学分解', icon: '📚' },
    { id: 'standard', name: '标准模板', icon: '📖' },
  ],
};

export function NewTask() {
  const navigate = useNavigate();
  const [sourceUrl, setSourceUrl] = useState('');
  const [account, setAccount] = useState<AccountType | null>(null);
  const [videoType, setVideoType] = useState<VideoType | null>(null);
  const [template, setTemplate] = useState<TemplateType | null>(null);
  const [notes, setNotes] = useState('');
  const [platform, setPlatform] = useState('');
  
  const handleSubmit = () => {
    if (!sourceUrl || !account || !videoType || !template) {
      toast.error('请填写所有必填项');
      return;
    }
    
    toast.success('任务创建成功！');
    navigate('/');
  };
  
  const handleUrlChange = (url: string) => {
    setSourceUrl(url);
    // Simple platform detection
    if (url.includes('douyin')) setPlatform('Douyin');
    else if (url.includes('tiktok')) setPlatform('TikTok');
    else if (url.includes('xiaohongshu') || url.includes('xhs')) setPlatform('XHS');
    else if (url.includes('facebook')) setPlatform('Facebook');
  };
  
  const availableTemplates = account ? (templates[account] || templates.beauty) : [];
  
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1>新建任务</h1>
        </div>
      </header>
      
      <div className="p-4 max-w-2xl mx-auto space-y-6 pb-24">
        {/* Source URL */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <Label htmlFor="source-url">源视频链接</Label>
          <Input
            id="source-url"
            placeholder="粘贴 Douyin / 小红书 / TikTok / Facebook 链接..."
            value={sourceUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
          />
          {platform && (
            <p className="text-sm text-gray-600">已识别平台：{platform}</p>
          )}
        </div>
        
        {/* Account Selection */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <Label>目标账号</Label>
          <div className="grid gap-3">
            {accounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setAccount(acc.id as AccountType)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  account === acc.id
                    ? 'border-current shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  backgroundColor: account === acc.id ? `${acc.color}10` : 'white',
                  borderColor: account === acc.id ? acc.color : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: acc.color }} />
                  <span>{acc.name}</span>
                </div>
                <p className="text-sm text-gray-600">{acc.desc}</p>
              </button>
            ))}
          </div>
        </div>
        
        {/* Video Type */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <Label>视频类型</Label>
          <div className="grid grid-cols-2 gap-3">
            {videoTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  if (!type.available) {
                    toast.info('当前版本暂不支持此类型');
                    return;
                  }
                  setVideoType(type.id as VideoType);
                }}
                disabled={!type.available}
                className={`p-3 rounded-lg border-2 text-left transition-all relative ${
                  !type.available
                    ? 'opacity-50 cursor-not-allowed bg-gray-50'
                    : videoType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm">{type.name}</span>
                {type.beta && (
                  <span className="absolute top-1 right-1 text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
                    Beta
                  </span>
                )}
                {!type.available && (
                  <span className="absolute top-1 right-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                    即将支持
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Template Selection */}
        {account && videoType && (
          <div className="bg-white rounded-lg p-4 space-y-3">
            <Label>剪辑模板</Label>
            <div className="grid gap-2">
              {availableTemplates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setTemplate(tmpl.id as TemplateType)}
                  className={`p-3 rounded-lg border-2 text-left flex items-center gap-2 transition-all ${
                    template === tmpl.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{tmpl.icon}</span>
                  <span className="text-sm">{tmpl.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Notes */}
        <div className="bg-white rounded-lg p-4 space-y-3">
          <Label htmlFor="notes">备注</Label>
          <Textarea
            id="notes"
            placeholder="可选：写重点卖点、禁用信息等"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>
      </div>
      
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">
            取消
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            创建任务
          </Button>
        </div>
      </div>
    </div>
  );
}
