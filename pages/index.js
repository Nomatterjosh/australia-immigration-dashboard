import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const modules = [
  { path: '/advisor', icon: '🤖', name: 'AI顾问', desc: '智能推荐签证', color: 'pink', new: true },
  { path: '/assessment', icon: '🎯', name: '签证评估', desc: 'EOI打分计算', color: 'cyan' },
  { path: '/planner', icon: '🗺️', name: '路径规划', desc: '智能推荐路径', color: 'green' },
  { path: '/documents', icon: '📝', name: '文书助手', desc: 'SOP/推荐信生成', color: 'purple' },
  { path: '/occupation', icon: '💼', name: '职业评估', desc: 'ANZSCO查询', color: 'blue' },
  { path: '/states', icon: '📊', name: '州担保', desc: '实时追踪', color: 'emerald' },
  { path: '/calculator', icon: '💰', name: '费用计算', desc: '全流程费用', color: 'yellow' },
  { path: '/news', icon: '📰', name: '移民资讯', desc: '每日简报', color: 'orange' },
  { path: '/faq', icon: '❓', name: 'FAQ', desc: '常见问题', color: 'rose', new: true },
  { path: '/laws', icon: '⚖️', name: '移民法导航', desc: 'Act & Regs', color: 'indigo' },
  { path: '/law-updates', icon: '📜', name: '法律更新', desc: '修正案监测', color: 'violet', new: true },
  { path: '/community', icon: '👥', name: '社区问答', desc: '经验分享', color: 'fuchsia' },
  { path: '/living', icon: '🏠', name: '生活助手', desc: '落地清单', color: 'teal' },
];

const colorMap = {
  cyan: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
  green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
  purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
  blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
  emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
  yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
  orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
  indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
  pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
  teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
  rose: 'from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700',
  violet: 'from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700',
  fuchsia: 'from-fuchsia-500 to-fuchsia-600 hover:from-fuchsia-600 hover:to-fuchsia-700',
};

const languages = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export default function Dashboard() {
  const [lang, setLang] = useState('zh');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) setLang(savedLang);
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('language', newLang);
    window.location.reload();
  };

  const t = {
    siteName: lang === 'zh' ? '澳洲移民项目' : 'Australia Immigration Hub',
    siteDesc: lang === 'zh' ? '一体化移民解决方案平台' : 'All-in-One Immigration Platform',
    search: lang === 'zh' ? '搜索功能...' : 'Search features...',
    features: lang === 'zh' ? '功能导航' : 'Features',
    quickStart: lang === 'zh' ? '快速开始' : 'Quick Start',
    totalFeatures: lang === 'zh' ? '核心功能' : 'Features',
    completed: lang === 'zh' ? '已完成' : 'Completed',
    totalProgress: lang === 'zh' ? '总进度' : 'Progress',
    login: lang === 'zh' ? '登录' : 'Login',
    admin: lang === 'zh' ? '管理后台' : 'Admin',
    quickActions: lang === 'zh' ? '快速操作' : 'Quick Actions',
    projectMgmt: lang === 'zh' ? '项目管理' : 'Project',
    viewDetails: lang === 'zh' ? '查看详情 →' : 'View Details →',
    new: lang === 'zh' ? 'NEW' : 'NEW',
    highlights: lang === 'zh' ? '核心功能亮点' : 'Key Features',
    integrated: lang === 'zh' ? '一体化移民解决方案平台' : 'All-in-One Immigration Platform',
    api: 'API',
  };

  return (
    <>
      <Head>
        <title>{t.siteName}</title>
        <meta name="description" content={t.siteDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              🇦🇺 {t.siteName}
            </h1>
            <p className="text-gray-400 text-lg mb-4">{t.siteDesc}</p>

            <div className="flex justify-center items-center gap-3 flex-wrap">
              <Link href="/login" className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition">
                🔐 {t.login}
              </Link>
              <Link href="/admin" className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                ⚙️ {t.admin}
              </Link>
              <div className="relative">
                <button onClick={() => setShowLangMenu(!showLangMenu)}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition flex items-center gap-2">
                  {languages.find(l => l.code === lang)?.flag} {languages.find(l => l.code === lang)?.name} ▼
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl z-50 min-w-[140px]">
                    {languages.map(l => (
                      <button key={l.code} onClick={() => changeLang(l.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition ${lang === l.code ? 'bg-gray-700' : ''}`}>
                        <span>{l.flag}</span><span>{l.name}</span>
                        {lang === l.code && <span className="ml-auto text-cyan-400">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl p-5 mb-8">
            <h2 className="text-lg font-bold mb-4">🎯 {t.quickStart}</h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/advisor" className="bg-pink-500/20 hover:bg-pink-500/30 px-4 py-2 rounded-lg transition">1. AI评估</Link>
              <Link href="/assessment" className="bg-cyan-500/20 hover:bg-cyan-500/30 px-4 py-2 rounded-lg transition">2. EOI打分</Link>
              <Link href="/occupation" className="bg-green-500/20 hover:bg-green-500/30 px-4 py-2 rounded-lg transition">3. 职业评估</Link>
              <Link href="/planner" className="bg-purple-500/20 hover:bg-purple-500/30 px-4 py-2 rounded-lg transition">4. 路径规划</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div><div className="text-4xl font-bold text-cyan-400">{modules.length}</div><div className="text-gray-400 text-sm mt-1">{t.totalFeatures}</div></div>
              <div><div className="text-4xl font-bold text-green-400">{modules.length}</div><div className="text-gray-400 text-sm mt-1">{t.completed}</div></div>
              <div><div className="text-4xl font-bold text-yellow-400">0</div><div className="text-gray-400 text-sm mt-1">In Progress</div></div>
              <div><div className="text-4xl font-bold text-purple-400">100%</div><div className="text-gray-400 text-sm mt-1">{t.totalProgress}</div></div>
            </div>
          </div>

          {/* Modules */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">🚀 {t.features}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modules.map((mod) => (
                <Link key={mod.path} href={mod.path}
                  className={`bg-gradient-to-r ${colorMap[mod.color]} rounded-xl p-5 transition transform hover:scale-105 hover:shadow-lg relative`}>
                  {mod.new && <span className="absolute top-2 right-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">{t.new}</span>}
                  <div className="text-4xl mb-2">{mod.icon}</div>
                  <div className="font-bold text-lg mb-1">{mod.name}</div>
                  <div className="text-sm opacity-80">{mod.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold mb-3">📋 {t.projectMgmt}</h3>
              <Link href="/admin" className="text-cyan-400 hover:underline text-sm">{t.viewDetails}</Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold mb-3">❓ FAQ</h3>
              <Link href="/faq" className="text-rose-400 hover:underline text-sm">{t.viewDetails}</Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold mb-3">💵 Business</h3>
              <Link href="/admin" className="text-green-400 hover:underline text-sm">{t.viewDetails}</Link>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>🚀 {t.integrated}</p>
            <p className="mt-2">
              <Link href="/admin" className="text-cyan-400 hover:underline">{t.admin}</Link>
              {' | '}
              <a href="/api/projects" className="text-cyan-400 hover:underline">{t.api}</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
