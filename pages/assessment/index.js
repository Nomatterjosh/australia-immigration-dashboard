// 完整版评估页面
import React, { useState } from 'react';

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

  const getAgePoints = (age) => {
    if (age >= 25 && age <= 32) return 30;
    if (age >= 33 && age <= 39) return 25;
    if (age >= 40 && age <= 44) return 15;
    if (age >= 18 && age <= 24) return 25;
    return 0;
  };

  const getEnglishPoints = (e) => {
    if (e === '9' || e === '8') return 20;
    if (e === '7') return 10;
    return 0;
  };

  const getEducationPoints = (e) => {
    if (e === 'phd') return 20;
    if (e === 'honours' || e === 'master') return 15;
    if (e === 'bachelor') return 15;
    return 10;
  };

  const getExperiencePoints = (y) => {
    if (y >= 10) return 15;
    if (y >= 8) return 13;
    if (y >= 6) return 10;
    if (y >= 3) return 5;
    return 0;
  };

  const calculateScore = () => {
    let score = 0;
    const age = profile.age;
    if (age >= 25 && age <= 32) score += 30;
    else if (age >= 33 && age <= 39) score += 25;
    else if (age >= 18 && age <= 24) score += 25;
    else if (age >= 40 && age <= 44) score += 15;
    
    if (profile.english === '9' || profile.english === '8') score += 20;
    else if (profile.english === '7') score += 10;
    
    score += getEducationPoints(profile.education);
    score += getExperiencePoints(profile.australianExperience);
    score += getExperiencePoints(profile.overseasExperience);
    
    if (profile.australianStudy) score += 5;
    if (profile.communityLanguage) score += 5;
    if (profile.spouseSkills) score += 10;
    if (profile.stem) score += 10;
    
    return score;
  };

  const occupationData = {
    '261111': { name: 'ICT 业务分析师', avgPoints: 90 },
    '261312': { name: '开发程序员', avgPoints: 85 },
    '261313': { name: '软件工程师', avgPoints: 90 },
    '233211': { name: '土木工程师', avgPoints: 85 },
    '221111': { name: '会计师', avgPoints: 100 },
    '254499': { name: '注册护士', avgPoints: 75 },
  };

  const handleCalculate = () => {
    const totalScore = calculateScore();
    const occ = occupationData[profile.occupation] || { name: '通用', avgPoints: 85 };
    const gap = occ.avgPoints - totalScore;
    
    setResult({
      totalScore,
      occupation: occ,
      currentInvitation: occ.avgPoints,
      gap,
      breakdown: {
        age: getAgePoints(profile.age),
        english: getEnglishPoints(profile.english),
        education: getEducationPoints(profile.education),
        ausExp: getExperiencePoints(profile.australianExperience),
        overseasExp: getExperiencePoints(profile.overseasExperience),
        bonus: (profile.australianStudy ? 5 : 0) + (profile.communityLanguage ? 5 : 0) + (profile.spouseSkills ? 10 : 0) + (profile.stem ? 10 : 0)
      }
    });
    setStep(4);
  };

  const updateProfile = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#4ade80';
    if (score >= 80) return '#86efac';
    if (score >= 65) return '#fbbf24';
    return '#f87171';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            🎯 签证评估 & 打分计算器
          </h1>
          <p className="text-gray-400">精准计算你的 EOI 分数</p>
        </div>

        <div className="flex justify-center mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'
              }`}>
                {s}
              </div>
              {s < 4 && <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-cyan-500' : 'bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">📋 基本信息</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">年龄</label>
                <input type="number" min="18" max="50" value={profile.age}
                  onChange={(e) => updateProfile('age', parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white" />
                <p className="text-xs text-gray-500 mt-1">得分: {getAgePoints(profile.age)} 分</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">学历</label>
                <select value={profile.education} onChange={(e) => updateProfile('education', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white">
                  <option value="phd">博士学位</option>
                  <option value="master">硕士学位</option>
                  <option value="honours">荣誉学士</option>
                  <option value="bachelor">本科学位</option>
                  <option value="diploma">专科/Diploma</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">得分: {getEducationPoints(profile.education)} 分</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">英语（雅思）</label>
                <select value={profile.english} onChange={(e) => updateProfile('english', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white">
                  <option value="9">4个9</option>
                  <option value="8">4个8</option>
                  <option value="7">4个7</option>
                  <option value="6">4个6</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">得分: {getEnglishPoints(profile.english)} 分</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">提名职业</label>
                <select value={profile.occupation} onChange={(e) => updateProfile('occupation', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white">
                  <option value="">选择职业</option>
                  <option value="261111">ICT 业务分析师</option>
                  <option value="261312">开发程序员</option>
                  <option value="261313">软件工程师</option>
                  <option value="233211">土木工程师</option>
                  <option value="221111">会计师</option>
                  <option value="254499">注册护士</option>
                </select>
                {profile.occupation && occupationData[profile.occupation] && (
                  <p className="text-xs text-cyan-400 mt-1">邀请线: {occupationData[profile.occupation].avgPoints} 分</p>
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={() => setStep(2)} disabled={!profile.occupation}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition disabled:opacity-50">
                下一步 →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">💼 工作经验</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">澳洲工作经验（年）</label>
                <input type="number" min="0" max="30" value={profile.australianExperience}
                  onChange={(e) => updateProfile('australianExperience', parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white" />
                <p className="text-xs text-gray-500 mt-1">得分: {getExperiencePoints(profile.australianExperience)} 分</p>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">海外工作经验（年）</label>
                <input type="number" min="0" max="30" value={profile.overseasExperience}
                  onChange={(e) => updateProfile('overseasExperience', parseInt(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none text-white" />
                <p className="text-xs text-gray-500 mt-1">得分: {getExperiencePoints(profile.overseasExperience)} 分</p>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(1)} className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
                ← 上一步
              </button>
              <button onClick={() => setStep(3)} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold">
                下一步 →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">🎁 加分项</h2>
            <div className="space-y-4">
              {[
                { key: 'australianStudy', label: '澳洲学习经历', desc: '在澳洲完成至少2年学习 +5分' },
                { key: 'communityLanguage', label: '社区语言', desc: '通过NAATI认证 +5分' },
                { key: 'spouseSkills', label: '配偶技能评估', desc: '配偶通过职业评估 +10分' },
                { key: 'stem', label: 'STEM学位', desc: 'STEM相关学位 +10分' },
              ].map(item => (
                <label key={item.key} className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 rounded-lg hover:bg-white/10">
                  <input type="checkbox" checked={profile[item.key]}
                    onChange={(e) => updateProfile(item.key, e.target.checked)}
                    className="w-5 h-5 bg-gray-800 border-gray-700 text-cyan-500" />
                  <div>
                    <span className="font-semibold">{item.label}</span>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={() => setStep(2)} className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
                ← 上一步
              </button>
              <button onClick={handleCalculate} className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold">
                🎯 计算分数
              </button>
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div>
            <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30 rounded-xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-gray-400 mb-2">你的分数</p>
                  <div className="text-6xl font-bold" style={{ color: getScoreColor(result.totalScore) }}>
                    {result.totalScore}
                  </div>
                </div>
                <div className="border-l border-r border-white/10">
                  <p className="text-gray-400 mb-2">邀请线</p>
                  <div className="text-6xl font-bold text-yellow-400">{result.currentInvitation}</div>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">差距</p>
                  <div className={`text-6xl font-bold ${result.gap <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {result.gap > 0 ? '+' : ''}{result.gap}
                  </div>
                </div>
              </div>
              <div className={`mt-6 p-4 rounded-lg bg-white/5 text-center ${result.gap <= 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                {result.gap <= 0 ? '🎉 恭喜！你的分数已达到邀请线' : result.gap <= 10 ? '⚠️ 差一点点，再加油！' : '📊 还需提高分数'}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold mb-4">📊 分数明细</h3>
              <div className="space-y-3">
                {[
                  { label: '年龄', points: result.breakdown.age, icon: '🎂' },
                  { label: '英语', points: result.breakdown.english, icon: '🗣️' },
                  { label: '学历', points: result.breakdown.education, icon: '🎓' },
                  { label: '澳洲经验', points: result.breakdown.ausExp, icon: '🇦🇺' },
                  { label: '海外经验', points: result.breakdown.overseasExp, icon: '🌍' },
                  { label: '加分项', points: result.breakdown.bonus, icon: '🎁' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span>{item.icon} {item.label}</span>
                    <span className="text-cyan-400 font-bold">+{item.points}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button onClick={() => { setStep(1); setResult(null); }}
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold">
                ← 重新评估
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>⚠️ 此工具仅供参考</p>
          <p className="mt-2"><a href="/" className="text-cyan-400 hover:underline">← 返回看板</a></p>
        </div>
      </div>
    </div>
  );
}
