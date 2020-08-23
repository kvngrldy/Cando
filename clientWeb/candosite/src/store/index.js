import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import kanban from './reducers/kanbanReducers'

const rootReducers = combineReducers({
    kanban,
})


const store = createStore(rootReducers, applyMiddleware(thunk))

export default store