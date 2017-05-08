/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Portrait = require('../api/portrait/portrait.model');
console.log('seed.js');

User.create({
	provider: 'local',
	role: 'admin',
	name: 'sammy',
	password: 'sammy'
}, {
	provider: 'local',
	role: 'admin',
	name: 'vincent',
	password: 'vincent'
}, {
	provider: 'local',
	role: 'admin',
	name: 'Admin',
	password: 'admin'
}, function () {
	console.log('--- Users populated ---');
});
//▶  
/*
		Portrait.create({
			apropos: '<p>PORTRAITS PAR L’OBJET<br><br> Dans le matérialisme ambiant, les objets sont jetables et perdent leur valeur quasi instantanément à l’instar des produits de consommation courante. « Portrait français » fait pourtant le pari de dresser une galerie de portraits photographiques aux travers des « objets phares » de leur propriétaire. L’idée est autant de redonner de la valeur aux « choses » qui nous entourent que de cerner les personnalités complexes, faites de bric et de broc, qui se reflètent dans chacun des objets possédés. Le site a vocation à dévoiler ses sujets à travers des portraits totalement objectifs, au sens premier du terme.<br><br> Figures actuelles et marquantes du paysage français, le site paris telex s’attarde sur ceux qui font, bouleversent ou décodent la culture française d’aujourd’hui : une culture riche de sa diversité et de ses origines multiples.<br><br> Plutôt que le cliché léché d’un sourire figé, le site tente de décoder l’intérieur de l’âme de la personnalité à travers sa sélection de choses.<br><br> Objet-mémoire, matière précieuse, ustensile quotidien, pièce tendance ou souvenir de voyage, portraits français valorise chacune des choses élues par son propriétaire dans une scénographie élaborée par un directeur artistique.  Dans un univers particulier, propre à chacune des personnalités, chaque objet prendra sa place et son ampleur sous l’objectif du photographe.</p>',
			starring: '<p>LIGNE EDITORIALE & DIRECTION ARTISTIQUE <br> Juliette Erhel et Claire Bissara barbe / Paris telex<br><br> PHOTOGRAPHIE<br> Cyrille Robin</p>',
			contact: 'bonjour@portraitsfrancais.com <br> troisieme ligne de contact'
		}, 

		{
			name: 'Josephine de Meaux',
			intro: 'Dans ce fourmillement d’objets, sous cette tempête de couleurs se lisent les secrets d’un destin forcément passionnant. Issu d’une illustre famille, pourvu d’un nom à rallonge et habité de rêves de conquête, Jean-Charles de Castelbajac a nourri très vite l\'urgence de devenir grand. Avec fantaisie, appétit, et une créativité sans cesse renouvelé, il n\'a jamais laissé sa mode au repos, et se révèle désormais dans l’art. Curieux insatiable, il résume son travail et sa vie par le détournement et l’appropriation des codes, des images, et des choses du quotidien. Il est ainsi logique que chacun de ses objets fétiches, les trophées professionnels comme les trésors familiers, portent en eux l’empreinte marquante de leur propriétaire.',
			fulltxt: 'Napoléon sous cadre. Cette représentation de Napoléon est émouvante, le personnage est alors à la fin de son règne, sous l’emprise d’un passé douloureux. Je me suis approprié cette image en la barrant d’une croix rouge. La croix est très vite devenu une sorte de signature : je crois beaucoup aux signes, et celui-ci m’a toujours suivi. La croix, c’est d’abord les armes de ma famille, puis plus tard, alors que j’étais en pension de mes 7 à mes 17 ans, la croix apparaissait sur l’extincteur rouge du bâtiment. C’était le seul objet coloré dans cet univers dur et masculin, dont je me suis sauvé trois fois. J’ai donc construit une sorte d’immense tendresse pour cet objet et pour la croix qu’il figurait en particulier. L’avion en papier J’ai commencé dans la mode alors que je n’avais que 17/18 ans et j’ai eu du succès très vite, j’ai donc toujours cru que c’était là mon premier talent. Mais récemment, j’ai découvert que mon premier business, ma première petite entreprise avait été la construction d’avion ! En pension, je n’avais pas beaucoup d’amis, mais j’étais le fournisseur exclusif d’avions en papier pour mes camarades qui m’en commandaient contre des billes, des élastiques ou d’autres petits trésors. Nous leur faisions faire des loopings du haut du premier étage. Cet avion-ci est beaucoup plus récent, il est marqué « Japan air line », il est lié à ma vie intime et à une relation sentimentale importante. La poupée dans son fauteuil Ma mère faisait collection de poupées, aucune d’entres elles n’étaient restaurées car ma mère souhaitait les garder intactes et chacune d’elles me fascinait lorsque je rentrais de pension le week-end. J’ai hérité de celle ci, qui vit avec moi aujourd’hui : elle date de Louis XIII et on m’a dit qu’elle représentait une reine ou une princesse. J’ai toujours adoré cette figure et je trouve magnifique l’idée qu’elle soit restée dans son fauteuil pendant des siècles.',
			active: false,
			image: {
				url: '../app/public/images/JosephinedeMeaux.jpg',
				width : '500px',
				height :  '667px',
			},
			format: 'portrait',
			dots: '[]',
			color: '#C00634',
			thumbnail: {
				url: '../app/public/images/JosephinedeMeauxthumbnail.jpg',
				width : '500px',
				height :  '667px',
			},
			publish : 'true'
		}, {
			name: 'Bertrand Burgalat',
			intro: 'Dans ce fourmillement d’objets, sous cette tempête de couleurs se lisent les secrets d’un destin forcément passionnant. Issu d’une illustre famille, pourvu d’un nom à rallonge et habité de rêves de conquête, Jean-Charles de Castelbajac a nourri très vite l\'urgence de devenir grand. Avec fantaisie, appétit, et une créativité sans cesse renouvelé, il n\'a jamais laissé sa mode au repos, et se révèle désormais dans l’art. Curieux insatiable, il résume son travail et sa vie par le détournement et l’appropriation des codes, des images, et des choses du quotidien. Il est ainsi logique que chacun de ses objets fétiches, les trophées professionnels comme les trésors familiers, portent en eux l’empreinte marquante de leur propriétaire.',
			fulltxt: 'Napoléon sous cadre. Cette représentation de Napoléon est émouvante, le personnage est alors à la fin de son règne, sous l’emprise d’un passé douloureux. Je me suis approprié cette image en la barrant d’une croix rouge. La croix est très vite devenu une sorte de signature : je crois beaucoup aux signes, et celui-ci m’a toujours suivi. La croix, c’est d’abord les armes de ma famille, puis plus tard, alors que j’étais en pension de mes 7 à mes 17 ans, la croix apparaissait sur l’extincteur rouge du bâtiment. C’était le seul objet coloré dans cet univers dur et masculin, dont je me suis sauvé trois fois. J’ai donc construit une sorte d’immense tendresse pour cet objet et pour la croix qu’il figurait en particulier. L’avion en papier J’ai commencé dans la mode alors que je n’avais que 17/18 ans et j’ai eu du succès très vite, j’ai donc toujours cru que c’était là mon premier talent. Mais récemment, j’ai découvert que mon premier business, ma première petite entreprise avait été la construction d’avion ! En pension, je n’avais pas beaucoup d’amis, mais j’étais le fournisseur exclusif d’avions en papier pour mes camarades qui m’en commandaient contre des billes, des élastiques ou d’autres petits trésors. Nous leur faisions faire des loopings du haut du premier étage. Cet avion-ci est beaucoup plus récent, il est marqué « Japan air line », il est lié à ma vie intime et à une relation sentimentale importante. La poupée dans son fauteuil Ma mère faisait collection de poupées, aucune d’entres elles n’étaient restaurées car ma mère souhaitait les garder intactes et chacune d’elles me fascinait lorsque je rentrais de pension le week-end. J’ai hérité de celle ci, qui vit avec moi aujourd’hui : elle date de Louis XIII et on m’a dit qu’elle représentait une reine ou une princesse. J’ai toujours adoré cette figure et je trouve magnifique l’idée qu’elle soit restée dans son fauteuil pendant des siècles.',
			active: false,
			image: {
				url: '../app/public/images/BertrandBurgalat.jpg',
				width : '500px',
				height :  '667px',
			},
			format: 'portrait',
			dots: '[]',
			color: '#010725',
			// intro: 'Dans ce fourmillement d’objets, sous cette tempête de couleurs se lisent les secrets d’un destin forcément passionnant. Issu d’une illustre famille, pourvu d’un nom à rallonge et habité de rêves de conquête, Jean-Charles de Castelbajac a nourri très vite l\'urgence de devenir grand. Avec fantaisie, appétit, et une créativité sans cesse renouvelé, il n\'a jamais laissé sa mode au repos, et se révèle désormais dans l’art. Curieux insatiable, il résume son travail et sa vie par le détournement et l’appropriation des codes, des images, et des choses du quotidien. Il est ainsi logique que chacun de ses objets fétiches, les trophées professionnels comme les trésors familiers, portent en eux l’empreinte marquante de leur propriétaire.',
			thumbnail: {
				url: '../app/public/images/BertrandBurgalatthumbnail.jpg',
				width : '500px',
				height :  '667px'
			},
			publish : 'true'
		}, {
			name: 'Chantal Thomas',
			intro: 'Dans ce fourmillement d’objets, sous cette tempête de couleurs se lisent les secrets d’un destin forcément passionnant. Issu d’une illustre famille, pourvu d’un nom à rallonge et habité de rêves de conquête, Jean-Charles de Castelbajac a nourri très vite l\'urgence de devenir grand. Avec fantaisie, appétit, et une créativité sans cesse renouvelé, il n\'a jamais laissé sa mode au repos, et se révèle désormais dans l’art. Curieux insatiable, il résume son travail et sa vie par le détournement et l’appropriation des codes, des images, et des choses du quotidien. Il est ainsi logique que chacun de ses objets fétiches, les trophées professionnels comme les trésors familiers, portent en eux l’empreinte marquante de leur propriétaire.',
			fulltxt: 'Napoléon sous cadre. Cette représentation de Napoléon est émouvante, le personnage est alors à la fin de son règne, sous l’emprise d’un passé douloureux. Je me suis approprié cette image en la barrant d’une croix rouge. La croix est très vite devenu une sorte de signature : je crois beaucoup aux signes, et celui-ci m’a toujours suivi. La croix, c’est d’abord les armes de ma famille, puis plus tard, alors que j’étais en pension de mes 7 à mes 17 ans, la croix apparaissait sur l’extincteur rouge du bâtiment. C’était le seul objet coloré dans cet univers dur et masculin, dont je me suis sauvé trois fois. J’ai donc construit une sorte d’immense tendresse pour cet objet et pour la croix qu’il figurait en particulier. L’avion en papier J’ai commencé dans la mode alors que je n’avais que 17/18 ans et j’ai eu du succès très vite, j’ai donc toujours cru que c’était là mon premier talent. Mais récemment, j’ai découvert que mon premier business, ma première petite entreprise avait été la construction d’avion ! En pension, je n’avais pas beaucoup d’amis, mais j’étais le fournisseur exclusif d’avions en papier pour mes camarades qui m’en commandaient contre des billes, des élastiques ou d’autres petits trésors. Nous leur faisions faire des loopings du haut du premier étage. Cet avion-ci est beaucoup plus récent, il est marqué « Japan air line », il est lié à ma vie intime et à une relation sentimentale importante. La poupée dans son fauteuil Ma mère faisait collection de poupées, aucune d’entres elles n’étaient restaurées car ma mère souhaitait les garder intactes et chacune d’elles me fascinait lorsque je rentrais de pension le week-end. J’ai hérité de celle ci, qui vit avec moi aujourd’hui : elle date de Louis XIII et on m’a dit qu’elle représentait une reine ou une princesse. J’ai toujours adoré cette figure et je trouve magnifique l’idée qu’elle soit restée dans son fauteuil pendant des siècles.',
			active: false,
			image: {
				url: '../app/public/images/ChantalThomas.jpg',
				width : '500px',
				height :  '667px',
			},
			format: 'portrait',
			dots: '[]',
			color: '#023D41',
			thumbnail: {
				url: '../app/public/images/ChantalThomasthumbnail.jpg',
				width : '500px',
				height :  '667px'
			},
			publish : 'true'
		}, {
			name: 'Daniel Marhely',
			intro: 'Dans ce fourmillement d’objets, sous cette tempête de couleurs se lisent les secrets d’un destin forcément passionnant. Issu d’une illustre famille, pourvu d’un nom à rallonge et habité de rêves de conquête, Jean-Charles de Castelbajac a nourri très vite l\'urgence de devenir grand. Avec fantaisie, appétit, et une créativité sans cesse renouvelé, il n\'a jamais laissé sa mode au repos, et se révèle désormais dans l’art. Curieux insatiable, il résume son travail et sa vie par le détournement et l’appropriation des codes, des images, et des choses du quotidien. Il est ainsi logique que chacun de ses objets fétiches, les trophées professionnels comme les trésors familiers, portent en eux l’empreinte marquante de leur propriétaire.',
			fulltxt: 'Napoléon sous cadre. Cette représentation de Napoléon est émouvante, le personnage est alors à la fin de son règne, sous l’emprise d’un passé douloureux. Je me suis approprié cette image en la barrant d’une croix rouge. La croix est très vite devenu une sorte de signature : je crois beaucoup aux signes, et celui-ci m’a toujours suivi. La croix, c’est d’abord les armes de ma famille, puis plus tard, alors que j’étais en pension de mes 7 à mes 17 ans, la croix apparaissait sur l’extincteur rouge du bâtiment. C’était le seul objet coloré dans cet univers dur et masculin, dont je me suis sauvé trois fois. J’ai donc construit une sorte d’immense tendresse pour cet objet et pour la croix qu’il figurait en particulier. L’avion en papier J’ai commencé dans la mode alors que je n’avais que 17/18 ans et j’ai eu du succès très vite, j’ai donc toujours cru que c’était là mon premier talent. Mais récemment, j’ai découvert que mon premier business, ma première petite entreprise avait été la construction d’avion ! En pension, je n’avais pas beaucoup d’amis, mais j’étais le fournisseur exclusif d’avions en papier pour mes camarades qui m’en commandaient contre des billes, des élastiques ou d’autres petits trésors. Nous leur faisions faire des loopings du haut du premier étage. Cet avion-ci est beaucoup plus récent, il est marqué « Japan air line », il est lié à ma vie intime et à une relation sentimentale importante. La poupée dans son fauteuil Ma mère faisait collection de poupées, aucune d’entres elles n’étaient restaurées car ma mère souhaitait les garder intactes et chacune d’elles me fascinait lorsque je rentrais de pension le week-end. J’ai hérité de celle ci, qui vit avec moi aujourd’hui : elle date de Louis XIII et on m’a dit qu’elle représentait une reine ou une princesse. J’ai toujours adoré cette figure et je trouve magnifique l’idée qu’elle soit restée dans son fauteuil pendant des siècles.',
			active: false,
			image: {
				url: '../app/public/images/DanielMarhely.jpg',
				width : '500px',
				height :  '667px',
			},
			format: 'landscape',
			dots: '[]',
			color: '#C0943B',
			thumbnail: {
				url: '../app/public/images/DanielMarhelythumbnail.jpg',
				width : '749px',
				height :  '500px'
			},
			publish : 'true'
		}, {
			name: 'Jean Charles de Castelbajac',
			intro: 'Dans ce fourmillement d’objets, sous cette tempête de couleurs se lisent les secrets d’un destin forcément passionnant. Issu d’une illustre famille, pourvu d’un nom à rallonge et habité de rêves de conquête, Jean-Charles de Castelbajac a nourri très vite l\'urgence de devenir grand. Avec fantaisie, appétit, et une créativité sans cesse renouvelé, il n\'a jamais laissé sa mode au repos, et se révèle désormais dans l’art. Curieux insatiable, il résume son travail et sa vie par le détournement et l’appropriation des codes, des images, et des choses du quotidien. Il est ainsi logique que chacun de ses objets fétiches, les trophées professionnels comme les trésors familiers, portent en eux l’empreinte marquante de leur propriétaire.',
			fulltxt: 'Napoléon sous cadre. Cette représentation de Napoléon est émouvante, le personnage est alors à la fin de son règne, sous l’emprise d’un passé douloureux. Je me suis approprié cette image en la barrant d’une croix rouge. La croix est très vite devenu une sorte de signature : je crois beaucoup aux signes, et celui-ci m’a toujours suivi. La croix, c’est d’abord les armes de ma famille, puis plus tard, alors que j’étais en pension de mes 7 à mes 17 ans, la croix apparaissait sur l’extincteur rouge du bâtiment. C’était le seul objet coloré dans cet univers dur et masculin, dont je me suis sauvé trois fois. J’ai donc construit une sorte d’immense tendresse pour cet objet et pour la croix qu’il figurait en particulier. L’avion en papier J’ai commencé dans la mode alors que je n’avais que 17/18 ans et j’ai eu du succès très vite, j’ai donc toujours cru que c’était là mon premier talent. Mais récemment, j’ai découvert que mon premier business, ma première petite entreprise avait été la construction d’avion ! En pension, je n’avais pas beaucoup d’amis, mais j’étais le fournisseur exclusif d’avions en papier pour mes camarades qui m’en commandaient contre des billes, des élastiques ou d’autres petits trésors. Nous leur faisions faire des loopings du haut du premier étage. Cet avion-ci est beaucoup plus récent, il est marqué « Japan air line », il est lié à ma vie intime et à une relation sentimentale importante. La poupée dans son fauteuil Ma mère faisait collection de poupées, aucune d’entres elles n’étaient restaurées car ma mère souhaitait les garder intactes et chacune d’elles me fascinait lorsque je rentrais de pension le week-end. J’ai hérité de celle ci, qui vit avec moi aujourd’hui : elle date de Louis XIII et on m’a dit qu’elle représentait une reine ou une princesse. J’ai toujours adoré cette figure et je trouve magnifique l’idée qu’elle soit restée dans son fauteuil pendant des siècles.',
			active: false,
			alaune: true,
			image: {
				url: '../app/public/images/JeanCharlesdeCastelbajac.jpg',
				width : '500px',
				height :  '667px',
			},
			format: 'portrait',
			dots: '[]',
			color: '#071b34',
			thumbnail: {
				url: '../app/public/images/JeanCharlesdeCastelbajacthumbnail.jpg',
				width : '500px',
				height :  '667px'
			},
			publish: 'true'
		} 
					   );
					   */
//」
