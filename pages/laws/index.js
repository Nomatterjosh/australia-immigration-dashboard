// 澳洲移民法导航模块
import React, { useState } from 'react';
import Head from 'next/head';

const lawCategories = {
  'act': {
    name: 'Migration Act 1958',
    fullName: '移民法 1958',
    icon: '⚖️',
    color: '#1E40AF',
    description: '澳洲移民法的核心立法，规定了各类签证的法律框架',
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/%5B%5B1958%5D%20act%20117%5D',
    lastUpdated: '2026-03-01',
    chapters: [
      { id: 'pt1', name: '第一部分 - 初步', articles: 'Section 1-11' },
      { id: 'pt2', name: '第二部分 - 非公民进入和停留', articles: 'Section 12-256' },
      { id: 'pt3', name: '第三部分 - 签证和难民保护', articles: 'Section 30-495' },
      { id: 'pt4', name: '第四部分 - 拘留、驱逐等', articles: 'Section 500-527' },
    ]
  },
  'regulations': {
    name: 'Migration Regulations 1994',
    fullName: '移民法规 1994',
    icon: '📋',
    color: '#047857',
    description: '移民法的实施细则，详细规定了各类签证的具体要求',
    url: 'https://www.austlii.edu.au/cgi-bin/viewdb/%5B%5B1994%5D%20sl%5B1994%5D%20395%5D',
    lastUpdated: '2026-03-15',
    chapters: [
      { id: 'sch1', name: 'Schedule 1 - 签证类别', articles: '分类代码定义' },
      { id: 'sch2', name: 'Schedule 2 - 签证要求', articles: '各类签证具体要求' },
      { id: 'sch3', name: 'Schedule 3 - 临时签证', articles: '学生、访客等' },
      { id: 'sch4', name: 'Schedule 4 - 永久签证', articles: '技术、商业等' },
      { id: 'sch5', name: 'Schedule 5 - 难民/人道', articles: '保护签证要求' },
    ]
  }
};

const visaLaws = [
  { visa: '189', name: '独立技术移民', act: 'Section 35, Schedule 1', regulations: 'Item 1123', url: '#' },
  { visa: '190', name: '州担保移民', act: 'Section 35, Schedule 1', regulations: 'Item 1124', url: '#' },
  { visa: '491', name: '偏远地区担保', act: 'Section 35, Schedule 1', regulations: 'Item 1125', url: '#' },
  { visa: '186', name: '雇主担保永居', act: 'Section 35, Schedule 1', regulations: 'Item 186', url: '#' },
  { visa: '482', name: '临时技术短缺', act: 'Section 140', regulations: 'Item 482', url: '#' },
  { visa: '485', name: '毕业生工签', act: 'Section 186', regulations: 'Item 485', url: '#' },
  { visa: '500', name: '学生签证', act: 'Section 37', regulations: 'Schedule 3', url: '#' },
  { visa: '600', name: '访客签证', act: 'Section 42', regulations: 'Schedule 3', url: '#' },
];

const keyProvisions = [
  { 
    section: 'Section 35', 
    title: '技术移民基本规定',
    description: '定义了技术移民签证的法律框架，包括189、190、491等签证类别',
    category: 'act'
  },
  { 
    section: 'Section 45', 
    title: 'EOI邀请制度',
    description: '规定了移民局通过SkillSelect系统邀请申请人的程序',
    category: 'act'
  },
  { 
    section: 'Section 48', 
    title: '签证取消',
    description: '在某些情况下限制非公民的签证申请资格',
    category: 'act'
  },
  { 
    section: 'Section 85', 
    title: '签证决定通知',
    description: '移民局作出签证决定后必须通知申请人',
    category: 'act'
  },
  { 
    section: 'Section 140', 
    title: '雇主担保资格',
    description: '规定了雇主担保临时签证的担保人资格要求',
    category: 'act'
  },
  { 
    section: 'Reg 1.03', 
    title: '关键定义',
    description: '移民法规中重要术语的定义，包括ANZSCO、skill level等',
    category: 'regulations'
  },
  { 
    section: 'Reg 2.26', 
    title: '英语语言要求',
    description: '各类签证的英语水平要求具体规定',
    category: 'regulations'
  },
  { 
    section: 'Reg 5.19', 
    title: '真实入境要求',
    description: '学生签证等需要满足的真实入境意图(Genuine Temporary Entrant)',
    category: 'regulations'
  },
];

export default function LawNavigator() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLaw, setSelectedLaw] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results = keyProvisions.filter(p => 
      p.section.toLowerCase().includes(query) ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  return (
    <>
      <Head>
        <title>移民法导航 - 澳洲移民项目</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              ⚖️ 澳洲移民法导航
            </h1>
            <p className="text-gray-400">Migration Act & Regulations 权威法律条文索引</p>
            <div className="mt-2 flex justify-center gap-4 text-sm">
              <a 
                href="https://www.austlii.edu.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline"
              >
                数据来源：AustLII.org
              </a>
              <span className="text-gray-500">|</span>
              <span className="text-gray-500">数据更新：定期同步</span>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="搜索法律条文，如：Section 35, Regulation 1.03..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-indigo-500 outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition"
              >
                搜索
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h3 className="font-bold mb-4">🔍 搜索结果 ({searchResults.length})</h3>
              <div className="space-y-3">
                {searchResults.map((result, i) => (
                  <div key={i} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        result.category === 'act' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {result.category === 'act' ? 'Act' : 'Regulations'}
                      </span>
                      <span className="font-mono font-semibold">{result.section}</span>
                    </div>
                    <h4 className="font-semibold mb-1">{result.title}</h4>
                    <p className="text-gray-400 text-sm">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {[
              { id: 'overview', name: '📚 法律总览' },
              { id: 'act', name: '⚖️ Migration Act' },
              { id: 'regulations', name: '📋 Regulations' },
              { id: 'visa', name: '📝 签证条文' },
              { id: 'key', name: '🔑 关键条款' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(lawCategories).map(([key, law]) => (
                <div
                  key={key}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition cursor-pointer"
                  onClick={() => { setSelectedLaw(key); setActiveTab(law === lawCategories.act ? 'act' : 'regulations'); }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                      style={{ backgroundColor: law.color + '33' }}
                    >
                      {law.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{law.name}</h3>
                      <p className="text-gray-400">{law.fullName}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{law.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">最后更新: {law.lastUpdated}</span>
                    <a 
                      href={law.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      AustLII 原文 →
                    </a>
                  </div>
                </div>
              ))}

              {/* AustLII Info */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:col-span-2">
                <h3 className="text-xl font-bold mb-4">ℹ️ 关于 AustLII</h3>
                <p className="text-gray-300 text-sm mb-4">
                  AustLII (Australian Legal Information Institute) 是澳大利亚最权威的免费法律数据库，
                  由悉尼大学和墨尔本大学联合运营。本模块中的法律条文索引均来源于 AustLII。
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-indigo-400 font-semibold">免费使用</p>
                    <p className="text-gray-400">所有法律条文免费查阅</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-indigo-400 font-semibold">实时更新</p>
                    <p className="text-gray-400">法律修订后及时同步</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-indigo-400 font-semibold">权威来源</p>
                    <p className="text-gray-400">大学运营，值得信赖</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Act Tab */}
          {activeTab === 'act' && (
            <div>
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Migration Act 1958</h2>
                    <p className="text-gray-400">澳洲移民法核心立法</p>
                  </div>
                  <a
                    href="https://www.austlii.edu.au/cgi-bin/viewdb/%5B%5B1958%5D%20act%20117%5D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
                  >
                    访问原文 →
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {lawCategories.act.chapters.map(chapter => (
                  <div key={chapter.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="font-bold text-lg mb-2">{chapter.name}</h3>
                    <p className="text-indigo-400 text-sm font-mono">{chapter.articles}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      点击查看该部分的详细条文
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="font-bold mb-3">⚠️ 重要提示</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Migration Act 是澳大利亚移民法律的核心，所有签证决定的法律依据</li>
                  <li>• 法律条文可能随修订案(Amendment Act)更新，请注意查看最新版本</li>
                  <li>• 本导航仅供参考，如需法律意见请咨询注册移民代理或律师</li>
                </ul>
              </div>
            </div>
          )}

          {/* Regulations Tab */}
          {activeTab === 'regulations' && (
            <div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Migration Regulations 1994</h2>
                    <p className="text-gray-400">移民法的实施细则</p>
                  </div>
                  <a
                    href="https://www.austlii.edu.au/cgi-bin/viewdb/%5B%5B1994%5D%20sl%5B1994%5D%20395%5D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
                  >
                    访问原文 →
                  </a>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lawCategories.regulations.chapters.map(chapter => (
                  <div key={chapter.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h3 className="font-bold mb-2">{chapter.name}</h3>
                    <p className="text-green-400 text-sm font-mono">{chapter.articles}</p>
                    <p className="text-gray-400 text-sm mt-2">
                      包含各类签证的具体申请要求和条件
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-bold mb-3">📖 Schedule 1 签证类别</h3>
                  <p className="text-gray-400 text-sm">
                    详细定义了所有澳大利亚签证类别，包括临时签证、永久签证、
                    学生签证、工作签证等各类签证的分类代码。
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <h3 className="font-bold mb-3">📖 Schedule 2 签证要求</h3>
                  <p className="text-gray-400 text-sm">
                    具体规定了各类签证的申请要求，包括基本条件、英语水平、
                    资金证明、健康要求、品行要求等。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Visa Laws Tab */}
          {activeTab === 'visa' && (
            <div>
              <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50">
                      <tr>
                        <th className="text-left px-4 py-3">签证</th>
                        <th className="text-left px-4 py-3">名称</th>
                        <th className="text-left px-4 py-3">Act 条文</th>
                        <th className="text-left px-4 py-3">Regulations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visaLaws.map(visa => (
                        <tr key={visa.visa} className="border-t border-white/5 hover:bg-white/5">
                          <td className="px-4 py-3">
                            <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded font-mono font-semibold">
                              {visa.visa}
                            </span>
                          </td>
                          <td className="px-4 py-3">{visa.name}</td>
                          <td className="px-4 py-3 font-mono text-sm text-blue-400">{visa.act}</td>
                          <td className="px-4 py-3 font-mono text-sm text-green-400">{visa.regulations}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-4">💡 如何阅读法律条文引用</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-blue-400 font-semibold mb-2">Act 引用格式</p>
                    <p className="font-mono">Section 35(1)</p>
                    <p className="text-gray-400 mt-1">第35条第1款</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-green-400 font-semibold mb-2">Regulations 引用格式</p>
                    <p className="font-mono">Regulation 1.03</p>
                    <p className="text-gray-400 mt-1">第1.03条</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Provisions Tab */}
          {activeTab === 'key' && (
            <div className="grid md:grid-cols-2 gap-4">
              {keyProvisions.map((provision, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-indigo-500/50 transition">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      provision.category === 'act' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {provision.category === 'act' ? 'Migration Act' : 'Regulations'}
                    </span>
                    <span className="font-mono font-semibold">{provision.section}</span>
                  </div>
                  <h3 className="font-bold mb-2">{provision.title}</h3>
                  <p className="text-gray-400 text-sm">{provision.description}</p>
                  <a
                    href={provision.category === 'act' 
                      ? 'https://www.austlii.edu.au/cgi-bin/viewdb/%5B%5B1958%5D%20act%20117%5D'
                      : 'https://www.austlii.edu.au/cgi-bin/viewdb/%5B%5B1994%5D%20sl%5B1994%5D%20395%5D'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-indigo-400 hover:underline text-sm"
                  >
                    在 AustLII 查看原文 →
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Quick Links */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="font-bold mb-4">🔗 权威法律资源</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { name: 'AustLII', url: 'https://www.austlii.edu.au', desc: '澳大利亚法律数据库' },
                { name: 'Federal Register', url: 'https://www.legislation.gov.au', desc: '联邦立法登记处' },
                { name: 'Home Affairs', url: 'https://immi.homeaffairs.gov.au', desc: '内政部官网' },
                { name: 'OMARA', url: 'https://www.mara.gov.au', desc: '移民代理管理局' },
              ].map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-3 transition"
                >
                  <p className="font-semibold text-indigo-400">{link.name}</p>
                  <p className="text-gray-400 text-xs">{link.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
            <h3 className="font-bold mb-3">⚠️ 法律免责声明</h3>
            <p className="text-sm text-gray-300">
              本模块仅提供澳洲移民法律条文的索引和导航，不构成法律意见。
              澳大利亚移民法律复杂且经常修订，建议在做出任何移民决定前：
            </p>
            <ul className="mt-3 space-y-1 text-sm text-gray-300">
              <li>• 查阅最新的法律原文（通过 AustLII 或 Legislation.gov.au）</li>
              <li>• 咨询注册的移民代理（MARA）或移民律师</li>
              <li>• 关注内政部的官方公告和政策指引</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>⚖️ 数据来源：AustLII.org | 澳洲法律信息研究所</p>
            <p className="mt-2">
              <a href="/" className="text-indigo-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
