# 🎯 Vercel 零配置部署指南

## 方式一：手动部署（推荐新手）

### 第一步：推送到 GitHub

打开终端/命令提示符，依次执行：

```bash
# 1. 进入项目目录
cd C:\Users\joshn\.qclaw\workspace\projects\australia-immigration

# 2. 初始化 Git（如果还没有）
git init

# 3. 添加所有文件
git add .

# 4. 提交
git commit -m "Initial commit: 澳洲移民项目进度看板 + 管理后台"

# 5. 在 GitHub 创建仓库后，添加远程地址
# 把 YOUR_USERNAME 换成你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/australia-immigration-dashboard.git

# 6. 推送
git branch -M main
git push -u origin main
```

### 第二步：Vercel 部署

1. 打开浏览器访问 https://vercel.com
2. 点击 **"Sign Up"** 或 **"Log In"**，用 GitHub 账号授权
3. 点击 **"New Project"**
4. 在 "Import Git Repository" 页面，找到你的仓库 `australia-immigration-dashboard`
5. 点击 **"Import"**
6. 保持默认设置，直接点 **"Deploy"**
7. 等待 1-2 分钟... 🎉
8. 完成！会给你一个链接：`https://australia-immigration-dashboard.vercel.app`

---

## 方式二：Vercel CLI 部署

### 1. 安装 Vercel CLI

```bash
npm i -g vercel
```

### 2. 登录

```bash
vercel login
```

### 3. 部署

```bash
cd C:\Users\joshn\.qclaw\workspace\projects\australia-immigration
vercel
```

按提示操作：
- Set up and deploy? **Y**
- Which scope? **选择你的账号**
- Link to existing project? **N**
- Project name? **australia-immigration-dashboard**
- Directory? **./**
- Override settings? **N**

### 4. 生产环境部署

```bash
vercel --prod
```

---

## 访问地址

部署成功后：

- **看板首页**: `https://your-project.vercel.app`
- **管理后台**: `https://your-project.vercel.app/admin`
- **API 接口**: `https://your-project.vercel.app/api/projects`

---

## 更新代码

每次你想更新进度看板或管理后台：

```bash
# 1. 拉取最新代码（如果多人协作）
git pull

# 2. 提交你的更改
git add .
git commit -m "更新内容描述"

# 3. 推送到 GitHub
git push
```

**Vercel 会自动检测到 Git 推送，自动重新部署！** 🚀

---

## 管理后台使用

1. 访问 `/admin` 页面
2. 可以实时更新：
   - 📊 项目进度（滑块 + 数字输入）
   - 📌 项目状态（完成/进行中/待开始/规划中）
   - ⚡ 快捷操作（+10%/-10%/标记完成）

所有更改立即生效，自动同步到看板首页！

---

## API 接口

### 获取所有项目
```
GET https://your-project.vercel.app/api/projects
```

### 获取单个项目
```
GET https://your-project.vercel.app/api/projects/1
```

### 更新项目
```
PUT https://your-project.vercel.app/api/projects/1
Content-Type: application/json

{
  "progress": 80,
  "status": "in-progress"
}
```

### 获取盈利模式
```
GET https://your-project.vercel.app/api/monetization
```

---

## 自定义域名（可选）

1. 在 Vercel 项目设置 → **Domains**
2. 输入你的域名，如 `dashboard.yoursite.com`
3. 按照提示添加 DNS 记录
4. 等待验证通过

---

## ❓ 常见问题

**Q: 忘记了 GitHub 仓库地址？**
A: 访问 https://github.com/YOUR_USERNAME

**Q: 部署失败了？**
A: 检查错误信息，常见问题：
- `npm install` 失败 → 检查网络
- Build 失败 → 检查代码是否有语法错误

**Q: 如何查看部署日志？**
A: Vercel Dashboard → Projects → 你的项目 → Deployments → 点击任意部署

**Q: 能回滚到之前的版本吗？**
A: 可以！Deployments 页面 → 选择旧版本 → 点击 "..." → "Promote to Production"

---

## 🎉 恭喜！

部署成功后，你可以：

1. ✅ 随时随地通过链接查看项目进度
2. ✅ 通过管理后台实时更新进度
3. ✅ 分享给合伙人、投资人查看
4. ✅ 自动同步，零维护

有任何问题随时问我！
