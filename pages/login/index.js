import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
// i18n simplified

export default function Login() {
  const router = useRouter();
  const { lang, setLang, t, languages } = useI18n();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const copy = {
    zh: {
      welcome: '欢迎回来',
      createAccount: '创建您的账户',
      demoMode: '⚠️ 当前为演示模式，数据保存在本地浏览器',
      loginTab: '登录',
      registerTab: '注册',
      nickname: '昵称',
      nicknamePlaceholder: '请输入昵称',
      email: '邮箱',
      password: '密码',
      processing: '处理中...',
      loginBtn: '登录',
      registerBtn: '注册',
      demoAccounts: '🎮 演示账户（可直接登录）',
      guestMode: '以游客身份继续浏览 →',
      emailError: '邮箱或密码错误',
      emailExists: '该邮箱已被注册',
      registerSuccess: '注册成功！请登录',
      saveRecord: '保存记录',
      reminder: '进度提醒',
      analysis: '数据分析',
    },
    en: {
      welcome: 'Welcome Back',
      createAccount: 'Create Your Account',
      demoMode: '⚠️ Demo mode: data stored in local browser',
      loginTab: 'Login',
      registerTab: 'Register',
      nickname: 'Nickname',
      nicknamePlaceholder: 'Enter your nickname',
      email: 'Email',
      password: 'Password',
      processing: 'Processing...',
      loginBtn: 'Login',
      registerBtn: 'Register',
      demoAccounts: '🎮 Demo Account (click to fill)',
      guestMode: 'Continue as Guest →',
      emailError: 'Invalid email or password',
      emailExists: 'Email already registered',
      registerSuccess: 'Registered! Please login.',
      saveRecord: 'Save Records',
      reminder: 'Reminders',
      analysis: 'Analytics',
    }
  };

  const c = copy[lang] || copy.zh;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify({ email: user.email, name: user.name, loginTime: Date.now() }));
        localStorage.setItem('userEmail', user.email);
        setTimeout(() => router.push('/profile'), 500);
      } else {
        setError(c.emailError);
      }
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        setError(c.emailExists);
      } else {
        users.push({ email, password, name, createdAt: Date.now() });
        localStorage.setItem('users', JSON.stringify(users));
        alert(c.registerSuccess);
        setIsLogin(true);
        setPassword('');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Head><title>{isLogin ? c.loginTab : c.registerTab} - {t.siteName}</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">

          {/* Logo + Lang Switcher */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                🇦🇺 {t.siteName}
              </h1>
            </Link>
            <p className="text-gray-400 mt-2">{isLogin ? c.welcome : c.createAccount}</p>
            <p className="text-gray-500 text-xs mt-1">{c.demoMode}</p>

            {/* Language Toggle */}
            <div className="flex justify-center gap-2 mt-4">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-3 py-1 rounded-full text-sm transition ${lang === l.code ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`}
                >
                  {l.flag} {l.name}
                </button>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            {/* Tabs */}
            <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
              <button onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 py-2 rounded-lg font-medium transition ${isLogin ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}>
                {c.loginTab}
              </button>
              <button onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 py-2 rounded-lg font-medium transition ${!isLogin ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}>
                {c.registerTab}
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{c.nickname}</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder={c.nicknamePlaceholder}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" required />
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-400 mb-2">{c.email}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{c.password}</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" required minLength={6} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 disabled:opacity-50 rounded-lg font-bold transition flex items-center justify-center gap-2">
                {loading ? <><span className="animate-spin">⏳</span>{c.processing}</> : (isLogin ? c.loginBtn : c.registerBtn)}
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
              {[
                { icon: '💾', label: c.saveRecord },
                { icon: '🔔', label: c.reminder },
                { icon: '📊', label: c.analysis },
              ].map((f, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3">
                  <p className="text-2xl mb-1">{f.icon}</p>
                  <p className="text-gray-400">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Account */}
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-2">{c.demoAccounts}</p>
            <button onClick={() => { setEmail('demo@test.com'); setPassword('123456'); }}
              className="w-full text-left px-3 py-2 bg-gray-800/50 rounded hover:bg-gray-700/50 transition text-sm">
              <span className="text-cyan-400">demo@test.com</span>
              <span className="text-gray-500 ml-2">/ 123456</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-gray-400 hover:text-white transition text-sm">{c.guestMode}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
