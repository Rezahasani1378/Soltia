import {defineConfig} from 'umi';

export default defineConfig({
  favicon:
    'https://admin.soltia.com/uploads/thumbnail_cropped_favicon_soltia_1_192x192_76db7a2462.png',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts',
      routes: [
        {
          path: '/',
          component: 'Home',
          title: 'Soltia – A home for amazing people with amazing skills',
        },
        {
          path: '/challenge',
          component: 'ButtonChallenge',
          title: 'Soltia Button Challenge',
        }
      ]
    }
  ],
  styles: [
    `https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap`,
  ],
  ssr: {},
  fastRefresh: {},
});
