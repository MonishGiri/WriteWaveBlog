import { configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        // TODO: add new slice for post
    }
})

export default store;