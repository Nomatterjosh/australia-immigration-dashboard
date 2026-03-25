import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // 状态选项
  const statusOptions = [
    { value: 'done', label: '✅ 完成', color: 'bg-green-500' },
    { value: 'in-progress', label: '🔄 进行中', color: 'bg-yellow-500' },
    { value: 'todo', label: '⏳ 待开始', color: 'bg-gray-500' },
    { value: 'planning', label: '📋 规划中', color: 'bg-gray-600' }
  ];

  // 加载数据
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      showMessage('error', '加载失败');
    }
    setLoading(false);
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // 更新项目
  const updateProject = async (id, field, value) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.map(p => p.id === id ? data.data : p));
        showMessage('success', '更新成功');
      }
    } catch (error) {
      showMessage('error', '更新失败');
    }
    setSaving(false);
  };

  // 批量更新进度
  const handleProgressChange = (id, value) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, progress: parseInt(value) || 0 } : p
    ));
  };

  const saveProgress = async (id) => {
    const project = projects.find(p => p.id === id);
    await updateProject(id, 'progress', project.progress);
  };

  // 批量更新状态
  const handleStatusChange = async (id, status) => {
    await updateProject(id, 'status', status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">📊 项目管理后台</h1>
            <p className="text-gray-400 text-sm">管理澳洲移民项目进度</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition"
            >
              👁️ 查看看板
            </button>
            <button 
              onClick={fetchProjects}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              🔄 刷新
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`max-w-7xl mx-auto px-6 py-3 ${
          message.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } rounded-lg mt-4`}>
          {message.text}
        </div>
      )}

      {/* Projects */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{project.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-gray-400 text-sm">{project.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-700 rounded">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* 进度 */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">进度</label>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={project.progress}
                      onChange={(e) => handleProgressChange(project.id, e.target.value)}
                      className="flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={project.progress}
                      onChange={(e) => handleProgressChange(project.id, e.target.value)}
                      onBlur={() => saveProgress(project.id)}
                      className="w-16 bg-gray-700 rounded px-2 py-1 text-center"
                    />
                    <span className="text-gray-400">%</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* 状态 */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">状态</label>
                  <div className="grid grid-cols-2 gap-2">
                    {statusOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => handleStatusChange(project.id, opt.value)}
                        className={`px-3 py-2 rounded text-sm transition ${
                          project.status === opt.value 
                            ? `${opt.color} text-white` 
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
                  <label className="block text-sm text-gray-400 mb-2">快捷操作</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateProject(project.id, 'progress', Math.min(100, project.progress + 10))}
                      className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm transition"
                      disabled={saving}
                    >
                      +10%
                    </button>
                    <button
                      onClick={() => updateProject(project.id, 'progress', Math.max(0, project.progress - 10))}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition"
                      disabled={saving}
                    >
                      -10%
                    </button>
                    <button
                      onClick={() => updateProject(project.id, 'status', project.status === 'done' ? 'in-progress' : 'done')}
                      className={`px-3 py-2 rounded text-sm transition ${
                        project.status === 'done' 
                          ? 'bg-gray-600 hover:bg-gray-500' 
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {project.status === 'done' ? '↩ 重开' : '✅ 完成'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                最后更新: {new Date(project.updatedAt).toLocaleString('zh-CN')}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">📈 统计概览</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{projects.length}</div>
              <div className="text-gray-400 text-sm">总项目</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {projects.filter(p => p.status === 'done').length}
              </div>
              <div className="text-gray-400 text-sm">已完成</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {projects.filter(p => p.status === 'in-progress').length}
              </div>
              <div className="text-gray-400 text-sm">进行中</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
              </div>
              <div className="text-gray-400 text-sm">平均进度</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
