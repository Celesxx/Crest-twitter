import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice(
{
  name: 'loginMetamask',
  initialState: {
    address: null,
    tweeted: false,
  },

  reducers: 
  {
    login: (state, action) => 
    {
      switch(action.payload.action)
      {
          case 'address': 
              state.address = action.payload.address 
              break;

          case 'tweeted':
              state.tweeted = action.payload.tweeted
              break;
      }
    },
  },
})

export const { login, disconnect } = loginSlice.actions

export default loginSlice.reducer