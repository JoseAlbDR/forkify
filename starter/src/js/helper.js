import { TIMEOUT_SEC } from './config';

/**
 * Set a timeout
 * @param {*} s seconds to timeout
 * @returns a promise after s => seconds
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * API call to the given url
 * @param {*} url url to fetch
 * @returns a Promise with the data
 */
export const getJSON = async function (url) {
  try {
    // fetch url only success if done befor TIMEOUT_SEC
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    // Await response
    const data = await response.json();

    // Error handle
    if (!response.ok)
      throw new Error(`We could not find that recipe. Please try another one!`);
    return data;

    // Error propagation
  } catch (err) {
    // Rethrow error, async fn calling async fn
    throw err;
  }
};
