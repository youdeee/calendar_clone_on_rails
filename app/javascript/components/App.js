import React, { createContext, useReducer } from 'react'
import moment from 'moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import CssBaseline from '@material-ui/core/CssBaseline'
import Calendar from './Calendar'
import Header from './Header'

const initialState = {
  currentMonth: moment(),
  events: [],
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
        events: [...state.events, action.payload],
      }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload.id),
      }
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: updateEvent(state.events, action.payload),
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

const updateEvent = (events, event) => {
  const i = events.findIndex((e) => e.id === event.id)
  events[i] = event
  return events
}

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider>
        <CssBaseline />
        <Header />
        <Calendar />
      </Provider>
    </MuiPickersUtilsProvider>
  )
}

export default App
