// 澳洲移民数据 - 2025-2026 最新
// 注：费用可能随时间变化，请以移民局官网为准

const visaTypes = {
  // 技术移民
  '189': {
    id: '189',
    name: '独立技术移民 (Skilled Independent)',
    category: '技术移民',
    icon: '🎯',
    description: '不需要雇主或州担保，凭自身条件打分获邀',
    website: 'https://immi.homeaffairs.gov.au/visas-and-migration/apply-for-a-visa/visa-listing/skilled-independent-189',
    processingTime: '12-18个月',
    cost: {
      签证申请费: 4715,
      附加成年申请人: 2360,
      英语语言费(无): 0,
      英语语言费(Functional): 4890,
      英语语言费(Conversational): 9795,
      18岁以下子女: 2360,
      体检费: 300-500,
      职业评估费: 300-1500,
      总计: 4715,
      总计含评估体检: '4715-7000'
    },
    requirements: {
      年龄: '45岁以下',
      职业: '必须在MLTSSL列表上',
      英语: '雅思4个6或同等水平',
      EOI分数: '最低65分（实际获邀通常85+）'
    },
    points: {
      年龄: { '18-24': 25, '25-32': 30, '33-39': 25, '40-44': 15 },
      英语: { '雅思4个8或同等': 20, '雅思4个7或同等': 10, '雅思4个6或同等': 0 },
      工作经验: { '10年': 15, '8-9年': 13, '6-7年': 10, '3-5年': 5 },
      学历: { '博士': 20, '硕士/荣誉学士': 15, '本科/diploma': 15, '证书III/IV': 10 },
      澳洲学习: 5,
      社区语言: 5,
      配偶技能: 10,
      州担保: 5,
      偏远地区: 15,
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
      签证申请费: 4715,
      州担保费: 330,
      附加成年申请人: 2360,
      英语语言费: 0,
      18岁以下子女: 2360,
      体检费: 300-500,
      职业评估费: 300-1500,
      总计: 5045,
      总计含评估体检: '5045-7500'
    },
    requirements: {
      年龄: '45岁以下',
      职业: '必须在目标州的担保清单上',
      英语: '雅思4个6或同等水平',
      EOI分数: '最低65分',
      居住要求: '需要在担保州居住至少2年'
    },
    points: {
      年龄: { '18-24': 25, '25-32': 30, '33-39': 25, '40-44': 15 },
      英语: { '雅思4个8': 20, '雅思4个7': 10, '雅思4个6': 0 },
      工作经验: { '10年': 15, '8-9年': 13, '6-7年': 10, '3-5年': 5 },
      学历: { '博士': 20, '硕士': 15, '本科': 15, 'diploma': 10 },
      州担保: 5
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
      签证申请费: 4715,
      州担保费: 330,
      附加成年申请人: 2360,
      英语语言费: 0,
      18岁以下子女: 2360,
      体检费: 300-500,
      职业评估费: 300-1500,
      总计: 5045,
      总计含评估体检: '5045-7500'
    },
    requirements: {
      年龄: '45岁以下',
      职业: '在相关担保清单上',
      英语: '雅思4个6或同等水平',
      EOI分数: '最低65分',
      居住要求: '在指定偏远地区居住3-5年'
    },
    points: {
      年龄: { '18-24': 25, '25-32': 30, '33-39': 25, '40-44': 15 },
      英语: { '雅思4个8': 20, '雅思4个7': 10, '雅思4个6': 0 },
      工作经验: { '10年': 15, '8-9年': 13, '6-7年': 10, '3-5年': 5 },
      学历: { '博士': 20, '硕士': 15, '本科': 15, 'diploma': 10 },
      偏远地区: 15
    },
    pathway: ['职业评估', '申请州担保', '获得担保', '提交EOI', '获邀', '递交签证', '获批', '居住3年', '申请191永居'],
    timeline: 24,
    pathway191: '持491签证在偏远地区居住3年后可申请191永居'
  },
  // 雇主担保
  '482': {
    id: '482',
    name: '临时技术短缺签证 (TSS)',
    category: '雇主担保',
    icon: '💼',
    description: '需要澳洲雇主担保，快速入境',
    website: 'https://immi.homeaffairs.gov.au/visas-and-migration/apply-for-a-visa/visa-listing/temporary-skill-shortage-482',
    processingTime: '2-4个月',
    cost: {
      签证申请费: 1455,
      雇主担保费: 460,
      附加成年申请人: 1455,
      英语考试: 300-500,
      体检: 300-500,
      总计: '2315-2915'
    },
    requirements: {
      年龄: '无严格限制',
      职业: '在STSOL或MLTSSL列表上',
      英语: '雅思4个5(Short-term)或4个6(Labour Agreement)',
      工作经验: '至少2年相关工作经验',
      雇主: '需要获得认证雇主的担保'
    },
    points: {},
    pathway: ['雇主申请担保', '雇主提名获批', '递交签证', '获批'],
    timeline: 4
  },
  '186': {
    id: '186',
    name: '雇主担保签证 (ENS)',
    category: '雇主担保',
    icon: '🏢',
    description: '永久居留，一步到位',
    website: 'https://immi.homeaffairs.gov.au/visas-and-migration/apply-for-a-visa/visa-listing/employer-nomination-scheme-186',
    processingTime: '12-18个月',
    cost: {
      签证申请费: 4715,
      雇主担保费: 460,
      附加成年申请人: 2360,
      英语考试: 300-500,
      体检: 300-500,
      总计: '5515-6500'
    },
    requirements: {
      年龄: '45岁以下',
      职业: '在中长期列表(MLTSSL)',
      英语: '雅思4个6',
      工作经验: '至少3年相关工作经验',
      雇主: '需要雇主担保'
    },
    points: {},
    pathway: ['雇主提名申请', '提名批准', '签证申请', '体检', '获批'],
    timeline: 18
  },
  // 投资移民
  '188A': {
    id: '188A',
    name: '商业创新签证 (Business Innovation)',
    category: '投资移民',
    icon: '💰',
    description: '适合中小企业主，门槛较低',
    website: 'https://immi.homeaffairs.gov.au/visas-and-migration/apply-for-a-visa/visa-listing/business-innovation-188a',
    processingTime: '18-24个月',
    cost: {
      签证申请费: 6715,
      州担保费: 330,
      审计费用: 500-2000,
      英语语言费: 9795(如无雅思4个5),
      体检: 300,
      总计: '7345-12845'
    },
    requirements: {
      年龄: '55岁以下(可豁免)',
      净资产: '至少125万澳元',
      营业额: '过去4年中有2年营业额达到75万澳元',
      英语: '雅思4个5或支付语言费',
      商业分数: '至少65分'
    },
    points: {
      净资产: { '200万+': 35, '175万+': 30, '150万+': 25, '125万+': 20 },
      营业额: { '300万+': 40, '200万+': 35, '150万+': 30, '75万+': 25 },
      年龄: { '18-24': 20, '25-32': 30, '33-39': 25, '40-44': 20, '45-49': 15 },
      创新: { '专利': 15, '商标': 10, '出口': 15, '高速增长': 10, '创业': 5 }
    },
    pathway: ['EOI申请', '获得州担保', '收到邀请', '准备材料60天', '签证获批', '经营2年', '申请888永居'],
    timeline: 36
  },
  '188B': {
    id: '188B',
    name: '投资者签证 (Investor)',
    category: '投资移民',
    icon: '📈',
    description: '适合投资者，需要250万澳元投资',
    website: 'https://immi.homeaffairs.gov.au/visas-and-migration/apply-for-a-visa/visa-listing/investor-188b',
    processingTime: '18-24个月',
    cost: {
      签证申请费: 6715,
      州担保费: 330,
      投资金额: 2500000,
      英语语言费: 9795(如无雅思4个5),
      体检: 300,
      总计: '2507345'
    },
    requirements: {
      年龄: '55岁以下(可豁免)',
      投资经验: '至少3年投资经验',
      净资产: '至少250万澳元',
      英语: '雅思4个5或支付语言费',
      投资: '250万澳元到合规投资(州债/基金)'
    },
    points: {
      投资经验: { '10年+': 20, '7-9年': 15, '4-6年': 10 },
      净资产: { '350万+': 30, '300万+': 25, '275万+': 20, '250万+': 15 },
      投资: { '300万+': 20, '275万+': 15, '250万+': 10 },
      年龄: { '18-24': 20, '25-32': 30, '33-39': 25, '40-44': 20, '45-49': 15 }
    },
    pathway: ['EOI申请', '获得州担保', '收到邀请', '完成投资', '签证获批', '持有4年投资', '申请888永居'],
    timeline: 48
  }
};

// 职业评估机构
const assessingAuthorities = {
  'ACS': {
    name: '澳大利亚计算机协会',
    fullName: 'Australian Computer Society',
    website: 'https://www.acs.org.au',
    occupations: ['ICT业务分析师', '程序员', '软件工程师', '系统管理员', '数据库管理员'],
    fees: {
      'RPL类型': 500,
      'Skills类型': 350,
      '学位类型': 350
    },
    processingTime: '4-12周',
    requirements: {
      'RPL': '无相关学位，6年IT工作经验',
      '相关学位': 'ICT相关学位+1年工作经验',
      '非ICT学位': '非ICT学位+4年IT工作经验'
    }
  },
  'EA': {
    name: '工程师协会',
    fullName: 'Engineers Australia',
    website: 'https://www.engineersaustralia.org.au',
    occupations: ['各类工程师'],
    fees: {
      '非认证': 410,
      '认证': 575,
      'CDR评估': 1000
    },
    processingTime: '8-16周',
    requirements: {
      '华盛顿协议学位': '认证工程学位可直接评估',
      '非认证学位': '需提交CDR报告'
    }
  },
  'VETASSESS': {
    name: '职业教育和培训评估',
    fullName: 'Vocational Education and Training Assessment',
    website: 'https://www.vetassess.com.au',
    occupations: ['经理', '专业人员', '技术工人', '社区服务'],
    fees: {
      '一般评估': 540,
      '快速通道': 990
    },
    processingTime: '8-12周(一般)/2-4周(快速)',
    requirements: {
      '要求': '学历+工作经验组合评估'
    }
  },
  'AITSL': {
    name: '教师评估',
    fullName: 'Australian Institute for Teaching and School Leadership',
    website: 'https://www.aitsl.edu.au',
    occupations: ['教师', '幼儿教师', '中学教师'],
    fees: {
      '教师评估': 550
    },
    processingTime: '8-12周',
    requirements: {
      '学历': '至少4年本科学习(包含1年教师资格)',
      '英语': '雅思4个7或同等'
    }
  },
  'ANMAC': {
    name: '护士和助产士评估',
    fullName: 'Australian Nursing and Midwifery Accreditation Council',
    website: 'https://www.anmac.org.au',
    occupations: ['注册护士', '助产士', '护理从业者'],
    fees: {
      '护士评估': 515
    },
    processingTime: '8-12周',
    requirements: {
      '学历': '等同于澳洲Diploma及以上',
      '英语': '雅思4个7或同等'
    }
  },
  'CPAA/CA/IPA': {
    name: '会计师协会',
    fullName: 'CPA Australia / Chartered Accountants / IPA',
    website: 'https://www.cpaaustralia.com.au',
    occupations: ['会计师', '审计师', '财务分析师'],
    fees: {
      'CPAA': 600,
      'CA': 600,
      'IPA': 500
    },
    processingTime: '4-8周',
    requirements: {
      '会计学位': '12门核心课程+学位',
      '英语': '雅思4个7或同等(A类)'
    }
  },
  'TRA': {
    name: '职业技术评估',
    fullName: 'Trades Recognition Australia',
    website: 'https://www.tra.gov.au',
    occupations: ['电工', ' plumber', '厨师', '汽车技师'],
    fees: {
      'RPL': 800,
      ' Skills': 500
    },
    processingTime: '8-16周',
    requirements: {
      '工作经验': '相关学历+3年工作经验',
      '无学历': '5-6年工作经验'
    }
  },
  'AIM': {
    name: '经理协会',
    fullName: 'Australian Institute of Management',
    website: 'https://www.aim.com.au',
    occupations: ['各类经理'],
    fees: {
      '评估费': 550
    },
    processingTime: '8-12周',
    requirements: {
      '学历': '管理相关学位+2年管理经验',
      '无学位': '6年管理经验'
    }
  }
};

// ANZSCO 职业列表（部分热门）
const occupations = {
  // IT 类
  '261111': { name: 'ICT业务分析师', anzsco: '261111', list: 'MLTSSL', assessing: 'ACS', avgPoints: 90 },
  '261112': { name: '系统集成工程师', anzsco: '261112', list: 'MLTSSL', assessing: 'ACS', avgPoints: 90 },
  '261311': { name: '分析程序员', anzsco: '261311', list: 'MLTSSL', assessing: 'ACS', avgPoints: 90 },
  '261312': { name: '开发程序员', anzsco: '261312', list: 'MLTSSL', assessing: 'ACS', avgPoints: 85 },
  '261313': { name: '软件工程师', anzsco: '261313', list: 'MLTSSL', assessing: 'ACS', avgPoints: 90 },
  '261314': { name: '软件测试工程师', anzsco: '261314', list: 'MLTSSL', assessing: 'ACS', avgPoints: 85 },
  '262112': { name: 'ICT安全专家', anzsco: '262112', list: 'MLTSSL', assessing: 'ACS', avgPoints: 85 },
  '263112': { name: '网络工程师', anzsco: '263112', list: 'MLTSSL', assessing: 'ACS', avgPoints: 85 },
  // 工程类
  '233111': { name: '化学工程师', anzsco: '233111', list: 'MLTSSL', assessing: 'EA', avgPoints: 85 },
  '233112': { name: '材料工程师', anzsco: '233112', list: 'MLTSSL', assessing: 'EA', avgPoints: 85 },
  '233211': { name: '土木工程师', anzsco: '233211', list: 'MLTSSL', assessing: 'EA', avgPoints: 85 },
  '233311': { name: '电气工程师', anzsco: '233311', list: 'MLTSSL', assessing: 'EA', avgPoints: 85 },
  '233512': { name: '机械工程师', anzsco: '233512', list: 'MLTSSL', assessing: 'EA', avgPoints: 85 },
  // 会计类
  '221111': { name: '会计师(一般)', anzsco: '221111', list: 'MLTSSL', assessing: 'CPAA/CA/IPA', avgPoints: 100 },
  '221112': { name: '管理会计师', anzsco: '221112', list: 'MLTSSL', assessing: 'CPAA/CA/IPA', avgPoints: 95 },
  '221213': { name: '外部审计员', anzsco: '221213', list: 'MLTSSL', assessing: 'CPAA/CA/IPA', avgPoints: 100 },
  // 护理类
  '254111': { name: '助产士', anzsco: '254111', list: 'MLTSSL', assessing: 'ANMAC', avgPoints: 75 },
  '254411': { name: '注册护士(老年护理)', anzsco: '254411', list: 'MLTSSL', assessing: 'ANMAC', avgPoints: 75 },
  '254412': { name: '注册护士(急症护理)', anzsco: '254412', list: 'MLTSSL', assessing: 'ANMAC', avgPoints: 75 },
  '254499': { name: '注册护士(其他)', anzsco: '254499', list: 'MLTSSL', assessing: 'ANMAC', avgPoints: 75 },
  // 教师类
  '241111': { name: '幼儿教师', anzsco: '241111', list: 'MLTSSL', assessing: 'AITSL', avgPoints: 80 },
  '241411': { name: '中学教师', anzsco: '241411', list: 'MLTSSL', assessing: 'AITSL', avgPoints: 80 },
  // 其他
  '321211': { name: '汽车技师', anzsco: '321211', list: 'STSOL', assessing: 'TRA', avgPoints: 70 },
  '351311': { name: '主厨', anzsco: '351311', list: 'STSOL', assessing: 'TRA', avgPoints: 75 }
};

// 州担保信息
const states = {
  'NSW': {
    name: '新南威尔士州',
    abbr: 'NSW',
    region: '主要城市',
    website: 'https://www.nsw.gov.au/topics/migration',
    occupationLists: 'NSW Skills List',
    processingTime: '4-8周',
    requirements: {
      '190': '职业在NSW清单上，EOI 65+，居住在NSW',
      '491': '职业在regional清单上，EOI 65+，居住在regional NSW'
    }
  },
  'VIC': {
    name: '维多利亚州',
    abbr: 'VIC',
    region: '主要城市',
    website: 'https://www.liveinmelbourne.com.au',
    occupationLists: 'VIC Skills List',
    processingTime: '4-8周',
    requirements: {
      '190': '职业在VIC清单上，EOI 65+，居住在VIC',
      '491': '职业在VIC regional清单上，EOI 65+'
    }
  },
  'QLD': {
    name: '昆士兰州',
    abbr: 'QLD',
    region: '主要城市/偏远',
    website: 'https://www.migration.qld.gov.au',
    occupationLists: 'QLD Skills List',
    processingTime: '6-10周',
    requirements: {
      '190': '职业在QLD清单上，EOI 65+，job offer或2年经验',
      '491': '职业在QLD regional清单上，EOI 65+'
    }
  },
  'WA': {
    name: '西澳州',
    abbr: 'WA',
    region: '主要城市/偏远',
    website: 'https://www.migration.wa.gov.au',
    occupationLists: 'WA Skills List',
    processingTime: '4-8周',
    requirements: {
      '190': '职业在WA清单上，EOI 65+，job offer优先',
      '491': '职业在WA regional清单上，EOI 65+'
    }
  },
  'SA': {
    name: '南澳州',
    abbr: 'SA',
    region: '偏远地区',
    website: 'https://www.migration.sa.gov.au',
    occupationLists: 'SA Skills List',
    processingTime: '4-8周',
    requirements: {
      '190': '职业在SA清单上，EOI 65+，居住在SA',
      '491': '职业在SA清单上，EOI 65+，居住在SA或海外'
    }
  },
  'TAS': {
    name: '塔斯马尼亚州',
    abbr: 'TAS',
    region: '偏远地区',
    website: 'https://www.migration.tas.gov.au',
    occupationLists: 'TAS Skills List',
    processingTime: '4-8周',
    requirements: {
      '190': '职业在TAS清单上，EOI 65+，居住在TAS',
      '491': '职业在TAS清单上，EOI 65+，居住在TAS或海外'
    }
  },
  'ACT': {
    name: '首都领地',
    abbr: 'ACT',
    region: '主要城市',
    website: 'https://www.act.gov.au/migration',
    occupationLists: 'ACT Skills List',
    processingTime: '4-8周',
    requirements: {
      '190': '职业在ACT清单上，EOI 65+，居住在ACT',
      '491': '职业在ACT清单上，EOI 65+，居住在ACT regional'
    }
  },
  'NT': {
    name: '北领地',
    abbr: 'NT',
    region: '偏远地区',
    website: 'https://www.nt.gov.au/migration',
    occupationLists: 'NT Skills List',
    processingTime: '4-8周',
    requirements: {
      '190': '职业在NT清单上，EOI 65+，居住在NT',
      '491': '职业在NT清单上，EOI 65+，居住在NT或海外'
    }
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
  else if (english === '6') score += 0;
  
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
  else if (education === 'certificate') score += 10;
  
  // 澳洲学习
  if (profile.australianStudy) score += 5;
  
  // 社区语言
  if (profile.communityLanguage) score += 5;
  
  // 配偶加分
  if (profile.spouseSkills) score += 10;
  
  // 州担保
  if (profile.stateNomination) score += 5;
  
  // 偏远地区
  if (profile.regionalArea) score += 15;
  
  // STEM
  if (profile.stem) score += 10;
  
  return score;
}

// 推荐最佳路径
function recommendPath(profile) {
  const score = calculateEOIScore(profile);
  const occupation = occupations[profile.occupation];
  
  const recommendations = [];
  
  // 189 独立技术移民
  if (occupation && occupation.list === 'MLTSSL') {
    const suitability = score >= 90 ? 'high' : score >= 80 ? 'medium' : score >= 65 ? 'low' : 'none';
    if (suitability !== 'none') {
      recommendations.push({
        visa: visaTypes['189'],
        suitability,
        reason: score >= 90 ? '高分可快速获邀' : score >= 80 ? '有望获邀，建议加强' : '需要提高分数',
        estimatedTime: visaTypes['189'].timeline,
        estimatedCost: parseInt(visaTypes['189'].cost.总计),
        invitationPoints: occupation.avgPoints
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
      estimatedCost: parseInt(visaTypes['190'].cost.总计)
    });
  }
  
  // 491 偏远地区
  if (occupation) {
    recommendations.push({
      visa: visaTypes['491'],
      suitability: 'high',
      reason: '加15分，竞争最小，成功率高',
      estimatedTime: visaTypes['491'].timeline,
      estimatedCost: parseInt(visaTypes['491'].cost.总计)
    });
  }
  
  // 482 雇主担保
  if (profile.hasJobOffer) {
    recommendations.unshift({
      visa: visaTypes['482'],
      suitability: 'high',
      reason: '有雇主担保，快速获批',
      estimatedTime: visaTypes['482'].timeline,
      estimatedCost: parseInt(visaTypes['482'].cost.总计.replace(/-/g, ''))
    });
  }
  
  // 186 雇主担保
  if (profile.hasJobOffer && profile.workExperience >= 3) {
    recommendations.unshift({
      visa: visaTypes['186'],
      suitability: 'high',
      reason: '雇主担保，直接获得永居',
      estimatedTime: visaTypes['186'].timeline,
      estimatedCost: parseInt(visaTypes['186'].cost.总计.replace(/-/g, ''))
    });
  }
  
  // 投资移民
  if (profile.businessAssets >= 1250000) {
    recommendations.push({
      visa: visaTypes['188A'],
      suitability: 'medium',
      reason: '适合商业背景申请人',
      estimatedTime: visaTypes['188A'].timeline,
      estimatedCost: parseInt(visaTypes['188A'].cost.签证申请费)
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
  assessingAuthorities,
  calculateEOIScore,
  recommendPath
};
