
// Exercise 6
function validate(e) {

	e.preventDefault();
	let error = 0;

	// Get the input fields
	var fName = document.getElementById("fName").value;
	var fLastN = document.getElementById("fLastN").value;
	var fEmail = document.getElementById("fEmail").value;
	var fPassword = document.getElementById("fPassword").value;
	var fPhone = document.getElementById("fPhone").value;
	var fAddress = document.getElementById("fAddress").value;

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorLastN = document.getElementById("errorLastN");
	var errorEmail = document.getElementById("errorEmail");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");
	var errorAddress = document.getElementById("errorAddress");

	// Validate fields entered by the user: name, phone, password, and email
	if (!checkWord(fName) || fName.length < 3) {
		errorName.style.display = 'block'
		error++;
	} else errorName.style.display = 'none';

	if (!checkWord(fLastN) || fLastN.length < 3) {
		errorLastN.style.display = 'block'
		error++;
	} else errorLastN.style.display = 'none';

	if (!fEmail.includes('@') || fEmail.length < 3) {
		errorEmail.style.display = 'block'
		error++;
	} else errorEmail.style.display = 'none';

	if (!checkPassword(fPassword) || fPassword.length < 4 || fPassword.length > 8) {
		errorPassword.style.display = 'block'
		error++;
	} else errorPassword.style.display = 'none';

	if (fPhone.length !== 9 || isNaN(fPhone)) {
		errorPhone.style.display = 'block'
		error++;
	} else errorPhone.style.display = 'none';

	if (fAddress.length < 3) {
		errorAddress.style.display = 'block'
		error++;
	} else errorAddress.style.display = 'none';

	if (error > 0) {
		alert("Make sure all camps are filled correctly");
	} else {
		alert("Form submitted");
		document.querySelector('form').submit();
	}

}

function checkWord(string) { // checks if char is letter or not. if not return false
	for (let char of string) {
		if (!char.match(/[A-Za-z]/)) return false;
	}
	return string.length > 0; // makes sure string is not empty
}

function checkPassword(string) {
	for (let char of string) {
		if (!char.match(/[A-Za-z0-9]/)) return false;
	}
	return string.length > 0;
}
