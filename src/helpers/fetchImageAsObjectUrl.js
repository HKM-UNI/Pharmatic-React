import axios from "axios";

/**
 * @param {string} url
 * @returns {Promise<string>}
 */
export async function fetchImageAsObjectUrl(url) {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
    headers: {
      Accept: "image/*",
    },
  });

  const blob = new Blob([response.data], {
    type: response.headers["content-type"],
  });

  const urlCreator = window.URL || window.webkitURL;
  const objUrl = urlCreator.createObjectURL(blob);

  return objUrl;
}
