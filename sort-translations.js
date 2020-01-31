/* eslint-disable
    no-await-in-loop,
    import/no-dynamic-require,
    no-restricted-syntax,
    global-require,
*/
const fs = require('fs').promises;

const { siteMetadata: { locales } } = require('./gatsby-config.js');

(async () => {
  for (const locale of locales) {
    const path = `./src/locales/${locale}/translation.json`;
    const translations = require(path);

    const output = Object.keys(translations).sort()
      .reduce((all, current) => ({ ...all, [current]: translations[current] }), {});

    await fs.writeFile(path, JSON.stringify(output, null, 2));
  }
})();
