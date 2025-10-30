import { defineConfig } from 'vitepress';
import { usePosts } from '../src/composables/usePosts';
import type { ThemeConfig } from '../src/types';
import sidebarItems from "./sidebar_items.json";
const { posts, rewrites } = await usePosts({
  pageSize: 24,
  homepage: true,
  srcDir: 'posts',
  autoExcerpt: 300
});

export default defineConfig<ThemeConfig>({
  title: 'CityWill',
  titleTemplate: '碎片化知识拼图',
  description: '认知和专注领域终身学习者、产品经理、AI替身、存在主义者',
  rewrites,
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    posts,
    page: {
      max: 5
    },
    logo: '/profile.svg',
    outline: { level: 2 },
    nav: [
      { text: '首页', link: '/' },
      { text: '笔记盒', items: [
        { text: '笔记', link: '/notes' },
        { text: '分类', link: '/category' },
        { text: '标签', link: '/tags' },
        { text: '归档', link: '/archives' },
      ] },
      // { text: '分类', link: '/category' },
      // { text: '标签', link: '/tags' },
      // { text: '归档', link: '/archives' },
      // { text: '项目', link: '/docs/' },
    ],
    sidebar: sidebarItems,
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
