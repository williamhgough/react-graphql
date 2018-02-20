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
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export const deleteSongMutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;
