import { USER_DATA, DELETE_USER_DATA } from './type'
import axios from 'axios'

let baseUrl = `http://localhost:3001/data`

export const setUserData = (data) => {
    return (dispatch) => {
        let { token, email, imageUrl, name, position, userDept } = data
        let payload = {
            token, email, imageUrl, name, position, userDept
        }
        dispatch({
            type: USER_DATA,
            payload
        })
    }
}

export const deleteUserData = (data) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_USER_DATA,
        })
    }
}