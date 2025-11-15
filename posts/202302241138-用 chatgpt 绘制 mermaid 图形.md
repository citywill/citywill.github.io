---
excerpt: null
image: null
title: 用 chatgpt 辅助绘制 mermaid 图形的几个例子
datetime: '2023-02-24 11:38'
permalink: /posts/202302241138
category: 永久笔记
tags:
  - AI
  - mermaid
prev:
  text: 到底什么是中台
  link: /posts/202303090800
next:
  text: 好的用户体验是用最佳实践先于自由选择
  link: /posts/4fa95b
---

# 用 chatgpt 辅助绘制 mermaid 图形的几个例子


> [!NOTE] prompt
请使用 mermaid 语言写一个实体关系图，包括团队成员、项目、任务三个实体，其中团队成员属于项目，项目包含多个任务，一个任务关联多个团队成员。


```mermaid
erDiagram
    TEAM_MEMBER {
        string member_id
        string member_name
        string member_email
        string member_phone
    }

    PROJECT {
        string project_id
        string project_name
        string project_description
    }

    TASK {
        string task_id
        string task_name
        string task_description
    }

    TEAM_MEMBER }|--|| PROJECT : "团队成员属于某个项目"
    PROJECT ||--|{ TASK : "一个项目包含多个任务"
    TEAM_MEMBER }|--|{ TASK : "一个团队成员可分配多个任务"

```

> [!NOTE] prompt
请使用 mermaid 语言写一个实体关系图，包括检察官、原始数据、办案线索、案件四个实体，其中原始数据和办案线索一对一关联，办案线索属于多个检察官，案件和办案线索一对一关联，案件属于一个检察官。

```mermaid
erDiagram
    PROSECUTOR {
        string prosecutor_id
        string prosecutor_name
        string prosecutor_email
        string prosecutor_phone
    }

    RAW_DATA {
        string raw_data_id
        string raw_data_name
        string raw_data_type
        string raw_data_source
    }

    CLUE {
        string clue_id
        string clue_description
    }

    CASE {
        string case_id
        string case_description
    }

    RAW_DATA ||--|| CLUE : has
    PROSECUTOR }o--|{ CASE : handles
    CASE ||--|| CLUE : contains
    CLUE }|--|{ PROSECUTOR : handles
```

> [!NOTE] prompt
用 mermaid 画一个饼图，名为“事业部产品收入分布”，其中 A 产品占30%，B 产品占20%，C 产品占50%

```mermaid
pie
    title "事业部产品收入分布"
    "A产品" : 30
    "B产品" : 20
    "C产品" : 50 

```

