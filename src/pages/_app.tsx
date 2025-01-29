import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "@/components/footer/Footer";
import Nav from "@/components/nav/Nav";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
import CartProvider from "../components/cart-provider/CartProvider";
import 'bootstrap/dist/css/bootstrap.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <CartProvider>
    <Nav/>
    <Component {...pageProps} />
    <Footer/>
    </CartProvider>
    <ToastContainer /> {/* Render the ToastContainer to display toasts to be availble in all components*/}
    </>

  )

  
}
