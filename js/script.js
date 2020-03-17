var ajax = new XMLHttpRequest();
var data = 'function=read';
ajax.open("POST", "model/characters.php", false);

ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ajax.onreadystatechange = function() {
	if (ajax.readyState == 4 && ajax.status == 200) {
		var result = JSON.parse(ajax.responseText);
		console.log(result.length);

		for(i=0;i<result.length;i++){

			//Dynamisch creeren van de slots
			var wrapper = document.createElement('div');
			wrapper.classList.add('slot');

			//Dynamisch creeren van de avatar image
			var avatar = document.createElement('img');
			avatar.src = `img/${result[i]['avatar']}`;
			avatar.classList.add('avatar');

			//Dynamisch creeren van de naam
			var name = document.createElement('h2');
			name.innerText = result[i]['name'];
			name.classList.add('name');

			//Dynamisch creeren van de stats
			var list = document.createElement('ul');

			var lifePoints = document.createElement('li');
			var heart = document.createElement('i');
			heart.classList.add('fas', 'fa-heart');
			var health = document.createTextNode(result[i]['health']);
			lifePoints.appendChild(heart);
			lifePoints.appendChild(health);

			var attackPoints = document.createElement('li');
			var fist = document.createElement('i');
			fist.classList.add('fas', 'fa-fist-raised');
			var attack = document.createTextNode(result[i]['attack']);
			attackPoints.appendChild(fist);
			attackPoints.appendChild(attack);

			var defensePoints = document.createElement('li');
			var shield = document.createElement('i');
			shield.classList.add('fas', 'fa-shield-alt');
			var defense = document.createTextNode(result[i]['defense']);
			defensePoints.appendChild(shield);
			defensePoints.appendChild(defense);

			list.appendChild(lifePoints);
			list.appendChild(attackPoints);
			list.appendChild(defensePoints);

			//Dynamisch creeren van de bekijk knop
			var magnify = document.createElement('i');
			magnify.classList.add('magnify', 'fas', 'fa-search');
			magnify.setAttribute('data-id', result[i]['id']);
			var check = document.createTextNode('Bekijk');
			magnify.appendChild(check);


			wrapper.appendChild(avatar);
			wrapper.appendChild(name);
			wrapper.appendChild(list);
			wrapper.appendChild(magnify);

			document.querySelectorAll("main")[0].appendChild(wrapper);
		}
	}
};

ajax.send(data);