<h1 align="center" style="margin: 30px 0 30px; font-weight: bold;">游戏启动器v0.1.0</h1>
<h4 align="center">基于Electron和React开发适配Windows和Mac启动应用</h4>

## 项目介绍

**背景：**

- 想开发一款自己的极简游戏启动器，拥有想要的交互，同时也第一次写 Electron 的项目
- 第一个版本有点简陋，后续会优化

**目前实现的功能：**
- 自定义添加/删除游戏or应用（名称、封面、背景）
- 快速启动添加的游戏or应用

**TODO**
- [ ] 加入手柄控制
- [ ] 美化UI
- [ ] 自动搜索游戏的封面和背景
- [ ] 首页展示游戏动态
- [ ] 国际化
## 源码使用

### 安装

```bash
$ pnpm install
```

### 运行

```bash
$ pnpm dev
```

### 构建

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```
