import axios from 'axios'
import { csrfToken } from '@rails/ujs'

const ax = axios.create({
  headers: {
    common: {
      'X-CSRF-Token': csrfToken(),
    },
  },
})

export default ax
