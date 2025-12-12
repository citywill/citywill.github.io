<template>
<div class="waterfall-container">
  <div class="waterfall-column" v-for="(column, columnIndex) in columns" :key="columnIndex">
    <div v-for="post in column" :key="post.title" class="waterfall-item">
      <div class="post">
        <div>
          <div class="post__title">
            <span class="post__pinned" v-if="post.order && type !== 'category'">
              {{ post.pinned || page?.pinned || '[置顶]' }}
            </span>
            <a :href="withBase(post.permalink)">{{ post.title }}</a>
          </div>
          <div class="post__image">
            <a :href="withBase(post.permalink)">
              <img 
                v-if="post.image" 
                :src="resolveImage(post.image)" 
                alt="博客插图" 
                @load="onImageLoad"
              />
            </a>
            <!-- <img 
              v-else 
              :src="withBase(`https://image.pollinations.ai/prompt/用以下主题做一张博客插图：${ post.title }?width=600&height=200&enhance=true&nologo=true&model=flux`)" 
              alt="默认博客插图" 
              @load="onImageLoad"
            /> -->
          </div>
          <div class="post__excerpt" v-if="post.excerpt">
            <a :href="withBase(post.permalink)">{{ post.excerpt }}</a>
          </div>
        </div>
        <div>
          <span class="post__date">
            <Icon class="iconify" icon="mingcute:time-line" />
              <span class="post__date__item">{{ post.datetime.split(' ')[0] }}</span>
          </span>
          <span class="post__category" v-if="post.category">
            <Icon class="iconify" icon="iconamoon:category" />
            <a
              :href="withBase(`${outDir}/category.html?category=${post.category.replaceAll('&', '%26')}`)" 
              class="post__category__item"
            >
              {{ post.category }}
            </a>
          </span>
          <span class="post__tag" v-if="post.tags">
            <Icon class="iconify" icon="mingcute:tag-line" />
            <a
              :href="withBase(`${outDir}/tags.html?tags=${item.replaceAll('&', '%26')}`)" 
              v-for="item in post.tags"
              class="post__tag__item"
            >
              {{ item }}
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress';
import { IPost } from '../types';
import { useOutDir } from '../composables/useOutDir';
import { Icon } from '@iconify/vue';
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
const { outDir } = useOutDir();

const props = defineProps({
  posts: Array<IPost>,
  type: String
});

const { theme } = useData();
const page = theme.value.page;

// Import assets to get hashed URLs
const assets = import.meta.glob('../../assets/**/*.{png,jpg,jpeg,gif,svg,webp,ico}', { eager: true, import: 'default' });

const resolveImage = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('//')) return path;

  const filename = path.split('/').pop();
  if (!filename) return path;

  // Find matching asset in glob results
  for (const key in assets) {
    if (key.endsWith('/' + filename)) {
      return assets[key] as string;
    }
  }
  
  return withBase(path);
};

// 瀑布流布局相关逻辑
const columnCount = ref(getInitialColumnCount());
const columns = ref<IPost[][]>([]);
const imagesLoaded = ref(0);
const totalImages = computed(() => props.posts?.length || 0);

// 根据屏幕宽度决定列数
function getInitialColumnCount() {
  if (typeof window === 'undefined') return 1; // SSR 兼容
  
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 960) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

// 监听窗口大小变化，重新计算列数
function handleResize() {
  columnCount.value = getInitialColumnCount();
  distributePostsToColumns();
}

// 图片加载完成后重新计算布局
function onImageLoad() {
  imagesLoaded.value++;
  if (imagesLoaded.value >= totalImages.value) {
    // 所有图片加载完成，重新分配列
    distributePostsToColumns();
  }
}

// 将文章分配到各列中
function distributePostsToColumns() {
  if (!props.posts || !props.posts.length) return;
  
  // 初始化列数组
  const newColumns: IPost[][] = Array.from({ length: columnCount.value }, () => []);
  
  // 简单的分配策略：按顺序分配到各列
  props.posts.forEach((post, index) => {
    const columnIndex = index % columnCount.value;
    newColumns[columnIndex].push(post);
  });
  
  columns.value = newColumns;
}

// 监听文章变化，重新分配列
watch(() => props.posts, () => {
  imagesLoaded.value = 0;
  distributePostsToColumns();
}, { deep: true });

// 监听列数变化，重新分配列
watch(columnCount, () => {
  distributePostsToColumns();
});

onMounted(() => {
  distributePostsToColumns();
  window.addEventListener('resize', handleResize);
});

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="less" scoped>
.iconify {
  margin-right: 6px;
}

.waterfall-container {
  display: flex;
  width: 100%;
  gap: 16px;
  margin-top: 10px;
}

.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0; 
}

.waterfall-item {
  width: 100%;
  break-inside: avoid;
  margin-bottom: 0;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}

.post {
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #eee;

  &__pinned {
    color: crimson;
    margin-right: 4px;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600; 
    margin-bottom: 8px;

    a {
      color: var(--vp-c-text-1);

      &:hover {
        color: var(--vp-c-brand);
      }
    }
  }

  &__image {
    overflow: hidden; /* 隐藏超出部分 */
    // max-height: 150px;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    img {
      justify-content: center;  /* 水平居中 */
      width: 100%;    /* 图片最大宽度为容器宽度 */
      height: auto;       /* 高度自适应，保持比例 */
      display: block;     /* 移除图片底部间隙 */
    }
  }

  &__excerpt {
    font-size: 1rem;
    color: var(--vp-c-text-2);
    margin: 12px 0;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 100px;
  }

  &__date,
  &__view,
  &__tag,
  &__category {
    font-size: 14px;

    &:not(:nth-of-type(1)) {
      margin-left: 8px;
    }
  }

  &__tag,
  &__category {
    &__item {
      display: inline-block;
      padding: 0 8px;
      border-radius: 2px;
      background-color: var(--vp-c-bg-alt);
      color: var(--vp-c-text-1);
      transition: 0.4s;

      &:nth-of-type(1) {
        margin-left: 2px;
      }

      &:not(:nth-of-type(1)) {
        margin-left: 8px;
      }

      &:hover {
        color: var(--vp-c-brand);
        background-color: var(--vp-c-gutter);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .post {
    &__title {
      font-size: 1.0625rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}

</style>
