// 项目 API 路由
import { getProjects, addProject, getStats } from '@/lib/data';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const projects = getProjects();
      const stats = getStats();
      res.status(200).json({ 
        success: true, 
        data: projects,
        stats 
      });
      break;
    case 'POST':
      const newProject = addProject(req.body);
      res.status(201).json({ success: true, data: newProject });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ 
        success: false, 
        message: `Method ${method} not allowed` 
      });
  }
}
