
interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (name: string, value: string, options: CookieOptions = {}): void => {
  const cookieOptions = {
    expires: options.expires || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // Default 1 year
    path: options.path || '/',
    domain: options.domain,
    secure: options.secure,
    sameSite: options.sameSite || 'lax'
  };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (cookieOptions.expires) {
    if (typeof cookieOptions.expires === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + cookieOptions.expires * 1000);
      cookieOptions.expires = date;
    }
    cookieString += `; expires=${cookieOptions.expires.toUTCString()}`;
  }

  if (cookieOptions.path) {
    cookieString += `; path=${cookieOptions.path}`;
  }

  if (cookieOptions.domain) {
    cookieString += `; domain=${cookieOptions.domain}`;
  }

  if (cookieOptions.secure) {
    cookieString += '; secure';
  }

  if (cookieOptions.sameSite) {
    cookieString += `; samesite=${cookieOptions.sameSite}`;
  }

  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }

  return null;
};

export const deleteCookie = (name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void => {
  setCookie(
    name,
    '',
    {
      ...options,
      expires: new Date(0)
    }
  );
};
