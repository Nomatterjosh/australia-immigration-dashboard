import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
// i18n simplified

export default function Profile() {
  const router = useRouter();
  const { lang, t } = useI18n();
  const [user, setUser] = useState(null);
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

  const copy = {
    zh: {
      profile: '个人中心',
      manage: '管理您的移民规划',
      logout: '退出登录',
      basicInfo: '基本信息',
      edit: '编辑',
      cancel: '取消',
      nickname: '昵称',
      email: '邮箱',
      wechat: '微信',
      wechatPlaceholder: '微信号（选填）',
      save: '保存修改',
      assessments: '评估记录',
      noAssessments: '还没有评估记录',
      startAssessment: '立即开始评估 →',
      quickActions: '快速操作',
      aiEval: 'AI评估',
      eoiScore: 'EOI打分',
      pathPlan: '路径规划',
      docGen: '生成文书',
      reminders: '提醒设置',
      eoiReminder: '189/190 邀请开放提醒',
      stateReminder: '州担保政策更新提醒',
      deadlineReminder: '签证到期提醒',
      lawReminder: '法律变更提醒',
      reminderNote: '💡 提醒功能将在后续版本中通过邮件/微信推送',
      backHome: '← 返回首页',
      records: '评估记录',
      view: '查看',
      delete: '删除',
      remindersCount: '开启提醒',
    },
    en: {
      profile: 'Profile',
      manage: 'Manage your immigration planning',
      logout: 'Logout',
      basicInfo: 'Basic Information',
      edit: 'Edit',
      cancel: 'Cancel',
      nickname: 'Nickname',
      email: 'Email',
      wechat: 'WeChat',
      wechatPlaceholder: 'WeChat ID (optional)',
      save: 'Save Changes',
      assessments: 'Assessment History',
      noAssessments: 'No assessment records yet',
      startAssessment: 'Start Assessment →',
      quickActions: 'Quick Actions',
      aiEval: 'AI Eval',
      eoiScore: 'EOI Score',
      pathPlan: 'Path Plan',
      docGen: 'Doc Gen',
      reminders: 'Notification Settings',
      eoiReminder: '189/190 Invitation Reminders',
      stateReminder: 'State Nomination Updates',
      deadlineReminder: 'Visa Expiry Reminders',
      lawReminder: 'Law Change Reminders',
      reminderNote: '💡 Reminders will be sent via email/WeChat in future versions',
      backHome: '← Back to Home',
      records: 'Assessment Records',
      view: 'View',
      delete: 'Delete',
      remindersCount: 'Reminders On',
    }
  };

  const c = copy[lang] || copy.zh;

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
          <p className="text-gray-400">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Head><title>{c.profile} - {t.siteName}</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">👤 {c.profile}</h1>
              <p className="text-gray-400">{c.manage}</p>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition">
              {c.logout}
            </button>
          </div>

          {/* User Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{c.basicInfo}</h2>
              <button onClick={() => setEditing(!editing)} className="text-cyan-400 hover:underline text-sm">
                {editing ? c.cancel : c.edit}
              </button>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{c.nickname}</label>
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{c.email}</label>
                  <input type="email" value={user.email} disabled
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{c.wechat}</label>
                  <input type="text" value={editForm.wechat} onChange={e => setEditForm({...editForm, wechat: e.target.value})}
                    placeholder={c.wechatPlaceholder}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-cyan-500 outline-none" />
                </div>
                <button onClick={handleUpdateProfile} className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition">
                  {c.save}
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
                  <p className="text-gray-400 text-sm">{c.records}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl mb-2">🔔</p>
                  <p className="text-2xl font-bold text-green-400">{Object.values(notifications).filter(Boolean).length}</p>
                  <p className="text-gray-400 text-sm">{c.remindersCount}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">🚀 {c.quickActions}</h2>
            <div className="grid grid-cols-4 gap-4">
              {[
                { href: '/advisor', icon: '🤖', label: c.aiEval },
                { href: '/assessment', icon: '🎯', label: c.eoiScore },
                { href: '/planner', icon: '🗺️', label: c.pathPlan },
                { href: '/documents', icon: '📝', label: c.docGen },
              ].map(a => (
                <Link key={a.href} href={a.href} className="bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-4 text-center transition">
                  <p className="text-3xl mb-2">{a.icon}</p>
                  <p className="font-semibold text-sm">{a.label}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Assessment History */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">📊 {c.assessments}</h2>
            {savedAssessments.length > 0 ? (
              <div className="space-y-4">
                {savedAssessments.map(a => (
                  <div key={a.id} className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{a.title || 'EOI'}</p>
                      <p className="text-gray-400 text-sm">{new Date(a.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US')} · {a.score || 0} pts</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href="/assessment" className="text-cyan-400 hover:underline text-sm">{c.view}</Link>
                      <button onClick={() => deleteAssessment(a.id)} className="text-red-400 hover:text-red-300 text-sm">{c.delete}</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-4xl mb-4">📝</p>
                <p className="text-gray-400 mb-4">{c.noAssessments}</p>
                <Link href="/advisor" className="text-cyan-400 hover:underline">{c.startAssessment}</Link>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">🔔 {c.reminders}</h2>
            <div className="space-y-3">
              {[
                { key: 'eoi', label: c.eoiReminder, icon: '🎯' },
                { key: 'state', label: c.stateReminder, icon: '📊' },
                { key: 'deadline', label: c.deadlineReminder, icon: '📅' },
                { key: 'law', label: c.lawReminder, icon: '⚖️' },
              ].map(item => (
                <label key={item.key} className="flex items-center justify-between bg-gray-800/50 rounded-lg p-4 cursor-pointer hover:bg-gray-700/50 transition">
                  <div className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <button onClick={() => toggleNotification(item.key)}
                    className={`w-12 h-6 rounded-full relative transition ${notifications[item.key] ? 'bg-cyan-500' : 'bg-gray-600'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${notifications[item.key] ? 'right-0.5' : 'left-0.5'}`}></div>
                  </button>
                </label>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-4">{c.reminderNote}</p>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p><a href="/" className="text-cyan-400 hover:underline">{c.backHome}</a></p>
          </div>

        </div>
      </div>
    </>
  );
}
