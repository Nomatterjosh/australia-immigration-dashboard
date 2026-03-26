// 职业评估导航 - ANZSCO 查询 + 评估机构
import React, { useState } from 'react';
import Head from 'next/head';

const assessmentBodies = {
  'ACS': {
    name: '澳大利亚计算机协会',
    fullName: 'Australian Computer Society',
    website: 'https://www.acs.org.au',
    color: '#00A651',
    occupations: ['ICT业务分析师', '程序员', '软件工程师', '系统管理员', '数据库管理员', '网络安全专家'],
    fees: { 'Skills类型': '$350', 'RPL类型': '$500', '学位类型': '$350' },
    processingTime: '4-12周',
    requirements: {
      '相关学位+1年经验': 'ICT相关学位+1年工作经验',
      'RPL申请': '无相关学位需6年IT工作经验',
      '非相关学位': '非ICT学位+4年IT工作经验'
    }
  },
  'EA': {
    name: '工程师协会',
    fullName: 'Engineers Australia',
    website: 'https://www.engineersaustralia.org.au',
    color: '#0066CC',
    occupations: ['土木工程师', '电气工程师', '机械工程师', '化学工程师', '软件工程师', '采矿工程师'],
    fees: { '非认证学位': '$410', '认证学位': '$575', 'CDR评估': '$1000' },
    processingTime: '8-16周',
    requirements: {
      '华盛顿协议学位': '澳洲EA认证工程学位可直接评估',
      '非认证学位': '需提交CDR能力证明报告',
      'CDR内容': '3篇职业发展陈述+2个项目总结'
    }
  },
  'VETASSESS': {
    name: '职业教育和培训评估',
    fullName: 'Vocational Education and Training Assessment',
    website: 'https://www.vetassess.com.au',
    color: '#FF6600',
    occupations: ['经理类', '专业人员类', '技术工人类', '市场专员', '人力资源经理', '酒店经理'],
    fees: { '一般评估': '$540', '快速通道': '$990' },
    processingTime: '8-12周(一般)/2-4周(快速)',
    requirements: {
      '学历要求': '学历+工作经验组合评估',
      '注意': '需提供详细的 employment reference letter'
    }
  },
  'AITSL': {
    name: '教师评估',
    fullName: 'Australian Institute for Teaching and School Leadership',
    website: 'https://www.aitsl.edu.au',
    color: '#9B2D8E',
    occupations: ['幼儿教师', '小学教师', '中学教师', '特殊教育教师', '职业教育教师'],
    fees: { '教师评估': '$550' },
    processingTime: '8-12周',
    requirements: {
      '学历要求': '至少4年本科学习(包含1年教师资格)',
      '英语要求': '雅思4个7或同等水平(A类)',
      '特别注意': '教师职业需要专业资质认证'
    }
  },
  'ANMAC': {
    name: '护士和助产士评估',
    fullName: 'Australian Nursing and Midwifery Accreditation Council',
    website: 'https://www.anmac.org.au',
    color: '#E91E63',
    occupations: ['注册护士', '助产士', '护理从业者', '老年护理护士', '手术室护士'],
    fees: { '护士评估': '$515' },
    processingTime: '8-12周',
    requirements: {
      '学历要求': '等同于澳洲Diploma及以上',
      '英语要求': '雅思4个7或同等(A类)',
      '注册要求': '需持有当前国家护士执业证'
    }
  },
  'CPAA': {
    name: '澳洲注册会计师',
    fullName: 'CPA Australia',
    website: 'https://www.cpaaustralia.com.au',
    color: '#1A1A1A',
    occupations: ['会计师', '管理会计师', '税务会计师', '外部审计员', '财务分析师'],
    fees: { '评估费': '$600' },
    processingTime: '4-8周',
    requirements: {
      '学历要求': '会计学位,12门核心课程',
      '英语要求': '雅思4个7或同等(A类学术类)',
      '核心课程': '会计原理、财务会计、审计等'
    }
  },
  'TRA': {
    name: '职业技术评估',
    fullName: 'Trades Recognition Australia',
    website: 'https://www.tra.gov.au',
    color: '#004C97',
    occupations: ['电工', '水管工', '木工', '厨师', '汽车技师', '钣金工', '焊工'],
    fees: { 'RPL类型': '$800', 'Skills类型': '$500' },
    processingTime: '8-16周',
    requirements: {
      '学历+经验': '相关学历+3年工作经验',
      '无学历': '5-6年相关工作经验',
      '工作证明': '需要详细的雇主推荐信和项目记录'
    }
  },
  'AIM': {
    name: '经理协会',
    fullName: 'Australian Institute of Management',
    website: 'https://www.aim.com.au',
    color: '#00B4D8',
    occupations: ['各类经理', '运营经理', '销售经理', '采购经理', '人力资源经理'],
    fees: { '评估费': '$550' },
    processingTime: '8-12周',
    requirements: {
      '有学历': '管理相关学位+2年管理经验',
      '无学历': '6年管理经验',
      '管理经验': '需要证明有团队管理权限'
    }
  }
};

const occupations = [
  // IT 类
  { code: '261111', name: 'ICT业务分析师', body: 'ACS', list: 'MLTSSL', points: 90 },
  { code: '261112', name: '系统集成工程师', body: 'ACS', list: 'MLTSSL', points: 90 },
  { code: '261311', name: '分析程序员', body: 'ACS', list: 'MLTSSL', points: 85 },
  { code: '261312', name: '开发程序员', body: 'ACS', list: 'MLTSSL', points: 85 },
  { code: '261313', name: '软件工程师', body: 'ACS', list: 'MLTSSL', points: 90 },
  { code: '261314', name: '软件测试工程师', body: 'ACS', list: 'MLTSSL', points: 85 },
  { code: '261112', name: '系统管理员', body: 'ACS', list: 'MLTSSL', points: 85 },
  { code: '263112', name: '网络工程师', body: 'ACS', list: 'MLTSSL', points: 85 },
  { code: '262112', name: 'ICT安全专家', body: 'ACS', list: 'MLTSSL', points: 85 },
  // 工程类
  { code: '233111', name: '化学工程师', body: 'EA', list: 'MLTSSL', points: 85 },
  { code: '233211', name: '土木工程师', body: 'EA', list: 'MLTSSL', points: 85 },
  { code: '233311', name: '电气工程师', body: 'EA', list: 'MLTSSL', points: 85 },
  { code: '233512', name: '机械工程师', body: 'EA', list: 'MLTSSL', points: 85 },
  { code: '233512', name: '机电工程师', body: 'EA', list: 'MLTSSL', points: 85 },
  { code: '233911', name: '航空工程师', body: 'EA', list: 'MLTSSL', points: 85 },
  { code: '233914', name: '工程技师', body: 'EA', list: 'MLTSSL', points: 85 },
  // 会计类
  { code: '221111', name: '会计师(一般)', body: 'CPAA', list: 'MLTSSL', points: 100 },
  { code: '221112', name: '管理会计师', body: 'CPAA', list: 'MLTSSL', points: 95 },
  { code: '221113', name: '税务会计师', body: 'CPAA', list: 'MLTSSL', points: 95 },
  { code: '221213', name: '外部审计员', body: 'CPAA', list: 'MLTSSL', points: 100 },
  // 护理类
  { code: '254111', name: '助产士', body: 'ANMAC', list: 'MLTSSL', points: 75 },
  { code: '254411', name: '注册护士(老年护理)', body: 'ANMAC', list: 'MLTSSL', points: 75 },
  { code: '254412', name: '注册护士(急症护理)', body: 'ANMAC', list: 'MLTSSL', points: 75 },
  { code: '254413', name: '注册护士(心理健康)', body: 'ANMAC', list: 'MLTSSL', points: 75 },
  { code: '254499', name: '注册护士(其他)', body: 'ANMAC', list: 'MLTSSL', points: 75 },
  // 教师类
  { code: '241111', name: '幼儿教师', body: 'AITSL', list: 'MLTSSL', points: 80 },
  { code: '241411', name: '中学教师', body: 'AITSL', list: 'MLTSSL', points: 80 },
  { code: '241511', name: '特殊教育教师', body: 'AITSL', list: 'MLTSSL', points: 80 },
  // 技工类
  { code: '321211', name: '汽车技师', body: 'TRA', list: 'STSOL', points: 70 },
  { code: '322211', name: '钣金工人', body: 'TRA', list: 'STSOL', points: 65 },
  { code: '323211', name: '钳工(普通)', body: 'TRA', list: 'STSOL', points: 65 },
  { code: '331211', name: '砖瓦匠', body: 'TRA', list: 'STSOL', points: 65 },
  { code: '341112', name: '电工(一般)', body: 'TRA', list: 'STSOL', points: 70 },
  { code: '351311', name: '主厨', body: 'TRA', list: 'STSOL', points: 75 },
  { code: '394111', name: '家具工', body: 'TRA', list: 'STSOL', points: 65 },
  // 管理类
  { code: '132111', name: '广告经理', body: 'VETASSESS', list: 'MLTSSL', points: 75 },
  { code: '132211', name: '销售和营销经理', body: 'VETASSESS', list: 'MLTSSL', points: 75 },
  { code: '133111', name: 'construction经理', body: 'VETASSESS', list: 'MLTSSL', points: 80 },
  { code: '133211', name: '工程经理', body: 'EA', list: 'MLTSSL', points: 85 },
  { code: '139999', name: '其他专家经理', body: 'VETASSESS', list: 'STSOL', points: 65 },
  // 其他
  { code: '224712', name: '组织和.methods分析师', body: 'VETASSESS', list: 'MLTSSL', points: 75 },
  { code: '225113', name: '销售代表(通信设备)', body: 'VETASSESS', list: 'STSOL', points: 65 },
  { code: '225311', name: '公关顾问', body: 'VETASSESS', list: 'STSOL', points: 70 },
];

export default function OccupationNavigator() {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBody, setSelectedBody] = useState(null);
  const [selectedOccupation, setSelectedOccupation] = useState(null);

  const filteredOccupations = occupations.filter(occ => 
    occ.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    occ.code.includes(searchQuery)
  );

  const getBodyInfo = (bodyCode) => assessmentBodies[bodyCode];

  return (
    <>
      <Head>
        <title>职业评估导航 - 澳洲移民</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              💼 职业评估导航
            </h1>
            <p className="text-gray-400">ANZSCO 职业代码查询 · 评估机构要求 · 申请指南</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'search' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              🔍 职业查询
            </button>
            <button
              onClick={() => setActiveTab('bodies')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'bodies' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              🏛️ 评估机构
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'guide' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              📋 申请指南
            </button>
          </div>

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div>
              {/* Search Box */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索职业名称或 ANZSCO 代码..."
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-blue-500 outline-none"
                  />
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
                  >
                    清除
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  共 {filteredOccupations.length} 个职业可评估
                </p>
              </div>

              {/* Occupation List */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOccupations.slice(0, 30).map((occ) => {
                  const body = getBodyInfo(occ.body);
                  return (
                    <div
                      key={occ.code}
                      onClick={() => {
                        setSelectedOccupation(occ);
                        setSelectedBody(body);
                        setActiveTab('detail');
                      }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 cursor-pointer hover:bg-white/10 hover:border-blue-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">{occ.code}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          occ.list === 'MLTSSL' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {occ.list}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{occ.name}</h3>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: body?.color + '33', color: body?.color }}
                        >
                          {body?.name || occ.body}
                        </span>
                        <span className="text-xs text-gray-500">邀请分: {occ.points}+</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bodies Tab */}
          {activeTab === 'bodies' && (
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(assessmentBodies).map(([code, body]) => (
                <div
                  key={code}
                  onClick={() => {
                    setSelectedBody(body);
                    setActiveTab('bodyDetail');
                  }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
                      style={{ backgroundColor: body.color }}
                    >
                      {code.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{body.name}</h3>
                      <p className="text-gray-400 text-sm">{body.fullName}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">评估费用</span>
                      <span className="font-semibold">{Object.values(body.fees)[0]}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">处理时间</span>
                      <span>{body.processingTime}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {body.occupations.slice(0, 4).map((occ, i) => (
                      <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded">{occ}</span>
                    ))}
                    {body.occupations.length > 4 && (
                      <span className="text-xs text-gray-500">+{body.occupations.length - 4}更多</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Guide Tab */}
          {activeTab === 'guide' && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">📋 职业评估申请流程</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <h3 className="font-semibold mb-1">确定职业提名</h3>
                      <p className="text-gray-400 text-sm">根据您的学历和工作经验，确定最适合的 ANZSCO 职业代码</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <h3 className="font-semibold mb-1">选择评估机构</h3>
                      <p className="text-gray-400 text-sm">不同职业对应不同评估机构，详见上方评估机构列表</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <h3 className="font-semibold mb-1">准备申请材料</h3>
                      <p className="text-gray-400 text-sm">包括学历证书、工作证明、雇主推荐信、成绩单等（需公证翻译）</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold shrink-0">4</div>
                    <div>
                      <h3 className="font-semibold mb-1">在线提交申请</h3>
                      <p className="text-gray-400 text-sm">通过评估机构官网提交申请并缴纳评估费用</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold shrink-0">5</div>
                    <div>
                      <h3 className="font-semibold mb-1">等待评估结果</h3>
                      <p className="text-gray-400 text-sm">评估时间通常 4-16 周，通过后获得职业评估函</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="font-bold mb-3">⚠️ 注意事项</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 所有海外学历和文件通常需要官方翻译（NAATI翻译）</li>
                  <li>• 工作证明需要包含详细的工作职责和时间</li>
                  <li>• 部分评估机构支持加急服务，但费用更高</li>
                  <li>• 评估结果有效期通常为 2-3 年</li>
                  <li>• 建议同时申请多个职业以增加机会</li>
                </ul>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="font-bold mb-4">📂 通用材料清单</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📚 学历材料</h4>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• 学位证书</li>
                      <li>• 完整成绩单</li>
                      <li>• 学历认证报告（如 WES）</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">💼 工作材料</h4>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• 雇主推荐信</li>
                      <li>• 劳动合同/社保</li>
                      <li>• 工资单/个税证明</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📄 身份材料</h4>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• 护照首页</li>
                      <li>• 简历 (CV)</li>
                      <li>• 职业证书</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🔤 语言材料</h4>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• 雅思成绩单</li>
                      <li>• 或其他认可的英语成绩</li>
                      <li>• （部分机构需要）</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Body Detail Tab */}
          {activeTab === 'bodyDetail' && selectedBody && (
            <div>
              <button
                onClick={() => setActiveTab('bodies')}
                className="mb-6 text-blue-400 hover:underline"
              >
                ← 返回评估机构列表
              </button>

              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
                    style={{ backgroundColor: selectedBody.color }}
                  >
                    {selectedBody.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBody.name}</h2>
                    <p className="text-gray-400">{selectedBody.fullName}</p>
                    <a 
                      href={selectedBody.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      访问官网 →
                    </a>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3">💰 评估费用</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedBody.fees).map(([type, fee]) => (
                        <div key={type} className="flex justify-between bg-gray-800/50 rounded-lg p-3">
                          <span>{type}</span>
                          <span className="font-semibold text-blue-400">{fee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">⏱️ 处理时间</h3>
                    <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                      <span className="text-2xl font-bold text-blue-400">{selectedBody.processingTime}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold mb-3">📝 申请要求</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedBody.requirements).map(([key, value]) => (
                      <div key={key} className="bg-gray-800/50 rounded-lg p-3">
                        <span className="text-blue-400 font-semibold">{key}: </span>
                        <span className="text-gray-300">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold mb-3">💼 可评估职业</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBody.occupations.map((occ, i) => (
                      <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-sm">{occ}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detail Tab */}
          {activeTab === 'detail' && selectedOccupation && (
            <div>
              <button
                onClick={() => setActiveTab('search')}
                className="mb-6 text-blue-400 hover:underline"
              >
                ← 返回职业查询
              </button>

              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-8 mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-2xl font-mono bg-gray-800 px-3 py-1 rounded">{selectedOccupation.code}</span>
                    <h2 className="text-3xl font-bold mt-3">{selectedOccupation.name}</h2>
                    <div className="flex gap-3 mt-3">
                      <span className={`px-3 py-1 rounded ${
                        selectedOccupation.list === 'MLTSSL' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {selectedOccupation.list}
                      </span>
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded">
                        评估机构: {selectedOccupation.body}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">参考邀请分数</p>
                    <p className="text-4xl font-bold text-yellow-400">{selectedOccupation.points}+</p>
                  </div>
                </div>
              </div>

              {selectedBody && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4">🏛️ 评估机构: {selectedBody.name}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">评估费用</p>
                      <p className="font-semibold text-lg">{Object.values(selectedBody.fees)[0]}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">处理时间</p>
                      <p className="font-semibold text-lg">{selectedBody.processingTime}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-400 text-sm mb-2">主要要求:</p>
                    <ul className="space-y-1">
                      {Object.entries(selectedBody.requirements).slice(0, 2).map(([key, value]) => (
                        <li key={key} className="text-sm">• {key}: {value}</li>
                      ))}
                    </ul>
                  </div>
                  <a 
                    href={selectedBody.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold"
                  >
                    访问官网申请 →
                  </a>
                </div>
              )}

              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">💡 申请建议</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-green-400">✓</span>
                    <p className="text-gray-300">建议同时评估 2-3 个相关职业以增加获邀机会</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-400">✓</span>
                    <p className="text-gray-300">提前准备好所有文件的公证件和翻译件</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-green-400">✓</span>
                    <p className="text-gray-300">工作证明需要详细列出职责和工作时间</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-400">!</span>
                    <p className="text-gray-300">评估函有效期有限，建议在EOI前6个月内完成</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>⚠️ 信息仅供参考，请以各评估机构官网最新信息为准</p>
            <p className="mt-2">
              <a href="/" className="text-blue-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
