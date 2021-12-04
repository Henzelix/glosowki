import Head from "next/head";

export default function Metatags({ title, description, keywords, author }) {
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            
            <link rel="mask-icon" color="#f5dd00" />
            <meta name="msapplication-TileColor" content="#f5dd00" />
            <meta name="theme-color" content="#f5dd00" />

            <meta name="description" content="Serwis umożliwiający udostępnianie wiadomości głosowych nagranych przez uczniów 3B" />
            <meta name="keywords" content="głosówki, śmieszne, głosówki 3b, wielke jajca" />
            <meta name="author" content="Mikołaj Henzel" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="/500x500.png" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="/500x500.png" /> */}
        </Head>
    )
}
