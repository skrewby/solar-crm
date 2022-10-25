import { bpmServer } from './bpm-server';

export async function getFile(id) {
  const data = await bpmServer
    .api()
    .url(`/files/` + id)
    .get()
    .json((response) => {
      return response;
    });

  return Promise.resolve(data);
}

export async function addFile(body) {
  const response = await bpmServer
    .api()
    .url(`/files`)
    .post(body)
    .json((response) => {
      return response;
    });

  return Promise.resolve(response);
}

export async function deleteFile(id) {
  const res = await bpmServer
    .api()
    .url(`/files/` + id)
    .delete()
    .res((response) => {
      return response;
    });

  return Promise.resolve(res);
}

export async function deleteFilepondFile(id) {
  const res = await bpmServer
    .api()
    .url(`/files/filepond/` + id)
    .delete()
    .res((response) => {
      return response;
    });

  return Promise.resolve(res);
}

export async function downloadFile(id, filename) {
  await bpmServer
    .api()
    .url(`/files/download/` + id)
    .get()
    .blob((file) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${filename}`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });

  return Promise.resolve();
}

export async function downloadMultipleFiles(ids, archiveName) {
  await bpmServer
    .api()
    .url(`/files/download-multiple`)
    .query({ files: ids })
    .get()
    .blob((file) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${archiveName}.zip`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    });

  return Promise.resolve();
}
