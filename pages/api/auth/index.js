// 用户认证 API - 离线版（演示用）
export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { action, email, password, name } = req.body;

    // 离线演示模式
    if (action === 'register') {
      return res.status(200).json({ 
        success: true, 
        message: '注册成功（演示模式）' 
      });
    }

    if (action === 'login') {
      return res.status(200).json({ 
        success: true, 
        user: { email, name: name || email.split('@')[0] },
        message: '登录成功（演示模式）'
      });
    }

    if (action === 'logout') {
      return res.status(200).json({ success: true, message: '已退出登录' });
    }

    return res.status(400).json({ error: '未知操作' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end('Method Not Allowed');
}
