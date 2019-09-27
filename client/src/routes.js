import {
  Main,
  ElevenHero,
  Organization,
  History,
  Parents,
  Login,
  EmergencyMeasure,
  Image,
  Video,
  Document,
  Struggle,
  Introduce,
  MemorialHistory
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
  },
  {
    path: '/emergencyMeasure',
    component: EmergencyMeasure
  },
  {
    path: '/image',
    component: Image
  },
  {
    path: '/video',
    component: Video
  },
  {
    path: '/document',
    component: Document
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
    path: '/memorialHistory',
    component: MemorialHistory
  }
];
