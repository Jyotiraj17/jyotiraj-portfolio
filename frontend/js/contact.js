/**
 * Jyotiraj Panda — Contact Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', handleContactSubmit);
});

async function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const statusDiv = document.getElementById('formStatus');

  const nameInput = form.querySelector('#contactName');
  const emailInput = form.querySelector('#contactEmail');
  const subjectInput = form.querySelector('#contactSubject');
  const messageInput = form.querySelector('#contactMessage');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
  const message = messageInput.value.trim();

  // Basic Validation
  if (!name || !email || !message) {
    showStatus(statusDiv, 'Please fill in all required fields.', 'error');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showStatus(statusDiv, 'Please enter a valid email address.', 'error');
    return;
  }

  // Button loading state
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="animation: rotateBorder 1s linear infinite;"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
    Sending Message...
  `;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, subject, message })
    });

    const result = await response.json().catch(() => null);

    if (response.ok && result && result.success) {
      // 1. Both Database and Email Notification Succeeded
      showStatus(statusDiv, 'Message sent successfully!', 'success');
      form.reset();
    } else if (result && (result.savedInDb || (result.message && result.message.toLowerCase().includes('saved')))) {
      // 2. Database Succeeded, but Email Notification Failed
      showStatus(statusDiv, 'Your message was received successfully, but email notification is currently unavailable.', 'warning');
      form.reset();
    } else if (result && result.message && !result.savedInDb) {
      // 3. Validation or Specific Failure
      showStatus(statusDiv, result.message, 'error');
    } else {
      // 4. General Server Error
      showStatus(statusDiv, 'Something went wrong. Please try again.', 'error');
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    showStatus(statusDiv, 'Something went wrong. Please try again.', 'error');
  } finally {
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }, 400);
  }
}

function showStatus(elem, text, type) {
  if (!elem) return;
  elem.className = `form-status ${type}`;
  elem.textContent = text;
  elem.style.display = 'block';

  setTimeout(() => {
    elem.style.display = 'none';
  }, 7000);
}
