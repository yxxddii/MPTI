import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    image: "",
    role: "",
    isLoading: false,
    isLoggedIn:false,
    error: "",
    roleToken:null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.role= action.payload;
        },
        getRoleToken: (state, action) => {
            state.roleToken = action.payload;
        },
        loginGetData: (state, action) => {
            state.name = action.payload.payload.name;
            state.email = action.payload.payload.email;
            state.phone = action.payload.payload.phone;
            state.gender = action.payload.payload.gender;
            state.image = state.roleToken==='user'?action.payload.payload.s3Url:action.payload.payload.imageUrl;
            state.id = action.payload.payload.id;
            state.role = state.roleToken;
            console.log(action.payload);
        },
        socialGetData: (state, action) => {
            console.log("social getdata",  action.payload.payload);
            state.email = action.payload.payload.email;
            state.id = action.payload.payload.id;
            state.roleToken = "user";
            state.role= "user"
            state.isLoggedIn = true;
        },

        logoutRequest: (state) => {
            state.isLoading = true;
        },

        loginFailure: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
        },
        logoutFailure: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        },signupRequest: (state) => {
            state.isLoading = true;
        },
        signupSuccess: (state) => {
            state.isLoading = false;
        },signupFailure: (state, action) => {
            state.isLoading = false;
        },
        logout: (state) => {
            state.id= ""
            state.name= ""
            state.email= ""
            state.phone= ""
            state.image= ""
            state.role= ""
            state.isLoading= false
            state.isLoggedIn=false
            state.error= ""
            state.roleToken=null
        },dataRequest: (state) => {
            state.isLoading = true;
        },
        dataSuccess: (state) => {
            state.isLoading = false;
        },
        dataFailure: (state) => {
            state.isLoading = false;
        },
    },
});



export const login = (email, password) => async (dispatch) => {
        dispatch(authActions.loginRequest());
    try {
        const response = await axios.post("/api/auth/login", { email, password });
        localStorage.setItem("access_token", response.headers["authorization"]);
        localStorage.setItem("refresh_token", response.headers["refresh-token"]);

        const role= await response.headers["role"] === "[ROLE_TRAINER]"? "trainer": response.headers["role"] === "[ROLE_USER]"? "user": "admin"; 
        dispatch(authActions.getRoleToken(role))
    

        if(role === "admin"){
            dispatch(authActions.loginSuccess(role));
        }else{
            const userInfo = role==="trainer"?await axios.get(`/api/${role}/info/${email}`).then(data=>data.data):await axios.post(`/api/${role}/info`,{email:email}).then(data=>data.data);
            console.log(userInfo,'????????????');
            dispatch(authActions.loginGetData({type:'ss', payload:userInfo}))
            dispatch(authActions.loginSuccess(role));
        }
      

       
     
    } catch (error) {
        alert('????????? ????????? ???????????????.') 
        document.getElementById('password').value=''
        dispatch(authActions.loginFailure(error));
    }
};

export const logout = () => async(dispatch)=>{
    dispatch(authActions.logoutRequest()); 
    try {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('mpti_role');
        axios.defaults.headers.common['authorization'] = accessToken;
        axios.defaults.headers.common['refresh-token'] = refreshToken;
        const response= await axios.post("/api/auth/logout");
        console.log(response);
        console.log("???????????? ??????");
        dispatch(authActions.logoutSuccess());
    } catch (error) {
        console.log("???????????? ??????");
        dispatch(authActions.logoutFailure(error));
    }
}


export const signup = (type, userInfo)=> async(dispatch) =>{
    dispatch(authActions.signupRequest());
    console.log(userInfo);
    try {
        const response = await axios.post(`/api/${type}/join`, userInfo);
        console.log(response);
        console.log("???????????? ??????");
        dispatch(authActions.signupSuccess());
    } catch (error) {
        console.log(error);
        console.log("???????????? ??????");
        dispatch(authActions.signupFailure());
    }
}

export const duplicateCheck = (type,email) => async(dispatch)=>{
    try {
        const response2=await axios.get(`/api/user/duplicate/${email}`);
        const response= await axios.get(`/api/trainer/duplicate/${email}`);
        return "????????? ???????????? ????????????";
        // dispatch(authActions.duplicateMsg("????????? ???????????? ????????????."));
    } catch (error) {
        // console.log(error.response);
        return "????????? ???????????? ????????????";
        // dispatch(authActions.duplicateMsg("????????? ???????????? ????????????."));
    }
}

export const getMyData = (role, email) => async(dispatch) => {
    dispatch(authActions.dataRequest());
    try{
        const userInfo = await role==="trainer"?await axios.get(`/api/${role}/info/${email}`).then(data=>data.data):await axios.post(`/api/${role}/info`,{email:email}).then(data=>data.data);
        console.log(userInfo)
        dispatch(authActions.loginGetData({type:'ss', payload:userInfo}))
        dispatch(authActions.dataSuccess());
        return '?????? ?????? ??????';
    } catch(err) {
        dispatch(authActions.dataFailure());
        return "?????? ???????????? ??????";
    }

}


export const authActions = authSlice.actions;
export default authSlice.reducer;
