// !function ($) {
//     'use strict';

//     // write code here
//     const $body = $('body');

//     let oldScroll = 0;

//     $('html').removeClass('no-js');

//     $body.on('click', '.btn-menu', function (e) {
//         $body.toggleClass('menu-open');
//     });

//     $body.on('click', '.close-nav', function (e) {
//         $body.removeClass('menu-open');
//     });

//     document.addEventListener('scroll', e => {
//         var wTop = document.documentElement.scrollTop || document.body.scrollTop;

//         //up
//         if (wTop <= 0 || wTop < oldScroll) {
//             $body.removeClass('hideHeader');
//         } else {
//             $body.addClass('hideHeader');
//         }

//         oldScroll = wTop;
//     }, { passive: true });
// }.call(window, window.jQuery);

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form-box form') || document.querySelector('.form-box');
  if (!form) return;

  const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"]'));
  const checkbox = form.querySelector('input[type="checkbox"]');
  const submitBtn = form.querySelector('button');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Reset border colors
    inputs.forEach(input => input.style.borderColor = '#7f7f7f');

    // Validate inputs
    inputs.forEach(input => {
      const value = input.value.trim();
      const placeholder = input.getAttribute('placeholder').toLowerCase();

      if (!value) {
        input.style.borderColor = 'red';
        valid = false;
        return;
      }

      if (placeholder.includes('name') && !/^[A-Za-z\s]+$/.test(value)) input.style.borderColor = 'red';
      if (placeholder.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) input.style.borderColor = 'red';
      if ((placeholder.includes('mob') || placeholder.includes('phone')) && !/^\d{10}$/.test(value)) input.style.borderColor = 'red';
    });

    // Checkbox validation
    if (checkbox && !checkbox.checked) {
      checkbox.parentElement.style.color = 'red';
      valid = false;
    }

    if (valid) {
      // Hide all inputs except First Name
      inputs.forEach(input => {
        if (!input.placeholder.toLowerCase().includes('first name')) {
          input.parentElement.style.display = 'none';
        }
      });
      if (checkbox) checkbox.parentElement.style.display = 'none';
      if (submitBtn) submitBtn.style.display = 'none';

      // Get First Name value
      const firstNameInput = form.querySelector('input[placeholder="First Name"]');
      const firstName = firstNameInput ? firstNameInput.value.trim() : '';

      // Create thank you message
      const thankYouMessage = document.createElement('p');
      thankYouMessage.innerHTML = `Dear ${firstName},<br>Thank you! Your form has been submitted successfully.`;
      thankYouMessage.style.color = "#008000";
      thankYouMessage.style.fontSize = "18px";
      thankYouMessage.style.marginTop = "5px";

      // Insert below First Name input
      firstNameInput.parentNode.insertBefore(thankYouMessage, firstNameInput.nextSibling);
    }
  });
});






