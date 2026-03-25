// 澳洲移民路径数据

const visaTypes = {
  // 技术移民
  '189': {
    id: '189',
    name: '独立技术移民 (Skilled Independent)',
    category: '技术移民',
    icon: '🎯',
    description: '不需要雇主或州担保，凭自身条件打分获邀',
    processingTime: '12-18个月',
    cost: {
     签证费: 4245,
     职业评估: 500,
      英语考试: 300,
      体检: 300,
      总计: 5345
    },
    requirements: {
      年龄: '45岁以下',
      职业: '必须在MLTSSL列表上',
      英语: '雅思4个6或同等水平',
      EOI分数: '最低65分（实际获邀通常80+）'
    },
    points: {
      年龄: { '25-32': 30, '33-39': 25, '40-44': 15 },
      英语: { '雅思4个8': 20, '雅思4个7': 10, '雅思4个6': 0 },
      工作经验: { '8-10年': 15, '5-7年': 10, '3-4年': 5 },
      学历: { '博士': 20, '硕士': 15, '本科': 15, ' diploma': 10 }
    },
    pathway: ['职业评估', 'EOI打分', '等待获邀', '签证申请', '获批'],
    timeline: 18
  },
  '190': {
    id: '190',
    name: '州担保技术移民 (Skilled Nominated)',
    category: '技术移民',
    icon: '🏛️',
    description: '需要州政府担保，加5分，竞争较小',
    processingTime: '14-20个月',
    cost: {
      签证费: 4245,
      州担保费: 300,
      职业评估: 500,
      英语考试: 300,
      体检: 300,
      总计: 5645
    },
    requirements: {
      年龄: '45岁以下',
      职业: '必须在目标州的担保清单上',
      英语: '雅思4个6或同等水平',
      EOI分数: '最低65分',
      居住要求: '需要在担保州居住至少2年'
    },
    points: {
      年龄: { '25-32': 30, '33-39': 25, '40-44': 15 },
      英语: { '雅思4个8': 20, '雅思4个7': 10, '雅思4个6': 0 },
      工作经验: { '8-10年': 15, '5-7年': 10, '3-4年': 5 },
      学历: { '博士': 20, '硕士': 15, '本科': 15, 'diploma': 10 },
      州担保: { '是': 5 }
    },
    pathway: ['职业评估', '州担保申请', 'EOI打分', '获邀', '签证申请', '获批'],
    timeline: 20
  },
  '491': {
    id: '491',
    name: '偏远地区州担保 (Skilled Work Regional)',
    category: '技术移民',
    icon: '🏡',
    description: '在偏远地区工作和居住，加15分，竞争最小',
    processingTime: '16-24个月',
    cost: {
      签证费: 4245,
      州担保费: 300,
      职业评估: 500,
      英语考试: 300,
      体检: 300,
      总计: 5645
    },
    requirements: {
      年龄: '45岁以下',
      职业: '在相关担保清单上',
      英语: '雅思4个6或同等水平',
      EOI分数: '最低65分',
      居住要求: '在指定偏远地区居住3-5年'
    },
    points: {
      年龄: { '25-32': 30, '33-39': 25, '40-44': 15 },
      英语: { '雅思4个8': 20, '雅思4个7': 10, '雅思4个6': 0 },
      工作经验: { '8-10年': 15, '5-7年': 10, '3-4年': 5 },
      学历: { '博士': 20, '硕士': 15, '本科': 15, 'diploma': 10 },
      偏远地区: { '是': 15 }
    },
    pathway: ['职业评估', '州担保申请', 'EOI打分', '获邀', '签证申请', '获批', '居住3年'],
    timeline: 24
  },
  // 雇主担保
  '482': {
    id: '482',
    name: '临时技术短缺签证 (TSS)',
    category: '雇主担保',
    icon: '💼',
    description: '需要澳洲雇主担保，快速入境',
    processingTime: '2-4个月',
    cost: {
      签证费: 1290,
      雇主担保费: 420,
      英语考试: 300,
      体检: 300,
      总计: 2310
    },
    requirements: {
      年龄: '无严格限制',
      职业: '在短期技术职业列表(STSOL)或中长期列表(MLTSSL)',
      英语: '雅思4个5(Short-term)或4个5(Labour Agreement)',
      工作经验: '至少2年相关工作经验',
      雇主: '需要获得认证雇主的担保'
    },
    points: {},
    pathway: ['雇主担保申请', '提名批准', '签证申请', '获批'],
    timeline: 4
  },
  '186': {
    id: '186',
    name: '雇主担保签证 (ENS)',
    category: '雇主担保',
    icon: '🏢',
    description: '永久居留，一步到位',
    processingTime: '12-18个月',
    cost: {
      签证费: 4245,
      雇主担保费: 420,
      英语考试: 300,
      体检: 300,
      总计: 5265
    },
    requirements: {
      年龄: '45岁以下',
      职业: '在中长期列表(MLTSSL)',
      英语: '雅思4个6',
      工作经验: '至少3年相关工作经验',
      雇主: '需要雇主担保'
    },
    points: {},
    pathway: ['雇主提名', '签证申请', '获批'],
    timeline: 18
  },
  // 投资移民
  '188A': {
    id: '188A',
    name: '商业创新签证 (Business Innovation)',
    category: '投资移民',
    icon: '💰',
    description: '适合中小企业主，门槛较低',
    processingTime: '18-24个月',
    cost: {
      签证费: 6245,
      审计费用: 500,
      英语考试: 300,
      体检: 300,
      总计: 7345
    },
    requirements: {
      年龄: '55岁以下',
      净资产: '至少125万澳元',
      营业额: '过去4年中有2年营业额达到75万澳元',
      英语: '雅思4个5或支付语言费',
      商业分数: '至少65分'
    },
    points: {},
    pathway: ['EOI申请', '州担保', '邀请申请', '签证获批', '创业2年', '转永久'],
    timeline: 36
  },
  '188B': {
    id: '188B',
    name: '投资者签证 (Investor)',
    category: '投资移民',
    icon: '📈',
    description: '适合投资者，需要150万澳元投资',
    processingTime: '18-24个月',
    cost: {
      签证费: 6245,
      投资金额: 1500000,
      英语考试: 300,
      总计: 1507545
    },
    requirements: {
      年龄: '55岁以下',
      投资经验: '至少3年投资经验',
      净资产: '至少250万澳元',
      英语: '雅思4个5或支付语言费',
      投资: '150万澳元到州政府债券'
    },
    points: {},
    pathway: ['EOI申请', '州担保', '邀请申请', '签证获批', '投资4年', '转永久'],
    timeline: 48
  }
};

const states = {
  'NSW': { name: '新南威尔士州', abbr: 'NSW', region: '主要城市', occupations: [] },
  'VIC': { name: '维多利亚州', abbr: 'VIC', region: '主要城市', occupations: [] },
  'QLD': { name: '昆士兰州', abbr: 'QLD', region: '主要城市/偏远', occupations: [] },
  'WA': { name: '西澳州', abbr: 'WA', region: '主要城市/偏远', occupations: [] },
  'SA': { name: '南澳州', abbr: 'SA', region: '偏远地区', occupations: [] },
  'TAS': { name: '塔斯马尼亚州', abbr: 'TAS', region: '偏远地区', occupations: [] },
  'ACT': { name: '首都领地', abbr: 'ACT', region: '主要城市', occupations: [] },
  'NT': { name: '北领地', abbr: 'NT', region: '偏远地区', occupations: [] }
};

const occupations = {
  '261111': { name: 'ICT业务分析师', anzsco: '261111', list: 'MLTSSL', assessing: 'ACS' },
  '261312': { name: '程序员', anzsco: '261312', list: 'MLTSSL', assessing: 'ACS' },
  '261313': { name: '软件工程师', anzsco: '261313', list: 'MLTSSL', assessing: 'ACS' },
  '233914': { name: '工程师', anzsco: '233914', list: 'MLTSSL', assessing: 'EA' },
  '221111': { name: '会计师', anzsco: '221111', list: 'MLTSSL', assessing: 'CPAA/CA/IPA' },
  '241111': { name: '幼儿教师', anzsco: '241111', list: 'MLTSSL', assessing: 'AITSL' },
  '254499': { name: '注册护士', anzsco: '254499', list: 'MLTSSL', assessing: 'ANMAC' },
  '321211': { name: '汽车技师', anzsco: '321211', list: 'STSOL', assessing: 'TRA' }
};

// 计算 EOI 分数
function calculateEOIScore(profile) {
  let score = 0;
  
  // 年龄分数
  const age = profile.age || 30;
  if (age >= 25 && age <= 32) score += 30;
  else if (age >= 33 && age <= 39) score += 25;
  else if (age >= 40 && age <= 44) score += 15;
  
  // 英语分数
  const english = profile.english || '6';
  if (english === '8') score += 20;
  else if (english === '7') score += 10;
  else if (english === '6') score += 0;
  
  // 工作经验（澳洲）
  const ausExp = profile.australianExperience || 0;
  if (ausExp >= 8) score += 15;
  else if (ausExp >= 5) score += 10;
  else if (ausExp >= 3) score += 5;
  
  // 海外工作经验
  const overseasExp = profile.overseasExperience || 0;
  if (overseasExp >= 8) score += 15;
  else if (overseasExp >= 5) score += 10;
  else if (overseasExp >= 3) score += 5;
  
  // 学历
  const education = profile.education || 'bachelor';
  if (education === 'phd') score += 20;
  else if (education === 'master' || education === 'bachelor') score += 15;
  else if (education === 'diploma') score += 10;
  
  // 州担保
  if (profile.stateNomination) score += 5;
  
  // 偏远地区
  if (profile.regionalArea) score += 15;
  
  // 配偶加分
  if (profile.spouseSkills) score += 10;
  
  return score;
}

// 推荐最佳路径
function recommendPath(profile) {
  const score = calculateEOIScore(profile);
  const occupation = occupations[profile.occupation];
  
  const recommendations = [];
  
  // 189 独立技术移民
  if (occupation && occupation.list === 'MLTSSL') {
    const suitability = score >= 85 ? 'high' : score >= 75 ? 'medium' : score >= 65 ? 'low' : 'none';
    if (suitability !== 'none') {
      recommendations.push({
        visa: visaTypes['189'],
        suitability,
        reason: score >= 85 ? '高分可快速获邀' : score >= 75 ? '有望获邀，建议加强' : '需要提高分数',
        estimatedTime: visaTypes['189'].timeline,
        estimatedCost: visaTypes['189'].cost.总计
      });
    }
  }
  
  // 190 州担保
  if (occupation) {
    recommendations.push({
      visa: visaTypes['190'],
      suitability: 'medium',
      reason: '获得州担保加5分，竞争较小',
      estimatedTime: visaTypes['190'].timeline,
      estimatedCost: visaTypes['190'].cost.总计
    });
  }
  
  // 491 偏远地区
  if (occupation) {
    recommendations.push({
      visa: visaTypes['491'],
      suitability: 'high',
      reason: '加15分，竞争最小，成功率高',
      estimatedTime: visaTypes['491'].timeline,
      estimatedCost: visaTypes['491'].cost.总计
    });
  }
  
  // 482 雇主担保
  if (profile.hasJobOffer) {
    recommendations.unshift({
      visa: visaTypes['482'],
      suitability: 'high',
      reason: '有雇主担保，快速获批',
      estimatedTime: visaTypes['482'].timeline,
      estimatedCost: visaTypes['482'].cost.总计
    });
  }
  
  // 186 雇主担保
  if (profile.hasJobOffer && profile.workExperience >= 3) {
    recommendations.unshift({
      visa: visaTypes['186'],
      suitability: 'high',
      reason: '雇主担保，直接获得永居',
      estimatedTime: visaTypes['186'].timeline,
      estimatedCost: visaTypes['186'].cost.总计
    });
  }
  
  // 投资移民
  if (profile.businessAssets >= 1250000) {
    recommendations.push({
      visa: visaTypes['188A'],
      suitability: 'medium',
      reason: '适合商业背景申请人',
      estimatedTime: visaTypes['188A'].timeline,
      estimatedCost: visaTypes['188A'].cost.总计
    });
  }
  
  if (profile.investmentAssets >= 2500000) {
    recommendations.push({
      visa: visaTypes['188B'],
      suitability: 'medium',
      reason: '适合投资者，无需经营企业',
      estimatedTime: visaTypes['188B'].timeline,
      estimatedCost: visaTypes['188B'].cost.总计
    });
  }
  
  // 按适合度排序
  recommendations.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.suitability] - order[b.suitability];
  });
  
  return {
    totalScore: score,
    recommendations: recommendations.slice(0, 4)
  };
}

module.exports = {
  visaTypes,
  states,
  occupations,
  calculateEOIScore,
  recommendPath
};
