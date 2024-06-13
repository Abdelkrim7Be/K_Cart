import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

// comparing a plain-text password entered during login with a hashed password in the database.
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
//Bcrypt .compare() returns a promise

// Encryption
// .pre()  : a Mongoose pre-save hook that allows us to do something before it gets saved to the database
// there .post() for after
// so basically here, we are trating the password passed from the form 
// that is a mongoose middleware function
userSchema.pre('save', async function (next) {
    // this : currentUser 
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User;