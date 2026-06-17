import { createSlice } from "@reduxjs/toolkit"
import { reset } from "../authReducer"
import { getAllPosts, createPost } from "../../action/postAction"

const initialState = {
  posts: [],
  isError: false,
  postFetched: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  Comments: [],
  postId: "",
}



const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    reserPostId: (state) => {
      state.postId = ""
    },
  },
    extraReducers: (builder) => {
      builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true
        state.message = "Fetching all the posts..."
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.postFetched = true;
        state.posts = action.payload;
        state.message = "Posts fetched";
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch posts";
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating post...";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.posts.unshift(action.payload);
        state.message = "Post created";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to create post";
      })
    }
})


export default postSlice.reducer


















// import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from '../../action/postAction';

// const initialState = {
//   loading: false,
//   posts: [],
//   error: null,
// };

// const postReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_POSTS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case FETCH_POSTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         posts: action.payload,
//         error: null,
//       };
//     case FETCH_POSTS_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         posts: [],
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default postReducer;