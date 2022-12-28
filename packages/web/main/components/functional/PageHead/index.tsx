import NextHead, { NextHeadMetaProps } from "@university-hub/shared/web/components/NextHead/NextHead"

type PageHeadProps = NextHeadMetaProps & {
    children?: React.ReactNode[];
}

/** Injects meta data directly into `<head>` through `<NextHead>` */
export default function PageHead(props: PageHeadProps) {
    const { children, ...rest } = props;

    const defaults: NextHeadMetaProps = {
        title: "Default Title",
        description: "Default description"
    }

    return (
        <NextHead {...rest} defaults={defaults}>
            {children}
        </NextHead>
    )
}
