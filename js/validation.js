document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('signupForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const successModal = new bootstrap.Modal(document.getElementById('successModal'));

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate Full Name: allow letters and spaces only
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!nameRegex.test(fullName.value.trim())) {
      fullName.setCustomValidity('Name must contain only letters and spaces.');
    } else {
      fullName.setCustomValidity('');
    }

    // Validate password match
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords do not match');
    } else {
      confirmPassword.setCustomValidity('');
    }

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Show success modal
    successModal.show();

    // Reset form
    form.reset();
    form.classList.remove('was-validated');

    // Optional cleanup
    const elements = form.querySelectorAll('.form-control');
    elements.forEach(el => el.classList.remove('is-invalid', 'is-valid'));
  });
});
