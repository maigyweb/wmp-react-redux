// const origin = "http://localhost:3000";

function stringifyLocation(data) {
  if (Object.keys(data).length === 0) {
    return "";
  }

  let params = "?";
  for (let key in data) {
    params += key + "=" + data[key] + "&";
  }

  return params.slice(0, -1);
}

function setHttpCookie(cookie) {
  const Reg = /[a-z0-9_]+\=[a-z0-9_]+/gi;
  const cookieArray = cookie.match(Reg);

  if (!cookieArray) return;

  const cookieString = cookieArray.join(";");

  try {
    wx.setStorageSync("httpCookie", cookieString);
  } catch (error) {
    throw new Error(error);
  }
}

function fetchApi(option = {}) {
  let { url, method, data } = option;

  method = (method && method.toUpperCase()) || "GET";
  url = (process.env.WMP_ORIGIN || "") + url;

  if (method === "GET") {
    url += stringifyLocation(data || {});
  } else {
    data && (data = JSON.stringify(data));
  }

  let httpCookie;
  try {
    httpCookie = wx.getStorageSync("httpCookie");
  } catch (e) {
    throw new Error(error);
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: { "content-type": "application/json", Cookie: httpCookie },
      success: (res) => {
        const { header } = res;
        const cookie = header["Set-Cookie"];

        if (cookie) {
          setHttpCookie(cookie);
        }

        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  })
    .then((result) => result.data)
    .catch((err) => {
      throw new Error(err);
    });
}

export default fetchApi;
