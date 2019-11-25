import {
  Main,
  Heros,
  Organization,
  History,
  Parents,
  Login,
  Videos,
  Struggle,
  Introduce,
  MemorialHall
} from './screen';

export const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/heros',
    component: Heros
  },
  {
    path: '/organization',
    component: Organization
  },
  {
    path: '/history',
    component: History
  },
  {
    path: '/parents',
    component: Parents
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/videos',
    component: Videos
  },
  {
    path: '/struggle',
    component: Struggle
  },
  {
    path: '/introduce',
    component: Introduce
  },
  {
    path: '/memorialHall',
    component: MemorialHall
  }
];
