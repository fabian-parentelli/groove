import './footerSocial.css';
import {Icons} from 'fara-comp-react';

const FooterSocial = () => {

    return (
        <div className='footerSocial'>
            
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <Icons type={'facebook'} color='gray' hover={true} />
            </a>
            
            <a href="https://www.instagram.com/underpass.ar/" target="_blank" rel="noopener noreferrer">
                <Icons type={'instagram'} color='gray' hover={true} />
            </a>

            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <Icons type={'x'} color='gray' hover={true} />
            </a>
            
            <a href="https://www.youtube.com/@underpass-qu6jl" target="_blank" rel="noopener noreferrer">
                <Icons type={'youtube'} color='gray' hover={true} />
            </a>
        </div>
    );
};

export default FooterSocial;