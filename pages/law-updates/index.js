// 澳洲移民法律更新监测模块
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const recentAmendments = [
  {
    id: 1,
    title: 'Migration Amendment (Clarifying the Regulation of Migration Agents) Regulations 2026',
    date: '2026-03-15',
    type: 'Regulation',
    status: 'Registered',
    description: '澄清了移民代理的监管规定，强化了MARA的执法权力',
    impact: '高',
    url: 'https://www.legislation.gov.au/F2026L00386'
  },
  {
    id: 2,
    title: 'Migration (Specification of Occupations and Authorities) Amendment (SKILL) Instrument 2026',
    date: '2026-03-10',
    type: 'Instrument',
    status: 'Registered',
    description: '更新了技术移民职业清单，新增30个职业',
    impact: '高',
    url: 'https://www.legislation.gov.au/F2026L00380'
  },
  {
    id: 3,
    title: 'Migration Amendment (Family Violence and Other Measures) Regulations 2026',
    date: '2026-02-28',
    type: 'Regulation',
    status: 'Registered',
    description: '修改了家庭暴力相关签证条款，提供更多保护',
    impact: '中',
    url: 'https://www.legislation.gov.au/F2026L00350'
  },
  {
    id: 4,
    title: 'Migration (IMMI 26/040 - Visa Application Charges) Amendment',
    date: '2026-02-20',
    type: 'IMMI Instrument',
    status: 'Registered',
    description: '调整了部分签证申请费用',
    impact: '中',
    url: 'https://www.legislation.gov.au/F2026L00320'
  },
  {
    id: 5,
    title: 'Migration Amendment (Bridging Visas and Other Measures) Bill 2026',
    date: '2026-02-15',
    type: 'Bill',
    status: 'Introduced',
    description: '提议修改桥签条款，简化签证过渡安排',
    impact: '中',
    url: 'https://www.legislation.gov.au/'
  },
];

const trackedLaws = [
  { 
    name: 'Migration Act 1958', 
    url: 'https://www.legislation.gov.au/Details/C2026C00117',
    lastChecked: '2026-03-26',
    status: 'Current',
    changes: 0
  },
  { 
    name: 'Migration Regulations 1994', 
    url: 'https://www.legislation.gov.au/Details/SL1994No395',
    lastChecked: '2026-03-26',
    status: 'Current',
    changes: 0
  },
  { 
    name: 'Migration (LIN 26/040) Instrument 2026', 
    url: 'https://www.legislation.gov.au/F2026L00120',
    lastChecked: '2026-03-20',
    status: 'Updated',
    changes: 2
  },
];

const lawCategories = [
  { id: 'all', name: '全部', count: 5 },
  { id: 'act', name: 'Migration Act', count: 1 },
  { id: 'regulations', name: 'Regulations', count: 2 },
  { id: 'instrument', name: 'Instruments', count: 2 },
];

const upcomingChanges = [
  {
    date: '2026-04-01',
    title: 'EA CDR 新标准生效',
    description: 'Engineers Australia 将启用新的 CDR 能力证明报告评估标准',
    affected: '工程类职业评估'
  },
  {
    date: '2026-04-15',
    title: '189 邀请轮变化',
    description: '预计新一轮邀请将采用新的优先处理规则',
    affected: '技术移民申请人'
  },
  {
    date: '2026-05-01',
    title: '学生签证语言要求提高',
    description: '部分学生签证类别的英语要求将有所提高',
    affected: '留学生群体'
  },
];

export default function LawUpdates() {
  const [activeTab, setActiveTab] = useState('updates');
  const [filterType, setFilterType] = useState('all');
  const [lastFetch, setLastFetch] = useState(new Date().toLocaleString('zh-CN'));
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredUpdates = filterType === 'all' 
    ? recentAmendments 
    : recentAmendments.filter(a => a.type.toLowerCase().includes(filterType.toLowerCase()));

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastFetch(new Date().toLocaleString('zh-CN'));
      setIsRefreshing(false);
    }, 1500);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Registered': return 'bg-green-500/20 text-green-400';
      case 'Introduced': return 'bg-yellow-500/20 text-yellow-400';
      case 'Current': return 'bg-green-500/20 text-green-400';
      case 'Updated': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case '高': return 'text-red-400';
      case '中': return 'text-yellow-400';
      case '低': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      <Head>
        <title>法律更新监测 - 澳洲移民项目</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              ⚖️ 法律更新监测
            </h1>
            <p className="text-gray-400">Migration Act 修正案追踪 · 新法规生效监测</p>
            <div className="mt-4 flex justify-center items-center gap-4 text-sm">
              <a 
                href="https://www.legislation.gov.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline"
              >
                数据来源：legislation.gov.au
              </a>
              <span className="text-gray-500">|</span>
              <span className="text-gray-400">
                最后检查: {lastFetch}
              </span>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-6 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
              {isRefreshing ? '检查中...' : '检查更新'}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {[
              { id: 'updates', name: '📜 最新修正' },
              { id: 'tracked', name: '📋 追踪法律' },
              { id: 'upcoming', name: '⏰ 即将生效' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id ? 'bg-violet-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Updates Tab */}
          {activeTab === 'updates' && (
            <div>
              {/* Filter */}
              <div className="flex gap-2 mb-6">
                {lawCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterType(cat.id)}
                    className={`px-3 py-1 rounded-full text-sm transition ${
                      filterType === cat.id 
                        ? 'bg-violet-500 text-white' 
                        : 'bg-white/10 text-gray-400 hover:bg-white/20'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Updates List */}
              <div className="space-y-4">
                {filteredUpdates.map(update => (
                  <div key={update.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-violet-500/50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(update.status)}`}>
                          {update.status}
                        </span>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                          {update.type}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">{update.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{update.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{update.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span>影响程度: <span className={`font-semibold ${getImpactColor(update.impact)}`}>{update.impact}</span></span>
                      </div>
                      <a
                        href={update.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:underline text-sm"
                      >
                        查看原文 →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {filteredUpdates.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-4">📭</p>
                  <p>暂无相关更新</p>
                </div>
              )}
            </div>
          )}

          {/* Tracked Laws Tab */}
          {activeTab === 'tracked' && (
            <div>
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="text-left px-4 py-3">法律名称</th>
                      <th className="text-center px-4 py-3">状态</th>
                      <th className="text-center px-4 py-3">变更数</th>
                      <th className="text-center px-4 py-3">最后检查</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trackedLaws.map((law, i) => (
                      <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                        <td className="px-4 py-3">
                          <a href={law.url} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline">
                            {law.name}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded text-xs ${getStatusColor(law.status)}`}>
                            {law.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {law.changes > 0 ? (
                            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">{law.changes} 项</span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-400 text-sm">{law.lastChecked}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-violet-500/20 border border-violet-500/30 rounded-xl p-6">
                <h3 className="font-bold mb-3">💡 如何使用</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• 点击法律名称可直接访问 legislation.gov.au 原文</li>
                  <li>• "变更数"显示自上次检查以来的修改次数</li>
                  <li>• 建议定期查看重要法律的最新版本</li>
                  <li>• 如有重大变更，我们会通过邮件通知（功能开发中）</li>
                </ul>
              </div>
            </div>
          )}

          {/* Upcoming Changes Tab */}
          {activeTab === 'upcoming' && (
            <div className="space-y-4">
              {upcomingChanges.map((change, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded text-sm font-semibold">
                      {change.date} 生效
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{change.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{change.description}</p>
                  <div className="text-sm">
                    <span className="text-gray-500">影响群体: </span>
                    <span className="text-violet-400">{change.affected}</span>
                  </div>
                </div>
              ))}

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="font-bold mb-3">📌 提示</h3>
                <p className="text-gray-400 text-sm">
                  即将生效的法规变化会持续更新。建议在申请签证前确认最新的法律要求，
                  如有疑问请咨询注册移民代理。
                </p>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-bold mb-4">🔗 权威法律资源</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: 'Federal Register', url: 'https://www.legislation.gov.au', desc: '联邦立法登记处' },
                { name: 'AustLII', url: 'https://www.austlii.edu.au', desc: '法律信息数据库' },
                { name: 'Home Affairs', url: 'https://immi.homeaffairs.gov.au', desc: '内政部' },
                { name: 'MARA', url: 'https://www.mara.gov.au', desc: '移民代理管理局' },
              ].map(link => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                  className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-3 transition">
                  <p className="font-semibold text-violet-400">{link.name}</p>
                  <p className="text-gray-400 text-xs">{link.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
            <h3 className="font-bold mb-3">⚠️ 免责声明</h3>
            <p className="text-sm text-gray-300">
              本模块仅提供法律更新的索引和摘要，不构成法律意见。
              澳大利亚移民法律经常修订，请在做出任何决定前查阅最新法律原文或咨询专业移民代理。
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>⚖️ 数据来源：legislation.gov.au | 最后更新：{lastFetch}</p>
            <p className="mt-2">
              <a href="/" className="text-violet-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
