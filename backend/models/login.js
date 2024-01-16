import mongoose from 'mongoose';

const loginschema = mongoose.Schema(
  {
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
      required: true,
    }
  }
 
);


export const login = mongoose.model('login', loginschema);