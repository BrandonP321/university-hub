type LayoutProps = {
    children: React.ReactNode;
}

/**
 * App layout that persists across all pages
 */
export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <main>{children}</main>
        </>
    )
}
