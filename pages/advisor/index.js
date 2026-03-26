// AI 智能顾问
import React, { useState } from 'react';
import Head from 'next/head';

const visaTypes = [
  { code: '189', name: '独立技术移民', points: 85, requirements: ['通过职业评估', '雅思4个7以上', 'EOI达到65分'], suitable: '高学历、高分数、无澳洲关联' },
  { code: '190', name: '州担保移民', points: 80, requirements: ['通过职业评估', '获得州担保', '雅思4个7以上'], suitable: '有目标州、有居住意愿' },
  { code: '491', name: '偏远地区担保', points: 65, requirements: ['通过职业评估', '获得偏远地区担保', '雅思4个6以上'], suitable: '分数较低、愿意去偏远地区' },
  { code: '186', name: '雇主担保永居', points: 70, requirements: ['3年工作经验', '雇主担保资格', '雅思4个6以上'], suitable: '有澳洲工作经验、已有雇主' },
  { code: '482', name: '临时技术短缺', points: 50, requirements: ['2年工作经验', '雇主担保', '雅思4个5以上'], suitable: '有技能、有雇主愿意担保' },
  { code: '485', name: '毕业生工签', points: 0, requirements: ['澳洲2年学习', '雅思4个5以上', '毕业6个月内申请'], suitable: '刚毕业的留学生' },
];

const assessmentSteps = [
  { step: 1, title: '基本信息', icon: '👤' },
  { step: 2, title: '学历背景', icon: '🎓' },
  { step: 3, title: '工作经验', icon: '💼' },
  { step: 4, title: '语言能力', icon: '🗣️' },
  { step: 5, title: '推荐结果', icon: '✅' },
];

const userProfile = {
  education: [
    { level: '博士', points: 20, schools: ['澳洲八大', '其他澳洲大学', '海外名校', '普通海外学历'] },
    { level: '硕士', points: 15, schools: ['澳洲八大', '其他澳洲大学', '海外名校', '普通海外学历'] },
    { level: '本科', points: 15, schools: ['澳洲八大', '其他澳洲大学', '海外名校', '普通海外学历'] },
    { level: 'Diploma', points: 10, schools: ['澳洲学历', '海外学历'] },
  ],
  english: [
    { level: '雅思4个8', points: 20, pte: '79+' },
    { level: '雅思4个7', points: 10, pte: '65-78' },
    { level: '雅思4个6', points: 0, pte: '50-64' },
  ],
  workExperience: [
    { years: '8-10年', auPoints: 15, overseasPoints: 8 },
    { years: '5-7年', auPoints: 10, overseasPoints: 5 },
    { years: '3-4年', auPoints: 5, overseasPoints: 0 },
  ],
};

export default function AIAdvisor() {
  const [currentStep, setCurrentStep] = useState(1);
  const [profile, setProfile] = useState({
    age: '',
    education: '',
    schoolRank: '',
    educationCountry: '',
    englishLevel: '',
    workYears: '',
    workLocation: '',
    ausStudy: false,
    specialistEdu: false,
    communityLang: false,
    partnerSkill: false,
    stateSponsorship: '',
    regionalStudy: false,
  });
  const [totalPoints, setTotalPoints] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  const calculatePoints = () => {
    let points = 0;
    
    // 年龄
    const age = parseInt(profile.age);
    if (age >= 25 && age <= 32) points += 30;
    else if (age >= 18 && age <= 24) points += 25;
    else if (age >= 33 && age <= 39) points += 25;
    else if (age >= 40 && age <= 44) points += 15;
    else if (age >= 45 && age <= 49) points += 10;

    // 学历
    const edu = userProfile.education.find(e => e.level === profile.education);
    if (edu) {
      const schoolBonus = profile.schoolRank === '澳洲八大' ? 5 : profile.schoolRank === '其他澳洲大学' ? 3 : 0;
      points += edu.points + schoolBonus;
    }

    // 英语
    const eng = userProfile.english.find(e => e.level === profile.englishLevel);
    if (eng) points += eng.points;

    // 工作经验
    const exp = userProfile.workExperience.find(e => e.years === profile.workYears);
    if (exp) {
      points += profile.workLocation === '澳洲' ? exp.auPoints : exp.overseasPoints;
    }

    // 其他加分
    if (profile.ausStudy) points += 5;
    if (profile.specialistEdu) points += 5;
    if (profile.communityLang) points += 5;
    if (profile.stateSponsorship === '190') points += 5;
    if (profile.stateSponsorship === '491') points += 15;
    if (profile.regionalStudy) points += 5;

    setTotalPoints(points);
    return points;
  };

  const getRecommendations = () => {
    const points = calculatePoints();
    const recs = visaTypes.filter(v => v.code !== '485').filter(v => {
      if (v.code === '189') return points >= 80;
      if (v.code === '190') return points >= 65;
      if (v.code === '491') return points >= 50;
      if (v.code === '186') return profile.workYears && parseInt(profile.workYears) >= 3;
      return false;
    }).sort((a, b) => {
      if (a.code === '189') return -1;
      if (b.code === '189') return 1;
      return 0;
    });
    
    if (recs.length === 0 && points >= 50) {
      recs.push({ ...visaTypes[2], note: '建议提高分数后申请' });
    }
    if (points < 50) {
      recs.push({ ...visaTypes[4], note: '可考虑482签证路径' });
    }
    
    setRecommendations(recs);
    return recs;
  };

  const nextStep = () => {
    if (currentStep === 4) {
      getRecommendations();
    }
    setCurrentStep(Math.min(currentStep + 1, 5));
  };

  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  return (
    <>
      <Head><title>AI智能顾问 - 澳洲移民项目</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              🤖 AI 智能顾问
            </h1>
            <p className="text-gray-400">根据您的情况推荐最适合的签证类型</p>
          </div>

          {/* Progress */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              {assessmentSteps.map((s, i) => (
                <React.Fragment key={s.step}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= s.step ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-400'
                  }`}>
                    {currentStep > s.step ? '✓' : s.icon}
                  </div>
                  {i < assessmentSteps.length - 1 && (
                    <div className={`w-12 h-1 rounded ${currentStep > s.step ? 'bg-pink-500' : 'bg-gray-700'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4">👤 基本信息</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">您的年龄</label>
                    <select
                      value={profile.age}
                      onChange={(e) => setProfile({...profile, age: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-pink-500 outline-none"
                    >
                      <option value="">请选择</option>
                      <option value="20">18-24岁</option>
                      <option value="28">25-32岁</option>
                      <option value="36">33-39岁</option>
                      <option value="42">40-44岁</option>
                      <option value="46">45-49岁</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4">🎓 学历背景</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">最高学历</label>
                    <select
                      value={profile.education}
                      onChange={(e) => setProfile({...profile, education: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-pink-500 outline-none"
                    >
                      <option value="">请选择</option>
                      <option value="博士">博士</option>
                      <option value="硕士">硕士</option>
                      <option value="本科">本科</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">学校类型</label>
                    <select
                      value={profile.schoolRank}
                      onChange={(e) => setProfile({...profile, schoolRank: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-pink-500 outline-none"
                    >
                      <option value="">请选择</option>
                      <option value="澳洲八大">澳洲八大（UNSW/墨大/悉大等）</option>
                      <option value="其他澳洲大学">其他澳洲大学</option>
                      <option value="海外名校">海外名校（QS前100）</option>
                      <option value="普通学历">普通海外学历</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4">💼 工作经验</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">工作经验年限</label>
                    <select
                      value={profile.workYears}
                      onChange={(e) => setProfile({...profile, workYears: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-pink-500 outline-none"
                    >
                      <option value="">请选择</option>
                      <option value="3-4年">3-4年</option>
                      <option value="5-7年">5-7年</option>
                      <option value="8-10年">8-10年</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">工作地点</label>
                    <select
                      value={profile.workLocation}
                      onChange={(e) => setProfile({...profile, workLocation: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-pink-500 outline-none"
                    >
                      <option value="">请选择</option>
                      <option value="澳洲">澳洲工作经验</option>
                      <option value="海外">海外工作经验</option>
                      <option value="都有">澳洲+海外</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-4">🗣️ 语言能力</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">英语水平</label>
                    <select
                      value={profile.englishLevel}
                      onChange={(e) => setProfile({...profile, englishLevel: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-pink-500 outline-none"
                    >
                      <option value="">请选择</option>
                      <option value="雅思4个8">雅思4个8 (PTE 79+)</option>
                      <option value="雅思4个7">雅思4个7 (PTE 65-78)</option>
                      <option value="雅思4个6">雅思4个6 (PTE 50-64)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">加分项</label>
                    <div className="space-y-2">
                      {[
                        { key: 'ausStudy', label: '澳洲2年学习 (+5分)' },
                        { key: 'specialistEdu', label: 'STEM/专业教育 (+5分)' },
                        { key: 'communityLang', label: '社区语言认证 (+5分)' },
                        { key: 'regionalStudy', label: '偏远地区学习 (+5分)' },
                      ].map(item => (
                        <label key={item.key} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg cursor-pointer hover:bg-gray-700/50">
                          <input
                            type="checkbox"
                            checked={profile[item.key]}
                            onChange={(e) => setProfile({...profile, [item.key]: e.target.checked})}
                            className="w-5 h-5 rounded bg-gray-700 border-gray-600"
                          />
                          {item.label}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h2 className="text-xl font-bold mb-4">✅ 推荐结果</h2>
                
                {/* Points Summary */}
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-xl p-6 mb-6 text-center">
                  <div className="text-6xl font-bold text-pink-400">{totalPoints}</div>
                  <div className="text-gray-400">您的预估 EOI 分数</div>
                </div>

                {/* Recommendations */}
                <h3 className="font-bold mb-4">🎯 推荐的签证类型</h3>
                <div className="space-y-4">
                  {recommendations.map((visa, i) => (
                    <div key={visa.code} className={`bg-gray-800/50 rounded-xl p-5 ${i === 0 ? 'border-2 border-pink-500' : 'border border-gray-700'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold">{visa.code}</span>
                          <span className="font-bold">{visa.name}</span>
                        </div>
                        {i === 0 && <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded text-xs">最佳选择</span>}
                      </div>
                      <p className="text-gray-400 text-sm mb-3">最低要求：{visa.points}分 | {visa.suitable}</p>
                      <div className="text-sm">
                        <span className="text-gray-500">要求：</span>
                        {visa.requirements.join('、')}
                      </div>
                      {visa.note && <p className="text-yellow-400 text-sm mt-2">💡 {visa.note}</p>}
                    </div>
                  ))}
                </div>

                {/* Next Steps */}
                <div className="mt-6 bg-gray-800/50 rounded-xl p-5">
                  <h3 className="font-bold mb-3">📋 下一步建议</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>1. 进入 <a href="/assessment" className="text-pink-400 hover:underline">完整EOI打分</a> 进行精确计算</li>
                    <li>2. 查看 <a href="/occupation" className="text-pink-400 hover:underline">职业评估</a> 确认您的职业</li>
                    <li>3. 了解 <a href="/states" className="text-pink-400 hover:underline">各州担保政策</a></li>
                    <li>4. 准备 <a href="/documents" className="text-pink-400 hover:underline">申请材料</a></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition"
            >
              上一步
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === 5}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-lg font-semibold transition"
            >
              {currentStep === 4 ? '获取推荐' : '下一步'}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>AI分析仅供参考，实际情况请咨询专业移民代理</p>
            <p className="mt-2"><a href="/" className="text-pink-400 hover:underline">← 返回项目看板</a></p>
          </div>
        </div>
      </div>
    </>
  );
}
