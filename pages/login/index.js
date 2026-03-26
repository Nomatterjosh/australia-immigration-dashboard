import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [lang, setLang] = useState('zh');
  
  const copy = {
    zh: { welcome: '欢迎回来', create: '创建账户', demoMode: '演示模式', loginTab: '登录', regTab: '注册', nickname: '昵称', email: '邮箱', pwd: '密码', processing: '处理中...', login: '登录', register: '注册', demo: '演示账户', guest: '以游客身份浏览', error: '邮箱或密码错误', regError: '已注册', success: '注册成功' },
    en: { welcome: 'Welcome Back', create: 'Create Account', demoMode: 'Demo Mode', loginTab: 'Login', regTab: 'Register', nickname: 'Nickname', email: 'Email', pwd: 'Password', processing: 'Processing...', login: 'Login', register: 'Register', demo: 'Demo Account', guest: 'Continue as Guest', error: 'Invalid credentials', regError: 'Already registered', success: 'Registered!' }
  };
  const c = copy[lang] || copy.zh;

  React.useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) setLang(saved);
  }, []);

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
        setError(c.error);
      }
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        setError(c.regError);
      } else {
        users.push({ email, password, name, createdAt: Date.now() });
        localStorage.setItem('users', JSON.stringify(users));
        alert(c.success);
        setIsLogin(true);
        setPassword('');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Head><title>{isLogin ? c.loginTab : c.regTab} - 澳洲移民</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">🇦🇺 澳洲移民项目</h1>
            </Link>
            <p className="text-gray-400 mt-2">{isLogin ? c.welcome : c.create}</p>
            <p className="text-gray-500 text-xs mt-1">{c.demoMode}</p>
            <div className="flex justify-center gap-2 mt-4">
              <button onClick={() => setLang('zh')} className={`px-3 py-1 rounded-full text-sm ${lang === 'zh' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'}`}>🇨🇳 中文</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-sm ${lang === 'en' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-400'}`}>🇬🇧 English</button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
              <button onClick={() => { setIsLogin(true); setError(''); }} className={`flex-1 py-2 rounded-lg font-medium transition ${isLogin ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}>{c.loginTab}</button>
              <button onClick={() => { setIsLogin(false); setError(''); }} className={`flex-1 py-2 rounded-lg font-medium transition ${!isLogin ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}>{c.regTab}</button>
            </div>

            {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{c.nickname}</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" required />
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-400 mb-2">{c.email}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">{c.pwd}</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none" required minLength={6} />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 disabled:opacity-50 rounded-lg font-bold transition">
                {loading ? c.processing : (isLogin ? c.login : c.register)}
              </button>
            </form>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="bg-white/5 rounded-lg p-3"><p className="text-2xl mb-1">💾</p><p className="text-gray-400">Save</p></div>
              <div className="bg-white/5 rounded-lg p-3"><p className="text-2xl mb-1">🔔</p><p className="text-gray-400">Alert</p></div>
              <div className="bg-white/5 rounded-lg p-3"><p className="text-2xl mb-1">📊</p><p className="text-gray-400">Data</p></div>
            </div>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-2">{c.demo}</p>
            <button onClick={() => { setEmail('demo@test.com'); setPassword('123456'); }} className="w-full text-left px-3 py-2 bg-gray-800/50 rounded hover:bg-gray-700/50 transition text-sm">
              <span className="text-cyan-400">demo@test.com</span><span className="text-gray-500 ml-2">/ 123456</span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-gray-400 hover:text-white transition text-sm">{c.guest}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
