import { SET_KANBAN_DETAILS } from '../actions/type'


const initialState = {
    departmentName: '',
    departmentId: 0,
    category: [],
    allUser: [],

}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_KANBAN_DETAILS:
            console.log(action.payload)
            let departmentDetails = action.payload.data.data.departmentName
            let categoryDetails = action.payload.data.data.categories
            let allUserDetails = action.payload.data.data.allUser
            let id = action.payload.id
            return { ...state, departmentName: departmentDetails, category: categoryDetails, allUser: allUserDetails, departmentId: id }

        default:
            return state
    }
}