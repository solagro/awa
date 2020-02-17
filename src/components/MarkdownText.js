import React from 'react';

import Rehype2react from 'rehype-react';

import Typography from '@material-ui/core/Typography';

const renderAst = new Rehype2react({
  createElement: React.createElement,
  components: {
    h1: props => <Typography variant="h1" {...props} />,
    h2: props => <Typography variant="h2" {...props} />,
    h3: props => <Typography variant="h3" {...props} />,
    h4: props => <Typography variant="h4" {...props} />,
    h5: props => <Typography variant="h5" {...props} />,
    h6: props => <Typography variant="h6" {...props} />,
    p: props => <Typography variant="body2" {...props} />,
  },
}).Compiler;

const MarkdownText = ({ hast }) => renderAst(hast);

export default MarkdownText;
