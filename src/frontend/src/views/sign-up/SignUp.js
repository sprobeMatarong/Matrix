import React, { useState } from 'react'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { Button, TextField, Link, Typography, CircularProgress } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { signUpUser } from 'services/auth'
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
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
}))

function SignUp() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const { t } = useTranslation()

  const handleSignUp = (data) => {
    setLoading(true)

    dispatch(signUpUser(data))
      .then(() => {
        setSuccess(true)
      })
      .catch((e) => {
        const { code, error } = e.response.data
        // handle API validation error
        if (code === 422 && error) {
          Object.keys(error).forEach((key) => {
            setError(key, { message: error[key][0] })
          })
        } else setApiError(error) // handle other errors
      })
      .finally(() => setLoading(false))
  }

  const validationRules = {
    first_name: {
      required: {
        value: String,
        message: t('auth.required'),
      },
    },
    last_name: {
      required: {
        value: String,
        message: t('auth.required'),
      },
    },
    email: {
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
      minLength: {
        value: 8,
        message: t('auth.password.minLength'),
      },
      pattern: {
        // 8 Characters, 1 Uppercase, 1 Special Character
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        message: t('auth.password.strong'),
      },
    },
  }

  if (auth.isAuthenticated) {
    return <Redirect to="/" />
  }

  return (
    <Page title="Sign Up" className={classes.root}>
      <form onSubmit={handleSubmit(handleSignUp)}>
        {success && (
          <div>
            <Alert variant="outlined" severity="success">
              Congratulations! <br />
              You have successfully created your account. You should be receiving an email shortly
              with an instruction.
            </Alert>

            <br />

            <Typography color="textSecondary" variant="body1">
              Have an account?{' '}
              <Link component={RouterLink} to="/sign-in" variant="h6">
                Sign In
              </Link>
            </Typography>
          </div>
        )}

        {!success && (
          <>
            <Typography className={classes.title} variant="h2">
              Create new account
            </Typography>

            <TextField
              className={classes.textField}
              fullWidth
              {...register('first_name', validationRules.first_name)}
              error={errors && errors.first_name ? true : false}
              helperText={errors ? errors?.first_name?.message : null}
              label="First Name"
              name="first_name"
              type="text"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              fullWidth
              {...register('last_name', validationRules.last_name)}
              error={errors && errors.last_name ? true : false}
              helperText={errors ? errors?.last_name?.message : null}
              label="Last Name"
              name="last_name"
              type="text"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              fullWidth
              {...register('email', validationRules.email)}
              error={errors && errors.email ? true : false}
              helperText={errors ? errors?.email?.message : null}
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              fullWidth
              {...register('password', validationRules.password)}
              error={errors && errors.password ? true : false}
              helperText={errors ? errors?.password?.message : null}
              label="Password"
              name="password"
              type="password"
              variant="outlined"
            />

            {apiError && (
              <Typography className={classes.error} color="error" variant="h6">
                {apiError}
              </Typography>
            )}

            <Button
              className={classes.signUpButton}
              color="primary"
              disabled={loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {loading && <CircularProgress size="1.5rem" />}
              {!loading && 'Sign Up'}
            </Button>

            <Typography color="textSecondary" variant="body1">
              Have an account?{' '}
              <Link component={RouterLink} to="/sign-in" variant="h6">
                Sign In
              </Link>
            </Typography>
          </>
        )}
      </form>
    </Page>
  )
}

SignUp.propTypes = {
  history: PropTypes.object,
}

export default SignUp
