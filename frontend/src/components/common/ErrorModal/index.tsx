import styles from "./styles.module.css";
import {VscError} from "react-icons/vsc";
import {useTranslation} from "react-i18next";
import {Button} from "../Button";
import {ButtonVariants} from "../Button/ButtonVariants";
import {IoReload} from "react-icons/io5";

export function ErrorModal()
{
    const { t } = useTranslation( "common" );
    
    function reloadPage()
    {
        window.location.reload();
    }
    
    return(
        <div className={ styles.error_card_overlay }>
            <div className={ styles.card } >
                <div className={ styles.icon_message }>
                    <VscError size={ "25px" } />
                    <label className={ styles.message }>Ocorreu um erro interno no servidor, tente novamente mais tarde!</label>
                </div>
                <Button label={ "Recarregar" } variant={ ButtonVariants.PRIMARY } icon={ <IoReload /> } width={ "40%" } onClickButton={ reloadPage } />
            </div>
        </div>
    );
}