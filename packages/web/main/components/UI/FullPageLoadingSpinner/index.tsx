import { usePageLoading } from "@/Hooks";
import classNames from "classnames";
import { useEffect } from "react";
import { BrowserUtils } from "utils/BrowserUtils";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./FullPageLoadingSpinner.module.scss";

export default function FullPageLoadingSpinner() {
    const { loading } = usePageLoading();
    // const loading = true;

    useEffect(() => {
        loading ? BrowserUtils.lockScroll() : BrowserUtils.unlockScroll();
    }, [loading])

    return (
        <div className={classNames(styles.wrapper, { [styles.show]: loading })}>
            <LoadingSpinner/>
        </div>
    )
}
