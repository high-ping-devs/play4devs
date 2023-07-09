import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [60, 'Name cannot be more than 60 characters']
    },
    spotifyId: {
        type: String,
        required: [true, 'Please provide a spotifyId'],
    },
    auth0Id: {
        type: String,
        required: [true, 'Please provide a auth0Id'],
    },
    image: {
        type: String,
        required: [true, 'Please provide a image'],
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema)

