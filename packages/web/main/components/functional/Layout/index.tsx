import React, { useEffect, useRef } from "react";
import { FullPageLoadingSpinner } from "@university-hub/shared/web/UIKit";
import { RouterPageLoadingSpinner } from "@university-hub/shared/web/components/PageLoadingSpinner";
import { SiteColorsMap } from "@university-hub/shared/common/utils";
import { WebColorUtils } from "@university-hub/shared/web/utils";

type LayoutProps = {
    children: React.ReactNode;
    siteColors: SiteColorsMap;
}

/**
 * App layout that persists across all pages
 */
export default function Layout({ children, siteColors }: LayoutProps) {
    WebColorUtils.setSiteColors(siteColors);

    return (
        <>
            <RouterPageLoadingSpinner/>
            <main>
                <FullPageLoadingSpinner/>
                {children}
            </main>
        </>
    )
}
