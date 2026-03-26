// 澳洲移民资讯板块
import React, { useState } from 'react';
import Head from 'next/head';

const newsCategories = [
  { id: 'policy', name: '移民政策', icon: '📜', color: 'blue' },
  { id: 'visa', name: '签证动态', icon: '📋', color: 'green' },
  { id: 'social', name: '社交热点', icon: '🔥', color: 'red' },
  { id: 'law', name: '法律更新', icon: '⚖️', color: 'purple' },
];

const latestNews = [
  {
    id: 1,
    title: '2026财年技术移民配额公布，189签证大幅增加',
    category: 'policy',
    source: '移民局官网',
    date: '2026-03-26',
    summary: '本财年技术移民总配额达到186,000个，比上财年增长15%...',
    hot: 98,
    url: '#'
  },
  {
    id: 2,
    title: 'NSW新州担保职业清单更新，新增30个职业',
    category: 'visa',
    source: '新州政府',
    date: '2026-03-25',
    summary: '新州政府今日更新了190和491担保职业清单，IT类职业占据主导...',
    hot: 92,
    url: '#'
  },
  {
    id: 3,
    title: '会计189邀请分降至85分，创近两年新低',
    category: 'visa',
    source: '移民局数据',
    date: '2026-03-24',
    summary: '本轮独立技术移民邀请中，会计职业仅需85分即可获邀...',
    hot: 156,
    url: '#'
  },
  {
    id: 4,
    title: 'EA工程师评估将启用新CDR考核标准',
    category: 'law',
    source: 'Engineers Australia',
    date: '2026-03-23',
    summary: '从4月1日起，EA职业评估将采用新的能力证明报告要求...',
    hot: 76,
    url: '#'
  },
  {
    id: 5,
    title: '小红书热议：DIY移民全流程经验分享',
    category: 'social',
    source: '小红书',
    date: '2026-03-25',
    summary: '博主@移民小白分享了自己DIY申请189签证的完整经历...',
    hot: 234,
    url: '#'
  },
  {
    id: 6,
    title: '485工签政策或将迎来重大调整',
    category: 'policy',
    source: '内政部公告',
    date: '2026-03-22',
    summary: '据悉，澳洲政府正在考虑对485毕业生工签实施新的限制措施...',
    hot: 189,
    url: '#'
  },
];

const hotTopics = [
  { tag: '#189获邀', count: 12580, trend: 'up' },
  { tag: '#190州担保', count: 9834, trend: 'up' },
  { tag: '#ACS评估', count: 7654, trend: 'stable' },
  { tag: '#移民政策', count: 6543, trend: 'up' },
  { tag: '#EOI打分', count: 5432, trend: 'down' },
  { tag: '#482雇主担保', count: 4987, trend: 'up' },
  { tag: '#491偏远地区', count: 4321, trend: 'stable' },
  { tag: '#雅思备考', count: 3987, trend: 'down' },
  { tag: '#留学移民', count: 3567, trend: 'up' },
  { tag: '#EA评估', count: 3234, trend: 'stable' },
];

const visaProcessing = [
  { visa: '189', avgTime: '12-18个月', current: '14个月', trend: 'faster' },
  { visa: '190', avgTime: '14-20个月', current: '16个月', trend: 'faster' },
  { visa: '491', avgTime: '16-24个月', current: '18个月', trend: 'stable' },
  { visa: '482', avgTime: '2-4个月', current: '3个月', trend: 'faster' },
  { visa: '186', avgTime: '12-18个月', current: '15个月', trend: 'slower' },
  { visa: '485', avgTime: '3-4个月', current: '3.5个月', trend: 'stable' },
];

const socialTrends = [
  { platform: '小红书', icon: '📕', posts: 156789, growth: '+12%', color: '#FF2442' },
  { platform: '抖音', icon: '🎵', posts: 98456, growth: '+8%', color: '#00F2EA' },
  { platform: '微信群', icon: '💬', posts: 45678, growth: '+5%', color: '#07C160' },
  { platform: 'YouTube', icon: '▶️', posts: 34567, growth: '+15%', color: '#FF0000' },
  { platform: '微博', icon: '📱', posts: 23456, growth: '-2%', color: '#FF8200' },
];

export default function News() {
  const [activeTab, setActiveTab] = useState('news');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredNews = latestNews.filter(news => {
    if (selectedCategory !== 'all' && news.category !== selectedCategory) return false;
    if (searchQuery && !news.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getCategoryColor = (cat) => {
    const colors = {
      policy: 'bg-blue-500/20 text-blue-400',
      visa: 'bg-green-500/20 text-green-400',
      social: 'bg-red-500/20 text-red-400',
      law: 'bg-purple-500/20 text-purple-400',
    };
    return colors[cat] || colors.policy;
  };

  const getCategoryName = (cat) => {
    return newsCategories.find(c => c.id === cat)?.name || cat;
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const generateReport = () => {
    const today = new Date(reportDate).toLocaleDateString('zh-CN');
    const report = `# 📰 澳洲移民每日简报

**日期：${today}**
**更新时间：12:30**

---

## 📋 今日要点

### 1️⃣ 移民政策动态
${latestNews.filter(n => n.category === 'policy').map((n, i) => `${i + 1}. ${n.title} (${n.source})`).join('\n')}

### 2️⃣ 签证审理更新
${visaProcessing.map(v => `- **${v.visa}签证**：当前平均审理时间 ${v.current}`).join('\n')}

### 3️⃣ 社交媒体热点
${hotTopics.slice(0, 5).map((t, i) => `${i + 1}. ${t.tag} - ${t.count.toLocaleString()}讨论`).join('\n')}

---

## 📊 热门话题排行

| 排名 | 话题 | 讨论量 | 趋势 |
|------|------|--------|------|
${hotTopics.slice(0, 10).map((t, i) => `| ${i + 1} | ${t.tag} | ${t.count.toLocaleString()} | ${getTrendIcon(t.trend)} |`).join('\n')}

---

## ⏱️ 签证审理周期参考

| 签证类型 | 平均时间 | 当前时间 | 趋势 |
|----------|----------|----------|------|
${visaProcessing.map(v => `| ${v.visa} | ${v.avgTime} | ${v.current} | ${getTrendIcon(v.trend)} |`).join('\n')}

---

## 🔥 今日热搜

${latestNews.slice(0, 5).map((n, i) => `${i + 1}. ${n.title} (${getCategoryName(n.category)})`).join('\n')}

---

## 📱 社交媒体趋势

${socialTrends.map(s => `- **${s.platform}**：${s.posts.toLocaleString()} 相关帖子 (${s.growth})`).join('\n')}

---

**⚠️ 免责声明**
本简报内容综合自公开信息，仅供参考。具体政策请以澳洲内政部官网为准。

**📧 订阅服务**
如需每日推送，请访问我们的订阅页面。

---
*Generated by Australia Immigration Dashboard*
`;

    // 复制到剪贴板
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(report);
      alert('简报已复制到剪贴板！');
    }
    setShowReportModal(false);
  };

  return (
    <>
      <Head>
        <title>移民资讯 - 澳洲移民项目</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              📰 澳洲移民资讯
            </h1>
            <p className="text-gray-400">政策动态 · 社交热点 · 每日简报</p>
            <div className="mt-4 text-sm text-gray-500">
              ⏰ 每日 12:30 自动更新
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {[
              { id: 'news', name: '📰 最新资讯' },
              { id: 'hot', name: '🔥 热门话题' },
              { id: 'processing', name: '⏱️ 审理周期' },
              { id: 'report', name: '📊 生成简报' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* News Tab */}
          {activeTab === 'news' && (
            <div>
              {/* Search & Filter */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <div className="flex flex-wrap gap-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索资讯..."
                    className="flex-1 min-w-[200px] bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-orange-500 outline-none"
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-orange-500 outline-none"
                  >
                    <option value="all">全部分类</option>
                    {newsCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* News List */}
              <div className="space-y-4">
                {filteredNews.map(news => (
                  <div
                    key={news.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition cursor-pointer"
                    onClick={() => setSelectedNews(news)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(news.category)}`}>
                          {getCategoryName(news.category)}
                        </span>
                        <span className="text-gray-500 text-sm">{news.source}</span>
                        <span className="text-gray-500 text-sm">{news.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-orange-400">
                        <span>🔥</span>
                        <span className="font-semibold">{news.hot}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                    <p className="text-gray-400 text-sm">{news.summary}</p>
                  </div>
                ))}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <p className="text-4xl mb-4">📭</p>
                  <p>暂无相关资讯</p>
                </div>
              )}
            </div>
          )}

          {/* Hot Topics Tab */}
          {activeTab === 'hot' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Trending Topics */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">🏆 热门话题排行</h3>
                <div className="space-y-3">
                  {hotTopics.map((topic, i) => (
                    <div key={topic.tag} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          i < 3 ? 'bg-orange-500/20 text-orange-400' : 'bg-gray-700 text-gray-400'
                        }`}>
                          {i + 1}
                        </span>
                        <span className="font-semibold">{topic.tag}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm">{topic.count.toLocaleString()}</span>
                        <span className={`text-sm ${
                          topic.trend === 'up' ? 'text-green-400' : topic.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {getTrendIcon(topic.trend)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Trends */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">📱 社交媒体热度</h3>
                <div className="space-y-4">
                  {socialTrends.map(platform => (
                    <div key={platform.platform} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{platform.icon}</span>
                          <span className="font-semibold">{platform.platform}</span>
                        </div>
                        <span className={`text-sm ${
                          platform.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {platform.growth}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (platform.posts / 200000) * 100)}%`,
                            backgroundColor: platform.color
                          }}
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        {platform.posts.toLocaleString()} 相关帖子
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Processing Time Tab */}
          {activeTab === 'processing' && (
            <div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">⏱️ 当前签证审理周期</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4">签证类型</th>
                        <th className="text-center py-3 px-4">历史平均</th>
                        <th className="text-center py-3 px-4">当前时间</th>
                        <th className="text-center py-3 px-4">趋势</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visaProcessing.map(visa => (
                        <tr key={visa.visa} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-4 px-4">
                            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded font-semibold">
                              {visa.visa}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center text-gray-400">{visa.avgTime}</td>
                          <td className="py-4 px-4 text-center font-semibold">{visa.current}</td>
                          <td className="py-4 px-4 text-center">
                            <span className={`${
                              visa.trend === 'faster' ? 'text-green-400' :
                              visa.trend === 'slower' ? 'text-red-400' : 'text-gray-400'
                            }`}>
                              {visa.trend === 'faster' ? '⚡ 加速' :
                               visa.trend === 'slower' ? '🐌 减速' : '➡️ 稳定'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="font-bold mb-3">⚠️ 审理时间说明</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• 审理时间仅供参考，实际可能因个案而异</li>
                  <li>• 复杂case可能需要更长时间</li>
                  <li>•高峰期（如新财年初）审理可能较慢</li>
                  <li>• 如需查询具体进度，请通过 ImmiAccount 查看</li>
                </ul>
              </div>
            </div>
          )}

          {/* Report Tab */}
          {activeTab === 'report' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">📊 生成每日简报</h3>
                <p className="text-gray-400 text-center mb-6">
                  选择日期，自动生成结构化移民资讯简报
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">选择日期</label>
                    <input
                      type="date"
                      value={reportDate}
                      onChange={(e) => setReportDate(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-orange-500 outline-none"
                    />
                  </div>

                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">简报内容预览：</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li>📋 移民政策动态</li>
                      <li>📊 热门话题排行</li>
                      <li>⏱️ 签证审理周期</li>
                      <li>🔥 社交媒体热点</li>
                      <li>📱 各平台热度趋势</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setShowReportModal(true)}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-lg font-bold text-lg transition"
                  >
                    📥 生成简报 (Markdown)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Report Modal */}
          {showReportModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 border border-white/10 rounded-xl p-6 max-w-lg w-full">
                <h3 className="text-xl font-bold mb-4">📥 确认生成</h3>
                <p className="text-gray-400 mb-6">
                  确定要生成 {new Date(reportDate).toLocaleDateString('zh-CN')} 的每日简报吗？
                  <br />
                  简报将包含今日所有资讯汇总。
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
                  >
                    取消
                  </button>
                  <button
                    onClick={generateReport}
                    className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold"
                  >
                    确认生成
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* News Detail Modal */}
          {selectedNews && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 border border-white/10 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(selectedNews.category)}`}>
                    {getCategoryName(selectedNews.category)}
                  </span>
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="text-2xl font-bold mb-4">{selectedNews.title}</h3>
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                  <span>{selectedNews.source}</span>
                  <span>{selectedNews.date}</span>
                  <span className="text-orange-400">🔥 {selectedNews.hot}</span>
                </div>
                <p className="text-gray-300">{selectedNews.summary}</p>
                <p className="text-gray-400 text-sm mt-6">
                  * 点击阅读更多内容...
                </p>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-400">{latestNews.length}</div>
              <div className="text-gray-400 text-sm">今日资讯</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-400">{hotTopics[0].count.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">最热话题</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400">6</div>
              <div className="text-gray-400 text-sm">签证类型追踪</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">5</div>
              <div className="text-gray-400 text-sm">社交平台</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>📅 每日 12:30 自动更新 | 数据来源：公开资讯</p>
            <p className="mt-2">
              <a href="/" className="text-orange-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
