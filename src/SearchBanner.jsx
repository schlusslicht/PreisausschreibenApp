import React from 'react';

import { Layout } from 'antd';

import SearchBox from './SearchBox';

export default function SearchBanner( props ) {
    /*const bannerStyle = {
        imageStyle: {
            background-image: url(./CollageA_Farbe1.jpg);
            height: 50%
        },
        textStyle: {},
        buttonStyle: {}
    }*/

    return(
        <Layout style={{ 
            backgroundImage: 'url("./CollageA_Farbe1.jpg")', 
            height: "90vH", 
            backgroundPosition: "center",
            backgroundSize: "cover" 
        }}>
            <div style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}>
                <h1 style={{fontSize:40}}>Musikalische Preisausschreiben</h1>
                <h2>Grundriss, Datenbank und Bibliografie auf Grundlage von Musikperiodika</h2>

                <SearchBox />
            </div>
        </Layout>
    );
}