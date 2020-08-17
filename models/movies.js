const mongoose = require("mongoose");

const moviescollection = new mongoose.Schema({
                            name: {type:String},
                            genre: {type:String},
                            rating: {type: String},
                            language: {type:String}
                                });

module.exports = mongoose.model("movies",moviescollection);