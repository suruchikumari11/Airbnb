const  express=require("express");
const app=express();
const mongoose=require('mongoose');
const port=8080;
const listing=require('./model/listing.js')
const path=require("path");
const ejsMate = require('ejs-mate');
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'/public')))
const wrapAsync=require("./utils/wrapAsync.js")
const ExpessError=require("./utils/ExpressError.js")
const { listingSchema }=require('./schema.js')

const  methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
//const mongo_url=('mongodb://127.0.0.1:27017/warehouse');

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


app.get("/",(req,res)=>{
    res.send("hello i am web page");
});
app.listen(port, () => {
    console.log("server start");
});
//index
app.get("/listings",wrapAsync(async(req,res)=>{
    let allListing=await listing.find({});
    res.render("listing/index.ejs",{allListing})

}));
//new create
app.get("/listings/new",(req,res)=>{
    res.render("listing/new.ejs")
});
//show 
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const  Listing=await listing.findById(id);
    res.render("listing/show.ejs",{Listing});
}));
//create route
app.post("/listings",wrapAsync(async(req,res,next)=>{
   let result= listingSchema.validate(req.body);
   console.log(result);
   if(result.error){
    throw new ExpressError(400,'result.error')
   }
    const newlisting = new listing (req.body.Listing);
    await newlisting.save();
    res.redirect('/listings');
}));
//edit
app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
    let { id }=req.params;
    let listings=await listing.findById(id);
    res.render("listing/edit.ejs",{ listings });
}));


// //update
app.put("/listings/:id", wrapAsync(async (req,res)=>{
    let { id }=req.params;
     await listing.findByIdAndUpdate(id ,{...req.body.Listing});
     res.redirect("/listings")
}));
 //delete
app.delete('/listings/:id',wrapAsync(async(req,res)=>{
    let { id }=req.params;
    let delteid=await listing.findByIdAndDelete(id);
    console.log(delteid)
    res.redirect('/listings')
}))

app.all('*',(req,res,next)=>{
    next(new ExpressError(404,'page not found!'));
})

app.use((err,req,res,next)=>{
    let { statusCode=500, message="something went wrong!"} = err;
    res.status(statusCode).render('error.ejs',{ message })
    // res.status(statusCode).send(message)
})
// app.get("/testing",async(req,res)=>{
//    let sampletest=new listing({
//     title:"home",
//     descripation:"buy a rent ",
    
//     price:1200,
//      country:"india",
//     location:"bihar muz"

//     });
//      await sampletest.save();
//      console.log(sampletest);
//      res.send("success in testing");
// });


