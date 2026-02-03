import { subscribeToNewsletter } from '../api/subscriptionApi.js';
import { showSuccess, showError } from '../utils/notifications.js';

const footerForm = document.getElementById('subscribeForm');
const footerEmail = document.getElementById('subscribeEmail');

export function initFooter() {
  if (!footerForm) return;

  footerForm.addEventListener('submit', handleSubscription);
}

async function handleSubscription(e) {
  e.preventDefault();

  const email = footerEmail.value.trim();

  if (!email) {
    showError('Please enter a valid email address.');
    return;
  }

  try {
    const response = await subscribeToNewsletter(email);
    
    showSuccess(response.message || 'We’re excited to have you on board!');
    footerForm.reset();
    
  } catch (error) {
    showError(error.message || 'Something went wrong.');
  }
}