import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';

const tools = [
  { id: '1', step: 'Parse', name: 'Gemini Parser', provider: 'gemini-2.0', enabled: true },
  { id: '2', step: 'Subtitles', name: 'Whisper', provider: 'openai-whisper', enabled: true },
  { id: '3', step: 'Subtitles', name: 'Gemini Translator', provider: 'gemini-2.0', enabled: true },
  { id: '4', step: 'Dub', name: 'Edge TTS', provider: 'edge-tts', enabled: true },
  { id: '5', step: 'Pack', name: 'FFmpeg', provider: 'ffmpeg', enabled: true },
];

const routes = [
  {
    id: '1',
    name: '美妆号默认路由',
    account: 'beauty',
    platform: 'all',
    videoType: 'quick-makeup',
    parse: 'gemini-2.0',
    subtitles: 'whisper',
    dub: 'edge-tts',
    pack: 'ffmpeg',
  },
  {
    id: '2',
    name: '运动号默认路由',
    account: 'sports',
    platform: 'all',
    videoType: 'workout',
    parse: 'gemini-2.0',
    subtitles: 'whisper',
    dub: 'edge-tts',
    pack: 'ffmpeg',
  },
];

export function AdminTools() {
  const navigate = useNavigate();
  const [toolsData, setToolsData] = useState(tools);
  
  const toggleTool = (id: string) => {
    setToolsData(prev => 
      prev.map(tool => 
        tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
      )
    );
  };
  
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1>工具配置</h1>
        </div>
      </header>
      
      <div className="p-4 max-w-4xl mx-auto">
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tools">工具列表</TabsTrigger>
            <TabsTrigger value="routes">路由规则</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tools" className="mt-4">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">步骤</th>
                    <th className="px-4 py-3 text-left text-sm">工具名称</th>
                    <th className="px-4 py-3 text-left text-sm">Provider Code</th>
                    <th className="px-4 py-3 text-left text-sm">状态</th>
                    <th className="px-4 py-3 text-left text-sm">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {toolsData.map((tool) => (
                    <tr key={tool.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{tool.step}</td>
                      <td className="px-4 py-3 text-sm">{tool.name}</td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{tool.provider}</code>
                      </td>
                      <td className="px-4 py-3">
                        <Switch
                          checked={tool.enabled}
                          onCheckedChange={() => toggleTool(tool.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">测试</Button>
                          <Button variant="ghost" size="sm">编辑</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="routes" className="mt-4">
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">规则名</th>
                    <th className="px-4 py-3 text-left text-sm">账号</th>
                    <th className="px-4 py-3 text-left text-sm">平台</th>
                    <th className="px-4 py-3 text-left text-sm">视频类型</th>
                    <th className="px-4 py-3 text-left text-sm">Parse</th>
                    <th className="px-4 py-3 text-left text-sm">Subtitles</th>
                    <th className="px-4 py-3 text-left text-sm">Dub</th>
                    <th className="px-4 py-3 text-left text-sm">Pack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {routes.map((route) => (
                    <tr key={route.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{route.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                          {route.account}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{route.platform}</td>
                      <td className="px-4 py-3 text-sm">{route.videoType}</td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {route.parse}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {route.subtitles}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {route.dub}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {route.pack}
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <Button>添加新规则</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
