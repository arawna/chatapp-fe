import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isLoggedIn: false,
    jwt: undefined,
    email:undefined
}

const slice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.isLoggedIn = true;
            state.jwt = action.payload.token;
            state.email=action.payload.email;
        },
        logoutAction: (state) => {
            state.isLoggedIn = false;
            state.jwt = undefined;
            state.email=undefined;
        },
    }
})

const { loginAction, logoutAction } = slice.actions

const login = (cred) => async (dispatch) => {
    try {
        delete axios.defaults.headers.common["Authorization"]
        const response = await axios.post("http://localhost:5000/users/login", cred)
        axios.defaults.headers.common['Authorization'] = "Bearer " + response.data.token
        localStorage.setItem("cred",JSON.stringify(cred))
        dispatch(loginAction({...response.data,email:cred.email}))
        return { stat: true }
    } catch (error) {
        return { stat: false, message: error.response.data.message }
    }
}
const logout = () => async (dispatch) => {
    dispatch(logoutAction())
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem("cred")
}

const register = (values) => async (dispatch) => {
    try {
        await axios.post("http://localhost:5000/users/register",values)
        await dispatch(login({email:values.email,password:values.password}))
        return { stat: true }
    } catch (error) {
        return { stat: false, message: error.response.data.message }
    }
}

const obj = {
    reducer: slice.reducer,
    login,
    logout,
    register
}

export default obj