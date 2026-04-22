import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        'swimming-pools': resolve(__dirname, 'swimming-pools.html'),
        'motorized-vehicles': resolve(__dirname, 'motorized-vehicles.html'),
        'lawn-garden': resolve(__dirname, 'lawn-garden.html'),
        'hardware-tools': resolve(__dirname, 'hardware-tools.html'),
        brands: resolve(__dirname, 'brands.html'),
        reviews: resolve(__dirname, 'reviews.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
  server: {
    port: 3000,
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
