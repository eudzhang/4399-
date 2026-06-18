# 别丢下我

手机横屏双人联机协作闯关 MVP。客户端使用 Phaser 3 + TypeScript + Vite，服务端使用 Express + Socket.IO + TypeScript。服务端权威处理移动、碰撞、机关、过关和重置。

## 本地运行

要求 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

- 电脑访问 `http://localhost:5173`
- 同一局域网的手机访问 `http://电脑局域网IP:5173`
- Vite 会代理 Socket.IO 到本机 `3000` 端口
- 桌面调试支持方向键或 WASD，空格/上/W 跳跃

## 生产构建

```bash
npm run build
npm start
```

访问 `http://localhost:3000`。生产环境由 Express 同时托管 `client/dist` 和 Socket.IO。

## 部署到 Render

1. 将仓库推送到 GitHub/GitLab。
2. Render 新建 Blueprint，选择仓库中的 `render.yaml`。
3. 构建命令为 `npm install && npm run build`，启动命令为 `npm start`。
4. 部署完成后直接分享 Render 地址；邀请链接会自动附带四位房间码。

## MVP 说明

- 每房最多两人，无账号和数据库。
- 房间断线后暂停并保留 60 秒，浏览器使用本地会话令牌重连。
- 服务器以 25Hz 广播权威状态，客户端不做预测和回滚。
- 为保证短关卡可以完成，按钮门在首次成功触发后保持开启；第五关仍要求两人同时踩下两个按钮。
- 占位皮肤通过 `SkinManager` 渲染，关卡 JSON 不包含颜色或素材路径，可继续添加 sprite 皮肤并回退到 graphics 模式。

## 目录

- `client/src/scenes`：Phaser 场景
- `client/src/entities`：关卡实体视图
- `client/src/skins`：皮肤与占位外观
- `client/src/levels`：客户端关卡数据
- `server/src/physics.ts`：AABB 平台物理
- `server/src/gameLoop.ts`：权威机关与关卡逻辑
- `server/src/rooms.ts`：房间、会话、暂停和清理
