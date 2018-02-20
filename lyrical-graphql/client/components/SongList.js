import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import SongItem from "./SongItem";
import { fetchSongsQuery, deleteSongMutation } from "../queries/songs";

class SongList extends Component {
    deleteSong(id) {
        this.props.mutate({
            variables: { id },
            refetchQueries: [{ query: fetchSongsQuery }],
        });
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => (
            <div key={id} className="card">
                <div className="card-content">
                    <span className="card-title">{title}</span>
                </div>
                <div className="card-action grey lighten-4">
                    <Link to={`songs/${id}`}>View More Details</Link>
                    <i
                        className="material-icons right"
                        onClick={() => this.deleteSong(id)}
                    >
                        delete
                    </i>
                </div>
            </div>
        ));
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <h1>Song List.</h1>
                    {!this.props.data.loading && this.renderSongs()}
                </div>
                <Link
                    to="/songs/new"
                    className="btn-floating btn-large green right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

export default graphql(deleteSongMutation)(graphql(fetchSongsQuery)(SongList));
