const nameField = document.querySelector('#name');
const jobRole = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');


// Name input field set to a focused state when page first loads
nameField.focus();
// Hides the 'Other' input field for job role
otherJobRole.style.display = 'none';


/*	Listens for a selection or change for 'Job Role' drop down box
	and displays the 'Other' input field if 'Other' is selected as the Job Role
*/
jobRole.addEventListener('change', (event) => {
	const other = event.target.value;
	if (other === 'other') {
		otherJobRole.style.display = '';
	} else {
		otherJobRole.style.display = 'none';
	}
});


// T - SHIRT INFO SECTION
const design = document.querySelector('#design');
const color = document.querySelector('#color');
const colorOptions = color.children;

// prevents user from selecting a color until they have chosen a design
color.disabled = true;

/*	Listens for a selection or change for the 'Design' drop down box
	Based on what the user selects for the Design will determine what color
	options are available
*/
design.addEventListener('change', (event) => {
	color.disabled = false;
	const colorsValue = event.target.value;
	for (let i = 0; i < colorOptions.length; i++) {
		let options = colorOptions[i];
		let shirtTheme = options.getAttribute('data-theme');
		if (colorsValue === shirtTheme) {
			options.hidden = false;
			options.selected = true;
		} else {
			options.hidden = true;
			options.selected = false;
		}
	}
});


// REGISTRATION SECTION
const register = document.querySelector('#activities');
const total = document.querySelector('#activities-cost');
let totalCost = 0;

/*	Listens for a selection or change on the 'Register for Activities' section
	The total cost will change based on what activities the user selects or deselects
*/
register.addEventListener('change', (event) => {
	const data = event.target
	const dataCost = +data.getAttribute('data-cost');
	const isChecked = event.target.checked;

	if (isChecked) {
		totalCost += dataCost;
	} else {
		totalCost -= dataCost;
	}
	total.innerHTML = 
	`<p>Total: $${totalCost}</p>`;
});



// PAYMENT SECTION
const payment = document.querySelector('#payment');
const credit = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
let preferredPayment = document.querySelector('#payment :nth-child(2)');

/*	Hides the paypal and bitcoin options initially and sets the preferred
	payment method as 'Credit Card'
*/
paypal.hidden = true;
bitcoin.hidden = true;
preferredPayment.selected = true;

/*	Listens for a selection or change for payment method
	and displays the appropriate payment section and hides the others
*/
payment.addEventListener('change', (event) => {
	let paymentMethod = event.target.value;
	if (paymentMethod === 'paypal') {
		paypal.hidden = false;
		credit.hidden = true;
		bitcoin.hidden = true;
	} else if (paymentMethod === 'bitcoin') {
		bitcoin.hidden = false;
		paypal.hidden = true;
		credit.hidden = true;
	} else {
		credit.hidden = false;
		paypal.hidden = true;
		bitcoin.hidden = true;
	}
});


// FORM VALIDATION
const email = document.querySelector('#email');
const cardNumber = document.querySelector('#cc-num');
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const form = document.querySelector('form');
const activitySection = document.querySelector('#activities-box');
const hint = document.querySelectorAll('.hint');

// ACTIVITIES SECTION

// Listens for when each activity is in focus and adds or removes the focus class accordingly
const activity = document.querySelectorAll('input[type="checkbox"]');
for (let i = 0; i < activity.length; i++) {
	activity[i].addEventListener('focus', (event) => {
		event.target.parentElement.classList.add('focus');
	});
	activity[i].addEventListener('blur', (event) => {
		event.target.parentElement.classList.remove('focus');
	});
};


/*	If a required section is valid the 'valid' class will be added
	and the other class will be removed, and the error will be hidden
*/
function validationPass(element) {
	element.parentElement.classList.add('valid');
  	element.parentElement.classList.remove('not-valid');
  	for (let i = 0; i < hint.length; i++) {
  		hint[i].style.display = 'none';
  	}
};
/*	If the required field is not valid the 'not-valid' class will
	be added and the other class removed, and the error will show
*/
function validationFail(element) {
  element.parentElement.classList.add('not-valid');
  element.parentElement.classList.remove('valid');
  for (let i = 0; i < hint.length; i++) {
  		hint[i].style.display = 'block';
  	}
};


// functions to hold the requirements for the appropriate inputs for:
// name, email, credit card info, and activities
function isValidName() {
	let nameInput = nameField.value;
	const validName = /^[A-Za-z]+$/.test(nameInput);
	if (validName === true) {
		validationPass(nameField);
	} else {
		validationFail(nameField);
	}
	return validName;
};
function isValidEmail() {
	let emailInput = email.value;
	const validEmail = /^[^@]+@[^@.]+\.[a-z]+$/.test(emailInput);
	if (validEmail === true) {
		validationPass(email);
	} else {
		validationFail(email);
	}
	return validEmail;
};
function isValidCardNumber() {
	let cardInput = cardNumber.value;
	const validCardNumber = /^[0-9]{13,16}$/.test(cardInput);
	if (validCardNumber === true) {
		validationPass(cardNumber);
	} else {
		validationFail(cardNumber);
	}
	return validCardNumber;
};
function isValidZip() {
	let zipCodeInput = zipCode.value;
	const validZip = /^[0-9]{5}$/.test(zipCodeInput);
	if (validZip === true) {
		validationPass(zipCode);
	} else {
		validationFail(zipCode);
	}
	return validZip;
};
function isValidCVV() {
	let cvvInput = cvv.value;
	const validCVV = /^[0-9]{3}$/.test(cvvInput);
	if (validCVV === true) {
		validationPass(cvv);
	} else {
		validationFail(cvv);
	}
	return validCVV;
};
function activitiesValid() {
	if (totalCost > 0) {
		validationPass(activitySection);
	} else {
		validationFail(activitySection);
	}
	return totalCost;
};



/*	Listens for submission of the form
	And prevents the form from submitting if any of the required fields
	are missing or filled out incorrectly
*/
form.addEventListener('submit', (event) => {
	if (!isValidName()) {
		event.preventDefault();
	}
	if (!isValidEmail()) {
		event.preventDefault();
	}
	if (!isValidCardNumber()) {
		event.preventDefault();
	}
	if (!isValidZip()) {
		event.preventDefault();
	}
	if (!isValidCVV()) {
		event.preventDefault();
	}
	if (!activitiesValid()) {
		event.preventDefault();
	}
});

