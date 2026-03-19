# Ankki Design - 企业视觉素材管理平台

## 📦 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env

# 3. 在 .env 中填入可用的 OpenAI 或 OpenAI 兼容接口密钥

# 4. 启动前端 + 本地 AI 服务
npm start

# 5. 浏览器访问 http://localhost:3000
```

本地 AI 服务默认运行在 `http://localhost:3001`，前端会通过 `/api/generate/video` 和 `/api/generate/ppt` 调用它。

如果 `3000` 已被占用，可以只改前端端口：

```bash
PORT=3002 npm start
```

如果你也想改本地 AI 服务端口，则使用：

```bash
API_PORT=3003 npm start
```

---

## 🚀 部署方案

### 方案一：Vercel 部署（推荐 ⭐）

**最简单的方式，适合个人和小团队**

1. 将代码推送到 GitHub：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/你的用户名/ankki-design.git
   git push -u origin main
   ```

2. 访问 [vercel.com](https://vercel.com)，用 GitHub 账号登录

3. 点击 "New Project" → 选择你的仓库 → 点击 "Deploy"

4. 等待 1-2 分钟，完成！你会获得一个类似 `ankki-design.vercel.app` 的域名

**自定义域名：** 在 Vercel 项目设置中添加你的域名即可

---

### 方案二：Netlify 部署

1. 将代码推送到 GitHub

2. 访问 [netlify.com](https://netlify.com)，用 GitHub 账号登录

3. 点击 "Add new site" → "Import an existing project" → 选择你的仓库

4. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `build`

5. 点击 "Deploy site"

---

### 方案三：GitHub Pages 部署（免费）

1. 安装 gh-pages：
   ```bash
   npm install gh-pages --save-dev
   ```

2. 在 `package.json` 中添加：
   ```json
   {
     "homepage": "https://你的用户名.github.io/ankki-design",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. 部署：
   ```bash
   npm run deploy
   ```

---

### 方案四：自有服务器部署

1. 构建生产版本：
   ```bash
   npm run build
   ```

2. 将 `build` 文件夹上传到服务器

3. 配置 Nginx：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/ankki-design/build;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # 开启 gzip 压缩
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
   }
   ```

4. 重启 Nginx：
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

### 方案五：Docker 部署

使用项目中的 `Dockerfile`：

```bash
# 构建镜像
docker build -t ankki-design .

# 运行容器
docker run -d -p 80:80 ankki-design
```

---

## 📋 部署检查清单

- [ ] 修改 `public/index.html` 中的网站标题和描述
- [ ] 如需要，配置环境变量
- [ ] 测试所有功能是否正常
- [ ] 配置 HTTPS（Vercel/Netlify 自动提供）
- [ ] 配置自定义域名（可选）

---

## 🔧 常见问题

**Q: 部署后页面空白？**
A: 检查 `package.json` 中的 `homepage` 字段是否正确设置

**Q: 路由刷新 404？**
A: 需要配置服务器的 SPA fallback，上面的 Nginx 配置已包含

**Q: 如何更新部署？**
A: 推送代码到 GitHub，Vercel/Netlify 会自动重新部署

---

## 📞 技术支持

如有问题，请联系开发团队。
