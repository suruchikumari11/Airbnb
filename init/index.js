
const mongoose=require('mongoose');
const listing=require('../model/listing.js')
const  initdata=require('./data.js');



main()
.then(()=>{
    console.log("connnect to db");
})
.catch((err)=>{
console.log(err);
})
async function main()
{
await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}
const initdb=async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(initdata.data);
    console.log("insert all data");
}
initdb();