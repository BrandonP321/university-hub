import React, { useEffect, useRef, useState } from "react";
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
    const [areColorsSet, setAreColorsSet] = useState(false);

    useEffect(() => {
        WebColorUtils.setSiteColors(siteColors);
        setAreColorsSet(true);
    }, [])

    return (
        <>
            <RouterPageLoadingSpinner/>
            <main>
                {areColorsSet &&
                    <>
                        <FullPageLoadingSpinner/>
                        {children}
                    </>
                }
            </main>
        </>
    )
}
