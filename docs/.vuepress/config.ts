import { defineUserConfig } from 'vuepress';
import { defaultTheme } from '@vuepress/theme-default';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { navbarEn, sidebarEn } from './configs';

export default defineUserConfig({
  base: '/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vue Dube',
      description: 'Dynamic UI Builder Engine'
    }
  },
  plugins: [backToTopPlugin()],
  theme: defaultTheme({
    docsDir: 'docs',
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        navbar: navbarEn,
        sidebar: sidebarEn,
        editLinkText: 'Edit this page on GitHub'
      }
    }
  })
});
