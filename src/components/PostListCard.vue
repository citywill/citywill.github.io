<template>
<div class="items">
  <div v-for="post in posts" :key="post.title" class="item grid-4">
    <div class="post">
      <div>
        <div class="post__title">
          <span class="post__pinned" v-if="post.order && type !== 'category'">
            {{ post.pinned || page?.pinned || '[置顶]' }}
          </span>
          <a :href="withBase(post.permalink)">{{ post.title }}</a>
        </div>
        <div class="post__image">
          <img 
            v-if="post.image" 
            :src="post.image" 
            alt="博客插图" 
          />
          <img 
            v-else 
            :src="withBase(`https://image.pollinations.ai/prompt/用以下主题做一张博客插图：${ post.title }?width=600&height=200&enhance=true&nologo=true&model=flux`)" 
            alt="默认博客插图" 
          />        </div>
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
</template>

<script lang="ts" setup>
import { useData, withBase } from 'vitepress';
import { IPost } from '../types';
import { useOutDir } from '../composables/useOutDir';
import { Icon } from '@iconify/vue';
const { outDir } = useOutDir();

defineProps({
  posts: Array<IPost>,
  type: String
});

const { theme } = useData();
const page = theme.value.page;
</script>

<style lang="less" scoped>
.iconify {
  margin-right: 6px;
}

.items {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

@media (min-width: 960px) {
    .item.grid-4 {
        width: 25%;
    }
}

@media (min-width: 768px) {
  .item.grid-2, .item.grid-4 {
    width: 50%;
  }
}

@media (min-width: 640px) {
  .item.grid-2, .item.grid-4, .item.grid-6 {
    width: 50%;
  }
}
.item {
  padding: 8px;
  width: 100%;
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
    max-height: 150px;
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
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 50px;
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
