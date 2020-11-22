function populateNavbar(current) {
	nav = document.getElementById('navbar-links');
	navTitle = document.getElementById('navbar-title');
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			navbar = JSON.parse(this.responseText);
			links = navbar.pages;
			out = '';
			for (var i = 0; i < links.length; i++) {
				out += '<li';
				if (links[i]['id'] == current) {
					out += ' class="active"';
				}
				out += '>';
				out += '<a href="'+links[i]["href"]+'">'+links[i]["title"]+'</a>';
				out += '</li>';
			}
			nav.innerHTML = out;
			navTitle.innerHTML = navbar.info.navbar_title;
			navTitle.href = navbar.info.navbar_title_href;
		}
		else {
			nav.innerHTML = ''+
				'<!--<li class="active">'+
				'	<a href="/">Home</a>'+
				'</li>-->'+
				'<li>'+
				'	<a href="/">Home</a>'+
				'</li>'+
				'';
		}
	};
	xhr.open("GET", "/navbar.json", true);
	xhr.send();
}