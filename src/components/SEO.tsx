import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

export default function SEO({ 
  title = "Shravan Sriram | AI Strategist & Builder", 
  description = "Portfolio of Shravan Sriram, AI Strategist at Google. Specializing in 0-to-1 product lifecycles, automated workflows, and RAG with vibe coding.",
  canonical = "https://www.shravansriram.com/",
  ogType = "website",
  ogImage = "https://www.shravansriram.com/og-image.png"
}: SEOProps) {
  const fullTitle = title.includes("Shravan Sriram") ? title : `${title} | Shravan Sriram`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
