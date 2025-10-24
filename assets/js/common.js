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

  const thankYouMessage = document.createElement('p');
  thankYouMessage.textContent = "Thank you! Your form has been submitted successfully.";
  thankYouMessage.style.display = "none";
  thankYouMessage.style.color = "#008000";
  thankYouMessage.style.fontSize = "20px";
  thankYouMessage.style.marginTop = "10px";
  thankYouMessage.style.textAlign = "center";
  form.parentElement.appendChild(thankYouMessage); // append outside the form

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    inputs.forEach(input => {
      const value = input.value.trim();
      const placeholder = input.getAttribute('placeholder').toLowerCase();
      input.style.borderColor = '#7f7f7f'; // reset

      if (!value) {
        input.style.borderColor = 'red';
        valid = false;
        return;
      }

      if (placeholder.includes('name') && !/^[A-Za-z\s]+$/.test(value)) valid = false;
      if (placeholder.includes('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) valid = false;
      if ((placeholder.includes('mob') || placeholder.includes('phone')) && !/^\d{10}$/.test(value)) valid = false;
    });

    if (checkbox && !checkbox.checked) {
      checkbox.parentElement.style.color = 'red';
      valid = false;
    }

    if (valid) {
      // Hide the form
      form.style.display = "none";

      // Show thank you message
      thankYouMessage.style.display = "block";
    }
  });
});





