import React, { useState } from 'react';
import Head from 'next/head';

const occupations = [
  { value: '', label: '请选择职业' },
  // IT 类
  { value: '261111', label: 'ICT 业务分析师' },
  { value: '261112', label: '系统集成工程师' },
  { value: '261311', label: '分析程序员' },
  { value: '261312', label: '开发程序员' },
  { value: '261313', label: '软件工程师' },
  { value: '261314', label: '软件测试工程师' },
  { value: '262112', label: 'ICT 安全专家' },
  { value: '263112', label: '网络工程师' },
  // 工程类
  { value: '233111', label: '化学工程师' },
  { value: '233112', label: '材料工程师' },
  { value: '233211', label: '土木工程师' },
  { value: '233311', label: '电气工程师' },
  { value: '233512', label: '机械工程师' },
  // 会计类
  { value: '221111', label: '会计师(一般)' },
  { value: '221112', label: '管理会计师' },
  { value: '221213', label: '外部审计员' },
  // 护理类
  { value: '254111', label: '助产士' },
  { value: '254411', label: '注册护士(老年护理)' },
  { value: '254412', label: '注册护士(急症护理)' },
  { value: '254499', label: '注册护士(其他)' },
  // 教师类
  { value: '241111', label: '幼儿教师' },
  { value: '241411', label: '中学教师' },
];

const educationOptions = [
  { value: 'phd', label: '博士学位' },
  { value: 'honours', label: '荣誉学士学位' },
  { value: 'master', label: '硕士学位' },
  { value: 'bachelor', label: '本科学位' },
  { value: 'diploma', label: '专科/Diploma' },
  { value: 'certificate', label: '证书 III/IV' },
];

const englishOptions = [
  { value: '9', label: '雅思 4 个 9 (Superior)' },
  { value: '8', label: '雅思 4 个 8 (Proficient)' },
  { value: '7', label: '雅思 4 个 7 (Competent)' },
  { value: '6', label: '雅思 4 个 6 (Functional)' },
  { value: '5', label: '雅思 4 个 5 (Limited)' },
];

const occupationData = {
  '261111': { name: 'ICT 业务分析师', list: 'MLTSSL', assessing: 'ACS', avgPoints: 90 },
  '261312': { name: '开发程序员', list: 'MLTSSL', assessing: 'ACS', avgPoints: 85 },
  '261313': { name: '软件工程师', list: 'MLTSSL', assessing: 'ACS', avgPoints: 90 },
  '233211': { name: '土木工程师', list: 'MLTSSL', assessing: 'EA', avgPoints: 85 },
  '221111': { name: '会计师', list: 'MLTSSL', assessing: 'CPAA/CA/IPA', avgPoints: 100 },
  '254499': { name: '注册护士', list: 'MLTSSL', assessing: 'ANMAC', avgPoints: 75 },
  '241111': { name: '幼儿教师', list: 'MLTSSL', assessing: 'AITSL', avgPoints: 80 },
};

export default function SkillAssessment() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: 30,
    education: 'bachelor',
    english: '6',
    occupation: '',
    australianExperience: 0,
    overseasExperience: 0,
    australianStudy: false,
    communityLanguage: false,
    spouseSkills: false,
    stem: false,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateScore = () => {
    let score = 0;

    // 年龄
    const age = profile.age;
    if (age >= 25 && age <= 32) score += 30;
    else if (age >= 33 && age <= 39) score += 25;
    else if (age >= 18 && age <= 24) score += 25;
    else if (age >= 40 && age <= 44) score += 15;

    // 英语
    const english = profile.english;
    if (english === '9') score += 20;
    else if (english === '8') score += 20;
    else if (english === '7') score += 10;
    else if (english === '6') score += 0;

    // 澳洲工作经验
    const ausExp = profile.australianExperience;
    if (ausExp >= 10) score += 15;
    else if (ausExp >= 8) score += 13;
    else if (ausExp >= 6) score += 10;
    else if (ausExp >= 5) score += 8;
    else if (ausExp >= 3) score += 5;

    // 海外工作经验
    const overseasExp = profile.overseasExperience;
    if (overseasExp >= 10) score += 15;
    else if (overseasExp >= 8) score += 13;
    else if (overseasExp >= 6) score += 10;
    else if (overseasExp >= 5) score += 8;
    else if (overseasExp >= 3) score += 5;

    // 学历
    const education = profile.education;
    if (education === 'phd') score += 20;
    else if (education === 'honours' || education === 'master') score += 15;
    else if (education === 'bachelor') score += 15;
    else if (education === 'diploma' || education === 'certificate') score += 10;

    // 加分项
    if (profile.australianStudy) score += 5;
    if (profile.communityLanguage) score += 5;
    if (profile.spouseSkills) score += 10;
    if (profile.stem) score += 10;

    return score;
  };

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      const totalScore = calculateScore();
      const occupation = occupationData[profile.occupation];
      
      // 获取当前邀请分数线（模拟数据，实际应从 API 获取）
      const invitationScores = {
        '261111': 90,
        '261312': 85,
        '261313': 90,
        '233211': 85,
        '221111': 100,
        '254499': 75,
        '241111': 80,
      };

      const currentInvitation = invitationScores[profile.occupation] || 85;
      const gap = currentInvitation - totalScore;

      setResult({
        totalScore,
        occupation,
        currentInvitation,
        gap,
        breakdown: {
          age: getAgePoints(profile.age),
          english: getEnglishPoints(profile.english),
          ausExperience: getExperiencePoints(profile.australianExperience),
          overseasExperience: getExperiencePoints(profile.overseasExperience),
          education: getEducationPoints(profile.education),
          bonusPoints: (profile.australianStudy ? 5 : 0) + 
                       (profile.communityLanguage ? 5 : 0) + 
                       (profile.spouseSkills ? 10 : 0) + 
                       (profile.stem ? 10 : 0)
        }
      });
      setStep(4);
      setLoading(false);
    }, 1000);
  };

  const getAgePoints = (age) => {
    if (age >= 25 && age <= 32) return 30;
    if (age >= 33 && age <= 39) return 25;
    if (age >= 18 && age <= 24) return 25;
    if (age >= 40 && age <= 44) return 15;
    return 0;
  };

  const getEnglishPoints = (english) => {
    if (english === '9' || english === '8') return 20;
    if (english === '7') return 10;
    return 0;
  };

  const getExperiencePoints = (years) => {
    if (years >= 10) return 15;
    if (years >= 8) return 13;
    if (years >= 6) return 10;
    if (years >= 5) return 8;
    if (years >= 3) return 5;
    return 0;
  };

  const getEducationPoints = (education) => {
    if (education === 'phd') return 20;
    if (education === 'honours' || education === 'master') return 15;
    if (education === 'bachelor') return 15;
    if (education === 'diploma' || education === 'certificate') return 10;
    return 0;
  };

  const updateProfile = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-green-300';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 65) return 'text-orange-400';
    return 'text-red-400';
  };

  const getGapAdvice = (gap) => {
    if (gap <= 0) return { text: '🎉 恭喜！你的分数已达到邀请线', color: 'text-green-400' };
    if (gap <= 5) return { text: '⚠️ 差一点点，再加油！', color: 'text-yellow-400' };
    if (gap <= 10) return { text: '📊 还需要提高，建议加强英语或工作经验', color: 'text-orange-400' };
    return { text: '❌ 分数差距较大，需要制定长期计划', color: 'text-red-400' };
  };

  return (
    <>
      <Head>
        <title>签证评估 & 打分计算器 - 澳洲移民项目</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              🎯 签证评估 & 打分计算器
            </h1>
            <p className="text-gray-400">精准计算你的 EOI 分数，对标当前邀请线</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {s}
                </div>
                {s < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-cyan-500' : 'bg-gray-700'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">📋 基本信息</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">年龄</label>
                  <input
                    type="number"
                    min="18"
                    max="50"
                    value={profile.age}
                    onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">当前分数: {getAgePoints(profile.age)} 分</p>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">最高学历</label>
                  <select
                    value={profile.education}
                    onChange={(e) => updateProfile('education', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white"
                  >
                    {educationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">当前分数: {getEducationPoints(profile.education)} 分</p>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">英语水平（雅思）</label>
                  <select
                    value={profile.english}
                    onChange={(e) => updateProfile('english', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white"
                  >
                    {englishOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">当前分数: {getEnglishPoints(profile.english)} 分</p>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">提名职业 *</label>
                  <select
                    value={profile.occupation}
                    onChange={(e) => updateProfile('occupation', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white"
                  >
                    {occupations.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  {profile.occupation && occupationData[profile.occupation] && (
                    <p className="text-xs text-cyan-400 mt-1">
                      📊 当前邀请线: {occupationData[profile.occupation].avgPoints} 分
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!profile.occupation}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一步 →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Work Experience */}
          {step === 2 && (
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">💼 工作经验</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">澳洲工作经验（年）</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={profile.australianExperience}
                    onChange={(e) => updateProfile('australianExperience', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">当前分数: {getExperiencePoints(profile.australianExperience)} 分</p>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">海外工作经验（年）</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={profile.overseasExperience}
                    onChange={(e) => updateProfile('overseasExperience', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">当前分数: {getExperiencePoints(profile.overseasExperience)} 分</p>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
                >
                  ← 上一步
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition"
                >
                  下一步 →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Bonus Points */}
          {step === 3 && (
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">🎁 加分项</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={profile.australianStudy}
                    onChange={(e) => updateProfile('australianStudy', e.target.checked)}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500"
                  />
                  <div>
                    <span className="font-semibold">澳洲学习经历</span>
                    <p className="text-gray-400 text-sm">在澳洲完成至少 2 年学位课程 +5 分</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={profile.communityLanguage}
                    onChange={(e) => updateProfile('communityLanguage', e.target.checked)}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500"
                  />
                  <div>
                    <span className="font-semibold">社区语言</span>
                    <p className="text-gray-400 text-sm">通过澳洲社区语言考试 +5 分</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={profile.spouseSkills}
                    onChange={(e) => updateProfile('spouseSkills', e.target.checked)}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500"
                  />
                  <div>
                    <span className="font-semibold">配偶技能评估</span>
                    <p className="text-gray-400 text-sm">配偶满足同等职业评估要求 +10 分</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <input
                    type="checkbox"
                    checked={profile.stem}
                    onChange={(e) => updateProfile('stem', e.target.checked)}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500"
                  />
                  <div>
                    <span className="font-semibold">STEM 学位</span>
                    <p className="text-gray-400 text-sm">拥有 STEM 相关学位 +10 分</p>
                  </div>
                </label>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
                >
                  ← 上一步
                </button>
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {loading ? '⏳ 计算中...' : '🎯 计算分数'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && result && (
            <div>
              {/* Main Score Card */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30 rounded-xl p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Your Score */}
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">你的 EOI 分数</p>
                    <div className={`text-6xl font-bold ${getScoreColor(result.totalScore)}`}>
                      {result.totalScore}
                    </div>
                  </div>

                  {/* Current Invitation */}
                  <div className="text-center border-l border-r border-white/10">
                    <p className="text-gray-400 mb-2">当前邀请线</p>
                    <div className="text-6xl font-bold text-yellow-400">
                      {result.currentInvitation}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{result.occupation?.name}</p>
                  </div>

                  {/* Gap */}
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">分数差距</p>
                    <div className={`text-6xl font-bold ${result.gap <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {result.gap > 0 ? '+' : ''}{result.gap}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">{result.gap <= 0 ? '已达邀请线' : '还需提高'}</p>
                  </div>
                </div>

                {/* Advice */}
                <div className={`mt-6 p-4 rounded-lg bg-white/5 border border-white/10 text-center ${getGapAdvice(result.gap).color}`}>
                  {getGapAdvice(result.gap).text}
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">📊 分数明细</h3>
                
                <div className="space-y-4">
                  {[
                    { label: '年龄', points: result.breakdown.age, icon: '🎂' },
                    { label: '英语', points: result.breakdown.english, icon: '🗣️' },
                    { label: '澳洲工作经验', points: result.breakdown.ausExperience, icon: '🇦🇺' },
                    { label: '海外工作经验', points: result.breakdown.overseasExperience, icon: '🌍' },
                    { label: '学历', points: result.breakdown.education, icon: '🎓' },
                    { label: '加分项', points: result.breakdown.bonusPoints, icon: '🎁' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <span className="text-2xl font-bold text-cyan-400">+{item.points}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex justify-between items-center">
                  <span className="text-lg font-semibold">总分</span>
                  <span className={`text-3xl font-bold ${getScoreColor(result.totalScore)}`}>
                    {result.totalScore}
                  </span>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">💡 建议</h3>
                
                {result.gap > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                      <p className="font-semibold mb-2">📈 提高英语</p>
                      <p className="text-gray-300 text-sm">
                        从雅思 {profile.english} 提升到 7 或 8，可增加 {profile.english === '6' ? 10 : 10} 分
                      </p>
                    </div>

                    <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                      <p className="font-semibold mb-2">💼 积累工作经验</p>
                      <p className="text-gray-300 text-sm">
                        每增加 1 年澳洲工作经验，可增加 1-2 分
                      </p>
                    </div>

                    <div className="p-4 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                      <p className="font-semibold mb-2">🏛️ 申请州担保</p>
                      <p className="text-gray-300 text-sm">
                        获得州担保可加 5 分，大大提高获邀机会
                      </p>
                    </div>

                    <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <p className="font-semibold mb-2">🏡 考虑偏远地区</p>
                      <p className="text-gray-300 text-sm">
                        申请 491 偏远地区签证可加 15 分，成功率最高
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-400 mb-2">🎉 恭喜！</p>
                    <p className="text-gray-300">
                      你的分数已达到邀请线，可以准备递交 EOI 申请了！
                    </p>
                  </div>
                )}
              </div>

              {/* Next Steps */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">📋 下一步</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <p className="font-semibold">完成职业评估</p>
                      <p className="text-gray-400 text-sm">联系 {result.occupation?.assessing} 进行职业评估</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <p className="font-semibold">准备 EOI 申请</p>
                      <p className="text-gray-400 text-sm">收集所有必要文件和证明材料</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <p className="font-semibold">提交 EOI</p>
                      <p className="text-gray-400 text-sm">在移民局官网提交 Expression of Interest</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">4️⃣</span>
                    <div>
                      <p className="font-semibold">等待邀请</p>
                      <p className="text-gray-400 text-sm">通常 1-6 个月内收到邀请</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="text-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
                >
                  ← 重新评估
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>⚠️ 此工具仅供参考，具体申请结果请咨询持牌移民代理</p>
            <p className="mt-2">
              <a href="/" className="text-cyan-400 hover:underline">← 返回项目看板</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
