import React from 'react';

import Button from '@material-ui/core/Button';

import Link from './Link';

const QuizzButton = ({ question: { fields: { slug } = {} } = {}, theme, ...rest }) => {
  if (!slug) {
    return null;
  }

  return (
    <Button
      key={slug}
      component={Link}
      to={`/quizz/${theme}/${slug}`}
      {...rest}
    />
  );
};

export default QuizzButton;
