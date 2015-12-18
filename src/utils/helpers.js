import axios from 'axios'

function getRepos (username) {
    return axios.get('https://api.github.com/users/' + username + '/repos');
}

function getUserInfo (username) {
    return axios.get('https://api.github.com/users/' + username)
}

let helpers = {
    getGithubInfo: function (username) {
        return axios.all([getRepos(username), getUserInfo(username)])
        .then( function (arr) {
            repos: arr[0].data,
            bio: arr[1].data
        })
    }
}
