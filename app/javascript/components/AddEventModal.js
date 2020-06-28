import React, { useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import axios from '../lib/axios'
import EventForm from './EventForm'
import { Store } from './App'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    minWidth: '300px',
  },
}))

const AddEventModal = (props) => {
  const classes = useStyles()
  const { dispatch } = useContext(Store)

  const onSubmit = async (data) => {
    data = { ...data, date: data.date.format('YYYY-MM-DD') }
    const result = await axios.post('/events', data)
    dispatch({
      type: 'ADD_EVENT',
      payload: result.data,
    })
    props.onClose()
  }

  return (
    <Modal open={props.open} onClose={props.onClose} className={classes.modal}>
      <Box className={classes.paper}>
        <Box display="flex" flexDirection="row-reverse">
          <CloseIcon onClick={props.onClose} />
        </Box>
        <EventForm
          day={props.day}
          onClose={props.onClose}
          onSubmit={onSubmit}
        />
      </Box>
    </Modal>
  )
}

export default AddEventModal
