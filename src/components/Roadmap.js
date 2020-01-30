import React from 'react';
import { useTranslation } from 'react-i18next';

const Roadmap = () => {
  const { t, i18n } = useTranslation();
  const src = `/images/roadmaps/roadmap-${i18n.language}.svg`;

  return (
    <img
      src={src}
      alt={t('Agriadapt roadmap for adaptation')}
      style={{ margin: '2rem auto' }}
    />
  );
};

export default Roadmap;
