function validateForm() {
    // Get form values
    var name = document.forms["userForm"]["name"].value.trim();
    var address = document.forms["userForm"]["address"].value.trim();
    var phone = document.forms["userForm"]["phone"].value.trim();
    var email = document.forms["userForm"]["email"].value.trim();
    var birthdate = document.forms["userForm"]["birthdate"].value;
    var message = document.forms["userForm"]["message"].value.trim();
    var captcha = document.forms["userForm"]["captcha"].value.trim();

    // Name validation (at least 2 parts: first and last)
    if (name === "" || name.split(" ").length < 2) {
        alert("Please enter both first and last names.");
        return false;
    }

    // Address validation (basic check for non-empty)
    if (address === "") {
        alert("Please enter a valid address.");
        return false;
    }

    // Phone number validation (must be exactly 10 digits)
    var phonePattern = /^\d{10}$/;
    if (!phone.match(phonePattern)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    // Email validation (simple pattern check)
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Birthdate validation (cannot be in the future)
    var today = new Date();
    var enteredDate = new Date(birthdate);
    if (enteredDate >= today) {
        alert("Please enter a valid birth date that is not in the future.");
        return false;
    }

    // Message validation (non-empty)
    if (message === "") {
        alert("Please enter a message.");
        return false;
    }

    // CAPTCHA validation (check against 'Biden')
    if (captcha.toLowerCase() !== "biden") { // Example check
        alert("Incorrect answer to the security question.");
        return false;
    }

    // Confirm with the user before submission
    return confirm(
        "Please confirm your details:\n" +
        "Name: " + name + "\n" +
        "Address: " + address + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + email + "\n" +
        "Birthdate: " + birthdate + "\n" +
        "Message: " + message + "\n" +
        "Security Answer: " + captcha
    );
}
