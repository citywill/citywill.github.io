import { defineConfig } from 'vitepress';
import { usePosts } from '../src/composables/usePosts';
import type { ThemeConfig } from '../src/types';
// import sidebarSmartNote from "../projects/smart-note/sidebar.json";
import sidebarMetaContex from "../projects/meta-contex/sidebar.json";
// import sidebarTheArtOfWorkingWithLlm from "../projects/the-art-of-working-with-llm/sidebar.json";
const { posts, rewrites } = await usePosts({
  pageSize: 20,
  homepage: true,
  outDir: './pages/',
  srcDir: 'posts',
  autoExcerpt: 300
});

export default defineConfig<ThemeConfig>({
  base: '/',
  title: 'CityWill',
  titleTemplate: '碎片化知识拼图',
  description: '认知和专注领域终身学习者、产品经理、AI替身、存在主义者',
  rewrites,
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    posts,
    page: {
      outDir: './pages',
      max: 5
    },
    logo: '/profile.svg',
    outline: { level: [2, 4] },
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记盒', items: [
          { text: '笔记', link: '/pages' },
          { text: '分类', link: '/pages/category' },
          { text: '标签', link: '/pages/tags' },
          { text: '归档', link: '/pages/archives' },
        ]
      },
    ],
    sidebar: {
      // "/projects/my-product-view": [
      //   {
      //     "text": "🎯我的产品观",
      //     "link": "/",
      //     "base": "/projects/my-product-view/",
      //     "items": sidebarMyProductView
      //   }
      // ],
      "/projects/meta-contex": [
        {
          "text": "🌍软件公司的那些事儿",
          "base": "/projects/meta-contex/",
          "items": sidebarMetaContex
        }
      ]
    },
    // socialLinks: [{ icon: 'github', link: 'https://github.com/izhichao/vitepress-theme-minimalism' }],
    footer: {
      // message:
        // 'Theme by <a href="https://github.com/izhichao/vitepress-theme-minimalism" target="_blank">Minimalism</a>',
      copyright: 'Copyright © CityWill.cn'
    },
    search: { provider: 'local' }
  },
  markdown: {
    lineNumbers: true
  },
  srcExclude: ['README.md', 'README_en-US.md']
});
