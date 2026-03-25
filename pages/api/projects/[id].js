// 单个项目 API 路由
import { getProject, updateProject, deleteProject } from '@/lib/data';

export default function handler(req, res) {
  const { 
    method,
    query: { id }
  } = req;

  const projectId = parseInt(id);
  const project = getProject(projectId);

  if (!project) {
    return res.status(404).json({ 
      success: false, 
      message: `Project with id ${id} not found` 
    });
  }

  switch (method) {
    case 'GET':
      res.status(200).json({ success: true, data: project });
      break;
    case 'PUT':
      const updated = updateProject(projectId, req.body);
      res.status(200).json({ success: true, data: updated });
      break;
    case 'DELETE':
      deleteProject(projectId);
      res.status(200).json({ success: true, message: 'Project deleted' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ 
        success: false, 
        message: `Method ${method} not allowed` 
      });
  }
}
