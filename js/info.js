document.querySelectorAll("main")[0].style.display = "flex";
document.querySelectorAll("main")[0].style.padding = "1em";

var back = document.createElement('button');
back.style.width = "5em";
back.style.height = "2em";
back.style.position = "absolute";
back.style.top = "1em";
back.style.left = "1em";

back.addEventListener("click", function(){
	window.location.href = `index.php`;
});

var caret = document.createElement('i');
caret.style.marginRight = "1em";
caret.classList.add('fas', 'fa-caret-left');
caret.style.display = "inline-block";

var backText = document.createElement('p');
backText.innerHTML = "Terug";
backText.style.display = "inline-block";

back.appendChild(caret);
back.appendChild(backText);






document.querySelectorAll("nav")[0].appendChild(back);

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var id = getUrlVars()["id"];

var ajax = new XMLHttpRequest();
var data = `function=select&id=${id}`;
ajax.open("POST", "model/characters.php", false);

ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ajax.onreadystatechange = function() {
	if (ajax.readyState == 4 && ajax.status == 200) {
		var result = JSON.parse(ajax.responseText);
		console.log(result);


		var leftWrapper = document.createElement('div');

			//Dynamisch creeren van de image
			var avatar = document.createElement('img');
			avatar.src = `img/${result[0]['avatar']}`;
			avatar.classList.add('avatar');
			avatar.style.height = "max-content";

			var text = document.createElement('p');
			text.style.fontSize = "1.5em";
			text.style.padding = "1em 0.5em";
			var info = document.createTextNode(result[0]['bio']);

			text.appendChild(info);

			var statBox = document.createElement('div');
			statBox.style.background = `${result[0]['color']}`;
			statBox.style.padding = "1em";
			statBox.style.border = "1px solid black";

			//Dynamisch creeren van de stats
			var list = document.createElement('ul');
			list.style.listStyle = "none";
			list.style.marginBottom = "1em";


			var lifePoints = document.createElement('li');
			var heart = document.createElement('i');
			heart.style.marginRight = "1em";
			heart.classList.add('fas', 'fa-heart');
			var health = document.createTextNode(result[0]['health']);
			lifePoints.appendChild(heart);
			lifePoints.appendChild(health);

			var attackPoints = document.createElement('li');
			var fist = document.createElement('i');
			fist.style.marginRight = "1em";
			fist.classList.add('fas', 'fa-fist-raised');
			var attack = document.createTextNode(result[0]['attack']);
			attackPoints.appendChild(fist);
			attackPoints.appendChild(attack);

			var defensePoints = document.createElement('li');
			var shield = document.createElement('i');
			shield.style.marginRight = "1em";
			shield.classList.add('fas', 'fa-shield-alt');
			var defense = document.createTextNode(result[0]['defense']);
			defensePoints.appendChild(shield);
			defensePoints.appendChild(defense);

			var weapon = document.createElement('p');
			result[0]['weapon'] == null ? weaponText = "None" : weaponText = result[0]['weapon'];
			var weaponTXT = document.createTextNode(`WEAPON: ${weaponText}`);
			weapon.appendChild(weaponTXT);

			var armor = document.createElement('p');

			result[0]['armor'] == null ? armorText = "None" : armorText = result[0]['armor'];
			var armorTXT = document.createTextNode(`ARMOR: ${armorText}`);
			armor.appendChild(armorTXT);

			list.appendChild(lifePoints);
			list.appendChild(attackPoints);
			list.appendChild(defensePoints);

			statBox.appendChild(list);
			statBox.appendChild(weapon);
			statBox.appendChild(armor);

			leftWrapper.appendChild(avatar);
			
			leftWrapper.appendChild(statBox);
document.querySelectorAll("main")[0].appendChild(leftWrapper);
			document.querySelectorAll("main")[0].appendChild(text);
	}
};

ajax.send(data);