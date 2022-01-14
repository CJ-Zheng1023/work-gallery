export default [
  {
    path: '/viewer',
    name: 'Viewer',
    component: () => import('@/views/viewer/Index.vue')
  },
  {
    path: '/wall',
    name: 'Wall',
    component: () => import('@/views/wall/Index.vue')
  }
]
