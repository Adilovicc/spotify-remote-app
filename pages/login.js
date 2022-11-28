import react from 'react';
import {getProviders, authOptions, signIn} from "next-auth/react"

function Login(providers){ 
    return(
       <div className="flex flex-col bg-black min-h-screen items-center justify-center">
          <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt=""/>
          {providers && Object.values(providers.providers).map((provider) => (
            <div key={provider?.name}>
                <button className="bg-[#18D860] text-white p-5 rounded-full" onClick={()=>{signIn(provider.id,{callbackUrl:'/'})}}>Login with {provider?.name ? provider.name : " ccc"}</button>
            </div>
          ))}
       </div>  
    );
}

export default Login;

//SERVER SIDE RENDER
export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props:{
            providers
        }
    }
}