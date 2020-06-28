import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import moment from 'moment'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import PlaceIcon from '@material-ui/icons/Place'
import NotesIcon from '@material-ui/icons/Notes'
import { DatePicker } from '@material-ui/pickers'
import { Store } from './App'

const EventForm = (props) => {
  const { handleSubmit, register, control } = useForm()

  let cancelButton = null
  if (props.onCancel) {
    cancelButton = (
      <Button variant="contained" onClick={props.onCancel}>
        キャンセル
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <TextField
            inputRef={register}
            placeholder="タイトルと日時を追加"
            name="name"
            defaultValue={props.event ? props.event.name : ''}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-end" width={1}>
        <Grid item>
          <AccessTimeIcon />
        </Grid>
        <Grid item>
          <Controller
            as={<DatePicker />}
            name="date"
            format="YYYY/MM/DD"
            variant="inline"
            value={register}
            defaultValue={props.day || moment(props.event.date)}
            control={control}
            rules={{ required: true }}
            autoOk
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <PlaceIcon />
        </Grid>
        <Grid item>
          <TextField
            inputRef={register}
            placeholder="場所を追加"
            name="place"
            defaultValue={props.event ? props.event.place : ''}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <NotesIcon />
        </Grid>
        <Grid item>
          <TextField
            inputRef={register}
            placeholder="説明を追加"
            name="description"
            defaultValue={props.event ? props.event.description : ''}
          />
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="row-reverse">
        <Button type="submit" variant="contained" color="primary">
          保存
        </Button>
        {cancelButton}
      </Box>
    </form>
  )
}

export default EventForm
