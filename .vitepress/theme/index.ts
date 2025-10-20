import MinimalismTheme from '../../src';
import ThemeLayout from './ThemeLayout.vue';
import { createMermaidRenderer } from "vitepress-mermaid-renderer";
import "vitepress-mermaid-renderer/dist/style.css";

export default {
  extends: MinimalismTheme,
  Layout: ThemeLayout,
  enhanceApp({ app, router, siteData }) {
    // Use the client-safe wrapper for SSR compatibility
    // Optional: Pass custom Mermaid configuration
    const mermaidRenderer = createMermaidRenderer({
      // Example configuration options
      // theme: 'dark',
      // startOnLoad: false,
      // flowchart: { useMaxWidth: true }
    });
    mermaidRenderer.initialize();
  },
};
