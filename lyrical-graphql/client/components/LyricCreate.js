import React, { Component } from "react";
import { graphql } from "react-apollo";
import { addLyricToSong } from "../queries/songs";

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { lyric: "" };
    }

    addLyrics(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.lyric,
            },
        });

        this.setState({ lyric: "" });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.addLyrics.bind(this)}>
                    <label>Add Lyric</label>
                    <input
                        type="text"
                        value={this.state.lyric}
                        onChange={e => this.setState({ lyric: e.target.value })}
                    />
                </form>
            </div>
        );
    }
}

export default graphql(addLyricToSong)(LyricCreate);
