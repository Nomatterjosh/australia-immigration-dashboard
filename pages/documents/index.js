// AI 文书助手 - 生成 SOP、推荐信等
import React, { useState } from 'react';
import Head from 'next/head';

const documentTypes = [
  {
    id: 'sop',
    name: '个人陈述 SOP',
    icon: '📄',
    description: '签证申请个人陈述，阐述留学/移民动机和目标',
    sections: ['个人背景', '学习/工作经历', '选择澳洲的原因', '未来规划', '总结']
  },
  {
    id: 'recommendation',
    name: '推荐信',
    icon: '📝',
    description: '工作/学术推荐信，由雇主或导师撰写',
    sections: ['推荐人信息', '与申请人关系', '申请人优势', '具体事例', '推荐结论']
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter',
    icon: '💼',
    description: '雇主担保Cover Letter，展示您的专业能力',
    sections: ['自我介绍', '核心技能', '工作成就', '为什么适合', '期待合作']
  },
  {
    id: 'career-plan',
    name: '职业发展计划',
    icon: '📊',
    description: '详细的职业规划，展示您的长期目标',
    sections: ['短期目标(1-2年)', '中期目标(3-5年)', '长期目标(5年+)', '技能提升计划']
  },
  {
    id: 'family-sponsorship',
    name: '家庭担保函',
    icon: '👨‍👩‍👧',
    description: '家庭成员担保移民用的声明函',
    sections: ['担保人信息', '被担保人信息', '担保承诺', '经济支持说明']
  }
];

const skillCategories = [
  { value: 'it', label: 'IT / 软件工程' },
  { value: 'engineering', label: '工程类' },
  { value: 'accounting', label: '会计/金融' },
  { value: 'nursing', label: '护理/医疗' },
  { value: 'teaching', label: '教育' },
  { value: 'business', label: '商业管理' },
  { value: 'other', label: '其他' }
];

export default function DocumentAssistant() {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState(null);
  const [formData, setFormData] = useState({
    // 基本信息
    fullName: '',
    gender: '',
    birthDate: '',
    nationality: '',
    currentLocation: '',
    // 职业信息
    occupation: '',
    occupationCode: '',
    skillCategory: '',
    yearsOfExperience: 0,
    currentEmployer: '',
    // 教育背景
    education: '',
    major: '',
    university: '',
    graduationYear: '',
    // 英语水平
    englishLevel: '',
    ieltsScore: '',
    // 移民信息
    visaType: '',
    targetState: '',
    immigrationGoal: '',
    // 详细描述
    achievements: '',
    skills: '',
    whyAustralia: '',
    futurePlan: '',
    // 推荐人信息（推荐信用）
    recommenderName: '',
    recommenderTitle: '',
    recommenderCompany: '',
    recommenderRelation: '',
    // 附加信息
    additionalNotes: ''
  });
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectDocType = (type) => {
    setDocType(type);
    setStep(2);
  };

  const generateDocument = () => {
    setIsGenerating(true);
    
    // 模拟 AI 生成
    setTimeout(() => {
      let content = '';
      
      if (docType.id === 'sop') {
        content = generateSOP();
      } else if (docType.id === 'recommendation') {
        content = generateRecommendation();
      } else if (docType.id === 'cover-letter') {
        content = generateCoverLetter();
      } else if (docType.id === 'career-plan') {
        content = generateCareerPlan();
      } else if (docType.id === 'family-sponsorship') {
        content = generateFamilySponsorship();
      }
      
      setGeneratedDoc(content);
      setIsGenerating(false);
      setStep(4);
    }, 2000);
  };

  const generateSOP = () => {
    return `# Statement of Purpose / 个人陈述

**申请人：${formData.fullName || '[您的姓名]'}**
**日期：${new Date().toLocaleDateString('zh-CN')}**

---

## 1. 个人背景 (Personal Background)

${formData.fullName}，${formData.gender === 'male' ? '男' : formData.gender === 'female' ? '女' : ''}性，于${formData.birthDate || '[出生日期]'}出生，${formData.nationality || '中国'}公民，目前居住在${formData.currentLocation || '[现居地]'}。

我的${formData.occupation || '[职业]}(ANZSCO: ${formData.occupationCode || '待填写'})职业生涯始于${formData.yearsOfExperience || 0}年前。在这段时间里，我积累了丰富的行业经验，并不断提升自己的专业技能。

## 2. 教育背景与专业能力 (Education & Professional Competence)

我拥有${formData.education || '[学历]'}学位，专业为${formData.major || '[专业]'}，毕业于${formData.university || '[毕业院校]'}（${formData.graduationYear || '[毕业年份]'}年）。

**核心技能：**
${formData.skills || '• 专业知识扎实\n• 团队协作能力强\n• 沟通能力优秀\n• 问题解决能力强'}

**主要成就：**
${formData.achievements || '• 在工作中取得了显著成绩\n• 多次获得优秀员工/团队表彰\n• 参与过重要项目并成功交付'}

## 3. 选择澳大利亚的原因 (Why Australia)

选择澳大利亚作为我的移民目的地，基于以下原因：

${formData.whyAustralia || '• 澳大利亚经济发达，社会稳定\n• 良好的工作机会和生活质量\n• 世界一流的教育体系（为子女考虑）\n• 多元文化社会，包容性强\n• 优美的自然环境和气候\n• 完善的社会福利制度'}

此外，我的职业${formData.occupation || '[职业]'}在澳大利亚劳动力市场需求旺盛，特别是${formData.targetState || '各州'}地区，这为我提供了良好的职业发展前景。

## 4. 未来规划 (Future Plans)

**短期目标（1-2年）：**
• 获得${formData.visaType || '技术移民'}签证并定居澳大利亚
• 通过职业评估和技能验证
• 寻找与专业相关的工作机会
• 了解当地文化和社会规范，建立社交网络

**中长期目标（3-5年）：**
• 在专业领域建立良好的职业发展
• 考虑继续深造或获得澳大利亚专业资格认证
• 为家人创造更好的生活和教育条件
• 为澳大利亚社会做出贡献

## 5. 结语 (Conclusion)

我相信，凭借我的教育背景、工作经验和专业技能，我能够为澳大利亚的社会和经济发展做出积极贡献。我对在澳大利亚的新生活充满期待，并将积极融入当地社区，成为一名合格的澳大利亚永久居民。

我郑重承诺，一旦获得签证，我将遵守澳大利亚的法律法规，尊重当地的文化和价值观，为建设美好的澳大利亚贡献自己的力量。

---

**申请人签名：________________**

**日期：________________**
`;
  };

  const generateRecommendation = () => {
    return `# Letter of Recommendation / 推荐信

**推荐人信息：**
- 姓名：${formData.recommenderName || '[推荐人姓名]'}
- 职位：${formData.recommenderTitle || '[职位]'}
- 单位：${formData.recommenderCompany || '[公司/机构]'}
- 与申请人关系：${formData.recommenderRelation || '[关系]'}

**申请人信息：**
- 姓名：${formData.fullName || '[被推荐人姓名]'}
- 申请职位/签证：${formData.occupation || '[职业]'} / ${formData.visaType || '[签证类型]'}

---

${new Date().toLocaleDateString('zh-CN')}

致：签证官 / To Whom It May Concern,

## 推荐声明

我郑重推荐${formData.fullName || '[申请人姓名]'}申请澳大利亚${formData.visaType || '技术移民'}签证。${formData.recommenderRelation || '作为'}，我对申请人的工作能力和个人品质有深入的了解。

## 工作表现

在我任职于${formData.recommenderCompany || '[公司]'}期间，${formData.fullName}于${formData.yearsOfExperience || 0}年前加入我们的团队，担任${formData.occupation || '[职位]}(ANZSCO: ${formData.occupationCode || '待填写'})。

**主要工作成就：**

${formData.achievements || '• 出色完成了多个重要项目\n• 工作效率高，质量优秀\n• 具有很强的分析和解决问题的能力\n• 团队合作精神良好，善于沟通协调'}

**专业能力：**

${formData.skills || '• 扎实的专业知识和技能\n• 能够独立完成复杂任务\n• 良好的时间管理和组织能力\n• 高度的责任心和职业道德'}

## 个人品质

${formData.fullName}是一位具有高度职业道德和专业素养的员工/同事。他/她为人诚实守信，乐于助人，具有出色的沟通能力和团队协作精神。

## 综合评价

基于我对${formData.fullName}的了解，我相信他/她具备在澳大利亚成功发展的能力和素质。他/她的专业技能、工作态度和个人品质使他/她成为澳大利亚劳动力市场的宝贵人才。

因此，我强烈推荐${formData.fullName}的签证申请。

---

**推荐人签名 / Signature：________________**

**日期 / Date：________________**

**联系电话 / Contact：________________**
`;
  };

  const generateCoverLetter = () => {
    return `# Cover Letter / 求职 Cover Letter

**申请人：${formData.fullName || '[您的姓名]'}**
**申请职位：${formData.occupation || '[职位]'} (ANZSCO: ${formData.occupationCode || '待填写'})**
**日期：${new Date().toLocaleDateString('zh-CN')}**

---

尊敬的招聘经理：

## 自我介绍

您好！我叫${formData.fullName || '[姓名]'}，是一名拥有${formData.yearsOfExperience || 0}年工作经验的${formData.occupation || '[职业]'}。我目前在${formData.currentEmployer || '[现公司]'}工作，对贵公司的${formData.occupation || '相关职位'}深感兴趣，特此申请。

## 为什么选择贵公司

${formData.whyAustralia || '贵公司在行业内的声誉、创新文化和员工发展理念深深吸引了我。我了解到贵公司注重员工的职业成长和团队协作，这与我追求的职业发展目标高度契合。'}

## 我的核心优势

**专业技能：**
${formData.skills || '• 丰富的行业经验\n• 扎实的技术功底\n• 良好的项目管理能力'}

**工作成就：**
${formData.achievements || '• 成功交付多个重要项目\n• 带领团队提升效率30%\n• 多次获得年度优秀员工'}

## 我的承诺

如果有机会加入贵公司，我将：
• 充分发挥我的专业技能
• 积极融入团队文化
• 持续学习和成长
• 为公司创造价值

感谢您抽出宝贵时间阅读我的申请。我期待有机会与您进一步交流。

---

此致

敬礼！

**${formData.fullName || '[您的姓名]'}**

**电话：________________**
**邮箱：________________**
`;
  };

  const generateCareerPlan = () => {
    return `# Career Development Plan / 职业发展计划

**姓名：${formData.fullName || '[姓名]'}**
**当前职业：${formData.occupation || '[职业]'} (ANZSCO: ${formData.occupationCode || '待填写'})**
**制定日期：${new Date().toLocaleDateString('zh-CN')}**

---

## 1. 短期目标（1-2年）

| 时间 | 目标 | 具体行动 |
|------|------|----------|
| 6个月内 | 适应新环境 | • 获得签证并定居\n• 了解当地职场文化\n• 建立专业人脉网络 |
| 12个月内 | 获得相关工作 | • 完成职业认证\n• 找到专业对口工作\n• 积累澳洲工作经验 |
| 24个月内 | 站稳脚跟 | • 成为团队骨干\n• 英语达到更高水平\n• 开始参与社区活动 |

## 2. 中期目标（3-5年）

| 时间 | 目标 | 具体行动 |
|------|------|----------|
| 3年内 | 专业深化 | • 获得澳洲专业资格\n• 成为领域专家\n• 考虑技术移民永居 |
| 5年内 | 晋升发展 | • 晋升为Senior级别\n• 带领小型团队\n• 考虑创业或深造 |

## 3. 长期目标（5年以上）

- 成为行业内资深专家或管理者
- 为澳大利亚华人社区做出贡献
- 考虑创办自己的企业
- 为子女创造更好的教育条件

## 4. 技能提升计划

**语言能力：**
- 提升英语至雅思7分以上
- 学习澳洲当地俚语和文化

**专业技能：**
- 获取澳洲相关职业认证
- 参加行业培训和研讨会
- 考取相关资格证书

**软技能：**
- 提升跨文化沟通能力
- 培养领导力
- 扩展专业人脉

## 5. 风险评估与应对

| 风险 | 应对措施 |
|------|----------|
| 就业困难 | 降低期望值，先就业再择业；考虑临时工作 |
| 语言障碍 | 参加语言课程；多与本地人交流 |
| 文化差异 | 主动了解当地文化；参与社区活动 |
| 职业认证困难 | 提前了解认证要求；寻求专业帮助 |

---

**签名：________________**
**日期：________________**
`;
  };

  const generateFamilySponsorship = () => {
    return `# Family Sponsorship Declaration / 家庭担保声明函

---

**担保人信息：**
- 姓名：________________
- 出生日期：________________
- 澳大利亚签证类型：________________
- 联系电话：________________
- 居住地址：________________

**被担保人信息：**
- 姓名：${formData.fullName || '[被担保人姓名]'}
- 与担保人关系：${formData.recommenderRelation || '[关系]'}
- 出生日期：${formData.birthDate || '[出生日期]'}

---

${new Date().toLocaleDateString('zh-CN')}

致：澳大利亚内政事务部 / Department of Home Affairs

## 担保声明

本人，________________，澳大利亚公民/永久居民（护照号：________________），特此声明愿意担保我的${formData.recommenderRelation || '家庭成员'}${formData.fullName}申请澳大利亚家庭类签证。

## 担保承诺

作为担保人，我郑重承诺：

1. **经济担保**：我愿意并且有能力为${formData.fullName}提供经济支持，确保其在澳大利亚期间不会依赖政府福利。

2. **住宿安排**：我已准备好为其提供适当的住宿场所，地址为：________________。

3. **生活支持**：我将帮助其适应澳大利亚的生活，包括但不限于：
   - 帮助了解澳大利亚社会和文化
   - 协助寻找工作机会
   - 提供必要的生活指导

## 财务能力证明

本人目前年收入为：$________________
本人资产状况：________________
（有需要可提供银行流水、工资单等证明材料）

## 其他说明

${formData.additionalNotes || '我与被担保人保持密切的家庭关系，我们经常联系。我真诚地希望能够帮助其在澳大利亚开始新的生活。'}

---

我保证以上信息真实有效，如有虚假愿意承担相应法律责任。

---

**担保人签名：________________**

**日期：________________**

**见证人签名（如需要）：________________**
`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDoc);
    alert('已复制到剪贴板！');
  };

  return (
    <>
      <Head>
        <title>AI 文书助手 - 澳洲移民项目</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              📝 AI 文书助手
            </h1>
            <p className="text-gray-400">智能生成 SOP、推荐信等移民文书材料</p>
          </div>

          {/* Progress */}
          <div className="flex justify-center mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 4 && <div className={`w-20 h-1 mx-2 ${step > s ? 'bg-purple-500' : 'bg-gray-700'}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Choose Document Type */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => selectDocType(type)}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 hover:border-purple-500/50 transition-all"
                >
                  <span className="text-4xl mb-4 block">{type.icon}</span>
                  <h3 className="text-xl font-bold mb-2">{type.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{type.description}</p>
                  <div className="text-xs text-purple-400">
                    包含: {type.sections.length} 个部分
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Fill Information */}
          {step === 2 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-4">{docType?.icon}</span>
                <h2 className="text-2xl font-bold">{docType?.name}</h2>
              </div>

              <div className="space-y-8">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">📋 基本信息</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">姓名</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateForm('fullName', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">性别</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => updateForm('gender', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                      >
                        <option value="">请选择</option>
                        <option value="male">男</option>
                        <option value="female">女</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">出生日期</label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => updateForm('birthDate', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">国籍</label>
                      <input
                        type="text"
                        value={formData.nationality}
                        onChange={(e) => updateForm('nationality', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        placeholder="中国"
                      />
                    </div>
                  </div>
                </div>

                {/* Occupation Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">💼 职业信息</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">职业名称</label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => updateForm('occupation', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        placeholder="如：软件工程师"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">ANZSCO 职业代码</label>
                      <input
                        type="text"
                        value={formData.occupationCode}
                        onChange={(e) => updateForm('occupationCode', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        placeholder="如：261313"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">从业年限</label>
                      <input
                        type="number"
                        value={formData.yearsOfExperience}
                        onChange={(e) => updateForm('yearsOfExperience', parseInt(e.target.value))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">现/前雇主</label>
                      <input
                        type="text"
                        value={formData.currentEmployer}
                        onChange={(e) => updateForm('currentEmployer', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        placeholder="公司名称"
                      />
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">🎓 教育背景</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">最高学历</label>
                      <select
                        value={formData.education}
                        onChange={(e) => updateForm('education', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                      >
                        <option value="">请选择</option>
                        <option value="博士">博士</option>
                        <option value="硕士">硕士</option>
                        <option value="本科">本科</option>
                        <option value="专科">专科</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">专业</label>
                      <input
                        type="text"
                        value={formData.major}
                        onChange={(e) => updateForm('major', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        placeholder="专业名称"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">毕业年份</label>
                      <input
                        type="text"
                        value={formData.graduationYear}
                        onChange={(e) => updateForm('graduationYear', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        placeholder="如：2018"
                      />
                    </div>
                  </div>
                </div>

                {/* Key Content */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">⭐ 核心内容</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">主要成就（每行一条）</label>
                      <textarea
                        value={formData.achievements}
                        onChange={(e) => updateForm('achievements', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white h-24"
                        placeholder="• 成功完成XX项目&#10;• 获得XX奖项&#10;• 带领团队实现XX目标"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">核心技能（每行一条）</label>
                      <textarea
                        value={formData.skills}
                        onChange={(e) => updateForm('skills', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white h-24"
                        placeholder="• 专业知识扎实&#10;• 团队协作能力强&#10;• 沟通能力优秀"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">选择澳大利亚的原因</label>
                      <textarea
                        value={formData.whyAustralia}
                        onChange={(e) => updateForm('whyAustralia', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white h-24"
                        placeholder="为什么选择移民澳大利亚？"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">未来规划</label>
                      <textarea
                        value={formData.futurePlan}
                        onChange={(e) => updateForm('futurePlan', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white h-24"
                        placeholder="您的未来职业/生活规划是什么？"
                      />
                    </div>
                  </div>
                </div>

                {/* Recommender Info (for recommendation letter) */}
                {docType?.id === 'recommendation' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-purple-400">👤 推荐人信息</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">推荐人姓名</label>
                        <input
                          type="text"
                          value={formData.recommenderName}
                          onChange={(e) => updateForm('recommenderName', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">推荐人职位</label>
                        <input
                          type="text"
                          value={formData.recommenderTitle}
                          onChange={(e) => updateForm('recommenderTitle', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">推荐人公司</label>
                        <input
                          type="text"
                          value={formData.recommenderCompany}
                          onChange={(e) => updateForm('recommenderCompany', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">与申请人关系</label>
                        <input
                          type="text"
                          value={formData.recommenderRelation}
                          onChange={(e) => updateForm('recommenderRelation', e.target.value)}
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none text-white"
                          placeholder="如：直属上司/导师/同事"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
                >
                  ← 上一步
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold"
                >
                  下一步 →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Preview & Generate */}
          {step === 3 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">📋 信息确认</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-purple-400 font-semibold mb-2">基本信息</h3>
                  <p>姓名：{formData.fullName || '未填写'}</p>
                  <p>职业：{formData.occupation || '未填写'} ({formData.occupationCode || '无代码'})</p>
                  <p>从业年限：{formData.yearsOfExperience} 年</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-purple-400 font-semibold mb-2">教育背景</h3>
                  <p>学历：{formData.education || '未填写'}</p>
                  <p>专业：{formData.major || '未填写'}</p>
                  <p>毕业：{formData.university || '未填写'} ({formData.graduationYear || 'N/A'})</p>
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8">
                <p className="text-yellow-300">
                  💡 请确认以上信息准确无误。点击"生成文书"按钮后，AI 将根据您提供的信息生成 {docType?.name}。
                  生成的内容可以直接复制使用，也可以根据需要进行修改。
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
                >
                  ← 修改信息
                </button>
                <button
                  onClick={generateDocument}
                  disabled={isGenerating}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {isGenerating ? '⏳ AI 生成中...' : '🤖 生成文书'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Generated Document */}
          {step === 4 && generatedDoc && (
            <div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">✅ 文书已生成</h2>
                    <p className="text-gray-400 mt-1">您可以复制到 Word 进行编辑和排版</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold"
                    >
                      📋 复制全文
                    </button>
                    <button
                      onClick={() => { setStep(1); setDocType(null); setGeneratedDoc(''); }}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
                    >
                      🔄 生成新文书
                    </button>
                  </div>
                </div>
              </div>

              {/* Document Preview */}
              <div className="bg-white text-gray-800 rounded-xl p-8 max-h-[600px] overflow-y-auto shadow-2xl">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {generatedDoc}
                </pre>
              </div>

              {/* Tips */}
              <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">💡 使用建议</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 复制内容到 Word 或 Google Docs 进行格式调整</li>
                  <li>• 根据个人情况补充具体事例和数据</li>
                  <li>• 如需英文版本，可以使用翻译工具辅助</li>
                  <li>• 重要文件建议请专业翻译或律师审核</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 text-center">
            <a href="/" className="text-purple-400 hover:underline">← 返回项目看板</a>
          </div>
        </div>
      </div>
    </>
  );
}
