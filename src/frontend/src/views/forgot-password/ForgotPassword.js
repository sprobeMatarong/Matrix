import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert'
import { Button, TextField, Link, Typography, CircularProgress } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import { Page } from 'components'
import { useForm } from 'react-hook-form'
import { sendForgotPasswordEmail } from 'services/auth'
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
  submitButton: {
    margin: theme.spacing(2, 0),
  },
}))

function ForgotPassword() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const { t } = useTranslation()

  const handleForgot = (data) => {
    setLoading(true)

    dispatch(sendForgotPasswordEmail(data))
      .then(() => {
        setSuccess(true)
      })
      .catch((e) => {
        const { code, error } = e.response.data
        // handle API validation error
        if (code === 422 && error) {
          const { email } = error

          if (email) {
            setError('email', {
              message: error.email[0],
            })
          }
        }
      })
      .finally(() => setLoading(false))
  }

  const validationRules = {
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
  }

  return (
    <Page title="Forgot Password" className={classes.root}>
      <form onSubmit={handleSubmit(handleForgot)}>
        {success && (
          <div>
            <Alert variant="outlined" severity="success">
              Submitted! <br />
              Your password has been successfully reset. You should be receiving an email shortly
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
              Forgot Password
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Enter your email address.
            </Typography>
            <TextField
              className={classes.textField}
              {...register('email', validationRules.email)}
              error={errors && errors.email ? true : false}
              helperText={errors ? errors?.email?.message : null}
              fullWidth
              label="Email"
              name="email"
              type="text"
              variant="outlined"
            />

            <Button
              className={classes.submitButton}
              color="primary"
              disabled={loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {loading && <CircularProgress size="1.5rem" />}
              {!loading && 'Submit'}
            </Button>

            <Typography color="textSecondary" variant="body1">
              Go back to{' '}
              <Link component={RouterLink} to="/sign-in" variant="h6">
                Sign in
              </Link>
            </Typography>
          </>
        )}
      </form>
    </Page>
  )
}

export default ForgotPassword
