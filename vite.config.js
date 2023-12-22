import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  base: process.env.DEPLOY_ENV === 'gh-pages' ? '/learn-js-pro-by-colt-steele/' : '/',
  plugins: [
    eslintPlugin({
      cache: false,
      failOnError: false,
    }),
  ],
});
