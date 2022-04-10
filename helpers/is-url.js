/**
 *
 * @param {*} string url
 * @returns true if url is valid and false when invalid
 */
module.exports = (string) => {
  let url;

  try {
    url = new URL(string);
    const hostname = url.hostname.replace('www.', '');

    if (hostname !== 'tigerdirect.com')
      throw new Error('url is valid but the not from tigerdirect domain');
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};
