/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const XLSX = require('xlsx');

const { siteMetadata: { locales } } = require('./gatsby-config');

const translations = locales.reduce((acc, locale) => ({
  ...acc,
  [locale]: require(`./src/locales/${locale}/translation.json`),
}), {});

// Get all keys of all translation files
const keys = Object.values(translations).reduce((acc, curr) => {
  Object.keys(curr).forEach(key => acc.add(key));
  return acc;
}, new Set());

const translationsArray = Array.from(keys).sort()
  .map(key => locales.reduce((acc, locale) =>
    ({ ...acc, [locale]: translations[locale][key], }), { key }), {});

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(translationsArray);

XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
XLSX.writeFile(workbook, 'translations.ods');
