import { useResponsive } from "@/Hooks"
import Home from "./Home"
import styles from "./pages.module.scss"

export default function Index() {
    const { mobile } = useResponsive();

    console.log(mobile);
    
    return (
        <Home/>
    )
}
