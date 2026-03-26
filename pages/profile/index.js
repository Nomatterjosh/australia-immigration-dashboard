// 个人中心页面 - 离线版
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [savedAssessments, setSavedAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', wechat: '' });
  const [notifications, setNotifications] = useState({
    eoi: true,
    state: true,
    deadline: false,
    law: true,
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setEditForm({ name: userData.name || '', wechat: userData.wechat || '' });
      loadAssessments();
    } else {
      router.push('/login');
    }
    setLoading(false);
  };

  const loadAssessments = () => {
    const saved = JSON.parse(localStorage.getItem('savedAssessments') || '[]');
    setSavedAssessments(saved);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  const handleUpdateProfile = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const email = localStorage.getItem('userEmail');
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...editForm };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify({ ...user, ...editForm }));
      setUser({ ...user, ...editForm });
    }
    
    setEditing(false);
  };

  const deleteAssessment = (id) => {
    const saved = savedAssessments.filter(a => a.id !== id);
    setSavedAssessments(saved);
    localStorage.setItem('savedAssessments', JSON.stringify(saved));
  };

  const toggleNotification = (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem('notificationSettings', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Head><title>个人中心 - 澳洲移民项目</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">👤 个人中心</h1>
              <p className="text-gray-400">管理您的移民规划</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition"
            >
              退出登录
            </button>
          </div>

          {/* User Info Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">基本信息</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="text-cyan-400 hover:underline text-sm"
              >
                {editing ? '取消' : '编辑'}
              </button>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">昵称</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-cyan-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">邮箱</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">微信</label>
                  <input
                    type="text"
                    value={editForm.wechat}
                    onChange={(e) => setEditForm({...editForm, wechat: e.target.value})}
                    placeholder="微信号（选填）"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-cyan-500 outline-none"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition"
                >
                  保存修改
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-4xl mb-2">👤</p>
                  <p className="font-semibold">{user.name || user.email?.split('@')[0]}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl mb-2">📊</p>
                  <p className="text-2xl font-bold text-cyan-400">{savedAssessments.length}</p>
                  <p className="text-gray-400 text-sm">评估记录</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl mb-2">🔔</p>
                  <p className="text-2xl font-bold text-green-400">
                    {Object.values(notifications).filter(Boolean).length}
                  </p>
                  <p className="text-gray-400 text-sm">开启提醒</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">🚀 快速操作</h2>
            <div className="grid grid-cols-4 gap-4">
              <Link href="/advisor" className="bg-pink-500/20 hover:bg-pink-500/30 rounded-xl p-4 text-center transition">
                <p className="text-3xl mb-2">🤖</p>
                <p className="font-semibold text-sm">AI评估</p>
              </Link>
              <Link href="/assessment" className="bg-cyan-500/20 hover:bg-cyan-500/30 rounded-xl p-4 text-center transition">
                <p className="text-3xl mb-2">🎯</p>
                <p className="font-semibold text-sm">EOI打分</p>
              </Link>
              <Link href="/planner" className="bg-green-500/20 hover:bg-green-500/30 rounded-xl p-4 text-center transition">
                <p className="text-3xl mb-2">🗺️</p>
                <p className="font-semibold text-sm">路径规划</p>
              </Link>
              <Link href="/documents" className="bg-purple-500/20 hover:bg-purple-500/30 rounded-xl p-4 text-center transition">
                <p className="text-3xl mb-2">📝</p>
                <p className="font-semibold text-sm">生成文书</p>
              </Link>
            </div>
          </div>

          {/* Assessment History */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">📊 评估历史</h2>
            {savedAssessments.length > 0 ? (
              <div className="space-y-4">
                {savedAssessments.map((a) => (
                  <div key={a.id} className="bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{a.title || 'EOI评估'}</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(a.date).toLocaleDateString('zh-CN')} · {a.score || 0}分
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link 
                          href="/assessment"
                          className="text-cyan-400 hover:underline text-sm"
                        >
                          查看
                        </Link>
                        <button
                          onClick={() => deleteAssessment(a.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-4xl mb-4">📝</p>
                <p className="text-gray-400 mb-4">还没有评估记录</p>
                <Link href="/advisor" className="text-cyan-400 hover:underline">
                  立即开始评估 →
                </Link>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">🔔 提醒设置</h2>
            <div className="space-y-3">
              {[
                { key: 'eoi', label: '189/190 邀请开放提醒', icon: '🎯' },
                { key: 'state', label: '州担保政策更新提醒', icon: '📊' },
                { key: 'deadline', label: '签证到期提醒', icon: '📅' },
                { key: 'law', label: '法律变更提醒', icon: '⚖️' },
              ].map(item => (
                <label key={item.key} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700/50 transition">
                  <div className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.key)}
                    className={`w-12 h-6 rounded-full relative transition ${
                      notifications[item.key] ? 'bg-cyan-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                      notifications[item.key] ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </button>
                </label>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4">
              💡 提醒功能将在后续版本中通过邮件/微信推送
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p><a href="/" className="text-cyan-400 hover:underline">← 返回首页</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
