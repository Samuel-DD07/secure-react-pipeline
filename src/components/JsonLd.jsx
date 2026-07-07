/**
 * Renders a JSON-LD structured-data <script> tag.
 *
 * The payload is always built from controlled, server-side data (site config
 * and content files) and never from user input, so it is not an XSS vector.
 * Semgrep's react-dangerouslysetinnerhtml rule is therefore suppressed here
 * with a documented justification (triaged false positive).
 */
export default function JsonLd({ data }) {
  const json = JSON.stringify(data);
  // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
