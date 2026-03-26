// FAQ 常见问题板块
import React, { useState } from 'react';
import Head from 'next/head';

const faqCategories = [
  { id: 'visa', name: '签证问题', icon: '📋', color: 'blue' },
  { id: 'eoi', name: 'EOI打分', icon: '🎯', color: 'cyan' },
  { id: 'occupation', name: '职业评估', icon: '💼', color: 'green' },
  { id: 'states', name: '州担保', icon: '📊', color: 'purple' },
  { id: 'life', name: '生活问题', icon: '🏠', color: 'orange' },
  { id: 'fees', name: '费用问题', icon: '💰', color: 'yellow' },
];

const faqs = [
  // 签证问题
  {
    category: 'visa',
    q: '189、190、491签证有什么区别？',
    a: `**189 独立技术移民签证**
- 不需要州担保
- 直接获得永久居民（PR）
- 分数要求较高，竞争激烈

**190 州担保签证**
- 需要州政府担保
- 可获得5分额外加分
- 需要承诺在担保州居住2年

**491 偏远地区担保签证**
- 需要偏远地区州担保或亲属担保
- 可获得15分额外加分
- 持有5年后满足条件可转PR`,
    popular: true,
  },
  {
    category: 'visa',
    q: '技术移民需要多少分才能获邀？',
    a: `获邀分数因职业和时期而异：

**热门职业（会计、IT等）**：通常需要95-110分
**非热门职业**：通常需要80-95分
**偏远地区491**：通常需要65-80分

建议：尽量达到85-90分以上以提高获邀机会。`,
    popular: true,
  },
  {
    category: 'visa',
    q: '签证审理需要多长时间？',
    a: `各签证审理时间参考：

- **189签证**：3-6个月
- **190签证**：6-12个月
- **491签证**：6-12个月
- **482签证**：1-3个月
- **485签证**：3-5个月

注：实际时间可能因个案情况而有所不同。`,
    popular: false,
  },
  // EOI打分问题
  {
    category: 'eoi',
    q: 'EOI打分包含哪些项目？',
    a: `EOI打分系统包含以下项目：

**年龄（最高30分）**
- 25-32岁：30分
- 18-24岁 / 33-39岁：25分

**英语能力（最高20分）**
- 雅思4个8：20分
- 雅思4个7：10分

**工作经验（最高20分）**
- 澳洲相关工作8-10年：15-20分
- 海外相关工作8-10年：5-15分

**学历（最高20分）**
- 博士：20分
- 学士/硕士：15分

**其他加分项**
- 澳洲2年学习：5分
- 偏远地区学习：5分
- 社区语言：5分
- 伴侣加分：5-10分
- 州担保：5-15分`,
    popular: true,
  },
  {
    category: 'eoi',
    q: '雅思需要考多少分才能移民？',
    a: `建议目标：
- **最低要求**：雅思4个6（PTE 50分）
- **竞争激烈职业**：建议4个8（PTE 79分）

加分对照：
- 4个7 = 10分
- 4个8 = 20分

PTE和雅思可以互相替代，分数对照可在移民局官网查询。`,
    popular: false,
  },
  {
    category: 'eoi',
    q: '没有澳洲学历可以申请技术移民吗？',
    a: `可以的，但会有影响：

**可以申请的情况：**
- 拥有海外学历 + 相关工作经验
- 通过职业评估认可

**缺少的优势：**
- 失去5分澳洲学习加分
- 可能需要更长的澳洲工作经验来弥补`,
    popular: false,
  },
  // 职业评估问题
  {
    category: 'occupation',
    q: '职业评估是什么？为什么需要它？',
    a: `职业评估是移民申请的关键步骤：

**作用：**
- 证明你的学历和工作经验符合澳洲标准
- 不同职业由不同机构评估

**常见评估机构：**
- ACS（IT类）
- EA（工程类）
- CPA/CA/IPA（会计类）
- VETASSESS（普通职业）
- AITSL（教师类）`,
    popular: true,
  },
  {
    category: 'occupation',
    q: 'IT职业可以申请哪些签证？',
    a: `IT职业常见签证路径：

**189独立技术移民**
- 需要90-100分
- 热门职业竞争激烈

**190州担保**
- 各州要求不同
- 新州、维州IT配额较多

**491偏远地区**
- 分数要求较低
- 需注意居住要求

**186雇主担保**
- 需要2年工作经验
- 需要雇主担保`,
    popular: false,
  },
  {
    category: 'occupation',
    q: '职业评估需要准备哪些材料？',
    a: `常见材料清单：

**学历证明**
- 毕业证、学位证
- 成绩单（需公证）

**工作证明**
- 推荐信（需公司盖章）
- 工资单、税单
- 社保记录

**其他材料**
- 简历（详细工作内容描述）
- 职业资格证
- 项目证明材料`,
    popular: false,
  },
  // 州担保问题
  {
    category: 'states',
    q: '哪个州的州担保最容易申请？',
    a: `各州担保难度对比（仅供参考）：

**新南威尔士 NSW**
- 配额多，职业广
- 分数要求相对较高

**维多利亚 VIC**
- IT、工程配额多
- 审理较快

**昆士兰 QLD**
- 职业列表较长
- 政策相对稳定

**南澳 SA**
- 偏远地区机会多
- 491相对容易

建议：根据自身职业和分数选择最合适的州。`,
    popular: true,
  },
  {
    category: 'states',
    q: '州担保获邀后可以搬到其他州吗？',
    a: `需要特别注意：

- **190签证**：有承诺居住要求，通常需要住满2年
- **491签证**：需要住在担保的偏远地区

违反居住承诺可能导致签证被取消。建议：
- 选择真正愿意居住的州
- 如需搬迁，请提前了解风险`,
    popular: false,
  },
  // 生活问题
  {
    category: 'life',
    q: '移民后如何在澳洲找工作？',
    a: `求职建议：

**准备阶段**
- 完善LinkedIn profile
- 准备澳洲本地简历
- 考取本地相关证书（如需要）

**求职渠道**
- LinkedIn、Seek、Indeed
- 华人社区求职群
- 公司官网直投

**Networking很重要**
- 参加行业活动
- 找华人社区组织
- 利用学校校友资源`,
    popular: true,
  },
  {
    category: 'life',
    q: '澳洲平均生活成本是多少？',
    a: `悉尼/墨尔本生活成本参考：

**每月开支（单人）**
- 房租：$1500-2500
- 餐饮：$400-800
- 交通：$100-200
- 水电煤网：$150-250
- 其他：$200-400

**总计**：约$2500-5000/月

偏远地区成本会低30-50%。`,
    popular: false,
  },
  // 费用问题
  {
    category: 'fees',
    q: '移民总费用大概需要多少？',
    a: `各阶段费用参考：

**签证申请费**
- 189/190：$4,765
- 491：$4,890
- 副申请人：$2,385

**职业评估费**
- ACS：$530
- EA：$1,000-1,500
- VETASSESS：$1,000

**英语考试费**
- 雅思：$395
- PTE：$410

**其他费用**
- 体检：$300-500
- 无犯罪证明：$200-500
- 中介服务费（如有）：$5,000-30,000

**总计**：约$20,000-80,000`,
    popular: true,
  },
  {
    category: 'fees',
    q: '是否可以DIY移民申请？',
    a: `可以的，以下情况适合DIY：

**DIY适合人群**
- 英语好，能理解英文材料
- 时间充裕
- 资料齐全

**建议找人帮忙的情况**
- 情况复杂（单身/离婚/有拒签史）
- 热门职业分数高
- 无澳洲本地经验

**DIY注意事项**
- 仔细阅读官方要求
- 注意材料公证认证
- 留足够时间准备`,
    popular: false,
  },
];

const popularFAQs = faqs.filter(f => f.popular);

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    if (selectedCategory !== 'all' && faq.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return faq.q.toLowerCase().includes(query) || faq.a.toLowerCase().includes(query);
    }
    return true;
  });

  const getCategoryColor = (cat) => {
    const colors = {
      visa: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      eoi: 'from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
      occupation: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      states: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      life: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      fees: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
    };
    return colors[cat] || colors.visa;
  };

  const getCategoryBg = (cat) => {
    const colors = {
      visa: 'bg-blue-500/20 text-blue-400',
      eoi: 'bg-cyan-500/20 text-cyan-400',
      occupation: 'bg-green-500/20 text-green-400',
      states: 'bg-purple-500/20 text-purple-400',
      life: 'bg-orange-500/20 text-orange-400',
      fees: 'bg-yellow-500/20 text-yellow-400',
    };
    return colors[cat] || colors.visa;
  };

  return (
    <>
      <Head><title>FAQ常见问题 - 澳洲移民项目</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              ❓ 常见问题
            </h1>
            <p className="text-gray-400">澳洲移民常见问题解答</p>
          </div>

          {/* Search */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索问题..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 focus:border-teal-500 outline-none"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-3">🔥 热门问题</h3>
            <div className="flex flex-wrap gap-2">
              {popularFAQs.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setExpandedId(i);
                    document.getElementById(`faq-${i}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-sm transition"
                >
                  {faq.q.substring(0, 15)}...
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'all' ? 'bg-teal-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              全部 ({faqs.length})
            </button>
            {faqCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat.id ? 'bg-teal-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-4xl mb-4">🔍</p>
                <p>没有找到相关问题</p>
              </div>
            ) : (
              filteredFAQs.map((faq, i) => (
                <div
                  key={i}
                  id={`faq-${i}`}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(expandedId === i ? null : i)}
                    className="w-full text-left p-5 hover:bg-white/5 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryBg(faq.category)}`}>
                        {faqCategories.find(c => c.id === faq.category)?.icon}
                      </span>
                      <span className="font-semibold">{faq.q}</span>
                      {faq.popular && <span className="text-orange-400 text-sm">🔥</span>}
                    </div>
                    <span className={`transition ${expandedId === i ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {expandedId === i && (
                    <div className="px-5 pb-5 pt-0">
                      <div className="bg-gray-800/50 rounded-lg p-4 text-gray-300 whitespace-pre-line text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-teal-400">{faqs.length}</div>
              <div className="text-gray-400 text-sm">总问题数</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-orange-400">{popularFAQs.length}</div>
              <div className="text-gray-400 text-sm">热门问题</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-400">{faqCategories.length}</div>
              <div className="text-gray-400 text-sm">分类数量</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>没有找到答案？试试 <a href="/community" className="text-teal-400 hover:underline">社区问答</a> 或 <a href="/assessment" className="text-teal-400 hover:underline">智能评估</a></p>
            <p className="mt-2"><a href="/" className="text-teal-400 hover:underline">← 返回项目看板</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
