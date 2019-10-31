import React from 'react';

import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import adaptPathname from '../lib/adaptPathname';

const CustomLink = React.forwardRef(({ to, ...props }, ref) => {
  const { i18n } = useTranslation();

  return (
    <Link
      innerRef={ref}
      to={adaptPathname(to, i18n.language)}
      {...props}
    />
  );
});

export default CustomLink;
