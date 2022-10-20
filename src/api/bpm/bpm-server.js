import useAuth from 'hooks/useAuth';
import wretch from 'wretch';

class Server {
  constructor() {
    this.server_url = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:5000/api';
  }

  uploadURL() {
    const url = `${this.server_url}/api/upload`;
    return url;
  }

  api() {
    const bpmServer = wretch()
      // Set the base url
      .url(this.server_url)
      // Cors fetch options
      .options({ credentials: 'include', mode: 'cors' })
      .auth(`Bearer ${window.sessionStorage.getItem('idToken')}`)
      .errorType('json')
      .catcher(401, async (error, request) => {
        const res = await wretch()
          .url(`${this.server_url}/auth/refresh`)
          .options({ credentials: 'include', mode: 'cors' })
          .post()
          .json((res) => res);

        if (res.data) {
          window.sessionStorage.setItem('idToken', res.data.id_token);
          return request
            .auth(`Bearer ${window.sessionStorage.getItem('idToken')}`)
            .fetch()
            .unauthorized(() => {
              const { logout } = useAuth();
              logout();
            })
            .json();
        } else {
          window.sessionStorage.removeItem('idToken');
          const { logout } = useAuth();
          logout();
        }
      });
    return bpmServer;
  }
}

export const bpmServer = new Server();
