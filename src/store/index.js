// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import business from 'src/store/apps/business'
import fields from 'src/store/apps/field'
import feed from 'src/store/apps/feed'
import review from 'src/store/apps/review'
import report from 'src/store/apps/report'
import load from 'src/store/apps/load'
import lane from 'src/store/apps/lane'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    business,
    report,
    fields,
    feed,
    review,
    load,
    lane
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
