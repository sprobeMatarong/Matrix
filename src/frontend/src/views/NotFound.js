import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import Topbar from 'layouts/minimal/components/Topbar'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const useStyles = makeStyles((theme) => ({
  contentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    flexDirection: 'column',
    fontFamily: 'Roboto',
  },
  heading: {
    fontSize: '10em',
  },
  link: {
    fontWeight: '700',
    paddingTop: theme.spacing(5),
  },
}))

const NotFound = () => {
  const classes = useStyles()

  return (
    <div>
      <Topbar />

      <div className={classes.contentBox}>
        <h1 className={classes.heading}>404</h1>
        <p>The page you were looking for does not exist.</p>
        <Link to="/" className={classes.link}>
          Back to Home &#8594;
        </Link>
      </div>

      <HelmetProvider>
        <Helmet>
          <title>404 Not Found - {process.env.REACT_APP_SITE_TITLE}</title>
        </Helmet>
      </HelmetProvider>
    </div>
  )
}

export default NotFound
