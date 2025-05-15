<template>
  <Layout>
    <template #doc-footer-before>
      <PostInfoItem />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import PostInfoItem from '../../src/components/PostInfoItem.vue';

const { Layout } = DefaultTheme;
</script>
