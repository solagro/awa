import languages from '../locales';

const languageIds = Object.keys(languages);

/**
 * Change pathname to remplace current language path element
 * by provided language
 *
 * @param {string} pathname
 * @param {string} language
 * @returns New path
 */
export const adaptPathname = (pathname, language) => {
  if (['/', ''].includes(pathname)) {
    return `/${language}`;
  }

  let changeDone = false;

  const newPath = pathname.split('/').map(pathElement => {
    if (!changeDone && languageIds.includes(pathElement)) {
      changeDone = true;
      return language;
    }
    return pathElement;
  }).join('/');

  return changeDone ? newPath : `/${language}/${pathname}`;
};

export default adaptPathname;
