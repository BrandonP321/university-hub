import Head from "next/head";
import styles from "./PageHelmet.module.scss"

// TODO: Add method for passing in keywords metadata
type PageHeadProps = {
    title?: string;
    description?: string;
    children?: React.ReactNode[];
}

/** Injects meta data directly into `<head>` through the `<Head>` component provided by Next.js */
export default function PageHead({ description, title, children }: PageHeadProps) {
    return (
        <Head>
            {title && <title>{title}</title>}
            {description && <meta name={"description"} content={description}/>}

            {children}
        </Head>
    )
}
