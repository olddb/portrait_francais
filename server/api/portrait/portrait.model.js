'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PortraitSchema = new Schema({
    name: String,
    profession: String,
    intro: String,
    fulltxt: String,
    active: Boolean,
    alaune: Boolean,
    thumbnail: {
         url: String,
         width: String,
         height: String
	},
    image: {
         url: String,
         width: String,
         height: String,
	},
    dots: String,
    // dots: [{
    //     // coordX: Number,
    //     // coordY: Number,
    //     // ordre: Number,
    //     // data: string
    // }],
    color: String,
    format: String,  // supposed to be 'landscape' or 'portrait' 
	starring: String, // a propos
	contact: String,  // a propos
	apropos: String,   // a propos
	publish: Boolean
})

module.exports = mongoose.model('Portrait', PortraitSchema);
