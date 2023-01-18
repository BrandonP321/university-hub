import Home from "./Home"
import styles from "./pages.module.scss"
import { AppPageProps } from "./_app";

export default function Index(props: AppPageProps) {
    
    return (
        <Home {...props}/>
    )
}
