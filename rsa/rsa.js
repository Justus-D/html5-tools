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

var rsa_p = 0;
var rsa_q = 0;
var p = 0;
var q = 0;
var n = 0;
var a = 0;
var e = 0;

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
		if ((pq == 'p' && pqVal == q) || pq == 'q' && pqVal == p) {
			help.innerHTML = "p und q d&uuml;rfen nicht gleich sein!";
			div.classList.remove("has-success");
			div.classList.remove("has-warning");
			div.classList.remove("has-error");
			div.classList.add("has-error");
		}
		else {
			help.innerHTML = pq+" ist eine Primzahl!";
			div.classList.remove("has-success");
			div.classList.remove("has-warning");
			div.classList.remove("has-error");
			div.classList.add("has-success");
			if (pq == "p") {
				p = pqVal;
			}
			if (pq == "q") {
				q = pqVal;
			}
			populateP();
			populateQ();
		}
	}
	else {
		help.innerHTML = pq+" ist keine Primzahl!";
		div.classList.remove("has-success");
		div.classList.remove("has-warning");
		div.classList.remove("has-error");
		div.classList.add("has-error");
	}
}
checkPQ('p');
checkPQ('q');

function populateP() {
	document.getElementById('s2-p').value = p;
	document.getElementById('s3-p').value = p;
	document.getElementById('s4-p').value = p;
}

function populateQ() {
	document.getElementById('s2-q').value = q;
	document.getElementById('s3-q').value = q;
	document.getElementById('s4-q').value = q;
}

function populateA() {
	document.getElementById('s4-d-a').value = a;
}

function populateE() {
	document.getElementById('s4-e').value = e;
}

/*function populateN() {
	document.getElementById('').value = n;
}*/

document.getElementById('p-input').addEventListener("change", function() {
	checkPQ('p');
});
document.getElementById('q-input').addEventListener("change", function() {
	checkPQ('q');
});

function calcN(tp, tq) {
/*	s2p = document.getElementById('s2-p');
	s2p.value = p;

	s2q = document.getElementById('s2-q');
	s2q.value = q;
*/
	s2n = document.getElementById('s2-n');
	n = tp * tq;
	return n;
	//s2n.value = n;
}

function formCalcN() {
	document.getElementById('s2-n').value = calcN(Number(document.getElementById('s2-p').value), Number(document.getElementById('s2-q').value));
}

function ggT(a, b) {
	if (a == 0) {
		return b;
	}
	return ggT(b % a, a);
}

function phi(n) {
	var result = 1;
	for (i = 2; i < n; i++) {
		if (ggT(i, n) == 1) {
			result++;
		}
	return result;
	}
}

function calcDold(tp, tq) {
	var te;
	if (tp > tq) {
		te = genPrime(tp+1, 1)[0];
	}
	else {
		te = genPrime(tq+1, 1)[0];
	}
	var ta = (tp-1)*(tq-1);
	//te = genPrime(tpr+1, 1)[0];
	var td;
	for (var d = 1; !((te*d % ta) == 1); d++) {
		td = d;
	}
	return td;
}

function calcE(tp, tq, te = 2) { // temporär p und temporär q optional startpunkt für e
	var ta = (tp-1)*(tq-1);
	//var te = 1;
	while (ggT(te, ta) != 1) {
		te++;
	}
	e = te;
	return te;
}

function calcD(te, ta, td = 0) {
	//var td;
	while ((te*td % ta) != 1) {
		td++;
	}
	return td;
}

function calcA(tp, tq) {
	a = (tp-1)*(tq-1);
	return a;
}

function formCalcA() {
	document.getElementById('s4-a').value = calcA(Number(document.getElementById('s4-p').value), Number(document.getElementById('s4-q').value));
	populateA();
}

function formCalcE() {
	document.getElementById('s3-e').value = calcE(Number(document.getElementById('s3-p').value), Number(document.getElementById('s3-q').value), Number(document.getElementById('s3-start').value));
	populateE();
}

function formCalcD() {
	document.getElementById('s4-d').value = calcD(Number(document.getElementById('s4-e').value), Number(document.getElementById('s4-d-a').value));
}

function enc(e, N, klar) {
	return (klar**e) % N;
}

function bigEnc(e, N, klar) {
	return bigInt(klar).pow(e).mod(N);
}

function formEnc() {
	document.getElementById('enc-geheim').value = enc(document.getElementById('enc-e').value, document.getElementById('enc-n').value, document.getElementById('enc-klar').value);
}

function dec(d, N, geheim) {
	return (geheim**d) % N;
}

function bigDec(d, N, geheim) {
	return bigInt(geheim).pow(d).mod(N).toString();
}

function formDec() {
	document.getElementById('dec-klar').value = dec(document.getElementById('dec-d').value, document.getElementById('dec-n').value, document.getElementById('dec-geheim').value);
}
