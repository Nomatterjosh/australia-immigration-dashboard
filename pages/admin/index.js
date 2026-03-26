import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [monetization, setMonetization] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeSection, setActiveSection] = useState('projects');

  const statusOptions = [
    { value: 'done', label: '✅ 完成', color: 'bg-green-500' },
    { value: 'in-progress', label: '🔄 进行中', color: 'bg-yellow-500' },
    { value: 'todo', label: '⏳ 待开始', color: 'bg-gray-500' },
    { value: 'planning', label: '📋 规划中', color: 'bg-gray-600' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
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
      showMessage('error', '加载失败，请检查网络');
    }
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const updateProject = async (id, updates) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.map(p => p.id === id ? data.data : p));
        showMessage('success', '✓ 更新成功');
      }
    } catch (error) {
      showMessage('error', '✗ 更新失败');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div className="text-xl">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>管理后台 - 澳洲移民项目</title>
      </Head>
      
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">⚙️ 项目管理后台</h1>
              <p className="text-gray-400 text-sm">实时更新项目进度和盈利模式</p>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition">
                👁️ 返回首页
              </Link>
              <button 
                onClick={fetchData}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                🔄 刷新
              </button>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`max-w-7xl mx-auto px-6 py-3 mt-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {message.text}
          </div>
        )}

        {/* Section Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-4 mt-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveSection('projects')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeSection === 'projects' ? 'bg-cyan-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              📋 项目模块详情
            </button>
            <button
              onClick={() => setActiveSection('monetization')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeSection === 'monetization' ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              💵 盈利模式
            </button>
            <button
              onClick={() => setActiveSection('stats')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeSection === 'stats' ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              📊 数据统计
            </button>
          </div>
        </div>

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-cyan-500/50 transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{project.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold">{project.name}</h3>
                        <p className="text-gray-400 text-sm max-w-xl">{project.desc}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-700 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* 进度控制 */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">📊 进度</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={project.progress}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setProjects(projects.map(p => p.id === project.id ? { ...p, progress: value } : p));
                          }}
                          className="flex-1 accent-cyan-500"
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={project.progress}
                            onChange={(e) => {
                              const value = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                              setProjects(projects.map(p => p.id === project.id ? { ...p, progress: value } : p));
                            }}
                            className="w-16 bg-gray-700 rounded px-2 py-1 text-center"
                          />
                          <span className="text-gray-400">%</span>
                          <button
                            onClick={() => updateProject(project.id, { progress: project.progress })}
                            disabled={saving}
                            className="ml-2 px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm disabled:opacity-50"
                          >
                            保存
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* 状态控制 */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">📌 状态</label>
                      <div className="grid grid-cols-2 gap-2">
                        {statusOptions.map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => updateProject(project.id, { status: opt.value })}
                            className={`px-3 py-2 rounded text-sm transition ${
                              project.status === opt.value 
                                ? `${opt.color} text-white shadow-lg` 
                                : 'bg-gray-700 hover:bg-gray-600'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 快捷操作 */}
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">⚡ 快捷</label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateProject(project.id, { progress: Math.min(100, project.progress + 10) })}
                          className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm transition"
                          disabled={saving || project.progress >= 100}
                        >
                          +10%
                        </button>
                        <button
                          onClick={() => updateProject(project.id, { progress: Math.max(0, project.progress - 10) })}
                          className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition"
                          disabled={saving || project.progress <= 0}
                        >
                          -10%
                        </button>
                        <button
                          onClick={() => updateProject(project.id, { 
                            status: project.status === 'done' ? 'todo' : 'done',
                            progress: project.status === 'done' ? 0 : 100
                          })}
                          className={`px-3 py-2 rounded text-sm transition ${
                            project.status === 'done' 
                              ? 'bg-orange-600 hover:bg-orange-700' 
                              : 'bg-green-600 hover:bg-green-700'
                          }`}
                          disabled={saving}
                        >
                          {project.status === 'done' ? '↩ 重开' : '✅ 完成'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500 flex justify-between">
                    <span>ID: #{project.id}</span>
                    <span>最后更新: {new Date(project.updatedAt).toLocaleString('zh-CN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monetization Section */}
        {activeSection === 'monetization' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">💵 盈利模式管理</h2>
              <p className="text-gray-400">查看和管理平台的商业模式</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {monetization.map((item, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">预估收入</p>
                    <p className="text-xl font-bold text-green-400">
                      {item.revenue > 0 ? `$${item.revenue.toLocaleString()}` : '待定'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue Summary */}
            <div className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">📈 收入概览</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">5</div>
                  <div className="text-gray-400 text-sm mt-1">盈利模式</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-cyan-400"> Freemium</div>
                  <div className="text-gray-400 text-sm mt-1">主要策略</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-400"> B2C + B2B</div>
                  <div className="text-gray-400 text-sm mt-1">目标市场</div>
                </div>
              </div>
            </div>

            {/* Detailed Strategy */}
            <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">📋 盈利策略详解</h3>
              <div className="space-y-4">
                {monetization.map((item, i) => (
                  <div key={i} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <h4 className="font-bold">{item.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{item.desc}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-500">预估占比: <span className="text-green-400">20%</span></span>
                      <span className="text-gray-500">优先级: <span className="text-cyan-400">高</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {activeSection === 'stats' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">📊 数据统计</h2>
              <p className="text-gray-400">项目整体进度概览</p>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">{stats.total || 0}</div>
                <div className="text-gray-400">总项目数</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
                <div className="text-5xl font-bold text-green-400 mb-2">{stats.done || 0}</div>
                <div className="text-gray-400">已完成</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">{stats.inProgress || 0}</div>
                <div className="text-gray-400">进行中</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">{stats.avgProgress || 0}%</div>
                <div className="text-gray-400">平均进度</div>
              </div>
            </div>

            {/* Status Breakdown */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
              <h3 className="text-xl font-bold mb-4">📈 状态分布</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {statusOptions.map(opt => (
                  <div key={opt.value} className="bg-gray-900/50 rounded-lg p-4 text-center">
                    <div className={`text-3xl font-bold ${
                      opt.value === 'done' ? 'text-green-400' :
                      opt.value === 'in-progress' ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {projects.filter(p => p.status === opt.value).length}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{opt.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Breakdown */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4">🎯 优先级分布</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-400 font-semibold">高优先级</span>
                    <span className="text-2xl font-bold">{projects.filter(p => p.priority === 'high').length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${(projects.filter(p => p.priority === 'high').length / projects.length * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 font-semibold">中优先级</span>
                    <span className="text-2xl font-bold">{projects.filter(p => p.priority === 'medium').length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${(projects.filter(p => p.priority === 'medium').length / projects.length * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-semibold">低优先级</span>
                    <span className="text-2xl font-bold">{projects.filter(p => p.priority === 'low').length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(projects.filter(p => p.priority === 'low').length / projects.length * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Docs */}
        <div className="max-w-7xl mx-auto px-6 py-8 mt-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">🔌 API 接口</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm font-mono">
              <div className="bg-gray-900 rounded p-4">
                <div className="text-green-400 mb-2">GET /api/projects</div>
                <div className="text-gray-400">获取所有项目 + 统计</div>
              </div>
              <div className="bg-gray-900 rounded p-4">
                <div className="text-green-400 mb-2">GET /api/monetization</div>
                <div className="text-gray-400">获取盈利模式数据</div>
              </div>
              <div className="bg-gray-900 rounded p-4">
                <div className="text-blue-400 mb-2">PUT /api/projects/:id</div>
                <div className="text-gray-400">更新项目数据</div>
              </div>
              <div className="bg-gray-900 rounded p-4">
                <div className="text-purple-400 mb-2">GET /api/immigration/score</div>
                <div className="text-gray-400">EOI打分计算</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
