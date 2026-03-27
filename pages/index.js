import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

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

// 翻译数据
const translations = {
  siteName: { zh: '澳洲移民项目', en: 'Australia Immigration Hub' },
  siteDesc: { zh: '一体化移民解决方案平台', en: 'All-in-One Immigration Platform' },
  search: { zh: '搜索功能...', en: 'Search features...' },
  features: { zh: '功能导航', en: 'Features' },
  quickStart: { zh: '快速开始', en: 'Quick Start' },
  totalFeatures: { zh: '核心功能', en: 'Features' },
  completed: { zh: '已完成', en: 'Completed' },
  inProgress: { zh: '进行中', en: 'In Progress' },
  totalProgress: { zh: '总进度', en: 'Progress' },
  login: { zh: '登录', en: 'Login' },
  admin: { zh: '管理后台', en: 'Admin' },
  projectMgmt: { zh: '项目管理', en: 'Project Management' },
  viewDetails: { zh: '查看详情 →', en: 'View Details →' },
  highlights: { zh: '核心功能亮点', en: 'Key Features' },
  integrated: { zh: '一体化移民解决方案平台', en: 'All-in-One Immigration Platform' },
  // 模块名称
  modules: {
    advisor: { zh: 'AI顾问', en: 'AI Advisor', desc_zh: '智能推荐签证', desc_en: 'Smart visa recommendations' },
    assessment: { zh: '签证评估', en: 'Visa Assessment', desc_zh: 'EOI打分计算', desc_en: 'EOI points calculator' },
    planner: { zh: '路径规划', en: 'Path Planner', desc_zh: '智能推荐路径', desc_en: 'Smart path recommendation' },
    documents: { zh: '文书助手', en: 'Doc Helper', desc_zh: 'SOP/推荐信生成', desc_en: 'SOP & reference letters' },
    occupation: { zh: '职业评估', en: 'Occupation', desc_zh: 'ANZSCO查询', desc_en: 'ANZSCO lookup' },
    states: { zh: '州担保', en: 'State Nomination', desc_zh: '实时追踪', desc_en: 'Real-time tracking' },
    calculator: { zh: '费用计算', en: 'Cost Calculator', desc_zh: '全流程费用', desc_en: 'Full process costs' },
    news: { zh: '移民资讯', en: 'News', desc_zh: '每日简报', desc_en: 'Daily briefing' },
    faq: { zh: 'FAQ', en: 'FAQ', desc_zh: '常见问题', desc_en: 'Common questions' },
    laws: { zh: '移民法导航', en: 'Law Navigator', desc_zh: 'Act & Regs', desc_en: 'Migration Act & Regs' },
    lawUpdates: { zh: '法律更新', en: 'Law Updates', desc_zh: '修正案监测', desc_en: 'Amendment tracking' },
    community: { zh: '社区问答', en: 'Community', desc_zh: '经验分享', desc_en: 'Experience sharing' },
    living: { zh: '生活助手', en: 'Life Helper', desc_zh: '落地清单', desc_en: 'Settlement checklist' },
  },
  // 快速开始
  step1: { zh: '1. AI评估', en: '1. AI Assessment' },
  step2: { zh: '2. EOI打分', en: '2. EOI Score' },
  step3: { zh: '3. 职业评估', en: '3. Occupation' },
  step4: { zh: '4. 路径规划', en: '4. Path Planning' },
  // 功能亮点
  aiAdvisor: { zh: 'AI智能顾问', en: 'AI Advisor' },
  aiAdvisorDesc: { zh: '根据情况推荐签证', en: 'Smart visa recommendations' },
  smartEoi: { zh: '智能EOI打分', en: 'Smart EOI Scoring' },
  smartEoiDesc: { zh: '精准计算分数', en: 'Accurate points calculation' },
  aiDoc: { zh: 'AI文书生成', en: 'AI Document Generation' },
  aiDocDesc: { zh: '一键生成材料', en: 'One-click SOP generation' },
  liveNews: { zh: '实时资讯', en: 'Live News' },
  liveNewsDesc: { zh: '政策动态追踪', en: 'Policy updates tracking' },
};

export default function Dashboard() {
  const [lang, setLang] = useState('zh');
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

  // 获取翻译
  const t = (key) => translations[key]?.[lang] || translations[key]?.zh || key;
  const tm = (key) => translations.modules[key];

  // 生成模块列表
  const moduleList = Object.entries(translations.modules).map(([key, m]) => ({
    path: `/${key}`,
    icon: key === 'advisor' ? '🤖' : key === 'assessment' ? '🎯' : key === 'planner' ? '🗺️' : 
          key === 'documents' ? '📝' : key === 'occupation' ? '💼' : key === 'states' ? '📊' :
          key === 'calculator' ? '💰' : key === 'news' ? '📰' : key === 'faq' ? '❓' :
          key === 'laws' ? '⚖️' : key === 'lawUpdates' ? '📜' : key === 'community' ? '👥' : '🏠',
    name: lang === 'zh' ? m.zh : m.en,
    desc: lang === 'zh' ? m.desc_zh : m.desc_en,
    color: key === 'advisor' ? 'pink' : key === 'assessment' ? 'cyan' : key === 'planner' ? 'green' :
           key === 'documents' ? 'purple' : key === 'occupation' ? 'blue' : key === 'states' ? 'emerald' :
           key === 'calculator' ? 'yellow' : key === 'news' ? 'orange' : key === 'faq' ? 'rose' :
           key === 'laws' ? 'indigo' : key === 'lawUpdates' ? 'violet' : key === 'community' ? 'fuchsia' : 'teal',
    isNew: key === 'advisor' || key === 'faq' || key === 'lawUpdates',
  }));

  return (
    <>
      <Head>
        <title>{t('siteName')}</title>
        <meta name="description" content={t('siteDesc')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              🇦🇺 {t('siteName')}
            </h1>
            <p className="text-gray-400 text-lg mb-4">{t('siteDesc')}</p>

            <div className="flex justify-center items-center gap-3 flex-wrap">
              <Link href="/login" className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition">
                🔐 {t('login')}
              </Link>
              <Link href="/admin" className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                ⚙️ {t('admin')}
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
            <h2 className="text-lg font-bold mb-4">🎯 {t('quickStart')}</h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/advisor" className="bg-pink-500/20 hover:bg-pink-500/30 px-4 py-2 rounded-lg transition">{t('step1')}</Link>
              <Link href="/assessment" className="bg-cyan-500/20 hover:bg-cyan-500/30 px-4 py-2 rounded-lg transition">{t('step2')}</Link>
              <Link href="/occupation" className="bg-green-500/20 hover:bg-green-500/30 px-4 py-2 rounded-lg transition">{t('step3')}</Link>
              <Link href="/planner" className="bg-purple-500/20 hover:bg-purple-500/30 px-4 py-2 rounded-lg transition">{t('step4')}</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div><div className="text-4xl font-bold text-cyan-400">{moduleList.length}</div><div className="text-gray-400 text-sm mt-1">{t('totalFeatures')}</div></div>
              <div><div className="text-4xl font-bold text-green-400">{moduleList.length}</div><div className="text-gray-400 text-sm mt-1">{t('completed')}</div></div>
              <div><div className="text-4xl font-bold text-yellow-400">0</div><div className="text-gray-400 text-sm mt-1">{t('inProgress')}</div></div>
              <div><div className="text-4xl font-bold text-purple-400">100%</div><div className="text-gray-400 text-sm mt-1">{t('totalProgress')}</div></div>
            </div>
          </div>

          {/* Modules */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">🚀 {t('features')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {moduleList.map((mod) => (
                <Link key={mod.path} href={mod.path}
                  className={`bg-gradient-to-r ${colorMap[mod.color]} rounded-xl p-5 transition transform hover:scale-105 hover:shadow-lg relative`}>
                  {mod.isNew && <span className="absolute top-2 right-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">NEW</span>}
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
              <h3 className="font-bold mb-3">📋 {t('projectMgmt')}</h3>
              <Link href="/admin" className="text-cyan-400 hover:underline text-sm">{t('viewDetails')}</Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold mb-3">❓ FAQ</h3>
              <Link href="/faq" className="text-rose-400 hover:underline text-sm">{t('viewDetails')}</Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold mb-3">💵 {lang === 'zh' ? '商业模式' : 'Business Model'}</h3>
              <Link href="/admin" className="text-green-400 hover:underline text-sm">{t('viewDetails')}</Link>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">⭐ {t('highlights')}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl">🤖</span>
                <div><p className="font-semibold">{t('aiAdvisor')}</p><p className="text-gray-400">{t('aiAdvisorDesc')}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🎯</span>
                <div><p className="font-semibold">{t('smartEoi')}</p><p className="text-gray-400">{t('smartEoiDesc')}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📝</span>
                <div><p className="font-semibold">{t('aiDoc')}</p><p className="text-gray-400">{t('aiDocDesc')}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📰</span>
                <div><p className="font-semibold">{t('liveNews')}</p><p className="text-gray-400">{t('liveNewsDesc')}</p></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>🚀 {t('integrated')}</p>
            <p className="mt-2">
              <Link href="/admin" className="text-cyan-400 hover:underline">{t('admin')}</Link>
              {' | '}
              <a href="/api/projects" className="text-cyan-400 hover:underline">API</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
