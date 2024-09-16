import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Link to the favicon */}
        <link rel="icon" href="/favicon.png" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="Your Website Title" />
        <meta property="og:description" content="A brief description of your website." />
        <meta property="og:image" content="/favicon.png" /> {/* Update to your favicon or other image */}
        <meta property="og:url" content="https://www.yourwebsite.com" />
        <meta property="og:type" content="website" />

        {/* Twitter meta tags (if you want Twitter Cards) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Website Title" />
        <meta name="twitter:description" content="A brief description of your website." />
        <meta name="twitter:image" content="/favicon.png" /> {/* Use the favicon or another image */}

        {/* Optionally, other icons for different devices */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
