import mongoose from 'mongoose'

const connetion = {};

async function dbConnect (){
    if(connetion.isConnected){
        return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    connetion.isConnected = db.connections[0].readyState;
    console.log("db connected")
}

export default dbConnect;