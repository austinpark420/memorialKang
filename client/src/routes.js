import {
  Main,
  ElevenHero,
  Organization,
  History,
  Parents,
  Login
} from 'screen';

export const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/elevenHero',
    component: ElevenHero
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
  }
];
