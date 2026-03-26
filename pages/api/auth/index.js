// 用户认证 API
import { createClient } from '@supabase/supabase-js';

// Supabase 配置 - 使用环境变量
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    const { action, email, password, name, data } = req.body;

    switch (action) {
      case 'register': {
        // 注册新用户
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } }
        });

        if (authError) {
          return res.status(400).json({ error: authError.message });
        }

        // 创建用户资料
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            name,
            email,
            created_at: new Date().toISOString()
          });

        return res.status(200).json({ 
          success: true, 
          user: authData.user,
          message: '注册成功'
        });
      }

      case 'login': {
        // 用户登录
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (authError) {
          return res.status(401).json({ error: authError.message });
        }

        // 获取用户资料
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        return res.status(200).json({ 
          success: true, 
          user: authData.user,
          profile
        });
      }

      case 'logout': {
        const { error } = await supabase.auth.signOut();
        if (error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(200).json({ success: true, message: '已退出登录' });
      }

      case 'update_profile': {
        // 更新用户资料
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
          return res.status(401).json({ error: '未授权' });
        }

        const { data: userData, error: userError } = await supabase.auth.getUser(token);
        if (userError) {
          return res.status(401).json({ error: '登录已过期' });
        }

        const { error: updateError } = await supabase
          .from('user_profiles')
          .update(data)
          .eq('id', userData.user.id);

        if (updateError) {
          return res.status(400).json({ error: updateError.message });
        }

        return res.status(200).json({ success: true, message: '资料已更新' });
      }

      case 'save_assessment': {
        // 保存评估记录
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
          return res.status(401).json({ error: '未授权' });
        }

        const { data: userData, error: userError } = await supabase.auth.getUser(token);
        if (userError) {
          return res.status(401).json({ error: '登录已过期' });
        }

        const { data: saved, error: saveError } = await supabase
          .from('assessment_records')
          .insert({
            user_id: userData.user.id,
            assessment_data: data,
            created_at: new Date().toISOString()
          });

        if (saveError) {
          return res.status(400).json({ error: saveError.message });
        }

        return res.status(200).json({ success: true, saved });
      }

      case 'get_assessments': {
        // 获取评估记录
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
          return res.status(401).json({ error: '未授权' });
        }

        const { data: userData, error: userError } = await supabase.auth.getUser(token);
        if (userError) {
          return res.status(401).json({ error: '登录已过期' });
        }

        const { data: assessments, error: fetchError } = await supabase
          .from('assessment_records')
          .select('*')
          .eq('user_id', userData.user.id)
          .order('created_at', { ascending: false });

        if (fetchError) {
          return res.status(400).json({ error: fetchError.message });
        }

        return res.status(200).json({ success: true, assessments });
      }

      default:
        return res.status(400).json({ error: '未知操作' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
