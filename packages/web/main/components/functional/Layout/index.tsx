import FullPageLoadingSpinner from "@/UIComponents/FullPageLoadingSpinner";
import React from "react";
import { RouterPageLoadingSpinner } from "@university-hub/shared/web/components/PageLoadingSpinner";

type LayoutProps = {
    children: React.ReactNode;
}

/**
 * App layout that persists across all pages
 */
export default function Layout({ children }: LayoutProps) {

    return (
        <>
            <FullPageLoadingSpinner/>
            <RouterPageLoadingSpinner/>
            <main>{children}</main>
        </>
    )
}
