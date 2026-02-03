import { fetchQuote } from '../api/quoteApi.js';

const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const LS_KEY_QUOTE = 'quoteData';
const LS_KEY_DATE = 'quoteDate';

export async function initQuote() {
  if (!quoteText || !quoteAuthor) return;

  const today = new Date().toDateString();
  const savedDate = localStorage.getItem(LS_KEY_DATE);
  const savedQuoteData = localStorage.getItem(LS_KEY_QUOTE);

  if (savedDate === today && savedQuoteData) {
    try {
      renderQuote(JSON.parse(savedQuoteData));
      return;
    } catch (err) { console.error(err); }
  }

  const data = await fetchQuote();
  if (data) {
    localStorage.setItem(LS_KEY_QUOTE, JSON.stringify(data));
    localStorage.setItem(LS_KEY_DATE, today);
    renderQuote(data);
  }
}

function renderQuote({ author, quote }) {
  quoteText.textContent = quote;
  quoteAuthor.textContent = author;
}