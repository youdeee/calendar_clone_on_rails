import React, { createContext, useReducer, useEffect } from 'react'
import moment from 'moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Calendar from './Calendar'
import Header from './Header'

const initialState = {
  currentMonth: moment(),
  events: {},
  startWeekDay: 6,
}

const Store = createContext()

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}

export { Store }

const reducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_CALENDAR':
      return {
        ...state,
        currentMonth: state.currentMonth.clone().add(1, 'month'),
      }
    case 'PREV_CALENDAR':
      return {
        ...state,
        currentMonth: state.currentMonth.clone().subtract(1, 'month'),
      }
    case 'TODAY_CALENDAR':
      return {
        ...state,
        currentMonth: moment(),
      }
    case 'ADD_EVENT':
      return {
        ...state,
        events: addEvent(state.events, action.payload),
      }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: deleteEvent(state.events, action.payload),
      }
    case 'SET_EVENTS':
      return {
        ...state,
        events: action.payload || {},
      }
    default:
      return state
  }
}

const addEvent = (events, event) => {
  const { date } = event
  if (events[date]) {
    events[date].push(event)
  } else {
    events[date] = [event]
  }
  return events
}

const deleteEvent = (events, event) => {
  const { id, date } = event
  const i = events[date].findIndex((e) => e.id === id)
  events[date].splice(i, 1)
  if (events[date] === []) {
    delete events[date]
  }
  return events
}

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider>
        <Header />
        <Calendar />
      </Provider>
    </MuiPickersUtilsProvider>
  )
}

export default App
