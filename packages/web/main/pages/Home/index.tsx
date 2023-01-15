import PageHead from "@/Components/PageHead"
import { useAppDispatch, usePageLoading } from "@/Hooks"
import { actions } from "@/Store";
import Link from "next/link"
import styles from "./Home.module.scss"

export default function Home() {
    const dispatch = useAppDispatch();
    const { loading } = usePageLoading();

    const handleClick = () => {
        dispatch(actions.pageLoading.setShowPageSpinner({ loading: !loading }));

        setTimeout(() => {
            dispatch(actions.pageLoading.setShowPageSpinner({ loading }))
        }, 1500)
    }

    return (
        <div>
            <PageHead />
            <h1>Hello</h1>
            <Link href={"/Test"}>Go to Test</Link>
            <div style={{ width: "20rem", height: "200vh", background: "black", marginBottom: "10rem" }}/>
            <button onClick={handleClick} style={{ marginBottom: "50rem" }}>change loading</button>
        </div>
    )
}
