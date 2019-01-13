import React from "react";
import Helmet from "react-helmet";
import { handleClientStateChange } from "react-helmet/lib/HelmetUtils";
import urljoin from "url-join";
import slugify from "slugify";
import striptags from "striptags";
import last from "lodash/last";
import defaultOgImage from "./Brand/og-image.png";

export default ({
    title = "RockXXL",
    titleTemplate = "%s | RockXXL",
    description = "RockXXL is een organisatie die zich bezighoudt als webzine/blog alsook met de rock- en metalwereld in het algemeen (met een knipoog naar België in het bijzonder!). We hebben als organisatie het doel om vooral kleinere, Belgische bands in de kijker te zetten d.m.v. reviews, interviews, live verslagen, shows… Uiteraard blijven we niet alleen bij de kleinere undergroundbands maar krijgen ook de gevestigde waarden de aandacht die ze verdienen.",
    image: imageProp,
    slug = "/",
    category,
    pageType,
}) => {
    const siteUrl = process.env.GATSBY_APP_URL;
    const slugifyConfig = { lower: true };
    const image = imageProp ? imageProp.includes("http") ? imageProp : urljoin(siteUrl, imageProp) : defaultOgImage; // eslint-disable-line no-nested-ternary
    const url = urljoin(siteUrl, slug);

    const schemaOrg = [
        {
            "@context": "http://schema.org",
            "@type": "WebSite",
            url: urljoin(siteUrl),
            name: "RockXXL",
        },
        {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                ...(category ? {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                        "@id": slugify(category, slugifyConfig),
                        name: category,
                        image,
                    },
                } : []),
                {
                    "@type": "ListItem",
                    position: category ? 2 : 1,
                    item: {
                        "@id": url,
                        name: title,
                        image,
                    },
                },
            ],
        },
        ...(pageType === "post" ? {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url: urljoin(siteUrl),
            name: title,
            headline: title,
            image: {
                "@type": "ImageObject",
                url: image,
            },
            description,
        } : []),

    ];


    const trackHelmetChanges = ({ scriptTags, ...newState }) => {
        if (scriptTags && scriptTags.length > 1) {
            const JSONLD_TYPE = "application/ld+json";
            const jsonLDTags = scriptTags.filter(sTag => sTag.type === JSONLD_TYPE);

            if (jsonLDTags.length) {
                handleClientStateChange({
                    ...newState,
                    scriptTags: [
                        ...scriptTags.filter(sTag => sTag.type !== JSONLD_TYPE),
                        ...last(jsonLDTags),
                    ],
                });
            }
        }
    };

    const cleanedDescription = striptags(description).substring(0, 300);

    return (
        <Helmet
            title={title}
            titleTemplate={titleTemplate}
            onChangeClientState={trackHelmetChanges}
            meta={[
                {
                    httpEquiv: "Accept-CH",
                    content: "DPR, Viewport-Width, Width",
                },
                { name: "description", content: cleanedDescription },
                { name: "image", content: image },

                // Open graph
                { property: "og:locale", content: "nl_BE" },
                { property: "og:url", content: url },
                { property: "og:site_name", content: "RockXXL" },
                { property: "og:image", content: image },
                { property: "og:image:width", content: 1200 },
                { property: "og:image:height", content: 630 },
                { property: "og:type", content: "article" },

                // Twitter card tags
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:creator", content: "@rockxxl" },
                { name: "twitter:title", content: title },
                { name: "twitter:description", content: cleanedDescription },
                { name: "twitter:image", content: image },
            ]}
        >
            <html lang="nl" />

            {/* Schema.org tags */}
            <script type="application/ld+json">
                {JSON.stringify(schemaOrg)}
            </script>
        </Helmet>
    );
};
