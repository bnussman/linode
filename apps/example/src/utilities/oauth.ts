import { OAuth2Client } from '@badgateway/oauth2-client';

export const oauth = new OAuth2Client({
  server: 'https://login.linode.com/',
  clientId: '95fc478b72bbf3818158',
  tokenEndpoint: '/oauth/token',
  authorizationEndpoint: '/oauth/authorize',
});
