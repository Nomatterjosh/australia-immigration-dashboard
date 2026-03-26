// 移民后生活助手
import React, { useState } from 'react';
import Head from 'next/head';

const checklists = {
  urgent: {
    name: '紧急事项',
    icon: '🚨',
    color: 'red',
    items: [
      { id: 'medicare', name: '申请 Medicare 卡', desc: '澳洲全民医疗保险，必办', url: 'https://www.servicesaustralia.gov.au/medicare' },
      { id: 'bank', name: '开设银行账户', desc: 'Commonwealth/ANZ/CBA 选择多', url: 'https://www.commbank.com.au' },
      { id: 'tfn', name: '申请 TFN 税号', desc: '到税务局 ATO 申请', url: 'https://www.ato.gov.au' },
      { id: 'address', name: '登记住址', desc: '落地14天内通知移民局', url: '' }
    ]
  },
  firstMonth: {
    name: '第一个月',
    icon: '📅',
    color: 'orange',
    items: [
      { id: 'license', name: '考取/换取澳洲驾照', desc: '各州要求不同，优先办理', url: 'https://www.service.nsw.gov.au' },
      { id: 'ovhc', name: '购买健康保险 OVHC', desc: '签证要求，留学生需OVSHIP', url: '' },
      { id: 'sim', name: '办理手机卡', desc: 'Telstra/Vodafone/Optus 对比', url: '' },
      { id: 'rent', name: '租房/买房', desc: '了解当地租房市场和合同', url: '' },
      { id: 'utilities', name: '开通水电煤气', desc: '联系各市政公司', url: '' }
    ]
  },
  thirdMonth: {
    name: '前三个月',
    icon: '🏠',
    color: 'blue',
    items: [
      { id: 'centrelink', name: '联系 Centrelink', desc: '了解可享受的福利', url: 'https://www.centrelink.gov.au' },
      { id: 'school', name: '孩子入学', desc: '联系当地教育局或学校', url: '' },
      { id: 'local', name: '融入当地社区', desc: '参加社区活动，结识邻居', url: '' },
      { id: 'transport', name: '了解公共交通', desc: 'Opal卡/MyMulti公交卡', url: '' },
      { id: 'emergency', name: '记录紧急电话', desc: '000 报警/急救/消防', url: '' }
    ]
  }
};

const resources = {
  government: {
    name: '政府服务',
    icon: '🏛️',
    items: [
      { name: 'MyGov', url: 'https://my.gov.au', desc: '一站式政府服务门户' },
      { name: 'Centrelink', url: 'https://www.centrelink.gov.au', desc: '社会福利服务' },
      { name: 'Medicare', url: 'https://www.servicesaustralia.gov.au/medicare', desc: '医疗卡申请' },
      { name: 'ATO', url: 'https://www.ato.gov.au', desc: '税务局/报税' },
      { name: 'Service NSW', url: 'https://www.service.nsw.gov.au', desc: '新州政府服务' }
    ]
  },
  banking: {
    name: '银行金融',
    icon: '🏦',
    items: [
      { name: 'Commonwealth Bank', url: 'https://www.commbank.com.au', desc: '最大银行，中文服务' },
      { name: 'ANZ', url: 'https://www.anz.com.au', desc: '澳新银行' },
      { name: 'Westpac', url: 'https://www.westpac.com.au', desc: '西太平洋银行' },
      { name: 'ING', url: 'https://www.ing.com.au', desc: '网上银行，高利率' }
    ]
  },
  health: {
    name: '医疗健康',
    icon: '🏥',
    items: [
      { name: 'Healthdirect', url: 'https://www.healthdirect.gov.au', desc: '24小时健康热线 1800 022 222' },
      { name: 'Find a GP', url: 'https://www.healthdirect.gov.au/australian-health-services', desc: '找全科医生' },
      { name: 'Poisons Information', url: 'https://www.poisonsinfo.nsw.gov.au', desc: '中毒信息中心 13 11 26' }
    ]
  },
  education: {
    name: '教育培训',
    icon: '🎓',
    items: [
      { name: '教育局', url: '', desc: '各州教育局网站' },
      { name: 'TAFE', url: 'https://www.tafensw.edu.au', desc: '职业教育和培训' },
      { name: 'Universities Australia', url: 'https://www.universitiesaustralia.edu.au', desc: '大学联盟' }
    ]
  },
  emergency: {
    name: '紧急电话',
    icon: '🚨',
    items: [
      { name: '紧急求助', url: '', desc: '000 (警察/救护车/消防)' },
      { name: 'SES 风暴洪水', url: '', desc: '132 500' },
      { name: '中文翻译热线', url: '', desc: '131 450' }
    ]
  }
};

const cityGuides = {
  'sydney': {
    name: '悉尼 Sydney',
    state: 'NSW',
    population: '530万',
    icon: '🗼',
    highlights: ['歌剧院', '海港大桥', 'Bondi海滩', '蓝山'],
    cost: '房租AUD 400-800/周',
    tips: '最大城市，华人多，生活便利'
  },
  'melbourne': {
    name: '墨尔本 Melbourne',
    state: 'VIC',
    population: '500万',
    icon: '🎨',
    highlights: ['涂鸦街', '咖啡文化', '大洋路', 'NGV艺术展'],
    cost: '房租AUD 350-750/周',
    tips: '文化之都，生活质量高'
  },
  'brisbane': {
    name: '布里斯班 Brisbane',
    state: 'QLD',
    population: '250万',
    icon: '🌴',
    highlights: ['故事桥', '南岸公园', '龙柏动物园'],
    cost: '房租AUD 300-600/周',
    tips: '阳光之州，气候温暖'
  },
  'perth': {
    name: '珀斯 Perth',
    state: 'WA',
    population: '210万',
    icon: '🏖️',
    highlights: ['天鹅河', '弗里曼特尔', '罗特尼斯岛'],
    cost: '房租AUD 350-650/周',
    tips: '与北京无时差，偏远但美丽'
  },
  'adelaide': {
    name: '阿德莱德 Adelaide',
    state: 'SA',
    population: '135万',
    icon: '🍷',
    highlights: ['葡萄酒产区', '中央市场', '袋鼠岛'],
    cost: '房租AUD 280-500/周',
    tips: '偏远但生活质量高，成本低'
  },
  'hobart': {
    name: '霍巴特 Hobart',
    state: 'TAS',
    population: '25万',
    icon: '🎭',
    highlights: ['MONA博物馆', '酒杯湾', '摇篮山'],
    cost: '房租AUD 250-450/周',
    tips: '最实惠的首府城市'
  }
};

export default function LifeAssistant() {
  const [activeTab, setActiveTab] = useState('checklist');
  const [completedItems, setCompletedItems] = useState({});
  const [selectedCity, setSelectedCity] = useState('sydney');

  const toggleItem = (id) => {
    setCompletedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const progress = Object.values(completedItems).filter(Boolean).length;
  const totalItems = Object.values(checklists).reduce((sum, cat) => sum + cat.items.length, 0);
  const progressPercent = Math.round((progress / totalItems) * 100);

  return (
    <>
      <Head>
        <title>移民后生活助手 - 澳洲移民</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              🏠 移民后生活助手
            </h1>
            <p className="text-gray-400">落地清单 · 生活指南 · 资源导航</p>
          </div>

          {/* Progress Banner */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold">落地准备进度</span>
              <span className="text-2xl font-bold text-cyan-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">{progress}/{totalItems} 项已完成</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {[
              { id: 'checklist', name: '✅ 落地清单' },
              { id: 'cities', name: '🏙️ 城市选择' },
              { id: 'resources', name: '🔗 资源导航' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id ? 'bg-cyan-500 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="space-y-6">
              {Object.entries(checklists).map(([key, category]) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{category.icon}</span>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      category.color === 'red' ? 'bg-red-500/20 text-red-400' :
                      category.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {category.items.length} 项
                    </span>
                  </div>
                  <div className="space-y-3">
                    {category.items.map(item => (
                      <div 
                        key={item.id}
                        className={`flex items-start gap-3 p-4 rounded-lg transition ${
                          completedItems[item.id] 
                            ? 'bg-green-500/10 border border-green-500/30' 
                            : 'bg-gray-800/50 border border-transparent'
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            completedItems[item.id] 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-500'
                          }`}
                        >
                          {completedItems[item.id] && '✓'}
                        </button>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${completedItems[item.id] ? 'line-through text-gray-400' : ''}`}>
                            {item.name}
                          </h4>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                          {item.url && (
                            <a 
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:underline text-sm mt-1 inline-block"
                            >
                              访问网站 →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cities Tab */}
          {activeTab === 'cities' && (
            <div>
              {/* City Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(cityGuides).map(([key, city]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCity(key)}
                    className={`px-4 py-2 rounded-lg transition ${
                      selectedCity === key 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {city.icon} {city.name}
                  </button>
                ))}
              </div>

              {/* City Details */}
              {cityGuides[selectedCity] && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{cityGuides[selectedCity].icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{cityGuides[selectedCity].name}</h2>
                      <p className="text-gray-400">{cityGuides[selectedCity].state} · {cityGuides[selectedCity].population}人口</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 text-blue-400">🏆 特色亮点</h3>
                      <div className="flex flex-wrap gap-2">
                        {cityGuides[selectedCity].highlights.map((h, i) => (
                          <span key={i} className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">{h}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-green-400">💰 生活成本参考</h3>
                      <p className="text-lg">{cityGuides[selectedCity].cost}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-gray-300">{cityGuides[selectedCity].tips}</p>
                  </div>
                </div>
              )}

              {/* City Comparison */}
              <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-4">📊 城市对比</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left border-b border-white/10">
                        <th className="pb-2">城市</th>
                        <th className="pb-2">房租(1BR)</th>
                        <th className="pb-2">华人社区</th>
                        <th className="pb-2">就业机会</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(cityGuides).map(city => (
                        <tr key={city.name} className="border-b border-white/5">
                          <td className="py-2">{city.icon} {city.name}</td>
                          <td className="py-2">{city.cost.split(' ')[1]}</td>
                          <td className="py-2">
                            {'★'.repeat(city.name === '悉尼' ? 5 : city.name === '墨尔本' ? 5 : city.name === '布里斯班' ? 3 : 2)}
                          </td>
                          <td className="py-2">
                            {'★'.repeat(city.name === '悉尼' ? 5 : city.name === '墨尔本' ? 4 : city.name === '珀斯' ? 3 : 2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(resources).map(([key, section]) => (
                <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="font-bold text-lg">{section.name}</h3>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="bg-gray-800/50 rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-gray-400 text-sm">{item.desc}</p>
                          </div>
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:underline text-sm shrink-0 ml-2"
                            >
                              访问
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Tips */}
          <div className="mt-8 bg-green-500/20 border border-green-500/30 rounded-xl p-6">
            <h3 className="font-bold mb-4">💡 新移民实用建议</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-green-400 mb-1">📱 必下 APP</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Service NSW / Service Victoria (政府服务)</li>
                  <li>• Centrelink (福利服务)</li>
                  <li>• CommBank / ANZ (手机银行)</li>
                  <li>• Google Maps / 澳觅 (地图/外卖)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-400 mb-1">🏷️ 省钱技巧</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• 用 rewards 积分卡 (flybuys, everyday rewards)</li>
                  <li>• 周二电影票打折</li>
                  <li>• 周五晚上超市半价清仓</li>
                  <li>• 加入本地华人社区群获取信息</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>⚠️ 信息仅供参考，请以官方最新公告为准</p>
            <p className="mt-2">
              <a href="/" className="text-cyan-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
