# 澳洲移民项目进度看板

一体化移民解决方案平台的实时进度看板。

## 🚀 快速开始

### 本地开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000

### 部署到 Vercel

1. **推送到 GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/australia-immigration-dashboard.git
git push -u origin main
```

2. **连接 Vercel**
   - 访问 https://vercel.com
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

3. **完成！** 你的看板现在可以在 `https://your-project.vercel.app` 访问

## 📊 功能

- ✅ 8 个核心功能模块进度追踪
- ✅ 5 种盈利模式展示
- ✅ 实时更新时间戳
- ✅ 响应式设计（手机/平板/桌面）
- ✅ 深色主题 + 现代 UI

## 🛠️ 技术栈

- Next.js 14
- React 18
- Tailwind CSS
- JavaScript

## 📝 更新进度

编辑 `pages/index.js` 中的 `projects` 数组来更新项目进度。

```javascript
{
  id: 1,
  name: '项目名称',
  progress: 60,  // 0-100
  status: 'in-progress',  // done, in-progress, todo, planning
  // ...
}
```

## 📄 License

MIT
