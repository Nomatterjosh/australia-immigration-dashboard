// 盈利模式 API
import { getMonetization, updateMonetization } from '@/lib/data';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const data = getMonetization();
      res.status(200).json({ success: true, data });
      break;
    case 'PUT':
      // 更新所有盈利模式
      const { id, ...updates } = req.body;
      if (id) {
        const updated = updateMonetization(id, updates);
        res.status(200).json({ success: true, data: updated });
      } else {
        res.status(400).json({ success: false, message: 'ID required' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
  }
}
