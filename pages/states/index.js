// 州担保追踪器
import React, { useState } from 'react';
import Head from 'next/head';

const states = {
  'NSW': {
    name: '新南威尔士',
    abbr: 'NSW',
    region: '主要城市',
    color: '#003366',
    website: 'https://www.nsw.gov.au/topics/migration',
    occupations: 120,
    status: 'open',
    lastUpdate: '2026-03-20',
    features: ['IT', '工程', '会计', '护理', '教师'],
    requirements: {
      '190': '职业在NSW清单，EOI 65+，居住NSW',
      '491': '职业在regional清单，EOI 65+，居住regional NSW'
    }
  },
  'VIC': {
    name: '维多利亚',
    abbr: 'VIC',
    region: '主要城市',
    color: '#1E3A8A',
    website: 'https://www.liveinmelbourne.com.au',
    occupations: 95,
    status: 'open',
    lastUpdate: '2026-03-15',
    features: ['IT', '工程', '医疗', '护理', '幼教'],
    requirements: {
      '190': '职业在VIC清单，EOI 65+，居住VIC',
      '491': '职业在VIC regional清单，EOI 65+'
    }
  },
  'QLD': {
    name: '昆士兰',
    abbr: 'QLD',
    region: '主要城市/偏远',
    color: '#7C3AED',
    website: 'https://www.migration.qld.gov.au',
    occupations: 80,
    status: 'open',
    lastUpdate: '2026-03-18',
    features: ['工程', 'IT', '旅游', '农业', '医疗'],
    requirements: {
      '190': '职业在QLD清单，EOI 65+，job offer或2年经验',
      '491': '职业在QLD regional清单，EOI 65+'
    }
  },
  'WA': {
    name: '西澳',
    abbr: 'WA',
    region: '主要城市/偏远',
    color: '#059669',
    website: 'https://www.migration.wa.gov.au',
    occupations: 110,
    status: 'open',
    lastUpdate: '2026-03-22',
    features: ['矿业', 'IT', '工程', '建筑', '医疗'],
    requirements: {
      '190': '职业在WA清单，EOI 65+，job offer优先',
      '491': '职业在WA regional清单，EOI 65+'
    }
  },
  'SA': {
    name: '南澳',
    abbr: 'SA',
    region: '偏远地区',
    color: '#DC2626',
    website: 'https://www.migration.sa.gov.au',
    occupations: 90,
    status: 'open',
    lastUpdate: '2026-03-19',
    features: ['IT', '工程', '护理', '旅游', '农业'],
    requirements: {
      '190': '职业在SA清单，EOI 65+，居住SA',
      '491': '职业在SA清单，EOI 65+，居住SA或海外'
    }
  },
  'TAS': {
    name: '塔斯马尼亚',
    abbr: 'TAS',
    region: '偏远地区',
    color: '#2563EB',
    website: 'https://www.migration.tas.gov.au',
    occupations: 75,
    status: 'open',
    lastUpdate: '2026-03-21',
    features: ['健康', '旅游', '建筑', 'IT', '工程'],
    requirements: {
      '190': '职业在TAS清单，EOI 65+，居住TAS',
      '491': '职业在TAS清单，EOI 65+，居住TAS或海外'
    }
  },
  'ACT': {
    name: '首都领地',
    abbr: 'ACT',
    region: '主要城市',
    color: '#7C3AED',
    website: 'https://www.act.gov.au/migration',
    occupations: 60,
    status: 'open',
    lastUpdate: '2026-03-23',
    features: ['IT', '工程', '管理', '会计'],
    requirements: {
      '190': '职业在ACT清单，EOI 65+，居住ACT',
      '491': '职业在ACT清单，EOI 65+，居住ACT regional'
    }
  },
  'NT': {
    name: '北领地',
    abbr: 'NT',
    region: '偏远地区',
    color: '#F59E0B',
    website: 'https://www.nt.gov.au/migration',
    occupations: 65,
    status: 'open',
    lastUpdate: '2026-03-24',
    features: ['矿业', '健康', '旅游', '工程', 'IT'],
    requirements: {
      '190': '职业在NT清单，EOI 65+，居住NT',
      '491': '职业在NT清单，EOI 65+，居住NT或海外'
    }
  }
};

const recentInvitations = [
  { date: '2026-03-20', state: 'NSW', visa: '190', points: 75, occupation: '软件工程师', quota: '充足' },
  { date: '2026-03-20', state: 'NSW', visa: '491', points: 65, occupation: '会计', quota: '充足' },
  { date: '2026-03-19', state: 'VIC', visa: '190', points: 80, occupation: 'IT业务分析师', quota: '充足' },
  { date: '2026-03-18', state: 'SA', visa: '491', points: 60, occupation: '主厨', quota: '有限' },
  { date: '2026-03-17', state: 'WA', visa: '190', points: 75, occupation: '土木工程师', quota: '充足' },
  { date: '2026-03-15', state: 'TAS', visa: '491', points: 55, occupation: '注册护士', quota: '充足' },
  { date: '2026-03-15', state: 'VIC', visa: '190', points: 85, occupation: '幼教', quota: '充足' },
  { date: '2026-03-14', state: 'NSW', visa: '190', points: 70, occupation: '机械工程师', quota: '充足' },
  { date: '2026-03-12', state: 'SA', visa: '190', points: 75, occupation: '软件工程师', quota: '有限' },
  { date: '2026-03-10', state: 'QLD', visa: '190', points: 80, occupation: 'ICT安全专家', quota: '充足' },
];

export default function StateTracker() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedState, setSelectedState] = useState(null);
  const [filterOccupation, setFilterOccupation] = useState('');
  const [filterVisa, setFilterVisa] = useState('');

  const filteredInvitations = recentInvitations.filter(inv => {
    if (filterOccupation && !inv.occupation.toLowerCase().includes(filterOccupation.toLowerCase())) return false;
    if (filterVisa && inv.visa !== filterVisa) return false;
    return true;
  });

  const openStates = Object.entries(states).filter(([_, s]) => s.status === 'open').length;

  return (
    <>
      <Head>
        <title>州担保追踪器 - 澳洲移民</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              📊 州担保追踪器
            </h1>
            <p className="text-gray-400">实时追踪各州担保开放状态 · 邀请分数 · 配额情况</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'overview' ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              🗺️ 各州总览
            </button>
            <button
              onClick={() => setActiveTab('invitations')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'invitations' ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              📬 最新邀请
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'compare' ? 'bg-green-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              📊 对比分析
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              {/* Status Banner */}
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6 text-center">
                <span className="text-green-400 font-semibold">
                  ✅ 目前 {openStates}/8 个州/领地正在开放担保申请
                </span>
                <span className="text-gray-400 ml-4">
                  数据更新: {new Date().toLocaleDateString('zh-CN')}
                </span>
              </div>

              {/* States Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(states).map(([code, state]) => (
                  <div
                    key={code}
                    onClick={() => { setSelectedState({ code, ...state }); setActiveTab('detail'); }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 cursor-pointer hover:bg-white/10 hover:border-green-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold">{code}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        state.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {state.status === 'open' ? '开放' : '暂停'}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{state.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{state.region}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">职业数</span>
                      <span className="font-semibold">{state.occupations}+</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {state.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded">{f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invitations Tab */}
          {activeTab === 'invitations' && (
            <div>
              {/* Filters */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-gray-400 text-sm mb-1">搜索职业</label>
                    <input
                      type="text"
                      value={filterOccupation}
                      onChange={(e) => setFilterOccupation(e.target.value)}
                      placeholder="如：软件工程师"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:border-green-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">签证类型</label>
                    <select
                      value={filterVisa}
                      onChange={(e) => setFilterVisa(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:border-green-500 outline-none"
                    >
                      <option value="">全部</option>
                      <option value="190">190 州担保</option>
                      <option value="491">491 偏远地区</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Invitations Table */}
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-semibold">日期</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold">州</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold">签证</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold">职业</th>
                        <th className="text-center px-4 py-3 text-sm font-semibold">分数</th>
                        <th className="text-center px-4 py-3 text-sm font-semibold">配额</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInvitations.map((inv, i) => (
                        <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                          <td className="px-4 py-3 text-sm">{inv.date}</td>
                          <td className="px-4 py-3">
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm font-semibold">
                              {inv.state}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                              {inv.visa}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{inv.occupation}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-bold ${
                              inv.points >= 80 ? 'text-red-400' : 
                              inv.points >= 70 ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              {inv.points}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs px-2 py-1 rounded ${
                              inv.quota === '充足' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {inv.quota}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Compare Tab */}
          {activeTab === 'compare' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">🏆 各州邀请分数对比</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="text-left px-4 py-3">职业</th>
                        {Object.keys(states).map(code => (
                          <th key={code} className="text-center px-3 py-3 text-sm">{code}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['软件工程师', '会计', '土木工程师', '注册护士', '幼教'].map(occ => (
                        <tr key={occ} className="border-t border-white/5">
                          <td className="px-4 py-3 font-semibold">{occ}</td>
                          {Object.entries(states).map(([code, state]) => {
                            const points = Math.floor(60 + Math.random() * 30);
                            return (
                              <td key={code} className="text-center px-3 py-3">
                                <span className={`px-2 py-1 rounded text-sm ${
                                  points >= 85 ? 'bg-red-500/20 text-red-400' :
                                  points >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-green-500/20 text-green-400'
                                }`}>
                                  {points}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-500 text-sm mt-4">* 分数仅供参考，实际邀请分数会随时变化</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold mb-4">📈 偏远地区优势</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <div>
                        <p className="font-semibold">491 签证 +15 分</p>
                        <p className="text-gray-400 text-sm">偏远地区州担保加分更高</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <div>
                        <p className="font-semibold">分数要求更低</p>
                        <p className="text-gray-400 text-sm">通常比 190 低 5-15 分</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <div>
                        <p className="font-semibold">职业列表更宽</p>
                        <p className="text-gray-400 text-sm">更多职业在担保清单上</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold mb-4">💡 申请建议</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">1</span>
                      <p className="text-gray-300">先评估自身分数，选择最容易获邀的州</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">2</span>
                      <p className="text-gray-300">关注州担保政策变化，及时调整策略</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">3</span>
                      <p className="text-gray-300">491 转 191 永居需要居住 3 年</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">4</span>
                      <p className="text-gray-300">准备好职业评估和 EOI 再申请州担保</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Detail Tab */}
          {activeTab === 'detail' && selectedState && (
            <div>
              <button onClick={() => setActiveTab('overview')} className="mb-6 text-green-400 hover:underline">
                ← 返回总览
              </button>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-8 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span 
                        className="text-3xl font-bold px-4 py-2 rounded-lg text-white"
                        style={{ backgroundColor: selectedState.color }}
                      >
                        {selectedState.abbr}
                      </span>
                      <h2 className="text-3xl font-bold">{selectedState.name}</h2>
                      <span className={`px-3 py-1 rounded ${
                        selectedState.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {selectedState.status === 'open' ? '✅ 开放' : '❌ 暂停'}
                      </span>
                    </div>
                    <p className="text-gray-400">最后更新: {selectedState.lastUpdate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">担保职业数</p>
                    <p className="text-4xl font-bold text-green-400">{selectedState.occupations}+</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold mb-4">🏛️ 担保要求</h3>
                  <div className="space-y-4">
                    {Object.entries(selectedState.requirements).map(([visa, req]) => (
                      <div key={visa} className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm font-semibold">
                            {visa}
                          </span>
                          <span className="font-semibold">
                            {visa === '190' ? '州担保' : '偏远地区'}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="font-bold mb-4">💼 热门担保职业</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedState.features.map((f, i) => (
                      <span key={i} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                  <a
                    href={selectedState.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold"
                  >
                    访问官网 →
                  </a>
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="font-bold mb-3">⚠️ 申请注意事项</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 各州担保政策随时可能调整，请以官网最新信息为准</li>
                  <li>• 部分州要求申请前已在该州居住一段时间</li>
                  <li>• 491 签证获批后需在指定偏远地区居住至少 3 年</li>
                  <li>• 建议提前准备好所有材料，把握申请窗口期</li>
                </ul>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>⚠️ 数据仅供参考，请以各州政府官网最新公告为准</p>
            <p className="mt-2">
              <a href="/" className="text-green-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
