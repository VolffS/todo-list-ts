import Header from "./components/header/header.tsx";
import {MainContent} from "./components/main-content.tsx";
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Header/>
            <Provider store={store} >
            <MainContent/>
            </Provider>
        </>
    )
}

export default App
