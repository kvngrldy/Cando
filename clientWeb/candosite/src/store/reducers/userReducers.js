import { USER_DATA, DELETE_USER_DATA, EDIT_USER_DATA } from '../actions/type'


const initialState = {
    token: '',
    email: '',
    imageUrl: '',
    name: '',
    position: '',
    userDept: '',

}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_DATA:
            let data = action.payload
            return { ...state, token: data.token, email: data.email, imageUrl: data.imageUrl, name: data.name, position: data.position, userDept: data.userDept }

        case DELETE_USER_DATA:
            return { ...state, token: '', email: '', imageUrl: '', name: '', position: '', userDept: '' }

        case EDIT_USER_DATA:
            let data2 = action.payload
            return { ...state, email: data2.email, name: data2.name, imageUrl: data2.imageUrl }
        default:
            return state
    }
}