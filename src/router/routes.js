import Viewer from '@/views/viewer/Index'
export default [
  {
    path: '/viewer',
    name: 'Viewer',
    component: Viewer,
    redirect: '/viewer/highlight',
    children: [
      {
        path: '/viewer/highlight',
        name: 'Highlight',
        component: () => import('@/views/viewer/Highlight.vue')
      },
      {
        path: '/viewer/mark',
        name: 'Mark',
        component: () => import('@/views/viewer/Mark.vue')
      }
    ]
  },
  {
    path: '/wall',
    name: 'Wall',
    component: () => import('@/views/wall/Index.vue')
  },
  {
    path: '/cmd',
    name: 'Cmd',
    component: () => import('@/views/cmd/Index.vue')
  }
]
