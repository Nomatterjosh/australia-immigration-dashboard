import React, { useState } from 'react';
import Head from 'next/head';

const occupations = [
  { value: '', label: '请选择职业' },
  { value: '261111', label: 'ICT 业务分析师' },
  { value: '261312', label: '程序员' },
  { value: '261313', label: '软件工程师' },
  { value: '233914', label: '工程师' },
  { value: '221111', label: '会计师' },
  { value: '241111', label: '幼儿教师' },
  { value: '254499', label: '注册护士' },
  { value: '321211', label: '汽车技师' }
];

const educationOptions = [
  { value: 'phd', label: '博士' },
  { value: 'master', label: '硕士' },
  { value: 'bachelor', label: '本科' },
  { value: 'diploma', label: '专科/Diploma' },
  { value: 'highschool', label: '高中' }
];

const englishOptions = [
  { value: '8', label: '雅思 4个8 (Competent Plus)' },
  { value: '7', label: '雅思 4个7 (Competent)' },
  { value: '6', label: '雅思 4个6 (Functional)' }
];

export default function ImmigrationPlanner() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    age: 30,
    education: 'bachelor',
    english: '6',
    occupation: '',
    australianExperience: 0,
    overseasExperience: 0,
    hasJobOffer: false,
    workExperience: 0,
    stateNomination: false,
    regionalArea: false,
    spouseSkills: false,
    businessAssets: 0,
    investmentAssets: 0
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/immigration/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        setStep(4);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const updateProfile = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    if (score >= 65) return 'text-orange-400';
    return 'text-red-400';
  };

  const getSuitabilityBadge = (suitability) => {
    switch (suitability) {
      case 'high':
        return <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">⭐ 推荐</span>;
      case 'medium':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">可以考虑</span>;
      default:
        return <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm">备选</span>;
    }
  };

  return (
    <>
      <Head>
        <title>移民路径规划 - 澳洲移民项目</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              🗺️ 移民路径规划工具
            </h1>
            <p className="text-gray-400">根据您的情况，智能推荐最优签证路径</p>
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
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2">最高学历</label>
                  <select
                    value={profile.education}
                    onChange={(e) => updateProfile('education', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none"
                  >
                    {educationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">英语水平（雅思）</label>
                  <select
                    value={profile.english}
                    onChange={(e) => updateProfile('english', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none"
                  >
                    {englishOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">提名职业</label>
                  <select
                    value={profile.occupation}
                    onChange={(e) => updateProfile('occupation', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none"
                  >
                    {occupations.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition"
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
                    max="20"
                    value={profile.australianExperience}
                    onChange={(e) => updateProfile('australianExperience', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">海外工作经验（年）</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={profile.overseasExperience}
                    onChange={(e) => updateProfile('overseasExperience', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.hasJobOffer}
                    onChange={(e) => updateProfile('hasJobOffer', e.target.checked)}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span>我有澳洲雇主担保机会</span>
                </label>
              </div>

              {profile.hasJobOffer && (
                <div className="mt-6">
                  <label className="block text-gray-400 mb-2">相关工作经验（年）</label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={profile.workExperience}
                    onChange={(e) => updateProfile('workExperience', parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none"
                  />
                </div>
              )}

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

          {/* Step 3: Additional Info */}
          {step === 3 && (
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">🎯 其他加分项</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 rounded-lg">
                  <input
                    type="checkbox"
                    checked={profile.stateNomination}
                    onChange={(e) => updateProfile('stateNomination', e.target.checked)}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500"
                  />
                  <div>
                    <span className="font-semibold">州担保提名</span>
                    <p className="text-gray-400 text-sm">+5分，获得州担保可增加获邀机会</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 rounded-lg">
                  <input
                    type="checkbox"
                    checked={profile.regionalArea}
                    onChange={(e) => updateProfile('regionalArea', e.target.checked)}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500"
                  />
                  <div>
                    <span className="font-semibold">偏远地区居住/学习</span>
                    <p className="text-gray-400 text-sm">+5分，在偏远地区居住或学习过</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-4 bg-white/5 rounded-lg">
                  <input
                    type="checkbox"
                    checked={profile.spouseSkills}
                    onChange={(e) => updateProfile('spouseSkills', e.target.checked)}
                    className="w-5 h-5 rounded bg-gray-800 border-gray-700 text-cyan-500"
                  />
                  <div>
                    <span className="font-semibold">配偶技能评估通过</span>
                    <p className="text-gray-400 text-sm">+5分，配偶满足同等职业评估要求</p>
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
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition disabled:opacity-50"
                >
                  {loading ? '⏳ 分析中...' : '🎯 生成推荐'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && result && (
            <div>
              {/* Score Card */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/30 rounded-xl p-8 mb-8 text-center">
                <h2 className="text-xl text-gray-300 mb-2">您的 EOI 综合评分</h2>
                <div className={`text-7xl font-bold mb-4 ${getScoreColor(result.totalScore)}`}>
                  {result.totalScore}
                </div>
                <p className="text-gray-400">
                  {result.totalScore >= 85 && '🎉 优秀！高分可快速获邀'}
                  {result.totalScore >= 75 && result.totalScore < 85 && '👍 良好，有较好获邀机会'}
                  {result.totalScore >= 65 && result.totalScore < 75 && '📊 达标，需要继续努力提高分数'}
                  {result.totalScore < 65 && '⚠️ 分数不足，建议提升英语或工作经验'}
                </p>
              </div>

              {/* Recommendations */}
              <h2 className="text-2xl font-bold mb-6">🏆 推荐签证路径</h2>
              <div className="space-y-6">
                {result.recommendations.map((rec, index) => (
                  <div key={rec.visa.id} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{rec.visa.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold">{rec.visa.name}</h3>
                          <p className="text-gray-400 text-sm">{rec.visa.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {getSuitabilityBadge(rec.suitability)}
                        <span className="text-2xl font-bold text-cyan-400">#{index + 1}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">💡 {rec.reason}</p>

                    {/* Timeline */}
                    <div className="mb-4">
                      <h4 className="text-sm text-gray-400 mb-2">📅 办理流程</h4>
                      <div className="flex items-center flex-wrap gap-2">
                        {rec.visa.pathway.map((step, i) => (
                          <React.Fragment key={i}>
                            <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm">{step}</span>
                            {i < rec.visa.pathway.length - 1 && <span className="text-gray-500">→</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Cost & Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-gray-400 text-sm mb-1">预计时间</div>
                        <div className="text-2xl font-bold text-yellow-400">{rec.estimatedTime} 个月</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-gray-400 text-sm mb-1">预估费用</div>
                        <div className="text-2xl font-bold text-green-400">
                          ${rec.estimatedCost.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h4 className="text-sm text-gray-400 mb-2">📋 基本要求</h4>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {Object.entries(rec.visa.requirements).map(([key, value]) => (
                          <li key={key}>• {key}: {value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back Button */}
              <div className="mt-8 text-center">
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
