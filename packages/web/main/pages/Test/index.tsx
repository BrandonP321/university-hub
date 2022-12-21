import Link from "next/link"
import styles from "./Test.module.scss"

export default function Test() {

    return (
        <div>
            <h1>Test</h1>
            <Link href={"/"}>Go to Home</Link>
        </div>
    )
}
