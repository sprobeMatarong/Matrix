import React, { useState, useEffect, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert'
import { Button, TextField, Link, Typography, CircularProgress } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import queryString from 'query-string'
import PropTypes from 'prop-types'

import { Page } from 'components'
import { useForm } from 'react-hook-form'
import { resetPassword } from 'services/auth'
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

function ResetPassword(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm()
  const password = useRef({})
  password.current = watch('password', '')
  const { t } = useTranslation()

  useEffect(() => {
    const token = queryString.parse(props.location.search).token
    setValue('token', token)
  }, [])

  const handleReset = (data) => {
    setLoading(true)

    dispatch(resetPassword(data))
      .then(() => {
        setSuccess(true)
      })
      .catch((e) => {
        const { code, error } = e.response.data
        // handle API validation error
        if (code === 422 && error) {
          const { password } = error

          if (password) {
            setError('password', {
              message: error.password[0],
            })
          }
        }
      })
      .finally(() => setLoading(false))
  }

  const validationRules = {
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
    password_confirmation: {
      // custom validation rule
      validate: (value) => {
        return value === password.current || t('auth.password.confirm')
      },
    },
  }

  return (
    <Page title="Forgot Password" className={classes.root}>
      <form onSubmit={handleSubmit(handleReset)}>
        {success && (
          <div>
            <Alert variant="outlined" severity="success">
              You have successfully updated your password. You should be able to login with your
              updated password.
              <Link component={RouterLink} to="/sign-in" variant="h6">
                Click here to login.
              </Link>
            </Alert>
          </div>
        )}

        {!success && (
          <>
            <Typography className={classes.title} variant="h2">
              Update Password
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Enter your new password
            </Typography>
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
            <TextField
              className={classes.textField}
              {...register('password_confirmation', validationRules.password_confirmation)}
              error={errors && errors.password_confirmation ? true : false}
              helperText={errors ? errors?.password_confirmation?.message : null}
              fullWidth
              label="Confirm Password"
              name="password_confirmation"
              type="password"
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

ResetPassword.propTypes = {
  location: PropTypes.object,
}

export default ResetPassword
