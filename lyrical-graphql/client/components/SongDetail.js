import React, { Component } from "react";
import { graphql } from "react-apollo";
import { findSongByIdQuery } from "../queries/songs";
import { Link } from "react-router";
import LyricList from "./LyricList";
import LyricCreate from "./LyricCreate";

class SongDetail extends Component {
    render() {
        const { song, loading } = this.props.data;
        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link className="card-action" to="/">
                    Back
                </Link>
                <h1>{song.title}</h1>
                <LyricList lyrics={song.lyrics} songId={song.id} />
                <LyricCreate />
            </div>
        );
    }
}

export default graphql(findSongByIdQuery, {
    options: props => {
        return { variables: { id: props.params.id } };
    },
})(SongDetail);
