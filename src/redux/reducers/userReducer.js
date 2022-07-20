import {
    GET_USER,
    GET_USERS,
    USER_FOLLOWERS,
    USER_FOLLOWING,
    USER_REPOSITORIES
} from "../actions/types";

const initialState = {
    users: [],
    userData: [],
    userFollowers: [],
    userFollowing: [],
    userRepositories: [],
    errors: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS: {
            return { ...state, users: action.payload };
        }
        case USER_FOLLOWERS: {
            return { ...state, userFollowers: action.payload };
        }
        case USER_FOLLOWING: {
            return { ...state, userFollowing: action.payload };
        }
        case USER_REPOSITORIES: {
            return { ...state, userRepositories: action.payload };
        }
        case GET_USER: {
            return { ...state, users: action.payload };
        }
        default:
            return state;
    }
};

export default userReducer;
