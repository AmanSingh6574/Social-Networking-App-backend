
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    post : null , 
    loading : false , 
    addpost : [] , 
    allpost : [] 
}

const postSlice = createSlice({

    name : "post" , 
    initialState : initialState , 
    reducers : {
        setuserpost(state , value){
            state.user = value.payload 
        },
        setaddpost(state , value) {
            state.addpost = [...initialState.addpost , value.payload]
        } , 
        setallpost(state , value) {
            state.allpost =[...initialState.allpost ,  value.payload]
        },
        setloading(state , value) {
            state.loading = value.payload
        }
    }

})

export const {setuserpost , setallpost ,setaddpost , setloading} = postSlice.actions; 

export default postSlice.reducer ; 