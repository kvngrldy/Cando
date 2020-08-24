import { USER_DATA, DELETE_USER_DATA, EDIT_USER_DATA } from './type'
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

export const editUserData = (data) => {
    return (dispatch) => {
        let { token, email, name, imageUrl } = data
        axios({
            method: 'put',
            url: `${baseUrl}/user/userData`,
            data: {
                email,
                name,
                imageUrl
            },
            headers: {
                token
            }
        })
            .then(({ data }) => {
               
                dispatch({
                    type: EDIT_USER_DATA,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err)
            })

        // dispatch({
        //     type: DELETE_USER_DATA,
        // })
    }
}