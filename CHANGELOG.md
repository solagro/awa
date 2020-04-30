
1.5.0 / 2020-04-30
==================

  * Upgrade eslint-config-makina from 2.1.0 to 3.0.1
  * Import avec nouveaux points de grille
  * Add empty YC data file for gridPoint 65063
  * Add current commit description to netlify deploy message
  * Add npm script for deployment

1.4.0 / 2020-04-24
==================

  * Upgrade and enforce latest linting rules
  * Upgrade gatsby from 2.20.31 to 2.20.32
  * Fix CustomIcon tooltip management
  * Add typescript to devDep to restore linting
  * Upgrade @tmcw/togeojson from 3.2.0 to 4.0.0
  * Upgrade jszip from 3.2.2 to 3.4.0
  * Upgrade mapbox-gl from 1.8.1 to 1.9.1
  * Upgrade slugify from 1.3.6 to 1.4.0

1.3.0 / 2020-04-24
==================

  * Upgrade gatsby from 2.19.50 to 2.20.31
  * Fix material-ui/core/styles imports

1.2.0 / 2020-04-23
==================

Use command `git log --oneline 1.1.0..1.2.0` to list all changes.

1.1.0 / 2019-12-10
==================

  * Adjust Layout for modal display
  * Forward modal state of page through tabs
  * Create HOC for consuming props of modal context
  * Setup map links to open map links into modal window
  * Add gatsby-plugin-modal-routing as dependency
  * Add translation for main logo alternative text
  * Extract LanguageSwitcher to a dedicated component
  * Pull Location component a level higher in language switcher
  * Add missing iterator key into language switcher
  * Add missing grid points to map.geojson
  * Fix translation extraction through i18next-extract babel plugin
  * Add comments for i18next-extract exceptions
  * Keep input CSV values as strings
  * Colorize YieldCompilation data table according quartiles
  * Add ability to customize CustomDataTable cells rendering through a render prop
  * Improve main nav style and interaction
  * Resolve footer width problem
  * Add roadmap to quiz end page and change buttons
  * Change answers case
  * Design language selectors

1.0.0 / 2019-12-03
==================

  * Add missing S in Projection's' and Observation's'
  * Delete fake questions
  * Do not limit paper (background) height
  * Generate translation files with automatic extraction from source code
  * Load i18next-extract as babel plugin
  * Add dependency to i18next-extract plugin for babel
  * Define key & namespace separators for translation keys
  * Do not output some error on build (missing explanation)
  * Show maximized map on map page
  * Add maximized mode to Layout component
  * Allow Layout component to forward custom props
  * Use multiple props for Layout component
  * Move main nav to MainNav component
  * Provide question category when storing user answer
  * Reset given answers when leaving quiz result page
  * Create page for quiz end
  * Remove "common" theme from quiz
  * Improve quiz themes layout
  * Change answers button case
  * Resolve move effect on answers
  * Resolve question nav buttons style problems
  * Avoid to throw when question does not have explanation
  * Add category field to question display
  * Add category field to question form in admin
  * Avoid empty answer in case of extraneous EOL
  * Avoid error at node creation when question has no translation
  * Create legal page
  * Change menu pictos and rename image files
  * Add conditional layout
  * Add footer and adapt layout
  * Change favicon
  * Rename gridPoint CSV type for filesystem plugin
  * Add debug information for non-existing grid point pages
  * Avoid navigating to non-existing grid point page
  * Do all available dependency updates
  * Do all dependency patch updates through `npm upgrade`
  * Ensure background cover full page height

0.10.0 / 2019-11-26
===================

  * Early null render map for pre-renderering
  * Display map labels according current i18n language
  * Set map background tiles to Mapbox "satellite with streets"
  * Use `<a />` for external link in header
  * Add Zoom and Rotation controls to map
  * Add horizontal scroll to grid point data tables
  * Fix gridPoint link on map
  * Remove double Z to 'quiz'
  * Fix homepage link to map page
  * Use right link for language selector
  * Put Roadmap picture into a dedicated component
  * Add doc comments to quizzHelpers
  * Display user answer validity when an answer is chosen
  * Move language selector from general Layout to Header
  * Style quizz answers
  * Adjust header height
  * Style quiz page
  * Change h1 font family
  * Add roadmap as picture in summary
  * Add SVG pictures for main navigation and background
  * Add navigation tabs in grid point pages
  * Fix grid point root page redirection to first tab
  * Add temporary data table on each grid point page
  * Provide data to all three grid point pages
  * Add column index to cell data
  * Create graphql node for each CSV cell
  * Fix CSV headers special chars
  * Create 3 tabs for each grid point
  * Merge grid point pages creation graphql query
  * Optimize grid point data storage as a single data type
  * Fix wrong grid code in map data
  * Generate page for each grid point
  * Add some debug output to local plugins
  * Disable i18next default debug mode

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

