import React from 'react';
import styled from 'styled-components';
import mainbg from '../images/index.jpg'


class Banner extends React.Component{

    state = {
        thequote: ""
    }

    componentDidMount() {
        this.displayQuote();
    }

    displayQuote = () => {
        let quote = [
            "Forgot to buy condoms....Good.I’ve always wanted kids.",
            "Erectile disfuction?...Good. More time to cuddle.",
            "Is your refrigerator running? GOOD. Get after it.",
            "Lost my left leg good Im right footed.",
            "I just got fired Good, now I can find a better opportunity and move onto better things.",
            "Alarm goes off in the morning. Good. Another chance to hit snooze.",
        ];

        let resp = Math.floor(Math.random() * 6);
         setInterval(() => this.setState({ thequote: quote[Math.floor(Math.random() * 6)] }), 3000);
    }

    render(){
        return (
            <HeaderNav>
                <div className="hero">
                    <h1 className="main-quote">{this.state.thequote }</h1>
                </div>
            </HeaderNav>
        )
    }

};


const HeaderNav = styled.header`
background-image: ${mainbg};
`;
export default Banner;