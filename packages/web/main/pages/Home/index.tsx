import PageHead from "@/Components/PageHead"
import { setShowPageSpinner } from "@/Features/pageLoading/pageLoading";
import { useAppDispatch, usePageLoading } from "@/Hooks"
import Link from "next/link"
import styles from "./Home.module.scss"
import { RegexUtils } from "@/Shared/utils/RegexUtils"

export default function Home() {
    const dispatch = useAppDispatch();
    const { loading } = usePageLoading();

    console.log(RegexUtils.emailRegex);

    const handleClick = () => {
        dispatch(setShowPageSpinner({loading: !loading}));

        setTimeout(() => {
            dispatch(setShowPageSpinner({loading}))
        }, 1500)
    }

    return (
        <div>
            <PageHead title={"Home"} />
            <h1>Hello</h1>
            <Link href={"/Test"}>Go to Test</Link>
            <div style={{ width: "20rem", height: "200vh", background: "black", marginBottom: "10rem" }}/>
            <button onClick={handleClick} style={{ marginBottom: "50rem" }}>change loading</button>
        </div>
    )
}
