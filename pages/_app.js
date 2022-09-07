import '../styles/globals.css';
import { MoralisProvider } from 'react-moralis';
import { ModalProvider } from 'react-simple-hook-modal';
import { PokemonProvider } from '../context/pokemonContext';

function MyApp({ Component, pageProps }) {
    return (
        <MoralisProvider
            serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
            appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}>
            <ModalProvider>
                <PokemonProvider>
                    <Component {...pageProps} />
                </PokemonProvider>
            </ModalProvider>
        </MoralisProvider>
    );
}

export default MyApp;
