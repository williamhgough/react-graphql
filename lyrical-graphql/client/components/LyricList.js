import React, { Component } from "react";
import { graphql } from "react-apollo";
import { likeLyric } from "../queries/songs";

class LyricList extends Component {
    likeSong(event, id, likes) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                id,
            },
        });
    }

    render() {
        return (
            <div>
                <ul className="collection">
                    {this.props.lyrics.map(lyric => {
                        return (
                            <li key={lyric.id} className="collection-item">
                                {lyric.content} - ({lyric.likes} likes)
                                <span className="right">
                                    <i
                                        onClick={e =>
                                            this.likeSong(
                                                e,
                                                lyric.id,
                                                lyric.likes,
                                            )
                                        }
                                        className="material-icons"
                                    >
                                        thumb_up
                                    </i>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default graphql(likeLyric)(LyricList);
