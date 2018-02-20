import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import { fetchSongsQuery, addSongMutation } from "../queries/songs";

class SongCreate extends Component {
    constructor(props) {
        super();

        this.state = { title: "" };
    }

    addSong(event) {
        event.preventDefault();

        this.props
            .mutate({
                variables: {
                    title: this.state.title,
                },
                refetchQueries: [{ query: fetchSongsQuery }],
            })
            .then(() => hashHistory.push("/"));
    }

    render() {
        return (
            <div>
                <Link to="/" className="card-action">
                    Back
                </Link>
                <h1>Add Song.</h1>
                <form onSubmit={this.addSong.bind(this)}>
                    <label>Song Title:</label>
                    <input
                        type="text"
                        onChange={e => this.setState({ title: e.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

export default graphql(addSongMutation)(SongCreate);
