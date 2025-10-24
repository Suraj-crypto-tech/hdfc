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
  const formBox = document.querySelector('.form-box');
  if (!formBox) return;

  const form = formBox.querySelector('form') || formBox; // Support both <form> or div wrapper
  const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"]'));
  const checkbox = form.querySelector('input[type="checkbox"]');
  const submitBtn = form.querySelector('button');

  const thankYouMessage = document.createElement('p');
  thankYouMessage.textContent = "Thank you! Your form has been submitted successfully.";
  thankYouMessage.style.display = "none";
  thankYouMessage.style.color = "#008000";
  thankYouMessage.style.fontSize = "20px";
  thankYouMessage.style.marginTop = "10px";
  thankYouMessage.style.textAlign = "center";
  form.appendChild(thankYouMessage);

  submitBtn.addEventListener('click', function (e) {
    e.preventDefault(); 
    let valid = true;

    inputs.forEach(input => {
      const value = input.value.trim();
      const placeholder = input.getAttribute('placeholder').toLowerCase();
      input.style.borderColor = '#7f7f7f'; 

      if (placeholder.includes('name')) {
        if (!/^[A-Za-z\s]+$/.test(value)) {
          input.style.borderColor = 'red';
          valid = false;
        }
      }

       if (placeholder.includes('email')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          input.style.borderColor = 'red';
          valid = false;
        }
      }

      if (placeholder.includes('mob') || placeholder.includes('phone')) {
        if (!/^\d{10}$/.test(value)) {
          input.style.borderColor = 'red';
          valid = false;
        }
      }

      if (placeholder.includes('dob') && !value) {
        input.style.borderColor = 'red';
        valid = false;
      }

      if (placeholder.includes('city') || placeholder.includes('state')) {
        if (!/^[A-Za-z\s]+$/.test(value)) {
          input.style.borderColor = 'red';
          valid = false;
        }
      }
    });

    if (checkbox && !checkbox.checked) {
      alert("Please accept Terms & Conditions");
      valid = false;
    }

    if (valid) {
      thankYouMessage.style.display = "block";

      
      inputs.forEach(input => (input.value = ''));
      if (checkbox) checkbox.checked = false;

      
      setTimeout(() => {
        thankYouMessage.style.display = "none";
      }, 4000);

    }
  });

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', function () {
      item.classList.toggle('active');
      const answer = item.querySelector('p');
      if (answer) {
        answer.style.display = item.classList.contains('active') ? 'block' : 'none';
      }
    });
  });
});




