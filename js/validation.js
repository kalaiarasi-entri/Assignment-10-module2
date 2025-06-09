document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));

  // Regex patterns
  const nameRegex = /^(?![\d\s]+$)[A-Za-z0-9\s]{3,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

  function validateField(field) {
    let valid = true;
    const value = field.value.trim();

    if (field === fullName) {
      if (!nameRegex.test(value)) {
        field.setCustomValidity('Name must be 3-30 chars, letters/numbers/spaces, and not only numbers.');
        valid = false;
      } else {
        field.setCustomValidity('');
      }
    }

    else if (field === email) {
      if (!emailRegex.test(value)) {
        field.setCustomValidity('Enter a valid email address.');
        valid = false;
      } else {
        field.setCustomValidity('');
      }
    }

    else if (field === password) {
      if (!passwordRegex.test(value)) {
        field.setCustomValidity('Password must be at least 8 characters with letters and numbers.');
        valid = false;
      } else {
        field.setCustomValidity('');
      }
      validateField(confirmPassword); // Re-validate confirmPassword on password change
    }

    else if (field === confirmPassword) {
      if (confirmPassword.value !== password.value) {
        confirmPassword.setCustomValidity('Passwords do not match');
        valid = false;
      } else {
        confirmPassword.setCustomValidity('');
      }
    }

    return valid;
  }

  // Input event listeners
  [fullName, email, password, confirmPassword].forEach(field => {
    field.addEventListener('input', () => {
      validateField(field);

      const isValid = field.checkValidity();
      field.classList.toggle('is-valid', isValid);
      field.classList.toggle('is-invalid', !isValid);

      if (field === password || field === confirmPassword) {
        const confirmValid = confirmPassword.checkValidity();
        confirmPassword.classList.toggle('is-valid', confirmValid);
        confirmPassword.classList.toggle('is-invalid', !confirmValid);
      }
    });
  });

  // Form submit event
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let formIsValid = true;
    [fullName, email, password, confirmPassword].forEach(field => {
      const isValid = validateField(field);
      if (!isValid) formIsValid = false;

      // Update visual feedback
      field.classList.toggle('is-valid', field.checkValidity());
      field.classList.toggle('is-invalid', !field.checkValidity());
    });

    if (!formIsValid || !form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Show success modal
    successModal.show();

    // Reset form
    form.reset();
    form.classList.remove('was-validated');
    [fullName, email, password, confirmPassword].forEach(field => {
      field.classList.remove('is-valid', 'is-invalid');
      field.setCustomValidity('');
    });
  });
});
