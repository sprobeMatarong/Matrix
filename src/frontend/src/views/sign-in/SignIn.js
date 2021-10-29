import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { Button, TextField, Link, Typography, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { signInUser } from 'services/auth'
import { Page } from 'components'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
  },
  error: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  forgotPassword: {
    float: 'right',
  },
}))

function SignIn() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { t } = useTranslation()

  const handleSignIn = (data) => {
    dispatch(signInUser(data))
  }

  const validationRules = {
    username: {
      required: {
        value: String,
        message: t('auth.required'),
      },
      pattern: {
        value: /\S+@\S+\.\S+/, // Regex Email Validation
        message: t('auth.email'),
      },
    },
    password: {
      required: {
        value: String,
        message: t('auth.required'),
      },
    },
  }

  if (auth.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Page title="Sign In" className={classes.root}>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <Typography className={classes.title} variant="h2">
          Sign In
        </Typography>
        <TextField
          className={classes.textField}
          {...register('username', validationRules.username)}
          error={errors && errors.username ? true : false}
          helperText={errors ? errors?.username?.message : null}
          fullWidth
          label="Username"
          name="username"
          type="text"
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          {...register('password', validationRules.password)}
          error={errors && errors.password ? true : false}
          helperText={errors ? errors?.password?.message : null}
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
        />
        {auth.signInFailed && auth.error && (
          <Typography className={classes.error} color="error" variant="h6">
            {auth.error?.message}
          </Typography>
        )}
        <Button
          className={classes.signInButton}
          color="primary"
          disabled={auth.isPending}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {auth.isPending && <CircularProgress size="1.5rem" />}
          {!auth.isPending && 'Sign in'}
        </Button>

        <Typography color="textSecondary" variant="body1">
          Dont have an account?{' '}
          <Link component={RouterLink} to="/sign-up" variant="h6">
            Sign up
          </Link>
          <Link
            component={RouterLink}
            className={classes.forgotPassword}
            to="/forgot-password"
            variant="h6"
          >
            Forgot password?
          </Link>
        </Typography>
      </form>
    </Page>
  )
}

SignIn.propTypes = {
  history: PropTypes.object,
}

export default SignIn
