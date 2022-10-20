import wretch from 'wretch';
import AbortAddon from 'wretch/addons/abort';

// Project Import
import useAuth from 'hooks/useAuth';

class Server {
  constructor() {
    this.server_url = process.env.REACT_APP_SERVER_URL ?? 'http://localhost:5000/api';
  }

  uploadURL() {
    const url = `${this.server_url}/api/upload`;
    return url;
  }

  api(mode = '') {
    const [bpmController, bpmServer] = wretch()
      // Set the base url
      .url(this.server_url)
      // Cors fetch options
      .options({ credentials: 'include', mode: 'cors' })
      .auth(`Bearer ${window.sessionStorage.getItem('idToken')}`)
      .addon(AbortAddon())
      .errorType('json')
      .catcher(401, async (error, request) => {
        try {
          const res = await wretch()
            .url(`${this.server_url}/auth/refresh`)
            .options({ credentials: 'include', mode: 'cors' })
            .post()
            .json((res) => res);

          window.sessionStorage.setItem('idToken', res.data.id_token || '');
          return request
            .auth(`Bearer ${window.sessionStorage.getItem('idToken')}`)
            .fetch()
            .unauthorized(() => {
              const { logout } = useAuth();
              wretch().url(`${this.server_url}/auth/logout`).options({ credentials: 'include', mode: 'cors' }).post();

              logout();
            })
            .json();
        } catch (err) {
          return request.json({ message: err.message });
        }
      })
      .catcher(403, async (error, request) => {
        return request.json({ message: error.message });
      });

    if (mode === 'Abort') {
      bpmController.abort();
    }
    return bpmServer;
  }
}

export const bpmServer = new Server();
