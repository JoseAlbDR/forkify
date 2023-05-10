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

// /**
//  * API call to the given url
//  * @param {*} url url to fetch
//  * @returns a Promise with the data
//  */
// export const getJSON = async function (url) {
//   try {
//     // fetch url only success if done befor TIMEOUT_SEC
//     const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

//     // Await response
//     const data = await response.json();

//     // Error handle
//     if (!response.ok)
//       throw new Error(`We could not find that recipe. Please try another one!`);
//     return data;

//     // Error propagation
//   } catch (err) {
//     // Rethrow error, async fn calling async fn
//     throw err;
//   }
// };

/**
 * API fetch
 * If uploadData is defined is a POST request
 * If not is a GET request
 * @param {*} url API url
 * @param {*} uploadData Data to upload if POST request
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    // If uploadData is defined is a POST request
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : // If not is a GET
        fetch(url);

    // Await promise
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    // Await data
    const data = await res.json();

    // Throw error if response fail
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
    // Error propagation
  } catch (err) {
    throw err;
  }
};

// export const sendJSON = async function (url, uploadData) {
//   try {
//     // upload only success if done before TIMEOUT_SEC
//     const response = await Promise.race([
//       fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(TIMEOUT_SEC),
//     ]);

//     // Await response
//     const data = await response.json();

//     // Error handle
//     if (!response.ok)
//       throw new Error(
//         `We could not upload the recipe. Please try again later!`
//       );
//     return data;

//     // Error propagation
//   } catch (err) {
//     // Rethrow error, async fn calling async fn
//     throw err;
//   }
// };
