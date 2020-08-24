import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import kanban from './reducers/kanbanReducers'
import userData from './reducers/userReducers'

const rootReducers = combineReducers({
    kanban,
    userData,
})


const store = createStore(rootReducers, applyMiddleware(thunk))

export default store