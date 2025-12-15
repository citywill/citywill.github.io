# Smart Note：微笔记

智能笔记应用，帮助用户高效管理和组织个人笔记。

## 功能特点

- 简洁直观的用户界面
- 笔记的创建、编辑和删除
- 本地数据库存储，确保数据安全
- 快速搜索笔记内容

## 安装步骤

### 前提条件

- Python 3.8+ 环境
- pip 包管理工具

### 安装方法

1. 克隆本仓库到本地

```bash
git clone <仓库地址>
cd smart_note
```

2. 安装依赖包

```bash
pip install -r requirements.txt
```

## 使用方法

1. 运行应用

```bash
streamlit run app.py
```

2. 在浏览器中打开显示的 URL（通常是 http://localhost:8501）

3. 开始创建和管理你的笔记

## 项目结构

```
smart_note/
├── app.py              # 应用入口文件
├── data/
│   └── database.db         # SQLite数据库文件
├── requirements.txt    # 项目依赖
├── database/           # 数据库操作模块
│   └── db.py           # 数据库连接和操作函数
└── services/           # 业务逻辑模块
    └── note_service.py # 笔记服务相关功能
```

## Docker 支持

本项目支持使用 Docker 进行容器化部署，方便在不同环境中快速启动和运行。

### 构建 Docker 镜像

在项目根目录下，执行以下命令来构建镜像：

```bash
docker build -t citywill/smart-note:1.0 .
```

### 运行 Docker 容器

构建成功后，使用以下命令来启动应用容器：

```bash
docker run -d --name smart-note -p 8001:8501 -v $(pwd)/data:/app/data -v $(pwd)/static:/app/static citywill/smart-note:1.0
```

**说明:**

- `-p 8001:8501`: 将容器的 8501 端口映射到主机的 8001 端口。
- `-v $(pwd)/static:/app/static`: 将主机当前目录下的 `static` 文件夹（包含上传图片）挂载到容器的 `/app/static` 目录。
- `-v $(pwd)/data:/app/data`: 将主机当前目录下的 `data` 文件夹（包含数据库文件）挂载到容器的 `/app/data` 目录。
