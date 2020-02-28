import React from 'react';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

import { useCookies } from 'react-cookie';

const isLive = typeof window !== 'undefined';

const useStyles = makeStyles({
  button: {
    marginLeft: '.5em',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeIcon: {
    width: '1em',
    height: '1em',
  },
});

const cookieName = 'tracking';
const cookieOptions = { path: '/' };

const CookieNotice = () => {
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const trackingCookie = cookies[cookieName];

  const [open, setOpen] = React.useState(!trackingCookie);
  const { t } = useTranslation();

  const classes = useStyles();

  if (!isLive) {
    return null;
  }

  const clearGA = () => {
    const regexp = /.*/;
    if (!Array.isArray(window.excludeGAPaths)) {
      window.excludeGAPaths = [];
    }

    if (!window.excludeGAPaths.includes(regexp)) {
      window.excludeGAPaths.push(regexp);
    }

    [
      '_ga',
      '_gid',
      '_gat',
    ].forEach(name => removeCookie(name, cookieOptions));
  };

  const handleApproval = () => {
    setCookie(cookieName, 'allow', cookieOptions);
    setOpen(false);
  };

  const handleRefusal = () => {
    clearGA();
    setCookie(cookieName, 'deny', cookieOptions);
    setOpen(false);
  };

  if (trackingCookie === 'deny') {
    clearGA();
  }

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      open={open}
      message={t('cookie-notice')}
      action={(
        <>
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
            size="small"
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleRefusal}
          >
            {t('I refuse')}
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleApproval}
          >
            {t('I accept')}
          </Button>
        </>
      )}
    />
  );
};

export default CookieNotice;
