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
      .catcher(403, (error) => {
        const { message } = error.message;
        throw Error(message);
      });
    return bpmServer;
  }
}

export const bpmServer = new Server();
