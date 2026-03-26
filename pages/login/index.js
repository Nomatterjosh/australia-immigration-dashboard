// 登录/注册页面 - 离线版（无需后端）
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    if (isLogin) {
      // 登录逻辑
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // 保存登录状态
        const session = { email: user.email, name: user.name, loginTime: Date.now() };
        localStorage.setItem('currentUser', JSON.stringify(session));
        localStorage.setItem('userEmail', user.email);
        
        setTimeout(() => router.push('/profile'), 500);
      } else {
        setError('邮箱或密码错误');
      }
    } else {
      // 注册逻辑
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.find(u => u.email === email)) {
        setError('该邮箱已被注册');
      } else {
        const newUser = { email, password, name, createdAt: Date.now() };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        setError('');
        setIsLogin(true);
        setPassword('');
        alert('注册成功！请登录');
      }
    }
    
    setLoading(false);
  };

  return (
    <>
      <Head><title>{isLogin ? '登录' : '注册'} - 澳洲移民项目</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                🇦🇺 澳洲移民项目
              </h1>
            </Link>
            <p className="text-gray-400 mt-2">
              {isLogin ? '欢迎回来' : '创建您的账户'}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              ⚠️ 当前为演示模式，数据保存在本地浏览器
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">
            {/* Tab Switch */}
            <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 py-2 rounded-lg font-medium transition ${isLogin ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}
              >
                登录
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 py-2 rounded-lg font-medium transition ${!isLogin ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}
              >
                注册
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">昵称</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="请输入昵称"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">邮箱</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:border-cyan-500 outline-none transition"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 disabled:opacity-50 rounded-lg font-bold transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    处理中...
                  </>
                ) : (
                  isLogin ? '登录' : '注册'
                )}
              </button>
            </form>

            {/* Features */}
            <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-2xl mb-1">💾</p>
                <p className="text-gray-400">保存记录</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-2xl mb-1">🔔</p>
                <p className="text-gray-400">进度提醒</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-2xl mb-1">📊</p>
                <p className="text-gray-400">数据分析</p>
              </div>
            </div>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-3">🎮 演示账户（可直接登录）</p>
            <div className="space-y-2 text-sm">
              <button
                onClick={() => { setEmail('demo@test.com'); setPassword('123456'); }}
                className="w-full text-left px-3 py-2 bg-gray-800/50 rounded hover:bg-gray-700/50 transition"
              >
                <span className="text-cyan-400">demo@test.com</span>
                <span className="text-gray-500 ml-2">/ 123456</span>
              </button>
            </div>
          </div>

          {/* Guest Mode */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-400 hover:text-white transition">
              以游客身份继续浏览 →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
