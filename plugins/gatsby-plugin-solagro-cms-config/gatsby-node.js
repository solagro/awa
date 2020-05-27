const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const mkdirp = require('mkdirp');

const config = require('./config.js');

exports.onPostBootstrap = ({ reporter, parentSpan }) => {
  const activity = reporter.activityTimer('Creating NetlifyCMS config file', { parentSpan });
  activity.start();

  const dir = path.join('public', 'admin');
  mkdirp.sync(dir);
  fs.writeFileSync(
    path.join(dir, 'config.yml'),
    YAML.stringify(config),
  );

  activity.end();
};
