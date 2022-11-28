// import 'tailwindcss/tailwind.css' - nije potrebno posto se koristi importuje preko globals.css
import '../styles/globals.css';
import { SessionProvider } from "next-auth/react";
import {RecoilRoot} from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
       <RecoilRoot>
         <Component {...pageProps} />
       </RecoilRoot>
    </SessionProvider>
  )
  
}

export default MyApp
