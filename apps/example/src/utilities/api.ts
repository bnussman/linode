import { generateCodeVerifier } from '@badgateway/oauth2-client';
import { client } from '@bnussman/linode-api';
import { oauth } from './oauth';
import { config } from './constants';

export function setupInterceptors() {
  client.interceptors.response.use(async (response) => {
    if (response.status === 401) {
      const state = crypto.randomUUID();
      const codeVerifier = await generateCodeVerifier();

      window.localStorage.setItem('code-verifier', codeVerifier);
      window.localStorage.setItem('state', state);

      document.location = await oauth.authorizationCode.getAuthorizeUri({
        redirectUri: config.APP_ROOT,
        codeVerifier,
        state,
        scope: ['*'],
      });
    }

    return response;
  });

  client.interceptors.request.use(async (request) => {
    if (window.location.search.includes('code')) {
      const token = await oauth.authorizationCode.getTokenFromCodeRedirect(
        document.location as unknown as URL,
        {
          redirectUri: config.APP_ROOT,
          codeVerifier: window.localStorage.getItem('code-verifier')!,
          state: window.localStorage.getItem('state')!,
        }
      );
      window.history.pushState('', '', '/');
      localStorage.setItem('token', token.accessToken);
    }

    request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return request;
  });
}
