import Header from "./components/header/header.tsx";
import {MainContent} from "./components/main-content.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";

function App() {

    return (
        <>
            <Header/>
            <Provider store={store} >
            <MainContent/>
            </Provider>
        </>
    )
}

export default App
