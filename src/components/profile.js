import React from 'react';
import Router from 'react-router'
import Repos from './github/repos'
import UserProfile from './github/userprofile'
import Notes from './notes/notes'
import ReactFireMixin from 'reactfire'
import Firebase from 'firebase'
import helpers from '../utils/helpers'

let Profile = React.createClass({
    mixins: [ReactFireMixin],
    getInitialState: function () {
        return {
            notes: [],
            bio: {},
            repos: []
        }
    },
    componentDidMount: function () {
        this.ref = new Firebase('https://nishirou-github-note.firebaseio.com/');
        let childRef = this.ref.child(this.props.params.username)
        this.bindAsArray(childRef, 'notes');

        helpers.getGithubInfo(this.props.params.username)
            .then( function (data) {
                this.setState({
                    bio: data.bio,
                    repos: data.repos
                })
            }.bind(this))
    },
    componentWillUnmount: function () {
        this.unbind('notes');
    },
    render: function () {
        return (
            <div className="row">
                <div className="col-md-4">
                    <UserProfile
                        username={ this.props.params.username }
                        bio={ this.state.bio }
                    />
                </div>
                <div className="col-md-4">
                    <Repos
                        username={ this.props.params.username }
                        repos={ this.state.repos }/>
                </div>
                <div className="col-md-4">
                    <Notes
                        username={ this.props.params.username }
                        notes={ this.state.notes }/>
                </div>
            </div>
        )
    }
})

module.exports = Profile;