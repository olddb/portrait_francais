'use strict';

var express = require('express');
var controller = require('./portrait.controller');
var p 			= require('../../print.js');

var router = express.Router();

//create
router.post('/', 		p.debug, controller.create);

//read
router.get('/', 		p.debug, controller.list);
router.get('/:id', 		p.debug, controller.show);


//update
router.put('/:id', 		p.debug, controller.update);
router.patch('/:id', 	p.debug, controller.update);

//delete
router.delete('/:id', 	p.debug, controller.destroy);
//router.param('id', 	p.debug, controller.id);


module.exports = router;
