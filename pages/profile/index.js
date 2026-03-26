import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [savedAssessments, setSavedAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', wechat: '' });
  const [lang, setLang] = useState('zh');

  const copy = {
    zh: { profile: '个人中心', manage: '管理移民规划', logout: '退出登录', basic: '基本信息', edit: '编辑', cancel: '取消', save: '保存', nick: '昵称', email: '邮箱', wechat: '微信', records: '评估记录', noRecord: '暂无记录', start: '开始评估 →', quick: '快速操作', reminders: '提醒设置', back: '← 返回首页' },
    en: { profile: 'Profile', manage: 'Manage Planning', logout: 'Logout', basic: 'Info', edit: 'Edit', cancel: 'Cancel', save: 'Save', nick: 'Nickname', email: 'Email', wechat: 'WeChat', records: 'Records', noRecord: 'No Records', start: 'Start →', quick: 'Quick', reminders: 'Reminders', back: '← Back' }
  };
  const c = copy[lang] || copy.zh;

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) setLang(savedLang);
    checkAuth();
  }, []);

  const checkAuth = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setEditForm({ name: userData.name || '', wechat: userData.wechat || '' });
      setSavedAssessments(JSON.parse(localStorage.getItem('savedAssessments') || '[]'));
    } else {
      router.push('/login');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userEmail');
    router.push('/');
  };

  const handleUpdate = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const email = localStorage.getItem('userEmail');
    const idx = users.findIndex(u => u.email === email);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...editForm };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify({ ...user, ...editForm }));
      setUser({ ...user, ...editForm });
    }
    setEditing(false);
  };

  const toggleNotif = (key) => {
    const current = JSON.parse(localStorage.getItem('notifications') || '{}');
    current[key] = !current[key];
    localStorage.setItem('notifications', JSON.stringify(current));
  };

  if (loading) return <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center"><div className="animate-spin text-4xl">⏳</div></div>;
  if (!user) return null;

  return (
    <>
      <Head><title>{c.profile} - 澳洲移民</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">👤 {c.profile}</h1>
              <p className="text-gray-400">{c.manage}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="px-3 py-1 bg-gray-700 rounded text-sm">{lang === 'zh' ? 'EN' : '中文'}</button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg">{c.logout}</button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">{c.basic}</h2>
              <button onClick={() => setEditing(!editing)} className="text-cyan-400 text-sm">{editing ? c.cancel : c.edit}</button>
            </div>
            {editing ? (
              <div className="space-y-3">
                <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder={c.nick} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2" />
                <input type="email" value={user.email} disabled className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-2 text-gray-500" />
                <input type="text" value={editForm.wechat} onChange={e => setEditForm({...editForm, wechat: e.target.value})} placeholder={c.wechat} className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2" />
                <button onClick={handleUpdate} className="px-6 py-2 bg-cyan-500 rounded font-bold">{c.save}</button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center"><p className="text-4xl mb-2">👤</p><p className="font-bold">{user.name || user.email?.split('@')[0]}</p><p className="text-gray-400 text-sm">{user.email}</p></div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center"><p className="text-3xl mb-2">📊</p><p className="text-2xl font-bold text-cyan-400">{savedAssessments.length}</p><p className="text-gray-400 text-sm">{c.records}</p></div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center"><p className="text-3xl mb-2">🔔</p><p className="text-2xl font-bold text-green-400">4</p><p className="text-gray-400 text-sm">{c.reminders}</p></div>
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="font-bold mb-4">🚀 {c.quick}</h2>
            <div className="grid grid-cols-4 gap-4">
              <Link href="/advisor" className="bg-pink-500/20 hover:bg-pink-500/30 rounded-xl p-4 text-center"><p className="text-3xl">🤖</p><p className="font-bold text-sm">AI</p></Link>
              <Link href="/assessment" className="bg-cyan-500/20 hover:bg-cyan-500/30 rounded-xl p-4 text-center"><p className="text-3xl">🎯</p><p className="font-bold text-sm">EOI</p></Link>
              <Link href="/planner" className="bg-green-500/20 hover:bg-green-500/30 rounded-xl p-4 text-center"><p className="text-3xl">🗺️</p><p className="font-bold text-sm">Plan</p></Link>
              <Link href="/documents" className="bg-purple-500/20 hover:bg-purple-500/30 rounded-xl p-4 text-center"><p className="text-3xl">📝</p><p className="font-bold text-sm">Docs</p></Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="text-cyan-400 hover:underline">{c.back}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
