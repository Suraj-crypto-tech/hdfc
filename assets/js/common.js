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
  const form = document.querySelector('.form-box form');
  if (!form) return;

  const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"]'));
  const checkbox = form.querySelector('input[type="checkbox"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Reset border colors
    inputs.forEach(input => input.style.borderColor = '#7f7f7f');
    if (checkbox) checkbox.parentElement.style.color = '#000'; // reset checkbox color

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
      // Hide the form
      form.style.display = "none";

      // Get First Name
      const firstNameInput = form.querySelector('input[placeholder="First Name"]');
      const firstName = firstNameInput ? firstNameInput.value.trim() : '';

      // Create personalized thank-you message
      const thankYouMessage = document.createElement('p');
      thankYouMessage.innerHTML = `Dear ${firstName},<br>Thank you! Your form has been submitted successfully.`;
      thankYouMessage.style.color = "#008000";
      thankYouMessage.style.fontSize = "20px";
      thankYouMessage.style.marginTop = "10px";
      thankYouMessage.style.textAlign = "center";

      // Append the message below the form
      form.parentElement.appendChild(thankYouMessage);
    }
  });

  // ===== Accordion / FAQ functionality =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const answer = item.querySelector('p');
    if (answer) answer.style.display = 'none'; // hide initially

    item.addEventListener('click', function () {
      item.classList.toggle('active');
      if (answer) {
        answer.style.display = item.classList.contains('active') ? 'block' : 'none';
      }
    });
  });
});





