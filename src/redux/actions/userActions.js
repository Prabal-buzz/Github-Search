import {
    GET_USERS,
    USER_FOLLOWERS,
    USER_FOLLOWING,
    USER_REPOSITORIES
} from "./types";
import { Octokit } from 'octokit';
import axios from "axios";

const octokit = new Octokit({
    auth: process.env.TOKEN
})

export const findUsers = (username, currentPage = 1) => async (dispatch) => {
    try {
        await axios.request(`https://api.github.com/search/repositories?q=${username}`, {
        }).then(
            response => {
                dispatch({
                    type: GET_USERS,
                    payload: response.data.items,
                })
            }
        )
    } catch (err) {
        console.log(err);
    }
};

export const findFollowers = (users, currentPage = 1) => async (dispatch) => {
    try {
        let followersArray = [];
        users.map(user => {
            octokit.request(`GET /users/${user.login}/followers?page=${currentPage}&per_page=3`, {
                headers: {
                    authorization: "token XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                }
            }).then(
                response => {
                    response.data.map(value =>
                        octokit.request(`GET ${value.url}`, {
                            headers: {
                                authorization: "token XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                            }
                        }).then(
                            response => {
                                response.data.mainLogin = user.login;
                                followersArray.push(response.data);
                                dispatch({
                                    type: USER_FOLLOWERS,
                                    payload: followersArray,
                                })
                            }
                        )
                    );
                }
            )
        }
        );

    } catch (err) {
        console.log(err);
    }
};

export const findFollowing = (users, currentPage = 1) => async (dispatch) => {
    try {
        let followingArray = [];
        users.map(user =>
            octokit.request(`GET /users/${user.login}/following?page=${currentPage}&per_page=3`, {
                headers: {
                    authorization: "token XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                }
            }).then(
                response => {
                    response.data.map(value =>
                        octokit.request(`GET ${value.url}`, {
                            headers: {
                                authorization: "token XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                            }
                        }).then(
                            response => {
                                response.data.mainLogin = user.login;
                                followingArray.push(response.data);
                                dispatch({
                                    type: USER_FOLLOWING,
                                    payload: followingArray,
                                })
                            }
                        )
                    );
                }
            )
        );
    } catch (err) {
        console.log(err);
    }
};

export const findRepos = (users, currentPage = 1) => async (dispatch) => {
    try {
        let repoArray = [];
        users.map(user =>
            octokit.request(`GET /users/${user.login}/repos?page=${currentPage}&per_page=3`, {
                headers: {
                    authorization: "token XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                }
            }).then(
                response => {
                    response.data.map(value =>
                        octokit.request(`GET ${value.url}`, {
                            headers: {
                                authorization: "token XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                            }
                        }).then(
                            response => {
                                response.data.mainLogin = user.login;
                                repoArray.push(response.data);
                                dispatch({
                                    type: USER_REPOSITORIES,
                                    payload: repoArray,
                                })
                            }
                        )
                    );
                }
            )
        );
    } catch (err) {
        console.log(err);
    }
};

export const findUser = (username) => async (dispatch) => {
    let userArray = [];

    try {
        await octokit.request(`GET /users/${username}`, {
        }).then(
            response => {
                userArray.push(response.data);
                dispatch({
                    type: GET_USERS,
                    payload: userArray,
                })
            }
        )
    } catch (err) {
        console.log(err);
    }
};