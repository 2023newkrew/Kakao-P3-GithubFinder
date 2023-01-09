export const get = (url, options) => {
  const defaultOptions = {
    method: "GET",
  };
  return fetch(url, { ...defaultOptions, ...options })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};
export default { get };
