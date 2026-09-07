---
excerpt: >-
  PocketStack Skill 为 Agent 提供完整的 PocketStack
  开发参考，涵盖项目初始化、模块创建、后端操作、前端风格、路由菜单配置与测试流程；装上之后，Agent 一句提示词即可完成项目初始化。
image: ../assets/20260704120000-使用skill初始化项目.png
title: PocketStack Skill 发布了
datetime: '2026-07-04 12:00'
permalink: /posts/202607041200
category: 博客
tags:
  - PocketStack
  - skill
  - vibecoding
prev:
  text: PocketStack V0.7.0 发布说明
  link: /posts/202607231200
next:
  text: PocketStack V0.6.0 发布说明
  link: /posts/202607031200
---

# PocketStack Skill 发布了

PocketStack Skill 为 Agent 提供完整的 PocketStack 开发参考，涵盖项目初始化、模块创建、后端操作、前端风格、路由菜单配置和测试流程。

开源地址：[github.com/citywill/pocketstack-skill](https://github.com/citywill/pocketstack-skill)

PocketStack 是一个 AI 友好的全栈开发方案，但要把一个新项目跑起来，还是有一些门槛的——要配置环境变量、下载 PocketBase、安装依赖、创建超管账号……现在，把这些步骤全部封装进一个 Skill，Agent 只需一句提示词，就能从零启动一个新项目。

## 安装

把 Skill 装进你的 Agent，只需要两步：

1. 下载最新版本的压缩包：https://github.com/citywill/pocketstack-skill/archive/refs/heads/master.zip
2. 解压到 Agent 或项目的 skills 目录，例如：`~/.trae-cn/skills/pocketstack-skill/`

## 覆盖场景

安装之后，Agent 在 PocketStack 开发中就有了完整的行为参考，可以覆盖：

- 初始化项目开发环境
- 创建新模块（module）、页面或组件
- 配置路由、菜单或权限
- 操作 PocketBase 后端（collection 创建、数据 CRUD）
- 遵循项目前端风格（shadcn/ui 组件、heroicons 图标、主题色）
- CRUD 页面开发（表格、表单、详情抽屉）
- 开发完成后进行编译测试和浏览器测试

## 更快的快速开始

所谓 Skill，就是把一套开发约定固化成 Agent 可直接调用的"经验包"。PocketStack 的初始化本来还是有一些门槛的，现在基于本 Skill，可以实现**一句提示词完成项目初始化**。

本 Skill 集成了 PocketStack 的初始化步骤，包括：

1. 克隆项目并初始化环境变量配置文件
2. 下载 PocketBase
3. 安装依赖
4. 启动开发环境（包括 Vite 和 PocketBase）
5. 初始化 PocketBase 的超级管理员（默认为：`admin@example.com / admin12345`）

以 **trae work** 为例，验证了从零启动一个新的 PocketStack 项目的过程。也可以基于 codex、workbuddy 等通用 Agent 使用该 Skill。

![使用 skill 一句提示词完成项目初始化](../assets/20260704120000-使用skill初始化项目.png)

---

从"记不住怎么初始化"到"一句话跑通全流程"，Skill 把 PocketStack 的使用门槛又降了一截。想自己动手试试的朋友，直接到 GitHub 上把 Skill 装进你的 Agent 即可，欢迎在使用中提出问题和建议。

