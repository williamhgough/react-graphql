import gql from "graphql-tag";

export const fetchSongsQuery = gql`
    {
        songs {
            id
            title
        }
    }
`;

export const addSongMutation = gql`
    mutation AddSong($title: String!) {
        addSong(title: $title) {
            title
        }
    }
`;

export const deleteSongMutation = gql`
    mutation DeleteSong($id: ID!) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export const findSongByIdQuery = gql`
    query SongQuery($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                likes
                content
            }
        }
    }
`;

export const likeLyric = gql`
    mutation LikeLyric($id: ID!) {
        likeLyric(id: $id) {
            id
            content
            likes
        }
    }
`;

export const addLyricToSong = gql`
    mutation AddLyric($songId: ID!, $content: String!) {
        addLyricToSong(content: $content, songId: $songId) {
            id
        }
    }
`;

export const findLyricsBySongId = gql`
    query SongQuery($id: ID!) {
        song(id: $id) {
            lyrics {
                id
                likes
                content
            }
        }
    }
`;
