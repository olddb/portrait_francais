'use strict';

var _ 			= require('lodash');
var Portrait 	= require('./portrait.model');
var p 			= require('../../print.js');
var fs 			= require('fs');
var sizeOf 		= require('image-size');
 

//▶  Get list of portraits
exports.list = function(req, res) {
	p.fonction("index");
	Portrait.find(function (err, portraits) {
		// console.log(portraits[0]); // ICI
		if(err) { p.erreur(err)
			return handleError(res, err); }
			return res.status(200).json(portraits);
	});
};
//」

//▶  Get a single portrait
exports.show = function(req, res) {
	p.fonction("show");
	Portrait.findById(req.params.id, function (err, portrait) {
		if(err) { p.erreur(err)
			return handleError(res, err); }
			if(!portrait) { return res.status(404).send('Not Found'); }
			return res.json(portrait);
	});
};
//」

//▶  writeImage
var writeImage = function (imageUrl, imageData) {

	// relative to root folder
	var base64Data = imageData.replace(/^data:image\/png;base64,/, "");
	fs.writeFileSync(imageUrl, base64Data, 'base64', function (err) {
		if (err) console.log(err);

	});

	var dimensions = sizeOf(imageUrl);
	console.log("dimensions of "  + imageUrl + " are " + dimensions.width, dimensions.height);
	return dimensions;
}
//」
//▶  Build Portrait
function buildPortrait(portrait) {

	var imageDir = "client/app/public/images/";

	console.log("portrait.image");
	console.log(portrait.publish);

	if (portrait.image && portrait.image.data) {

		//portrait.image 		= JSON.parse(portrait.image)
		portrait.image.url 		= imageDir + portrait.image.name;

		var dimensions 			= writeImage(portrait.image.url, portrait.image.data)
		portrait.image.height 	= dimensions.height
		portrait.image.width 	= dimensions.width

		portrait.image.url = ".." + portrait.image.url.substr(6)

		//getFormat(portrait.image)
		portrait.format = getFormat(portrait.image);

		delete portrait.image.data;

	}

	if (portrait.thumbnail && portrait.thumbnail.data) {

		//portrait.thumbnail 			= JSON.parse(portrait.thumbnail)
		portrait.thumbnail.url 		= imageDir + portrait.thumbnail.name;

		var dimensions 				= writeImage(portrait.thumbnail.url, portrait.thumbnail.data)
		portrait.thumbnail.height 	= dimensions.height;
		portrait.thumbnail.width 	= dimensions.width;

		portrait.thumbnail.url = ".." + portrait.thumbnail.url.substr(6)

		portrait.format = getFormat(portrait.thumbnail);

		delete portrait.thumbnail.data;
	}

	return portrait;
}
function getFormat(image) {
	return (image.width >= image.height) ? "landscape" : "portrait";
}
//」
//▶  Creates a new portrait in the DB.
exports.create = function(req, res) {
	p.fonction("create");

	var portrait = buildPortrait(req.body)

	// console.log(portrait);

	Portrait.create(portrait, function(err, portrait) {
		if(err) { p.erreur(err)
			return handleError(res, err); }
			return res.status(201).json(portrait);
	});
};
//」

//▶  Updates an existing portrait in the DB.
exports.update = function(req, res) {
	p.fonction("update");
	console.log("typeof(req.body.image)")
	console.log(typeof(req.body.image))
	console.log("typeof(req.body.thumbnail)")
	console.log(typeof(req.body.thumbnail))

	var portrait = buildPortrait(req.body)

	if(req.body._id) { delete req.body._id; }
	Portrait.findById(req.params.id, function (err, portraitFound) {
		// req.body.dots = JSON.parse(req.body.dots);
		console.log(req.body.dots);
		console.log('typeof ' + typeof(req.body.dots));
		if (err) { p.erreur(err)
			return handleError(res, err); }
			if(!portraitFound) { return res.status(404).send('Not Found'); }
			var updated = _.merge(portraitFound, req.body);
			updated.save(function (err) {
				if (err) { p.erreur(err)
					return handleError(res, err); }
					return res.status(200).json(portraitFound);
			});
	});
};
//」

//▶  Deletes a portrait from the DB.
exports.destroy = function(req, res) {
	p.fonction("destroy");
	Portrait.findById(req.params.id, function (err, portrait) {
		if(err) { p.erreur(err)
			return handleError(res, err); }
			if(!portrait) { return res.status(404).send('Not Found'); }
			portrait.remove(function(err) {
				if(err) { p.erreur(err)
					return handleError(res, err); }
					return res.status(204).send('No Content');
			});
	});
};
//」

//▶  handleError
function handleError(res, err) {
	return res.status(500).send(err);
}
//」
