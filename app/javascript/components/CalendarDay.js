import React, { useState } from 'react'

import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import CalendarEvent from './CalendarEvent'
import AddEventModal from './AddEventModal'

const useStyles = makeStyles((theme) => ({
  date: {
    padding: theme.spacing(0.5),
  },
  events: {
    overflow: 'auto',
    height: 'calc(100% - 26px)',
  },
  event: {
    margin: theme.spacing(0.2),
  },
}))

const CalendarDay = (props) => {
  const classes = useStyles()
  const [showModal, setShowModal] = useState(false)

  const format = props.day.date() === 1 ? 'M月D日' : 'D'
  const today = props.day.isSame(moment(), 'day')
  let titleAttr = { display: 'inline' }
  if (today)
    titleAttr = {
      ...titleAttr,
      color: 'white',
      borderRadius: '50%',
      bgcolor: 'info.main',
    }

  return (
    <>
      <Box
        flex="1 1 0%"
        border={1}
        borderLeft={0}
        borderTop={0}
        borderColor="grey.500"
        onClick={() => setShowModal(true)}
      >
        <Box className={classes.date} textAlign="center">
          <Box {...titleAttr}>{props.day.format(format)}</Box>
        </Box>
        <Box className={classes.events}>
          {props.events.map((event) => {
            return (
              <Box
                className={classes.event}
                key={`${props.day.format('YYYY-MM-DD')}-event-${event.id}`}
              >
                <CalendarEvent event={event} />
              </Box>
            )
          })}
        </Box>
      </Box>
      <AddEventModal
        open={showModal}
        onClose={() => setShowModal(false)}
        day={props.day}
      />
    </>
  )
}

export default CalendarDay
