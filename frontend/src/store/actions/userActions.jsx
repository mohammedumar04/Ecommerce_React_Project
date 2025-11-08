import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducers/userSlice";


export const asyncCurrentUsers = (user) => async (dispatch, getState) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) dispatch(loaduser(user))
    } catch (error) {
        console.log(error)
    }
}

export const asyncLoginUsers = (user) => async (dispatch, getState) => {
    try {
        let { data } = await axios.get(`/users?email=${user.email}&password=${user.password}`)
        // console.log(data[0]) //queryString 
        localStorage.setItem("user", JSON.stringify(data[0]))
        dispatch(asyncCurrentUsers())
    } catch (error) {
        console.log(error)
    }
}

export const asyncLogOutUser = (user) => async (dispatch, getState) => {
    try {
        localStorage.removeItem("user")
        dispatch(removeuser())
    } catch (error) {

    }
}

export const asyncRegisterUsers = (user) => async (dispatch, getState) => {
    try {
        const res = await axios.post("/users", user)
        // console.log(res)
    } catch (error) {
        console.log(error)
    }
}

export const asyncUpdateUser = (id, user) => async (dispatch, getState) => {
    try {
        const { data } = await axios.patch("/users/" + id, user)
        localStorage.setItem("user", JSON.stringify(data))
        dispatch(asyncCurrentUsers())
    } catch (error) {
        console.log(error)
    }
}

export const asyncDeleteUser = (id) => async (dispatch, getState) => {
    try {
        await axios.delete("/users/" + id)
        dispatch(asyncLogOutUser())
    } catch (error) {
        console.log(error) 
    }

}