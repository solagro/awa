import React from 'react';

import Button from '@material-ui/core/Button';

import Link from './Link';

const QuizButton = ({ question: { fields: { slug } = {} } = {}, theme, ...rest }) => {
  if (!slug) {
    return null;
  }

  return (
    <Button
      key={slug}
      component={Link}
      to={`/quiz/${theme}/${slug}`}
      {...rest}
    />
  );
};

export default QuizButton;
