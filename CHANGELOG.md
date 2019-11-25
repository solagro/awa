
0.9.0 / 2019-11-21
==================

  * Setup gatsby-plugin-web-font-loader dependency & load Abel font from Google fonts
  * Add description comments to localized page creation process
  * Setup locales through siteMetadata instead of plugin config
  * Put quiz creation in a dedicated plugin
  * Put data processing for map in a dedicated plugin
  * Create nodes for each grid point dataset
  * Fix CSV files consistency
  * Add data for 2 gridpoints and setup Gatsby for loading data directory
  * Redirect to gridCode page on feature click
  * Change cursor according hovered feature
  * Let GeoJSON fetching be done by MapboxGL itself
  * Draw GeoJSON data on map
  * Add geojson for all grid points
  * Add basic Map element
  * Add react-mapbox-gl as dependency
  * Add question series progress bar

0.8.0 / 2019-11-19
==================

  * Adapt quiz button style according given answer and its validity
  * Add lorem quiz questions
  * Extract Quiz texts processing to a dedicated function
  * Setup global state storage and management
  * Cleanup quiz texts management
  * Add question and answer texts processing
  * Create QuizButton component
  * Create generic question file with all translations
  * Rename local plugin as is became project specific
  * Declare slugify as peerDependency of local plugins
  * Create QuizQuestion page component
  * Set quiz buttons to target first theme question

0.7.0 / 2019-11-09
==================

  * Add question list on theme page
  * Add question slug to question node
  * Add order field to questions
  * Update all dependencies
  * Add buttons to quiz themes on quiz main page
  * Add process for creating quiz content pages
  * Add dependency to slugify
  * Add language suffix and capitalization to all quiz related nodes
  * Move JSON to Markdown nodes processing to a dedicated local plugin
  * Move localized pages creation process to a dedicated local plugin

0.6.1 / 2019-11-06
==================

  * Replace meta refresh by a NoScript component

0.6.0 / 2019-11-05
==================

  * Transform quiz question nodes to enable markdown to html conversion
  * Rename path var to avoid colision
  * Setup gatsby-source-filesystem plugin to load quiz question files
  * Load gatsby-transformer-json and gatsby-transformer-remark plugins
  * Add gatsby-transformer-json and gatsby-transformer-remark dependencies
  * Create NetlifyCMS config for editing quiz questions
  * Create example quiz question files
  * Create styleguide page
  * Add .nvmrc file to bind NodeJS version to use

0.5.0 / 2019-11-05
==================

  * Add lang attribute to html tag and links
  * Fix colors in theme and button variant for home page
  * Move theme file to src directory
  * Call MUI Theme also for pre-rendering (ssr)
  * Setup Material UI theme customisation
  * Rename locales aggregator
  * Use available locales as language detector whitelist
  * Move localized redirection mechanism to a HOC
  * Add Gatsby plugin for Netlify CMS
  * Add Gatsby plugin for Netlify hosting

0.4.0 / 2019-11-05
==================

  * Create custom Link component for localized links
  * Create map & adaptations pages
  * Create quiz page
  * Setup basic nav bar
  * Simplify and cleanup Header and Layout components
  * Apply standard case to Seo component file
  * Apply standard case to Image component file
  * Apply standard case to Header component file
  * Apply standard case to Layout component files

0.3.0 / 2019-11-05
==================

  * Upgrade gatsby its plugins
  * Upgrade react react-dom
  * Upgrade react-i18next and its dependencies
  * Upgrade @material-ui/core @material-ui/styles
  * Add a static language menu in layout footer
  * Move adaptPathname function to a dedicated lib
  * Manage pathname with no language prefix

0.2.0 / 2019-10-30
==================

  * Simplify home page
  * Use a common locales file for exporting all languages at a time
  * Uninstall i18next async backend
  * Load translations statically
  * Add a minimalist language switcher
  * Convert Layout component to useStaticQuery hook
  * Install & setup react-i18next
  * Add clean command to npm scripts
  * Create i18n pages from default pages
  * Disable offline mode (service worker)

0.1.0 / 2019-10-16
==================

  * Setup `npm version` command hook for updating changelog
  * Add clsx as dependency to comply linting rules
  * Enforce linting rules
  * Setup ESLint with Makina ruleset
  * Remove Prettier
  * Contribute README file with main informations
  * Setup project name, repository and main contributors
  * Upgrade all dependencies
  * Initial commit from gatsby: (https://github.com/dominicabela/gatsby-starter-material-ui.git)

