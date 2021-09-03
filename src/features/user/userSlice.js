import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
        user: [],
        auth: false,
        status: 'idle',
        httpErr: null,
    };

export const fetchAsync = createAsyncThunk(
    'counter/fetchUser',
    async (payload, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        try{
        // const response = await fetchUser(payload);
        // The value we return becomes the `fulfilled` action payload
        const URL = `http://dev.rapptrlabs.com/Tests/scripts/user-login.php`;
    
    
        const response = await fetch(URL, {
            method:'POST', 
            headers:{
                'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams({
                'email': payload.email,
                'password': payload.password,
            }),
            mode: 'cors',
        })
        if (!response.ok) {
            return rejectWithValue(response.status)
        }
        const data= await response.json();
        return fulfillWithValue(data)
    }
    catch(err){
        throw rejectWithValue(err.message);
        }
    }
    );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser:(state, {payload = {}}) => {
        const isAuth = payload.hasOwnProperty('user_token');
        console.log(payload)
        if(isAuth){
            localStorage.setItem('isAuth', true);
        }
        state.auth = isAuth;
        state.user = payload;
    },
    clearUser:(state)=>{
        localStorage.removeItem('isAuth')
        return initialState;
    },
    setAuth:(state, {payload})=> {
        localStorage.setItem('isAuth', payload);
        state.auth = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, {payload}) => {
        console.log(payload)
        state.status = 'idle';
        const isAuth = payload.hasOwnProperty('user_token');
        if(isAuth){
            localStorage.setItem('isAuth', true);
        }
        state.auth = isAuth;
        state.user = payload;
      })
      .addCase(fetchAsync.rejected, (state, {payload}) => {
        state.status = 'idle';
        state.httpErr = payload;
      })
      
  },
});

export const { getUser, clearUser, setAuth } = userSlice.actions;

export default userSlice.reducer;
