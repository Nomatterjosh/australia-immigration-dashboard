// AI 文书助手 - 简化版
import React, { useState } from 'react';
import Head from 'next/head';

const documentTypes = [
  { id: 'sop', name: '个人陈述 SOP', icon: '📄' },
  { id: 'recommendation', name: '推荐信', icon: '📝' },
  { id: 'cover-letter', name: 'Cover Letter', icon: '💼' },
  { id: 'career-plan', name: '职业发展计划', icon: '📊' },
  { id: 'family-sponsorship', name: '家庭担保函', icon: '👨‍👩‍👧' }
];

export default function DocumentAssistant() {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    occupation: '',
    occupationCode: '',
    yearsOfExperience: 0,
    education: '',
    major: '',
    achievements: '',
    skills: '',
    whyAustralia: '',
    futurePlan: '',
    recommenderName: '',
    recommenderTitle: '',
    recommenderCompany: ''
  });
  const [generatedDoc, setGeneratedDoc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateDocument = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let content = '# ' + (docType.name) + '\n\n';
      content += '**申请人：** ' + (formData.fullName || '[姓名]') + '\n\n';
      content += '**职业：** ' + (formData.occupation || '[职业]') + ' (' + (formData.occupationCode || 'N/A') + ')\n\n';
      content += '**从业年限：** ' + formData.yearsOfExperience + ' 年\n\n';
      content += '---\n\n';
      content += '## 成就\n\n' + (formData.achievements || '请填写您的成就...') + '\n\n';
      content += '## 技能\n\n' + (formData.skills || '请填写您的技能...') + '\n\n';
      content += '## 为什么选择澳大利亚\n\n' + (formData.whyAustralia || '请填写...') + '\n\n';
      content += '## 未来规划\n\n' + (formData.futurePlan || '请填写...') + '\n\n';
      
      if (docType.id === 'recommendation') {
        content += '---\n## 推荐人信息\n\n';
        content += '推荐人：' + (formData.recommenderName || '[推荐人姓名]') + '\n';
        content += '职位：' + (formData.recommenderTitle || '[职位]') + '\n';
        content += '公司：' + (formData.recommenderCompany || '[公司]') + '\n';
      }
      
      content += '\n---\n\n**日期：** ' + new Date().toLocaleDateString('zh-CN') + '\n';
      
      setGeneratedDoc(content);
      setIsGenerating(false);
      setStep(3);
    }, 1500);
  };

  const copyToClipboard = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(generatedDoc);
      alert('已复制到剪贴板！');
    }
  };

  return (
    <>
      <Head>
        <title>AI 文书助手 - 澳洲移民</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              📝 AI 文书助手
            </h1>
            <p className="text-gray-400">智能生成 SOP、推荐信等移民文书</p>
          </div>

          {step === 1 && (
            <div className="grid md:grid-cols-3 gap-6">
              {documentTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => { setDocType(type); setStep(2); }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 hover:border-purple-500/50 transition-all"
                >
                  <span className="text-4xl mb-4 block">{type.icon}</span>
                  <h3 className="text-xl font-bold">{type.name}</h3>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-4">{docType?.icon}</span>
                <h2 className="text-2xl font-bold">{docType?.name}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">姓名 *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateForm('fullName', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">职业</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => updateForm('occupation', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">ANZSCO 代码</label>
                  <input
                    type="text"
                    value={formData.occupationCode}
                    onChange={(e) => updateForm('occupationCode', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">从业年限</label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => updateForm('yearsOfExperience', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">学历</label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => updateForm('education', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">专业</label>
                  <input
                    type="text"
                    value={formData.major}
                    onChange={(e) => updateForm('major', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">主要成就</label>
                  <textarea
                    value={formData.achievements}
                    onChange={(e) => updateForm('achievements', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none h-24"
                    placeholder="请描述您的主要成就..."
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">核心技能</label>
                  <textarea
                    value={formData.skills}
                    onChange={(e) => updateForm('skills', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none h-24"
                    placeholder="请描述您的核心技能..."
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">选择澳大利亚的原因</label>
                  <textarea
                    value={formData.whyAustralia}
                    onChange={(e) => updateForm('whyAustralia', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none h-24"
                    placeholder="为什么选择澳大利亚？"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">未来规划</label>
                  <textarea
                    value={formData.futurePlan}
                    onChange={(e) => updateForm('futurePlan', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none h-24"
                    placeholder="您的未来规划是什么？"
                  />
                </div>
              </div>

              {docType?.id === 'recommendation' && (
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">推荐人姓名</label>
                    <input
                      type="text"
                      value={formData.recommenderName}
                      onChange={(e) => updateForm('recommenderName', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">推荐人职位</label>
                    <input
                      type="text"
                      value={formData.recommenderTitle}
                      onChange={(e) => updateForm('recommenderTitle', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">推荐人公司</label>
                    <input
                      type="text"
                      value={formData.recommenderCompany}
                      onChange={(e) => updateForm('recommenderCompany', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-purple-500 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
                >
                  返回
                </button>
                <button
                  type="button"
                  onClick={generateDocument}
                  disabled={isGenerating}
                  className="px-8 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold disabled:opacity-50"
                >
                  {isGenerating ? '生成中...' : '生成文书'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && generatedDoc && (
            <div>
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">✅ 文书已生成</h2>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold"
                    >
                      复制
                    </button>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setDocType(null); setGeneratedDoc(''); }}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
                    >
                      重新生成
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white text-gray-800 rounded-xl p-8 max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm">{generatedDoc}</pre>
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <a href="/" className="text-purple-400 hover:underline">返回看板</a>
          </div>
        </div>
      </div>
    </>
  );
}
