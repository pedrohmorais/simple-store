import jsHttpCookie from 'cookie';

const getCookie = (cookieName, req) => {
  if (!req || !req.headers) {
    return null;
  }
  const cookies = req.headers.cookie;
  let cookieValue = null;

  if (typeof cookies === 'string') {
    const cookiesJSON = jsHttpCookie.parse(cookies);

    cookieValue = cookiesJSON[cookieName];
  }
  return JSON.parse(cookieValue);
}

const getAuthSession = (req) => {
  const session = getCookie('auth', req);
  if(session && session.name === 'admin') {
    session.permissionLevel = 1;
  }
  return session;
}

export {
  getAuthSession,
}