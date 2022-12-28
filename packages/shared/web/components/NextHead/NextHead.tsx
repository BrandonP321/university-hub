import Head from "next/head";

export type NextHeadMetaProps = {
    title?: string;
    description?: string;
}

// TODO: Add method for passing in keywords metadata
export type NextHeadProps = NextHeadMetaProps & {
    children?: React.ReactNode[];
    defaults: NextHeadMetaProps;
}

/** HOC that injects meta data directly into `<head>` through the `<Head>` component provided by Next.js */
export default function NextHead(props: NextHeadProps) {
    const { defaults, children, ...rest } = props;

    /** 
     * Combines inputted meta values with default values
     * @param v - inputted values
     * @param d - default values
     */
    const getHeadValues = (v: NextHeadMetaProps, d: NextHeadMetaProps): NextHeadMetaProps => {
        return {
            title: v.title ?? d.title,
            description: v.description ?? d.description
        }
    }

    const values = getHeadValues(rest, defaults);

    return (
        <Head>
            {values.title && <title>{values.title}</title>}
            {values.title && <meta name={"description"} content={values.description} />}

            {children}
        </Head>
    )
}
