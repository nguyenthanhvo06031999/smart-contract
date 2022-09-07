import React, { useState, useContext } from 'react';
import { PokemonContext } from '../context/pokemonContext';
import Card from './Card';

function Cards(props) {
    const { assets } = useContext(PokemonContext);

    const item = {
        id: 0,
        attributes: {
            name: 'Doge',
            price: 2,
            src: 'https://media1.giphy.com/media/tRYARMeyH4OCMn7wV1/giphy.gif?cid=790b7611d15f0eefbcf4ea64af184c3397f7bb93c8d7e07cf&rid=giphy.gif&ct=g',
        },
    };
    const styles = {
        container: `h-full w-full flex flex-col ml-[20px] -mt-[50px]`,
        title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
        cards: `flex items-center  flex-wrap gap-[80px]`,
    };

    console.log(assets,'????')

    return (
        <div className={styles.container}>
            <div className={styles.title}>New Release</div>
            <div className={styles.cards}>
                {assets.map((item) => {
                    const asset = item.attributes;
                    return <Card key={item.id} item={asset} />;
                })}
            </div>
        </div>
    );
}

export default Cards;
