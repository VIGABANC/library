import { createSlice } from '@reduxjs/toolkit';

import userImage1 from '../../images/users/user1.png';
import userImage2 from '../../images/users/user2.png';
import userImage3 from '../../images/users/user3.png';

export const initialState = {
  users: [
    {
      id: 1,
      username: "John Doe",
      email: "john.doe@example.com",
      password: "password123", // Add password here
      role: "admin",
      profileImage: userImage1,
    },
    {
      id: 2,
      username: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password456", // Add password here
      role: "user",
      profileImage: userImage2,
    },
    {
      id: 3,
      username: "Alice Johnson",
      email: "alice.johnson@example.com",
      password: "password789", // Add password here
      role: "user",
      profileImage: userImage3,
    }
  ],
  currentUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email && u.password === password);
    
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        state.userId = user.id; // Store user ID
    
        // Save authentication state in localStorage
        localStorage.setItem('authUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        state.isAuthenticated = false;
      }
    },
    
    setUser(state, action) {
      const { user } = action.payload;
      state.currentUser = user;
      state.isAuthenticated = true;
      state.userId = user.id;
      localStorage.removeItem('authUser');
      localStorage.removeItem('isAuthenticated');
    },    

    logoutUser(state) {
      console.log('is logged out');
      state.currentUser = null;
      state.isAuthenticated = false;
      state.userId = null; // Ensure userId is also cleared
    },    
    addUser(state, action) {
      const newUser = action.payload;
      const lastUser = state.users.length > 0 ? state.users[state.users.length - 1] : null;
      const newId = lastUser ? lastUser.id + 1 : 1;
    
      const defaultProfileImage = "/src/images/users/user1.png"; // You can replace this with the path to your default image
    
      state.users.push({
        ...newUser,
        id: newId,
        profileImage: newUser.profileImage || defaultProfileImage, 
        role: newUser.role || "user", 
      });
    },
    
    
  
    updateUser(state, action) {
      const { id, updatedData } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updatedData };
      }
    },
    deleteUser(state, action) {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
});

export const {
  loginUser,
  logoutUser,
  addUser,
  setUser,
  updateUser,
  deleteUser,
} = userSlice.actions;

export const selectUsers = (state) => state.user.users;
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
