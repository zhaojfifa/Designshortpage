export type AccountType = 'beauty' | 'sports' | 'tech';
export type TaskStatus = 'processing' | 'ready' | 'published' | 'error';
export type VideoType = 'quick-makeup' | 'workout' | 'product-review' | 'scene-makeup' | 'immersive-makeup';
export type TemplateType = 'fast-pace' | 'standard' | 'voice-only' | 'high-intensity' | 'instructional';
export type Step = 'parse' | 'subtitles' | 'dub' | 'pack';

export interface Task {
  id: string;
  title: string;
  account: AccountType;
  videoType: VideoType;
  template: TemplateType;
  platform: string;
  duration: string;
  createdAt: string;
  status: TaskStatus;
  currentStep?: Step;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  platforms: string[];
}
