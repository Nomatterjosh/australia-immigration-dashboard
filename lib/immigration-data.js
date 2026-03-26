// 澳洲移民数据 - 2025-2026 最新
// 注：费用可能随时间变化，请以移民局官网为准

const visaTypes = {
  '189': {
    id: '189',
    name: '独立技术移民 (Skilled Independent)',
    category: '技术移民',
    icon: '🎯',
    description: '不需要雇主或州担保，凭自身条件打分获邀',
    website: 'https://immi.homeaffairs.gov.au/visas-and-migration/apply-for-a-visa/visa-listing/skilled-independent-189',
    processingTime: '12-18个月',
    cost: {
      '签证申请费': 4715,
      '附加成年申请人': 2360,
      '英语语言费(无)': 0,
      '英语语言费(Functional)': 4890,
      '英语语言费(Conversational)': 9795,
      '18岁以下子女': 2360,
      '体检费': '300-500',
      '职业评估费': '300-1500',
      '总计': 4715,
      '总计含评估体检': '4715-7000'
    },
    requirements: {
      '年龄': '45岁以下',
      '职业': '必须在MLTSSL列表上',
      '英语': '雅思4个6或同等水平',
      'EOI分数': '最低65分（实际获邀通常85+）'
    },
    points: {
      '年龄': { '18-24': 25, '25-32': 30, '33-39': 25, '40-44': 15 },
      '英语': { '雅思4个8或同等': 20, '雅思4个7或同等': 10, '雅思4个6或同等': 0 },
      '工作经验': { '10年': 15, '8-9年': 13, '6-7年': 10, '3-5年': 5 },
      '学历': { '博士': 20, '硕士/荣誉学士': 15, '本科/diploma': 15, '证书III/IV': 10 },
      '澳洲学习': 5,
      '社区语言': 5,
      '配偶技能': 10,
      '州担保': 5,
      '偏远地区': 15,
      'STEM': 10
    },
    pathway: ['职业评估', '提交EOI', '等待获邀', '收到邀请60天', '递交签证', '体检通知', '获批'],
    timeline: 18,
    invitationStats: {
      lastRound: '2025-12',
      minPoints: 85,
      commonOccupations: ['IT类90+', '工程85+', '会计100+', '护理75+']
    }
  },
  '190': {
    id: '190',
    name: '州担保技术移民 (Skilled Nominated)',
    category: '技术移民',
    icon: '🏛️',
    description: '需要州政府担保，加5分，竞争较小',
    website: 'https://immi.homeaffairs.gov.au/visas-and-migration/apply-for-a-visa/visa-listing/skilled-nominated-190',
    processingTime: '14-20个月',
    cost: {
      '签证申请费': 4715,
      '州担保费': 330,
      '附加成年申请人': 2360,
      '英语语言费': 0,
      '18岁以下子女': 2360,
      '体检费': '300-500',
      '职业评估费': '300-1500',
      '总计': 5045,
      '总计含评估体检': '5045-7500'
    },
    requirements: {
      '年龄': '45岁以下',
      '职业': '必须在目标州的担保清单上',
      '英语': '雅思4个6或同等水平',
      'EOI分数': '最低65分',
      '居住要求': '需要在担保州居住至少2年'
    },
    points: {
      '年龄': { '18-24': 25, '25-32': 30, '33-39': 25, '40-44': 15 },
      '英语': { '雅思4个8': 20, '雅思4个7': 10, '雅思4个6': 0 },
      '工作经验': { '10年': 15, '8-9年': 13, '6-7年': 10, '3-5年': 5 },
      '学历': { '博士': 20, '硕士': 15, '本科': 15, 'diploma': 10 },
      '州担保': 5
    },
    pathway: ['职业评估', '申请州担保', '获得担保', '提交EOI', '获邀', '递交签证', '获批'],
    timeline: 20
  },
  '491': {
    id: '491',
    name: '偏远地区州担保 (Skilled Work Regional)',
    category: '技术移民',
    icon: '🏡',
    description: '在偏远地区工作和居住，加15分，竞争最小',
    website: 'https://immi.homeaffairs.gov.au/visas-and-migration/apply-for-a-visa/visa-listing/skilled-work-regional-491',
    processingTime: '16-24个月',
    cost: {
      '签证申请费': 4715,
      '州担保费': 330,
      '附加成年申请人': 2360,
      '英语语言费': 0,
      '18岁以下子女': 2360,
      '体检费': '300-500',
      '职业评估费': '300-1500',
      '总计': 5045,
      '总计含评估体检': '5045-7500'
    },
    requirements: {
      '年龄': '45岁以下',
      '职业': '在相关担保清单上',
      '英语': '雅思4个6或同等水平',
      'EOI分数': '最低65分',
      '居住要求': '在指定偏远地区居住3-5年'
    },
    points: {
      '年龄': { '18-24': 25, '25-32': 30, '33-39': 25, '40-44': 15 },
      '英语': { '雅思4个8': 20, '雅思4个7': 10, '雅思4个6': 0 },
      '工作经验': { '10年': 15, '8-9年': 13, '6-7年': 10, '3-5年': 5 },
      '学历': { '博士': 20, '硕士': 15, '本科': 15, 'diploma': 10 },
      '偏远地区': 15
    },
    pathway: ['职业评估', '申请州担保', '获得担保', '提交EOI', '获邀', '递交签证', '获批', '居住3年', '申请191永居'],
    timeline: 24,
    pathway191: '持491签证在偏远地区居住3年后可申请191永居'
  }
};

// EOI 打分计算
function calculateEOIScore(profile) {
  let score = 0;
  
  // 年龄分数
  const age = profile.age || 30;
  if (age >= 25 && age <= 32) score += 30;
  else if (age >= 33 && age <= 39) score += 25;
  else if (age >= 18 && age <= 24) score += 25;
  else if (age >= 40 && age <= 44) score += 15;
  
  // 英语分数
  const english = profile.english || '6';
  if (english === '8' || english === '9') score += 20;
  else if (english === '7') score += 10;
  
  // 工作经验（澳洲）
  const ausExp = profile.australianExperience || 0;
  if (ausExp >= 10) score += 15;
  else if (ausExp >= 8) score += 13;
  else if (ausExp >= 6) score += 10;
  else if (ausExp >= 5) score += 8;
  else if (ausExp >= 3) score += 5;
  
  // 海外工作经验
  const overseasExp = profile.overseasExperience || 0;
  if (overseasExp >= 10) score += 15;
  else if (overseasExp >= 8) score += 13;
  else if (overseasExp >= 6) score += 10;
  else if (overseasExp >= 5) score += 8;
  else if (overseasExp >= 3) score += 5;
  
  // 学历
  const education = profile.education || 'bachelor';
  if (education === 'phd') score += 20;
  else if (education === 'master' || education === 'honours') score += 15;
  else if (education === 'bachelor') score += 15;
  else if (education === 'diploma') score += 10;
  
  // 加分项
  if (profile.australianStudy) score += 5;
  if (profile.communityLanguage) score += 5;
  if (profile.spouseSkills) score += 10;
  if (profile.stem) score += 10;
  
  return score;
}

// 推荐最佳路径
function recommendPath(profile) {
  const score = calculateEOIScore(profile);
  
  const recommendations = [];
  
  // 189 独立技术移民
  recommendations.push({
    visa: visaTypes['189'],
    suitability: score >= 90 ? 'high' : score >= 80 ? 'medium' : 'low',
    reason: score >= 90 ? '高分可快速获邀' : score >= 80 ? '有望获邀，建议加强' : '需要提高分数',
    estimatedTime: visaTypes['189'].timeline,
    estimatedCost: parseInt(visaTypes['189'].cost['总计'])
  });
  
  // 190 州担保
  recommendations.push({
    visa: visaTypes['190'],
    suitability: 'medium',
    reason: '获得州担保加5分，竞争较小',
    estimatedTime: visaTypes['190'].timeline,
    estimatedCost: parseInt(visaTypes['190'].cost['总计'])
  });
  
  // 491 偏远地区
  recommendations.push({
    visa: visaTypes['491'],
    suitability: 'high',
    reason: '加15分，竞争最小，成功率高',
    estimatedTime: visaTypes['491'].timeline,
    estimatedCost: parseInt(visaTypes['491'].cost['总计'])
  });
  
  return {
    totalScore: score,
    recommendations: recommendations
  };
}

module.exports = {
  visaTypes,
  calculateEOIScore,
  recommendPath
};
