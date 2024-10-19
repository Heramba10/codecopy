import ClipboardJS from 'clipboard';
import {htmlButton, getSiteStyle} from './util';

// Get button style based on the current page
const siteStyle = getSiteStyle();

// Scan for <pre> elements and <div> elements that might contain code snippets
const snippets = document.querySelectorAll('pre, div');

// Iterate through the snippets and apply logic
snippets.forEach((snippet) => {
  const parent = snippet.parentNode;
  const wrapper = document.createElement('div');

  // Conditional skipping: Apply only to divs with the correct class for code blocks
  if (snippet.tagName === 'DIV') {
    if (!snippet.classList.contains('codeblock') && 
        !snippet.classList.contains('w3-code') && 
        !snippet.classList.contains('notranslate') && 
        !snippet.classList.contains('htmlHigh')&&
        !snippet.classList.contains('ace_content')){
      return; // Skip this div if it doesn't match the required classes
    }
  }

  // Apply wrapping and add the copy button
  parent.replaceChild(wrapper, snippet);
  wrapper.appendChild(snippet);

  wrapper.classList.add('codecopy', `codecopy-${siteStyle}`);
  wrapper.firstChild.insertAdjacentHTML('beforebegin', htmlButton);
});

// Add copy to clipboard functionality and user feedback
const clipboard = new ClipboardJS('.codecopy-btn', {
  target: (trigger) => {
    // Target either <pre> or a div with relevant classes
    return trigger.parentNode.querySelector('pre, div.codeblock, div.w3-code.notranslate.htmlHigh, div.ace_content');
  }
});

clipboard.on('success', (e) => {
  e.trigger.setAttribute('aria-label', 'Copied!');
  e.clearSelection();
});

// Replace tooltip message when mouse leaves button
const btns = document.querySelectorAll('.codecopy-btn');

btns.forEach((btn) => {
  btn.addEventListener('mouseleave', (e) => {
    e.target.setAttribute('aria-label', 'Copy to clipboard');
    e.target.blur();
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
  });
});
