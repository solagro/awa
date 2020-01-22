import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const FileDrop = ({ onDrop = () => {}, className, children, ...props }) => {
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={clsx(className, { active: isDragActive })}
      {...props}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>{t('Drop the files here ...')}</p>
          : <p>{t('Drag \'n\' drop some files here, or click to select files')}</p>
      }
      {children}
    </div>
  );
};

export default FileDrop;
