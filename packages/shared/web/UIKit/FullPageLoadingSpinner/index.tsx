import { usePageLoading } from "../../store/hooks";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { BrowserUtils } from "@university-hub/shared/web/utils"
import { LoadingSpinner } from "../LoadingSpinner";
import styles from "./FullPageLoadingSpinner.module.scss";

export function FullPageLoadingSpinner() {
    const { loading } = usePageLoading();
    /** For some reason, having the state that triggers showing/hiding the spinner helps avoid UI color glitches */
    const [show, setShow] = useState(true);

    useEffect(() => {
        loading ? BrowserUtils.lockScroll() : BrowserUtils.unlockScroll();
        
        setShow(loading);
    }, [loading])

    return (
        <div className={classNames(styles.wrapper, { [styles.show]: show })}>
            <LoadingSpinner/>
        </div>
    )
}


