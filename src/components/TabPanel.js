import React from 'react';

import Box from '@material-ui/core/Box';

export default ({ children, value, index, ...props }) => {
  const hidden = value !== index;
  return (
    <div
      role="tabpanel"
      hidden={hidden}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      {!hidden && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
};
