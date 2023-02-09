/** @type {import('vite').UserConfig} */
export default {
    server: {
        open: '/src/index.html',
    },
    build: {
      rollupOptions: {
        input: '/src/index.html',
      }, 
    },
};