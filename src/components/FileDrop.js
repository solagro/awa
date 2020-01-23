import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const FileDrop = ({
  onDrop = () => {},
  className,
  children,
  dropText,
  dropTextOn,
  disableDropText = false,
  ...props
}) => {
  const { t } = useTranslation();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dText = isDragActive
    ? dropTextOn || (<p>{t('Drop the files here ...')}</p>)
    : dropText || (<p>{t('Drag \'n\' drop some files here, or click to select files')}</p>);

  return (
    <div
      className={clsx(className, { active: isDragActive })}
      {...props}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {!disableDropText && dText}
      {!isDragActive && children}
    </div>
  );
};

export default FileDrop;
