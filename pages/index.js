import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const modules = [
  { path: '/assessment', icon: '🎯', name: '签证评估', color: 'cyan', desc: 'EOI打分计算' },
  { path: '/planner', icon: '🗺️', name: '路径规划', color: 'green', desc: '智能推荐路径' },
  { path: '/documents', icon: '📝', name: '文书助手', color: 'purple', desc: 'SOP/推荐信生成' },
  { path: '/occupation', icon: '💼', name: '职业评估', color: 'blue', desc: 'ANZSCO查询' },
  { path: '/states', icon: '📊', name: '州担保', color: 'emerald', desc: '实时追踪' },
  { path: '/calculator', icon: '💰', name: '费用计算', color: 'yellow', desc: '全流程费用' },
  { path: '/community', icon: '👥', name: '社区问答', color: 'pink', desc: '经验分享' },
  { path: '/living', icon: '🏠', name: '生活助手', color: 'teal', desc: '落地清单' },
];

const stats = {
  total: 8,
  completed: 8,
  inProgress: 0,
  avgProgress: 100
};

const getColorClass = (color) => {
  const colors = {
    cyan: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
    yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
    teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
  };
  return colors[color] || colors.cyan;
};

const getAccentColor = (color) => {
  const colors = {
    cyan: 'text-cyan-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
    yellow: 'text-yellow-400',
    pink: 'text-pink-400',
    teal: 'text-teal-400',
  };
  return colors[color] || colors.cyan;
};

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>澳洲移民项目 - 一体化平台</title>
        <meta name="description" content="澳洲移民一体化解决方案平台" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              🇦🇺 澳洲移民项目
            </h1>
            <p className="text-gray-400 text-lg mb-6">一体化移民解决方案平台</p>
            <div className="flex justify-center gap-4">
              <Link href="/admin" className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                ⚙️ 管理后台
              </Link>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/30 rounded-xl p-6 mb-10">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-cyan-400">{stats.total}</div>
                <div className="text-gray-400 text-sm mt-1">核心功能</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400">{stats.completed}</div>
                <div className="text-gray-400 text-sm mt-1">已完成</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-yellow-400">{stats.inProgress}</div>
                <div className="text-gray-400 text-sm mt-1">进行中</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400">{stats.avgProgress}%</div>
                <div className="text-gray-400 text-sm mt-1">总进度</div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🚀</span> 功能导航
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {modules.map((mod) => (
                <Link
                  key={mod.path}
                  href={mod.path}
                  className={`bg-gradient-to-r ${getColorClass(mod.color)} rounded-xl p-5 transition transform hover:scale-105 hover:shadow-lg`}
                >
                  <div className="text-4xl mb-2">{mod.icon}</div>
                  <div className="font-bold text-lg mb-1">{mod.name}</div>
                  <div className="text-sm opacity-80">{mod.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>📋</span> 项目管理
              </h3>
              <p className="text-gray-400 text-sm mb-4">查看项目进度详情，管理功能模块状态</p>
              <Link href="/admin" className="inline-block px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition text-sm">
                进入管理后台 →
              </Link>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>💵</span> 盈利模式
              </h3>
              <p className="text-gray-400 text-sm mb-4">了解平台的商业模式和收入来源</p>
              <Link href="/admin" className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition text-sm">
                查看盈利模式 →
              </Link>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>⭐</span> 核心功能亮点
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <div>
                  <p className="font-semibold">智能 EOI 打分</p>
                  <p className="text-gray-400">精准计算分数，对标邀请线</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400">✓</span>
                <div>
                  <p className="font-semibold">AI 文书生成</p>
                  <p className="text-gray-400">一键生成 SOP、推荐信等材料</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <div>
                  <p className="font-semibold">职业评估导航</p>
                  <p className="text-gray-400">ANZSCO 代码查询全攻略</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-yellow-400">✓</span>
                <div>
                  <p className="font-semibold">费用透明化</p>
                  <p className="text-gray-400">全流程费用一目了然</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm">
            <p>🚀 一体化移民解决方案平台</p>
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
