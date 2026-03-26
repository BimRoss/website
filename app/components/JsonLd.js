/**
 * Server-rendered JSON-LD. Prefer this over next/script for schema so the literal
 * <script type="application/ld+json"> appears in the initial HTML response.
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
