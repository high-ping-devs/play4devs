import mongoose from 'mongoose';

const PlaylistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a playlist name'],
        maxlength: [60, 'Name cannot be more than 60 characters']
    },
    url: {
        type: String,
        required: [true, 'Please provide a playlist url'],
    },
    likeCount: {
        type: Number,
        default: 0
    },
    cover: {
        type: String,
        required: [true, 'Please provide a playlist cover'],
    },
    userId: {
        type: String,
        required: [true, 'Please provide a userId'],
    },
    ownerName: {
        type: String,
        required: [true, 'Please provide a ownerName'],
    },
    tracks: {
        type: Array,
        required: [true, 'Please provide a tracks'],
    },
});

export default mongoose.models.Playlist || mongoose.model('Playlist', PlaylistSchema)