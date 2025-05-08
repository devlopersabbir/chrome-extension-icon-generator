import type { Metadata } from "next";

export const websiteMetaData: Metadata = {
  title:
    "Browser Extension Icon Generator | Create Icons for Chrome & Firefox Extensions",
  description:
    "Generate perfectly sized icons for your browser extensions in seconds. Upload, resize, and download all required icon sizes for Chrome, Firefox, and other browsers with this free online tool.",
  keywords:
    "browser extension, chrome extension, firefox extension, icon generator, browser addon, icon resizer, manifest.json, extension development, web development tools",
  authors: [
    { name: "Sabbir Hossain Shuvo", url: "https://devlopersabbir.github.io" },
  ],
  creator: "Sabbir Hossain Shuvo",
  publisher: "Sabbir Hossain Shuvo",
  openGraph: {
    type: "website",
    url: "https://browser-extension-icon-generator.vercel.app/",
    title:
      "Browser Extension Icon Generator | Create Icons for Chrome & Firefox Extensions",
    description:
      "Generate perfectly sized icons for browser extensions in seconds. Free online tool to resize and download all required icon sizes for Chrome, Firefox, and other browsers.",
    images: [
      {
        url: "https://raw.githubusercontent.com/devlopersabbir/chrome-extension-icon-generator/main/public/preview.png",
        width: 1200,
        height: 630,
        alt: "Browser Extension Icon Generator Preview",
      },
    ],
    siteName: "Browser Extension Icon Generator",
  },
  twitter: {
    card: "summary_large_image",
    site: "@thatsabbir",
    creator: "@thatsabbir",
    title:
      "Browser Extension Icon Generator | Create Icons for Chrome & Firefox Extensions",
    description:
      "Generate perfectly sized icons for browser extensions in seconds. Free online tool to resize and download all required icon sizes for Chrome, Firefox, and other browsers.",
    images: [
      "https://raw.githubusercontent.com/devlopersabbir/chrome-extension-icon-generator/main/public/preview.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://browser-extension-icon-generator.vercel.app/",
  },
  metadataBase: new URL("https://browser-extension-icon-generator.vercel.app"),
};
