import React, { useContext, useState } from 'react'

import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import PlaceIcon from '@material-ui/icons/Place'
import NotesIcon from '@material-ui/icons/Notes'
import DeleteIcon from '@material-ui/icons/Delete'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
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

const EventModal = (props) => {
  const classes = useStyles()
  const { dispatch } = useContext(Store)
  const [mode, setMode] = useState('VIEW') // or EDIT

  const onCancel = () => setMode('VIEW')
  const onClose = () => {
    onCancel()
    props.onClose()
  }

  const onSubmit = async (data) => {
    data = { ...data, date: data.date.format('YYYY-MM-DD') }
    const result = await axios.patch(`/events/${props.event.id}`, data)
    dispatch({
      type: 'UPDATE_EVENT',
      payload: result.data,
    })
    props.onClose()
  }

  let contents = null
  if (mode === 'VIEW') {
    contents = (
      <>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Box>{props.event.name || '(タイトルなし)'}</Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccessTimeIcon />
          </Grid>
          <Grid item>
            <Box>{moment(props.event.date).format('M月D日')}</Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <PlaceIcon />
          </Grid>
          <Grid item>
            <Box>{props.event.place}</Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <NotesIcon />
          </Grid>
          <Grid item>
            <Box>{props.event.description}</Box>
          </Grid>
        </Grid>
      </>
    )
  } else if (mode === 'EDIT') {
    contents = (
      <EventForm
        event={props.event}
        onSubmit={onSubmit}
        onClose={onClose}
        onCancel={onCancel}
      />
    )
  }

  return (
    <Modal
      open={props.open}
      onClose={onClose}
      className={classes.modal}
      onClick={(e) => e.stopPropagation()}
    >
      <Box className={classes.paper}>
        <Box display="flex" flexDirection="row-reverse">
          <CloseIcon onClick={onClose} />
          <DeleteIcon
            onClick={async (e) => {
              e.stopPropagation()
              if (window.confirm('本当に削除しますか？')) {
                const result = await axios.delete(`/events/${props.event.id}`)
                dispatch({
                  type: 'DELETE_EVENT',
                  payload: props.event,
                })
                onClose()
              }
            }}
          />
          <EditIcon
            onClick={(e) => {
              e.stopPropagation()
              setMode('EDIT')
            }}
          />
        </Box>
        {contents}
      </Box>
    </Modal>
  )
}

export default EventModal
