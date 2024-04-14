import '../styles/global.sass'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import store from "@/redux/store";
import LoadingOverlay from "@/app/common-ui/loading-overlay/loading-overlay";
import {getMenuGame} from "@/app/games-by-category/apis/lobby-apis";
import Header from "@/app/header/components/header";
import Menu from "@/app/interfaces/menu";

function MyApp({Component, pageProps, menu}: AppProps & { menu: Menu }) {
    return (
        <Provider store={store}>
            <Header menu={menu}></Header>
            <Component {...pageProps} />
            <LoadingOverlay/>
        </Provider>
    )
}

MyApp.getInitialProps = async () => {
    const menu = await getMenuGame();

    return {
        menu
    };
}

export default MyApp;
