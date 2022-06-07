import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/user'
import adminReducer from '../features/admins/admin'
import clientReducer from '../features/clients/clients'

const store = configureStore({
  reducer: {
      login:loginReducer,
      admin:adminReducer,
      client:clientReducer
  },
})

export default store    