import { createContext, useState, useEffect } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [assets, setAssets] = useState([]);

    const { authenticate, isAuthenticated, enableWeb3, Moralis, user, isWeb3Enabled } = useMoralis();

    const { data: assetsData, error: assetsDataError, isLoading: assetsDataIsLoading } = useMoralisQuery('assets');

    useEffect(() => {
        (async () => {
            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname');
                setUsername(currentUsername);
            }
        })();
    }, [isAuthenticated, user]);

    const getAssets = async () => {
        try {
            await enableWeb3();
            setAssets(assetsData);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        (async () => {
            if (isWeb3Enabled) {
                await getAssets();
            }
        })();
    }, [isWeb3Enabled, assetsData, assetsDataIsLoading]);

    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname);
                user.save();
                setNickname('');
            } else {
                console.log("Can't set empty nickname");
            }
        } else {
            console.log('No user');
        }
    };

    return (
        <PokemonContext.Provider
            value={{
                isAuthenticated,
                nickname,
                setNickname,
                username,
                handleSetUsername,
                assets,
            }}>
            {children}
        </PokemonContext.Provider>
    );
};
