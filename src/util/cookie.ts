/* cookie api */

interface CookieOptions {
  path?: string;
  expires?: number | Date;
  domain?: string;
  secure?: boolean;
}

export const defaultExpires = 7 * 24 * 60 * 60 * 1000;

/* 获取cookie */
export function getCookie(name: string): string {
  const matcher = document.cookie.match(RegExp('(?:^| )' + name + '=([^;]*)'));
  if (matcher !== null) {
    return decodeURIComponent(matcher[1]);
  }
  return '';
}

/* 设置cookie */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): boolean {
  if (!name) {
    return false;
  }
  let stringifiedAttributes: string = '';
  const attributes: CookieOptions = {
    path: '/',
    expires: defaultExpires,
    ...options,
  };
  if (typeof attributes.expires === 'number') {
    const expires = new Date();
    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires);
    attributes.expires = expires;
  }
  const names = Object.keys(attributes) as Array<keyof CookieOptions>;
  for (const key of names) {
    if (!attributes[key]) {
      continue;
    }
    stringifiedAttributes += '; ' + key;
    if (attributes[key] === true) {
      continue;
    }
    if (name === 'expires') {
      stringifiedAttributes +=
        '=' + (attributes.expires ? attributes.expires.toUTCString() : '');
    }
    stringifiedAttributes += '=' + attributes[key];
  }
  document.cookie =
    name + '=' + encodeURIComponent(value) + stringifiedAttributes;
  return true;
}

/* 删除cookie */
export function removeCookie(name: string): boolean {
  return setCookie(name, '', { expires: -defaultExpires });
}
