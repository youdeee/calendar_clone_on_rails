import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import EventModal from './EventModal'

const useStyles = makeStyles((theme) => ({
  event: {
    padding: theme.spacing(0.2),
  },
}))

const CalendarEvent = (props) => {
  const classes = useStyles()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Box
        className={classes.event}
        bgcolor="primary.main"
        color="white"
        borderRadius={4}
        onClick={(e) => {
          e.stopPropagation()
          setShowModal(true)
        }}
      >
        {props.event.name || '(タイトルなし)'}
      </Box>
      <EventModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
        }}
        event={props.event}
      />
    </>
  )
}

export default CalendarEvent
