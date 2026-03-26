// 移民社区 + 问答平台
import React, { useState } from 'react';
import Head from 'next/head';

const categories = [
  { id: 'visa', name: '签证申请', icon: '📋', count: 156 },
  { id: 'occupation', name: '职业评估', icon: '💼', count: 89 },
  { id: 'state', name: '州担保', icon: '🏛️', count: 124 },
  { id: 'life', name: '生活适应', icon: '🏠', count: 78 },
  { id: 'study', name: '留学移民', icon: '🎓', count: 65 },
  { id: 'work', name: '工作就业', icon: '💻', count: 92 }
];

const hotTopics = [
  { id: 1, title: '会计189邀请分涨到100了，还有希望吗？', replies: 89, likes: 234, category: 'visa' },
  { id: 2, title: 'ACS职业评估需要多久？有加急成功的吗', replies: 56, likes: 178, category: 'occupation' },
  { id: 3, title: 'NSW新财年担保政策变化抢先看', replies: 134, likes: 456, category: 'state' },
  { id: 4, title: '第一次登陆悉尼，这些事情必须知道', replies: 67, likes: 312, category: 'life' },
  { id: 5, title: 'EA CDR写作经验分享，附模板', replies: 98, likes: 567, category: 'occupation' },
  { id: 6, title: '482转186的真实经历记录', replies: 145, likes: 423, category: 'visa' }
];

const qaData = [
  {
    q: '189签证被拒了怎么办？可以上诉吗？',
    a: '独立技术移民(189)通常没有上诉权，只能申请行政复议(AAT)或重新递交。建议找移民代理分析拒签原因，针对性准备申诉材料。',
    votes: 45,
    answers: 3
  },
  {
    q: '雅思需要考到多少分才能不付语言费？',
    a: '需要达到Functional English水平，即雅思4个5或同等水平。如果达不到，需要支付$4,890的语言学习费。',
    votes: 38,
    answers: 2
  },
  {
    q: '职业评估函过期了怎么办？',
    a: '大部分职业评估函有效期为2-3年。过期后需要重新评估。建议在EOI递交前确保评估函有效，或者考虑重新评估。',
    votes: 29,
    answers: 1
  },
  {
    q: '491签证在偏远地区住了2年，可以搬家吗？',
    a: '491签证持有期间需要在指定偏远地区居住和工作。搬家需要通知移民局，建议提前咨询代理，通常需要继续在偏远地区居住直到转191。',
    votes: 52,
    answers: 4
  }
];

const userPosts = [
  {
    id: 1,
    author: 'IT移民之路',
    avatar: '👨‍💻',
    title: '我的189签证获签经历分享(95分)',
    content: '终于下签了！从开始准备到获签历时18个月，分享一下我的经验...\n\n背景：软件工程专业，8年工作经验，雅思4个7，EOI打分95分...\n\n时间线：\n• 2024.03 完成ACS评估\n• 2024.05 递交EOI\n• 2024.08 收到邀请\n• 2024.10 递交签证\n• 2025.03 获签\n\n整个过程最重要的是提前准备好所有材料，不要临时抱佛脚...',
    date: '2026-03-20',
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    author: '会计移民小王',
    avatar: '📊',
    title: 'CPA职业评估全程记录(附 Checklist)',
    content: '刚完成CPA评估，把整个流程记录下来供大家参考...\n\n准备的材料清单：\n✅ 学位证书+成绩单(需NAATI翻译)\n✅ 护照首页\n✅ 简历CV\n✅ 雇主推荐信(需要详细工作职责)\n✅ 工资单/社保记录\n\n注意事项：\n1. 成绩单需要显示所有课程的学分和分数\n2. 工作证明必须包含开始和结束日期\n3. 推荐信需要用公司抬头纸',
    date: '2026-03-18',
    likes: 178,
    comments: 32
  },
  {
    id: 3,
    author: '墨尔本新移民',
    avatar: '🏠',
    title: '登陆墨尔本第一周，这些事你必须做',
    content: '刚完成登陆，把需要处理的事情整理了一下：\n\n✅ 紧急事项(第一周)：\n1. 办理Medicare卡\n2. 开设银行账户(Commonwealth/ANZ)\n3. 申请TFN(税务号)\n4. 联系电力公司/煤气公司\n\n✅ 重要事项(第一个月)：\n1. 考取当地驾照或换取澳洲驾照\n2. 购买健康保险(OVHC)\n3. 给孩子找学校\n4. 了解当地公共交通\n\n其他建议：\n• 先租房稳定下来再买车\n• 申请Centrelink的福利卡\n• 参加社区的新移民欢迎活动',
    date: '2026-03-15',
    likes: 456,
    comments: 78
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [question, setQuestion] = useState('');
  const [questionDetail, setQuestionDetail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Head>
        <title>移民社区 - 澳洲移民</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              👥 移民社区
            </h1>
            <p className="text-gray-400">真实案例分享 · 经验交流 · 互助问答</p>
          </div>

          {/* Search Bar */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索话题、问题..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-pink-500 outline-none"
              />
              <button
                onClick={() => setShowAskModal(true)}
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold"
              >
                提问
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {[
              { id: 'posts', name: '📖 精华帖' },
              { id: 'qa', name: '❓ 问答' },
              { id: 'hot', name: '🔥 热门' },
              { id: 'categories', name: '📂 分类' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id ? 'bg-pink-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {userPosts.map(post => (
                <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center text-2xl">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{post.author}</span>
                        <span className="text-gray-500 text-sm">{post.date}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-300 text-sm whitespace-pre-line">{post.content}</p>
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-pink-400">
                          <span>❤️</span> {post.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-pink-400">
                          <span>💬</span> {post.comments}
                        </button>
                        <button className="hover:text-pink-400">收藏</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* QA Tab */}
          {activeTab === 'qa' && (
            <div className="space-y-4">
              {qaData.map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-lg">
                      ❓
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2 text-lg">{item.q}</h3>
                      <div className="bg-gray-800/50 rounded-lg p-4 mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-400 text-sm">✓ 最佳回答</span>
                        </div>
                        <p className="text-gray-300 text-sm">{item.a}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <span>👍</span> {item.votes} 赞同
                        </span>
                        <span className="flex items-center gap-1">
                          <span>💬</span> {item.answers} 回答
                        </span>
                        <button className="hover:text-pink-400">写回答</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hot Tab */}
          {activeTab === 'hot' && (
            <div className="space-y-3">
              {hotTopics.map((topic, i) => (
                <div key={topic.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded flex items-center justify-center font-bold ${
                      i < 3 ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{topic.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <span>💬</span> {topic.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>❤️</span> {topic.likes}
                        </span>
                        <span className="bg-white/10 px-2 py-0.5 rounded text-xs">
                          {categories.find(c => c.id === topic.category)?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat); setActiveTab('posts'); }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 hover:border-pink-500/50 transition"
                >
                  <span className="text-4xl mb-3 block">{cat.icon}</span>
                  <h3 className="font-bold text-lg">{cat.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{cat.count} 个话题</p>
                </div>
              ))}
            </div>
          )}

          {/* Ask Modal */}
          {showAskModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-slate-800 border border-white/10 rounded-xl p-6 max-w-xl w-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">发布问题</h2>
                  <button
                    onClick={() => setShowAskModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">问题标题</label>
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="简洁描述你的问题..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:border-pink-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">详细描述</label>
                    <textarea
                      value={questionDetail}
                      onChange={(e) => setQuestionDetail(e.target.value)}
                      placeholder="详细说明你的情况，方便大家帮助你..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:border-pink-500 outline-none h-32"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">选择分类</label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:border-pink-500 outline-none">
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      alert('问题发布成功！');
                      setShowAskModal(false);
                      setQuestion('');
                      setQuestionDetail('');
                    }}
                    className="w-full py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold"
                  >
                    发布问题
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Banner */}
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            {[
              { label: '社区成员', value: '12,456', icon: '👥' },
              { label: '讨论话题', value: '3,892', icon: '💬' },
              { label: '精选问答', value: '1,234', icon: '❓' },
              { label: '成功案例', value: '567', icon: '🎉' }
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <span className="text-2xl">{stat.icon}</span>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>⚠️ 社区内容仅供参考，请以官方信息为准</p>
            <p className="mt-2">
              <a href="/" className="text-pink-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
