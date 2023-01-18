import { useResponsive } from "@/Hooks"
import Home from "./Home"
import styles from "./pages.module.scss"
import { AppPageProps } from "./_app";

export default function Index(props: AppPageProps) {
    const { mobile } = useResponsive();

    console.log(mobile);
    
    return (
        <Home {...props}/>
    )
}
