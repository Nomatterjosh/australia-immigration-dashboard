// 项目数据存储 - 支持内存和文件两种模式
// 注意: Vercel Serverless 是无状态的，文件模式不适用，推荐使用 Supabase/Planetscale 等数据库
// 这里先用内存模式演示，可轻松切换到数据库

let projects = [
  {
    id: 1,
    name: '签证评估 & 打分计算器',
    icon: '🎯',
    desc: 'EOI 分数自动计算，职业评估资格预判，对标邀请分数线',
    progress: 60,
    status: 'in-progress',
    priority: 'high',
    tags: ['高需求', '核心功能'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: '移民路径规划工具',
    icon: '🗺️',
    desc: '根据用户情况推荐最优签证路径，可视化展示时间线和成本',
    progress: 50,
    status: 'in-progress',
    priority: 'high',
    tags: ['高需求', '核心功能'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'AI 文书 & 材料助手',
    icon: '📝',
    desc: 'AI 辅助生成 SOP、推荐信、材料清单自动生成 + 进度追踪',
    progress: 20,
    status: 'todo',
    priority: 'high',
    tags: ['高需求', 'AI 驱动'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: '职业评估导航',
    icon: '💼',
    desc: 'ANZSCO 职业代码查询，对应评估机构要求说明',
    progress: 10,
    status: 'todo',
    priority: 'medium',
    tags: ['中需求', '数据驱动'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: '州担保追踪器',
    icon: '📊',
    desc: '实时追踪各州开放状态、邀请分数、配额，推送通知',
    progress: 10,
    status: 'todo',
    priority: 'medium',
    tags: ['中需求', '实时数据'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    name: '移民费用计算器',
    icon: '💰',
    desc: '签证费 + 评估费 + 中介费 + 生活成本，全流程费用透明化',
    progress: 10,
    status: 'todo',
    priority: 'medium',
    tags: ['中需求', '工具类'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 7,
    name: '移民社区 + 问答平台',
    icon: '👥',
    desc: '真实案例分享、经验帖，AI 答疑 + 人工顾问接入',
    progress: 0,
    status: 'planning',
    priority: 'low',
    tags: ['长尾', '社区'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 8,
    name: '移民后生活助手',
    icon: '🏠',
    desc: '落地清单（开银行、注册税号、找房）、本地资源地图',
    progress: 0,
    status: 'planning',
    priority: 'low',
    tags: ['长尾', '服务延伸'],
    updatedAt: new Date().toISOString()
  }
];

let monetization = [
  { id: 1, icon: '🆓', title: '免费 + 付费增值', desc: '基础功能免费，深度报告、AI 文书润色、优先咨询付费', revenue: 0 },
  { id: 2, icon: '💳', title: '订阅制', desc: '月度/年度订阅，解锁全部工具 + 无限次 AI 咨询', revenue: 0 },
  { id: 3, icon: '🤝', title: '移民中介导流', desc: '推荐认证中介，按成交获取佣金（匹配费$200-500/单）', revenue: 0 },
  { id: 4, icon: '📢', title: '广告 & 赞助', desc: '语言学校、租房平台、航空公司等精准投放', revenue: 0 },
  { id: 5, icon: '🎓', title: '企业服务', desc: '为移民中介提供 SaaS 工具，按账号收费', revenue: 0 }
];

// API 路由
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};

// 获取所有项目
export function getProjects() {
  return projects;
}

// 获取单个项目
export function getProject(id) {
  return projects.find(p => p.id === id);
}

// 更新项目
export function updateProject(id, data) {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  return projects[index];
}

// 添加项目
export function addProject(data) {
  const newProject = {
    id: Math.max(...projects.map(p => p.id)) + 1,
    ...data,
    updatedAt: new Date().toISOString()
  };
  projects.push(newProject);
  return newProject;
}

// 删除项目
export function deleteProject(id) {
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return false;
  projects.splice(index, 1);
  return true;
}

// 获取盈利模式
export function getMonetization() {
  return monetization;
}

// 更新盈利数据
export function updateMonetization(id, data) {
  const index = monetization.findIndex(m => m.id === id);
  if (index === -1) return null;
  
  monetization[index] = { ...monetization[index], ...data };
  return monetization[index];
}

// 获取统计数据
export function getStats() {
  return {
    total: projects.length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    done: projects.filter(p => p.status === 'done').length,
    todo: projects.filter(p => p.status === 'todo' || p.status === 'planning').length,
    avgProgress: Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)
  };
}
