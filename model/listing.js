const mongoose=require("mongoose");
       const Schema=mongoose.Schema;
       const listingSchema=new Schema(
        {
          title:{ type:String,
                  required:true,
               },
          description:String ,
           
          image:{
            type:String ,
            default:"https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwdmlsbGF8ZW58MHx8MHx8fDA%3D",
           set : (v) => v === "" ? "default":v,
          },
          price:Number,
          country:String,
          location:String,
          review:[{
            type:Schema.Types.ObjectId,
            ref:"Review"
          }],
         }
       );
       const Listing=mongoose.model("Listing",listingSchema)
        module.exports=Listing;