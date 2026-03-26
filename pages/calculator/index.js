// 移民费用计算器
import React, { useState } from 'react';
import Head from 'next/head';

const visaCosts = {
  '189': {
    name: '189 独立技术移民',
    baseFee: 4715,
    description: '不需要担保，最受欢迎的技术移民签证'
  },
  '190': {
    name: '190 州担保',
    baseFee: 4715,
    nominationFee: 330,
    description: '需要州担保，可加5分'
  },
  '491': {
    name: '491 偏远地区',
    baseFee: 4715,
    nominationFee: 330,
    description: '在偏远地区居住，加15分'
  },
  '482': {
    name: '482 雇主担保(临时)',
    baseFee: 1455,
    employerSponsorship: 460,
    description: '需要雇主担保，2-4个月获批'
  },
  '186': {
    name: '186 雇主担保(永居)',
    baseFee: 4715,
    employerSponsorship: 460,
    description: '一步到位的雇主担保永居'
  },
  '188A': {
    name: '188A 商业创新',
    baseFee: 6715,
    nominationFee: 330,
    auditFee: 1000,
    description: '适合中小企业主，门槛较低'
  }
};

const assessmentCosts = {
  'ACS': { name: '计算机协会', baseFee: 350, fastFee: 500, time: '4-12周' },
  'EA': { name: '工程师协会', baseFee: 410, fastFee: 575, time: '8-16周' },
  'CPAA': { name: 'CPA Australia', baseFee: 600, fastFee: 750, time: '4-8周' },
  'ANMAC': { name: '护士协会', baseFee: 515, fastFee: 700, time: '8-12周' },
  'AITSL': { name: '教师协会', baseFee: 550, fastFee: 800, time: '8-12周' },
  'VETASSESS': { name: '职业评估', baseFee: 540, fastFee: 990, time: '8-12周' },
  'TRA': { name: '职业技术评估', baseFee: 500, fastFee: 800, time: '8-16周' }
};

const otherCosts = {
  'medical': { name: '体检费', min: 300, max: 500, per: '每人' },
  'police': { name: '无犯罪证明', min: 200, max: 500, per: '每人' },
  'english': { name: '雅思考试费', cost: 300, per: '每次' },
  'naati': { name: 'NAATI翻译公证', min: 50, max: 200, per: '每份' },
  'wes': { name: 'WES学历认证', cost: 200, per: 'USD' },
  'agent': { name: '移民代理费', min: 5000, max: 15000, per: '可选' },
  'insurance': { name: '健康保险(1年)', min: 3000, max: 8000, per: '每年' },
  'flight': { name: '机票(单程)', min: 3000, max: 10000, per: '经济舱' }
};

export default function CostCalculator() {
  const [activeTab, setActiveTab] = useState('visa');
  const [selectedVisa, setSelectedVisa] = useState('189');
  const [selectedAssessments, setSelectedAssessments] = useState(['ACS']);
  const [familyMembers, setFamilyMembers] = useState({ adults: 1, children: 0 });
  const [options, setOptions] = useState({
    fastAssessment: false,
    needAgent: false,
    needInsurance: false,
    needTranslation: false
  });

  const calculateVisaCost = () => {
    const visa = visaCosts[selectedVisa];
    let total = visa.baseFee || 0;
    if (visa.nominationFee) total += visa.nominationFee;
    if (visa.employerSponsorship) total += visa.employerSponsorship;
    
    // 附加成年申请人
    const extraAdults = Math.max(0, familyMembers.adults - 1);
    total += extraAdults * 2360;
    
    // 子女费用
    total += familyMembers.children * 2360;
    
    // 雅思语言费 (如需)
    total += 0; // 默认无语言费
    
    return total;
  };

  const calculateAssessmentCost = () => {
    let total = 0;
    selectedAssessments.forEach(code => {
      const ass = assessmentCosts[code];
      if (ass) {
        total += options.fastAssessment ? (ass.fastFee || ass.baseFee) : ass.baseFee;
      }
    });
    return total;
  };

  const calculateOtherCost = () => {
    let total = 0;
    
    // 体检
    total += familyMembers.adults * otherCosts.medical.max;
    total += familyMembers.children * otherCosts.medical.min;
    
    // 无犯罪
    total += familyMembers.adults * otherCosts.police.max;
    
    // 雅思 (2次)
    total += otherCosts.english.cost * 2;
    
    // 翻译公证
    if (options.needTranslation) {
      total += otherCosts.naati.max * 10; // 假设10份文件
    }
    
    // 健康保险
    if (options.needInsurance) {
      total += (otherCosts.insurance.max + otherCosts.insurance.min) / 2;
    }
    
    // 机票
    total += (otherCosts.flight.min + otherCosts.flight.max) / 2;
    
    return total;
  };

  const calculateAgentCost = () => {
    if (options.needAgent) {
      return (otherCosts.agent.min + otherCosts.agent.max) / 2;
    }
    return 0;
  };

  const totalCost = calculateVisaCost() + calculateAssessmentCost() + calculateOtherCost() + calculateAgentCost();

  const breakdown = [
    { name: '签证申请费', amount: calculateVisaCost(), icon: '📋' },
    { name: '职业评估费', amount: calculateAssessmentCost(), icon: '📝' },
    { name: '其他费用', amount: calculateOtherCost(), icon: '📦' },
    { name: '代理费(可选)', amount: calculateAgentCost(), icon: '👨‍💼' }
  ];

  return (
    <>
      <Head>
        <title>移民费用计算器 - 澳洲移民</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              💰 移民费用计算器
            </h1>
            <p className="text-gray-400">全流程费用透明化，告别隐形消费</p>
          </div>

          {/* Total Cost Banner */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-8 mb-8 text-center">
            <p className="text-gray-400 mb-2">预估总费用</p>
            <p className="text-6xl font-bold text-yellow-400">${totalCost.toLocaleString()}</p>
            <p className="text-gray-500 text-sm mt-2">AUD · 仅供参考，实际费用以官方为准</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {[
              { id: 'visa', name: '📋 签证费用' },
              { id: 'assessment', name: '📝 评估费用' },
              { id: 'other', name: '📦 其他费用' },
              { id: 'breakdown', name: '📊 费用明细' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Visa Tab */}
          {activeTab === 'visa' && (
            <div className="space-y-6">
              {/* Visa Selection */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-4">选择签证类型</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(visaCosts).map(([code, visa]) => (
                    <button
                      key={code}
                      onClick={() => setSelectedVisa(code)}
                      className={`p-4 rounded-lg border text-left transition ${
                        selectedVisa === code 
                          ? 'border-yellow-500 bg-yellow-500/10' 
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs mr-2">{code}</span>
                          <span className="font-semibold">{visa.name}</span>
                        </div>
                        <span className="text-yellow-400 font-semibold">${visa.baseFee}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{visa.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Family Members */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-4">家庭成员</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">成年申请人</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setFamilyMembers(m => ({ ...m, adults: Math.max(1, m.adults - 1) }))}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold"
                      >-</button>
                      <span className="text-2xl font-bold w-8 text-center">{familyMembers.adults}</span>
                      <button
                        onClick={() => setFamilyMembers(m => ({ ...m, adults: m.adults + 1 }))}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold"
                      >+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">随行子女</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setFamilyMembers(m => ({ ...m, children: Math.max(0, m.children - 1) }))}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold"
                      >-</button>
                      <span className="text-2xl font-bold w-8 text-center">{familyMembers.children}</span>
                      <button
                        onClick={() => setFamilyMembers(m => ({ ...m, children: m.children + 1 }))}
                        className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assessment Tab */}
          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">选择需要评估的职业</h3>
                  <label className="flex items-center gap-2 text-sm text-gray-400">
                    <input
                      type="checkbox"
                      checked={options.fastAssessment}
                      onChange={(e) => setOptions(o => ({ ...o, fastAssessment: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    加急评估
                  </label>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(assessmentCosts).map(([code, ass]) => {
                    const isSelected = selectedAssessments.includes(code);
                    return (
                      <button
                        key={code}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedAssessments(a => a.filter(x => x !== code));
                          } else {
                            setSelectedAssessments(a => [...a, code]);
                          }
                        }}
                        className={`p-4 rounded-lg border text-left transition ${
                          isSelected 
                            ? 'border-green-500 bg-green-500/10' 
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex justify-between">
                          <div>
                            <span className="font-semibold">{ass.name}</span>
                            <p className="text-gray-400 text-sm">{ass.time}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-green-400 font-semibold">
                              ${options.fastAssessment ? (ass.fastFee || ass.baseFee) : ass.baseFee}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Other Costs Tab */}
          {activeTab === 'other' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-4">其他可能产生的费用</h3>
                <div className="space-y-3">
                  {[
                    { key: 'needTranslation', name: 'NAATI翻译公证', desc: '学历、工作证明等文件翻译', cost: '$500-2000' },
                    { key: 'needInsurance', name: '健康保险', desc: 'OVHC 强制保险', cost: '$3000-8000/年' },
                    { key: 'needAgent', name: '移民代理服务', desc: '专业代理全程协助', cost: '$5000-15000' }
                  ].map(item => (
                    <label
                      key={item.key}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition ${
                        options[item.key] 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={options[item.key]}
                          onChange={(e) => setOptions(o => ({ ...o, [item.key]: e.target.checked }))}
                          className="w-5 h-5"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-400 text-sm">{item.desc}</p>
                        </div>
                      </div>
                      <span className="text-blue-400 font-semibold">{item.cost}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="font-bold mb-4">必选费用参考</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">体检费（每人）</span>
                    <span>$300-500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">无犯罪证明（每人）</span>
                    <span>$200-500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">雅思考试费</span>
                    <span>$300/次</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">单程机票</span>
                    <span>$3000-10000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown Tab */}
          {activeTab === 'breakdown' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-4">费用明细</h3>
                <div className="space-y-3">
                  {breakdown.map(item => (
                    <div key={item.name} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      <span className="text-xl font-bold text-yellow-400">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-bold">总计</span>
                  <span className="text-3xl font-bold text-yellow-400">${totalCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="font-bold mb-3">💡 省钱建议</h3>
                <ul className="space-y-2 text-sm">
                  <li>• DIY 申请可省 $5000-15000 代理费</li>
                  <li>• 提前准备英语考试，减少重考次数</li>
                  <li>• 一年内完成所有流程，避免费用上涨</li>
                  <li>• 关注各州担保政策，抢先递交</li>
                  <li>• 491 偏远地区可能更省钱（职业列表更广）</li>
                </ul>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="font-bold mb-3">⚠️ 免责声明</h3>
                <p className="text-sm text-gray-300">
                  以上费用为参考估算，实际费用可能因个人情况、政策变化、汇率波动等因素有所不同。
                  签证申请费每年可能调整，建议在递交前确认最新费用。
                  健康保险为强制要求，请在抵澳前准备好OVHC。
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>⚠️ 所有费用以澳大利亚元(AUD)计算，仅供参考</p>
            <p className="mt-2">
              <a href="/" className="text-yellow-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
