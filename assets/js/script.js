// Set current year in footer
document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    initRegistrationFormValidation();
    initContactFormValidation();
});

/**
 * Client-side validation for Registration form.
 * - Required: Full Name, Father's Name, DOB, Mobile, Address, Course
 * - Mobile: exactly 10 digits
 * - Email: basic format check if not empty
 */

const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        nav.classList.toggle("active");
    });

function initRegistrationFormValidation() {
    const form = document.getElementById("registrationForm");
    if (!form) return;

    const messageBox = document.getElementById("registration-message");

    form.addEventListener("submit", function (e) {
        let isValid = true;

        // Clear previous messages
        if (messageBox) {
            messageBox.textContent = "";
            messageBox.className = "form-message";
        }

        // Helper to set error message on given input
        function setError(input, msg) {
            const group = input.closest(".form-group");
            if (!group) return;
            const small = group.querySelector("small.error");
            if (small) {
                small.textContent = msg || "";
            }
            if (msg) {
                isValid = false;
            }
        }

        // Clear all errors first
        const inputs = form.querySelectorAll("input, select, textarea");
        inputs.forEach((input) => setError(input, ""));

        const fullName = form.full_name;
        const fatherName = form.father_name;
        const dob = form.dob;
        const mobile = form.mobile;
        const email = form.email;
        const address = form.address;
        const course = form.course;

        if (!fullName.value.trim()) {
            setError(fullName, "Full name is required.");
        }

        if (!fatherName.value.trim()) {
            setError(fatherName, "Father's name is required.");
        }

        if (!dob.value) {
            setError(dob, "Date of birth is required.");
        }

        const mobileValue = mobile.value.trim();
        if (!mobileValue) {
            setError(mobile, "Mobile number is required.");
        } else if (!/^\d{10}$/.test(mobileValue)) {
            setError(mobile, "Mobile number must be 10 digits.");
        }

        if (!address.value.trim()) {
            setError(address, "Address is required.");
        }

        if (!course.value.trim()) {
            setError(course, "Please select a course.");
        }

        const emailValue = email.value.trim();
        if (emailValue && !/^\S+@\S+\.\S+$/.test(emailValue)) {
            setError(email, "Please enter a valid email address.");
        }

        if (!isValid) {
            e.preventDefault(); // stop submission if any error
            if (messageBox) {
                messageBox.textContent = "Please correct the highlighted errors and try again.";
                messageBox.classList.add("error");
            }
        } else {
            // If valid, allow normal form submission to PHP backend
            if (messageBox) {
                messageBox.textContent = "Submitting your registration...";
                messageBox.classList.add("success");
            }
        }
    });
}

/**
 * Client-side validation for Contact form.
 * Shows a fake "Message sent successfully" without any backend.
 */
function initContactFormValidation() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const messageBox = document.getElementById("contact-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        if (messageBox) {
            messageBox.textContent = "";
            messageBox.className = "form-message";
        }

        function setError(input, msg) {
            const group = input.closest(".form-group");
            if (!group) return;
            const small = group.querySelector("small.error");
            if (small) {
                small.textContent = msg || "";
            }
            if (msg) {
                isValid = false;
            }
        }

        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach((input) => setError(input, ""));

        const name = form.contact_name;
        const email = form.contact_email;
        const msg = form.contact_message;

        if (!name.value.trim()) {
            setError(name, "Name is required.");
        }

        if (!email.value.trim()) {
            setError(email, "Email is required.");
        } else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
            setError(email, "Please enter a valid email.");
        }

        if (!msg.value.trim()) {
            setError(msg, "Message is required.");
        }

        if (!isValid) {
            if (messageBox) {
                messageBox.textContent = "Please fix the errors and try again.";
                messageBox.classList.add("error");
            }
            return;
        }

        // If valid, just show success message (no real sending)
        form.reset();
        if (messageBox) {
            messageBox.textContent = "Message sent successfully! We will get back to you soon.";
            messageBox.classList.add("success");
        }
    });
}
