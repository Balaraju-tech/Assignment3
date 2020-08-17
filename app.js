const express = require("express");
const movies = require("./models/movies");
const app = express();
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyparser = require("body-parser");

// var moviescollection = newmovies();
app.use(express.static(__dirname+'/public'));

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.set("view engine","ejs");

app.set('views', './views')

mongoose.connect("mongodb://localhost:27017/local");
mongoose.connection.on("connected",()=>{
    console.log(chalk.green("DB Connection successful"));
});
mongoose.set('useFindAndModify', false);

app.get("/",(req,res)=>{
    res.render("movies");
});

app.post("/submittedmovieslist",(req,res)=>{
   
    console.log("The req.body.movie is ");
    console.log(req.body.movie);
    if(req.body.movie == ""){
        res.render("successful",{data:"No Data Saved"});
    }
    else{

    var moviedetail = {"name": req.body.movie,"genre":req.body.Genre,"rating":req.body.Rating,"language":req.body.Language}
    movies.collection.insert(moviedetail,(err,data)=>{
        console.log("The data after inserting is ");
        
        

        res.render("successful",{data:"no data"}); 
    });

    }
})



app.get("/getallmovies",(req,res)=>{
    movies.collection.find({}).toArray((err,data) => {
        if(err){
          res.status(402).send('Error while fetching data')
        }else{
            console.log("The data from the fetching the array");
            res.render("successful",{data:data})
            console.log(data[0].achievements)  

        }
    });
});



app.post("/getallmovies/achievements",(req,res)=>{
    
    console.log("The value of achievement is ");
    console.log(req.body.myvalue);
    console.log("Movie name of achievement is");
    console.log(req.body.myvaluename);
    var Achievementofmovie = req.body.myvalue;
    movies.find({name:req.body.myvaluename},(err,data)=>{

        var Achievementmoviename = data[0].name;
        var Achievementgenre = data[0].genre;
        var Achievementrating = data[0].rating;
        var Achievementlanguage = data[0].language;    
        movies.collection.update({name: Achievementmoviename}, {$set:{"name":Achievementmoviename,"genre":Achievementgenre
        ,"rating":Achievementrating, "language":Achievementlanguage, "achievements":Achievementofmovie}
    });
    })
    
     console.log("printed")

});


app.get("/getthreetoprated",(req,res)=>{

    movies.find({}).sort({rating:-1}).limit(3).exec((err, sorteddata)=>{ 
            console.log("The data after sorting");
            console.log(sorteddata);
            res.render("successful",{data: sorteddata});
     });

});

app.get("/searchbymovie",(req,response)=>{
    
    console.log("The data from the req body is ");
    console.log(req.query.searchbyname);

    movies.findOne({"name":req.query.searchbyname},(err, Searchresults)=>{ 
        if(!Searchresults){
            console.log("There is no data to search");
            response.send("");
        }
        else{
            response.send(Searchresults);
        }
 });
});

app.get("/getachievementmovies",(req,res)=>{

    movies.collection.find({$or:[{"achievements":"SuperHit"},{"achievements":"Super DuperHit"}]}).toArray((err,data)=>{
        console.log("The data from the dbis ");
        console.log(data);
        res.render("successful",{data:data});

    });
   


});

app.listen(3000,()=>{
console.log(chalk.green("connected to localhost 3000"));    
});
