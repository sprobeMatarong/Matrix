import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ImageIcon from '@material-ui/icons/ImageOutlined'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import { CircularProgress } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import { useDispatch } from 'react-redux'
import { createUser, updateUser } from 'services/users'
import FormHelperText from '@material-ui/core/FormHelperText'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => {
  return {
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
      padding: theme.spacing(1),
    },
    modalTitle: {
      margin: 0,
      padding: theme.spacing(2),
    },
    loader: {
      marginRight: theme.spacing(1),
    },
    fieldContainer: {
      marginBottom: theme.spacing(2),
    },
    fileInput: {
      display: 'none',
    },
    imageContainer: {
      paddingLeft: theme.spacing(3),
    },
    status: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      paddingLeft: theme.spacing(1),
    },
    avatarIcon: {
      height: 'auto',
      width: '100%',
      cursor: 'pointer',
    },
    avatarButton: {
      display: 'block',
      height: '100%',
      width: '100%',
      '& button': {
        height: '100%',
        width: '100%',
        '& span': {
          margin: 0,
        },
      },
    },
  }
})

AddEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    status: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default function AddEditDialog(props) {
  const classes = useStyles()
  const { open, user, handleClose } = props
  const isNew = user.id === 0
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [apiError, setApiError] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm()
  const { t } = useTranslation()

  useEffect(() => {
    // set form values if form is edit
    if (!isNew) {
      setValue('first_name', user.first_name)
      setValue('last_name', user.last_name)
      setValue('email', user.email)
      setValue('password', '')
      setValue('avatar', '')
    }

    // if avatar is available from db record
    setAvatarPreview(user.avatar)
  }, [user])

  const onClose = () => {
    clearErrors()
    handleClose()
  }

  const handleSubmission = (data) => {
    setLoading(true)

    const dispatcher = isNew ? dispatch(createUser(data)) : dispatch(updateUser(data, user.id))

    dispatcher
      .then(() => handleClose(true))
      .catch((e) => {
        const { code, error } = e.response.data
        // handle API Form validation error
        if (code === 422 && error) {
          Object.keys(error).forEach((key) => {
            setError(key, { message: error[key][0] })
          })
        } else setApiError(error) // handle other errors
      })
      .finally(() => setLoading(false))
  }

  const imageDisplay = () => {
    return avatarPreview ? (
      <img src={avatarPreview} alt="" className={classes.avatarIcon} />
    ) : (
      <ImageIcon color="primary" className={classes.avatarIcon} />
    )
  }

  const handleSelectAvatar = (event) => {
    if (event.target.type === 'file' && event.target.files.length > 0) {
      setAvatarPreview(URL.createObjectURL(event.target.files[0]))
      setValue('avatar', event.target.files)
    }
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
      // Custom Validation with Dynamic required field
      validate: (val) => {
        // Remove as required if User Edit
        if (!isNew && !val) return true

        // password regex
        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

        // validate only if value is provided by user
        return (val && passwordPattern.test(val)) || t('auth.password.strong')
      },
    },
  }

  return (
    <Dialog
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      onClose={() => onClose()}
      open={open}
      maxWidth={'sm'}
      fullWidth={true}
    >
      <form onSubmit={handleSubmit(handleSubmission)}>
        <MuiDialogTitle className={classes.modalTitle} disableTypography>
          <Typography variant="h3">{isNew ? 'Add' : 'Update'} User</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => onClose()}
            disabled={loading}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid container item xs={isNew ? 12 : 8}>
              <Grid className={classes.fieldContainer} item xs={12}>
                <TextField
                  {...register('first_name', validationRules.first_name)}
                  error={errors && errors.first_name ? true : false}
                  helperText={errors ? errors?.first_name?.message : null}
                  name="first_name"
                  label="First Name"
                  fullWidth
                />
              </Grid>
              <Grid className={classes.fieldContainer} item xs={12}>
                <TextField
                  {...register('last_name', validationRules.last_name)}
                  error={errors && errors.last_name ? true : false}
                  helperText={errors ? errors?.last_name?.message : null}
                  name="last_name"
                  label="Last Name"
                  fullWidth
                />
              </Grid>
              <Grid className={classes.fieldContainer} item xs={12}>
                <TextField
                  {...register('email', validationRules.email)}
                  error={errors && errors.email ? true : false}
                  helperText={errors ? errors?.email?.message : null}
                  name="email"
                  label="Email"
                  fullWidth
                />
              </Grid>
              <Grid className={classes.fieldContainer} item xs={12}>
                <TextField
                  {...register('password', validationRules.password)}
                  error={errors && errors.password ? true : false}
                  helperText={errors ? errors?.password?.message : null}
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                />
              </Grid>
            </Grid>
            {!isNew && (
              <Grid
                xs={4}
                item
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                className={classes.imageContainer}
              >
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    className={classes.fileInput}
                    id="avatar"
                    type="file"
                    name="avatar"
                    onChange={handleSelectAvatar}
                  />
                  <Tooltip title="Select image.">
                    <label color="primary" htmlFor="avatar">
                      {imageDisplay()}
                    </label>
                  </Tooltip>
                  {errors && errors.avatar && (
                    <FormHelperText error={true}>{errors.avatar}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} container alignItems="flex-end">
                  <Typography align="center" component="span">
                    Status:{' '}
                  </Typography>
                  <Typography align="center" component="span" className={classes.status}>
                    {user.status.name}
                  </Typography>
                </Grid>

                <Grid item xs={12} container alignItems="flex-end">
                  {apiError && (
                    <Typography className={classes.error} color="error" variant="h6">
                      {apiError}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => onClose()} disabled={loading} color="primary">
            Close
          </Button>
          <Button
            disabled={loading}
            color="primary"
            variant="contained"
            type="submit"
            disableElevation
          >
            {loading && <CircularProgress size={24} className={classes.loader} />}
            {isNew ? 'Create' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
