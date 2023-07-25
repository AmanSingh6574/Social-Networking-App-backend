
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null  , 
    loading : false , 
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null 
}

const userSlice = createSlice({

    name : "auth" , 
    initialState : initialState , 
    reducers : {
        setuserData(state , value){
            state.user = value.payload 
        },
        setToken(state , value) {
            state.token = value.payload
        },
        setloading(state , value) {
            state.loading = value.payload
        }
    }

})

export const {setuserData , setToken , setloading} = userSlice.actions; 

export default userSlice.reducer ; 