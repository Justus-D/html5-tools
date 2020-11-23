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

function checkPrimeForm() {
	var input = document.getElementById('is-prime-input');
	var alert = document.getElementById('is-prime-alert');
	if (bigInt(input.value).isPrime()) {
		alert.innerHTML = 'Die eingegebene Zahl ist eine Primzahl!';
		alert.classList.remove('alert-info');
		alert.classList.remove('alert-danger');
		alert.classList.add('alert-success');
	}
	else {
		alert.innerHTML = 'Die eingegebene Zahl ist keine Primzahl!';
		alert.classList.remove('alert-info');
		alert.classList.remove('alert-success');
		alert.classList.add('alert-danger');
	}
}