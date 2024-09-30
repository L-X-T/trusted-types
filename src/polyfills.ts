/***************************************************************************************************
 * Add default trusted type policy with DOMPurify to the global window object
 */
import DOMPurify from 'dompurify';

window.trustedTypes?.createPolicy('default', {
  createHTML: (html: string) => DOMPurify.sanitize(html),
});
