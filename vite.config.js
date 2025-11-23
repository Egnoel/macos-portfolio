import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'path';
import { fileUrlToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '#components': resolve(
        dirname(fileUrlToPath(import.meta.url)),
        'components'
      ),
      '#constants': resolve(
        dirname(fileUrlToPath(import.meta.url)),
        'constants'
      ),
      '#store': resolve(dirname(fileUrlToPath(import.meta.url)), 'store'),
      '#hoc': resolve(dirname(fileUrlToPath(import.meta.url)), 'hoc'),
      '#windows': resolve(dirname(fileUrlToPath(import.meta.url)), 'windows'),
    },
  },
});
