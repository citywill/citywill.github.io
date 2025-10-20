import { defineConfig } from 'vitepress';
import { usePosts } from '../src/composables/usePosts';
import type { ThemeConfig } from '../src/types';
const { posts, rewrites } = await usePosts({
  pageSize: 24,
  homepage: true,
  srcDir: 'posts',
  autoExcerpt: 300
});

export default defineConfig<ThemeConfig>({
  title: 'CityWill',
  titleTemplate: '碎片化知识拼图',
  description: 'citywill的知识拼图',
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
      { text: '分类', link: '/category' },
      { text: '标签', link: '/tags' },
      { text: '归档', link: '/archives' },
      { text: '文档', link: '/docs/' },
    ],
    sidebar: {
      '/docs/dianfanbao': [
        {
          text: '如何使用电饭煲',
          items: [
            { text: '首页', link: '/docs/dianfanbao/' },
            { text: '选择合适的电饭煲', link: '/docs/dianfanbao/doc1' },
            { text: '煮出松软米饭的技巧', link: '/docs/dianfanbao/doc2' },
            { text: '电饭煲的多功能用途', link: '/docs/dianfanbao/doc3' },
            { text: '电饭煲的清洁与保养', link: '/docs/dianfanbao/doc4' },
            { text: '电饭煲常见问题处理', link: '/docs/dianfanbao/doc5' }
          ]
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
