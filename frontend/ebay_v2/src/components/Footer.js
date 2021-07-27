import { Component } from "react";

class Footer extends Component {

    render() {
        return(
            <div>
                <footer class="footer">
                    <div class="footer__wrapper">
                        <a class="footer-wrapper__logo logo" href="#0">EBAZAR</a>
                    </div>
                    <div className="footer-wrapper__infos">
                        <ul>
                            <li>A propos D'EBAZAR</li>
                            <li>Contactez nous</li>
                            <li>Mentions légales</li>
                            <li>Conditions générales</li>
                            <li>Opportunités</li>
                        </ul> 
                        <ul>
                            <li>Comment Vendre</li>
                            <li>Espace vendeurs</li>
                            <li>Frais de vente</li>
                            <li>Reversement</li>
                            <li>Protection des vendeurs</li>
                        </ul>    
                        <ul>
                            <li>Comment acheter</li>
                            <li>Moyens de paiments</li>
                            <li>Droits et obligations</li>
                            <li>Promotions</li>
                            <li>Garantie client</li>
                        </ul>    
                    </div>
                </footer>
            </div>
        )
    }
}


export default Footer