// 移民路径规划 API
import { visaTypes, states, occupations, calculateEOIScore, recommendPath } from '@/lib/immigration-data';

export default function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    // 返回所有签证类型
    return res.status(200).json({
      success: true,
      data: {
        visaTypes,
        states,
        occupations
      }
    });
  }

  if (method === 'POST') {
    const profile = req.body;
    
    // 计算 EOI 分数
    const score = calculateEOIScore(profile);
    
    // 获取推荐路径
    const recommendations = recommendPath(profile);
    
    return res.status(200).json({
      success: true,
      data: {
        totalScore: score,
        ...recommendations
      }
    });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ success: false, message: `Method ${method} not allowed` });
}
