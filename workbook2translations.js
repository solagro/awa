/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('translations.ods');

const { SheetNames: [wsName] } = workbook;
const worksheet = workbook.Sheets[wsName];

const obj = XLSX.utils.sheet_to_json(worksheet);

const translations = {};

obj.forEach(({ key, ...trans }) => {
  const locales = Object.keys(trans);
  locales.forEach(locale => {
    if (!translations[locale]) {
      translations[locale] = {};
    }
    translations[locale][key.toLowerCase()] = trans[locale];
  });
});

// console.log(translations);
Object.keys(translations).forEach(locale => {
  const filename = `./src/locales/${locale}/translation.json`;
  const original = require(`./src/locales/${locale}/translation.json`);
  const merge = { ...original, ...translations[locale] };

  const output = Object.keys(merge).sort()
    .reduce((all, current) => ({ ...all, [current]: merge[current] }), {});

  fs.writeFileSync(filename, JSON.stringify(output, null, 2));
});
