function isPrime(n) { // Ineffizient, aber ausreichend für diesen Zweck.
	if (typeof n != 'number') {
		return false;
	}
	if (n <= 1) {
		return false;
	}
	for (var i = 2; i < n; i++) {
		if (n % i == 0) {
			return false;
		}
	}
	return true;
}

function genPrime(start, amount) {
	var j = start; // j: current number to check
	var primes = [];
	for (var a = 0; a < amount;j++) {
			console.log(j, a);
		if (isPrime(j)) {
			primes.push(j);
			a++;
		}
	}
	return primes;
}

function genPrimeForm() {
	var start = document.getElementById('prime-gen-start-input').value;
	var amount = document.getElementById('prime-gen-anzahl-input').value;
	var primes = genPrime(Number(start), Number(amount));
	var out = '';
	for (var i = 0; i < primes.length; i++) {
		out += primes[i]+'\n';
	}
	document.getElementById('prime-gen-output').value = out;
}

function checkPQ(pq) {
	help = document.getElementById(''+pq+'-help');
	div = document.getElementById(''+pq+'-div');
	pqVal = document.getElementById(''+pq+'-input').value;
	if (pqVal == '') {
		help.innerHTML = "Gib eine Primzahl ein.";
		div.classList.remove("has-success");
		div.classList.remove("has-warning");
		div.classList.remove("has-error");
		div.classList.add("has-warning");
	}
	else if (isPrime(parseInt(pqVal))) {
		help.innerHTML = pq+" ist eine Primzahl!";
		div.classList.remove("has-success");
		div.classList.remove("has-warning");
		div.classList.remove("has-error");
		div.classList.add("has-success");
	}
	else {
		help.innerHTML = pq+" ist keine Primzahl!";
		div.classList.remove("has-success");
		div.classList.remove("has-warning");
		div.classList.remove("has-error");
		div.classList.add("has-error");
	}
}

function gcd(a, b) {
	if (a == 0) {
		return b;
	}
	return gcd(b % a, a);
}

function phi(n) {
	var result = 1;
	for (i = 2; i < n; i++) {
		if (gcd(i, n) == 1) {
			result++;
		}
	return result;
	}
}
