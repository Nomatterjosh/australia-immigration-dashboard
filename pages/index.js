import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useI18n } from '../lib/i18n-context';

const moduleList = [
  { path: '/advisor', icon: '🤖', key: 'advisor', color: 'pink', new: true },
  { path: '/assessment', icon: '🎯', key: 'assessment', color: 'cyan' },
  { path: '/planner', icon: '🗺️', key: 'planner', color: 'green' },
  { path: '/documents', icon: '📝', key: 'documents', color: 'purple' },
  { path: '/occupation', icon: '💼', key: 'occupation', color: 'blue' },
  { path: '/states', icon: '📊', key: 'states', color: 'emerald' },
  { path: '/calculator', icon: '💰', key: 'calculator', color: 'yellow' },
  { path: '/news', icon: '📰', key: 'news', color: 'orange' },
  { path: '/faq', icon: '❓', key: 'faq', color: 'rose', new: true },
  { path: '/laws', icon: '⚖️', key: 'laws', color: 'indigo' },
  { path: '/law-updates', icon: '📜', key: 'lawUpdates', color: 'violet', new: true },
  { path: '/community', icon: '👥', key: 'community', color: 'fuchsia' },
  { path: '/living', icon: '🏠', key: 'living', color: 'teal' },
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

export default function Dashboard() {
  const { lang, setLang, t, languages } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const modules = moduleList.map(m => ({
    ...m,
    name: t.modules[m.key]?.name || m.key,
    desc: t.modules[m.key]?.desc || '',
  }));

  useEffect(() => {
    if (searchQuery.length >= 1) {
      const q = searchQuery.toLowerCase();
      const results = modules.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.desc.toLowerCase().includes(q)
      );
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  }, [searchQuery, lang]);

  return (
    <>
      <Head>
        <title>{t.siteName}</title>
        <meta name="description" content={t.siteDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
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

            {/* Search */}
            <div className="max-w-xl mx-auto relative mb-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`🔍 ${t.search}`}
                className="w-full bg-gray-800/80 border border-gray-700 rounded-xl px-6 py-4 text-lg focus:border-cyan-500 outline-none transition"
              />
              {showSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl z-50">
                  {searchResults.length > 0 ? (
                    searchResults.map((r, i) => (
                      <Link
                        key={i}
                        href={r.path}
                        onClick={() => { setSearchQuery(''); setShowSearch(false); }}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition"
                      >
                        <span className="text-2xl">{r.icon}</span>
                        <div className="text-left">
                          <p className="font-semibold">{r.name}</p>
                          <p className="text-gray-400 text-sm">{r.desc}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-400">
                      {lang === 'zh' ? '未找到相关功能' : 'No results found'}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <Link href="/login" className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition">
                🔐 {t.login}
              </Link>
              <Link href="/admin" className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                ⚙️ {t.admin}
              </Link>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition flex items-center gap-2"
                >
                  {languages.find(l => l.code === lang)?.flag}
                  {languages.find(l => l.code === lang)?.name}
                  <span className="text-xs">▼</span>
                </button>
                {showLangMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl z-50 min-w-[140px]">
                    {languages.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 transition ${lang === l.code ? 'bg-gray-700' : ''}`}
                      >
                        <span>{l.flag}</span>
                        <span>{l.name}</span>
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
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              🎯 {t.quickStart}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {[
                { href: '/advisor', label: `1. ${t.aiAssessment}`, color: 'bg-pink-500/20 hover:bg-pink-500/30' },
                { href: '/assessment', label: `2. ${t.eoiScore}`, color: 'bg-cyan-500/20 hover:bg-cyan-500/30' },
                { href: '/occupation', label: `3. ${t.occupation}`, color: 'bg-green-500/20 hover:bg-green-500/30' },
                { href: '/planner', label: `4. ${t.planPath}`, color: 'bg-purple-500/20 hover:bg-purple-500/30' },
              ].map(item => (
                <Link key={item.href} href={item.href} className={`${item.color} px-4 py-2 rounded-lg transition`}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-4 gap-6 text-center">
              {[
                { value: modules.length, label: t.totalFeatures, color: 'text-cyan-400' },
                { value: modules.length, label: t.completed, color: 'text-green-400' },
                { value: 0, label: t.inProgress, color: 'text-yellow-400' },
                { value: '100%', label: t.totalProgress, color: 'text-purple-400' },
              ].map((s, i) => (
                <div key={i}>
                  <div className={`text-4xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Module Grid */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              🚀 {t.features}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modules.map((mod) => (
                <Link
                  key={mod.path}
                  href={mod.path}
                  className={`bg-gradient-to-r ${colorMap[mod.color]} rounded-xl p-5 transition transform hover:scale-105 hover:shadow-lg relative`}
                >
                  {mod.new && (
                    <span className="absolute top-2 right-2 bg-white/20 text-xs px-2 py-0.5 rounded-full">
                      {t.new}
                    </span>
                  )}
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
              <p className="text-gray-400 text-sm mb-3">{t.projectMgmtDesc}</p>
              <Link href="/admin" className="text-cyan-400 hover:underline text-sm">
                {t.viewDetails}
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold mb-3">❓ FAQ</h3>
              <p className="text-gray-400 text-sm mb-3">
                {lang === 'zh' ? 'FAQ常见问题解答' : 'Common questions answered'}
              </p>
              <Link href="/faq" className="text-rose-400 hover:underline text-sm">
                {t.viewDetails}
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-bold mb-3">💵 {t.profitModel}</h3>
              <p className="text-gray-400 text-sm mb-3">{t.profitModelDesc}</p>
              <Link href="/admin" className="text-green-400 hover:underline text-sm">
                {t.viewDetails}
              </Link>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">⭐ {t.highlights}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {[
                { icon: '🤖', title: lang === 'zh' ? 'AI智能顾问' : 'AI Advisor', desc: lang === 'zh' ? '根据情况推荐签证' : 'Smart visa recommendations' },
                { icon: '🎯', title: t.smartEoi, desc: t.smartEoiDesc },
                { icon: '📝', title: t.aiDoc, desc: t.aiDocDesc },
                { icon: '📰', title: lang === 'zh' ? '实时资讯' : 'Live News', desc: lang === 'zh' ? '政策动态追踪' : 'Policy updates tracking' },
              ].map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{h.icon}</span>
                  <div>
                    <p className="font-semibold">{h.title}</p>
                    <p className="text-gray-400">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>🚀 {t.integratedPlatform}</p>
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
