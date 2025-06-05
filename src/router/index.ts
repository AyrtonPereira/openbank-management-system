import { createRouter, createWebHistory } from 'vue-router'
import { DashboardIndex, OrganizationList, OrganizationDetails } from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'is-active-route',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: 'Dashboard'
      },
      component: DashboardIndex
    },
    {
      path: '/organizations',
      name: 'organizations',
      meta: {
        title: 'Organizações'
      },
      redirect: '/organizations/list',
      children: [
        {
          path: '/organizations/list',
          name: 'organizations.list',
          meta: {
            title: 'Lista'
          },
          component: OrganizationList
        },
        {
          path: '/organizations/:id',
          name: 'organizations.details',
          meta: {
            title: 'Detalhes'
          },
          component: OrganizationDetails
        },
      ]
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router