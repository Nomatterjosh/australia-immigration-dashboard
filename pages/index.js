import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [monetization, setMonetization] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // 每30秒自动刷新
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      // 并行请求项目和盈利数据
      const [projectsRes, monetizationRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/monetization')
      ]);
      
      const projectsData = await projectsRes.json();
      const monetizationData = await monetizationRes.json();
      
      if (projectsData.success) {
        setProjects(projectsData.data);
        setStats(projectsData.stats);
      }
      
      if (monetizationData.success) {
        setMonetization(monetizationData.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'done': return '✅ 完成';
      case 'in-progress': return '🔄 进行中';
      case 'todo': return '⏳ 待开始';
      case 'planning': return '📋 规划中';
      default: return '未知';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🇦🇺</div>
          <div className="text-2xl">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>澳洲移民项目 - 进度看板</title>
        <meta name="description" content="澳洲移民软件项目进度追踪看板" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              🇦🇺 澳洲移民项目
            </h1>
            <p className="text-gray-400 text-lg mb-4">一体化移民解决方案平台</p>
            <Link href="/admin" className="inline-block px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition text-sm">
              ⚙️ 管理后台
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition">
              <div className="text-4xl font-bold text-cyan-400">{stats.total || 0}</div>
              <div className="text-gray-400 text-sm mt-2">核心功能模块</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition">
              <div className="text-4xl font-bold text-yellow-400">{stats.inProgress || 0}</div>
              <div className="text-gray-400 text-sm mt-2">进行中</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition">
              <div className="text-4xl font-bold text-green-400">{stats.done || 0}</div>
              <div className="text-gray-400 text-sm mt-2">已完成</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition">
              <div className="text-4xl font-bold text-purple-400">{stats.avgProgress || 0}%</div>
              <div className="text-gray-400 text-sm mt-2">平均进度</div>
            </div>
          </div>

          {/* Projects */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span>📋</span> 项目模块详情
              <span className="text-sm font-normal text-gray-400 ml-auto">
                {new Date().toLocaleString('zh-CN')}
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 hover:border-cyan-400/50 transition group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <span className="text-2xl">{project.icon}</span>
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{project.desc}</p>
                  
                  <div className="flex gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                        project.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                        project.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>{getStatusLabel(project.status)}</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-green-400 transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monetization */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span>💵</span> 盈利模式
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {monetization.map((item, i) => (
                <div key={i} className="text-center bg-white/5 rounded-lg p-4 hover:bg-white/10 transition">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>🚀 实时进度看板 | 数据每 30 秒自动刷新</p>
            <p className="mt-2">
              <Link href="/admin" className="text-cyan-400 hover:underline">管理后台</Link>
              {' | '}
              <a href="/api/projects" className="text-cyan-400 hover:underline">API</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
