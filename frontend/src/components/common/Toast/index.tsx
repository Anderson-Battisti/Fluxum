// @ts-ignore
import styles from './styles.module.css';
import {Toast as ToastType, ToastVariant} from '../../common/Toast/Toast';
import {useTranslation} from "react-i18next";
import {BsBugFill, BsCheckCircleFill, BsExclamationCircleFill, BsInfoCircleFill, BsXLg} from "react-icons/bs";
import {ReactNode} from "react";

interface ToastProps
{
    toast: ToastType;
    onDismiss: () => void;
}

export function Toast( { toast, onDismiss }: ToastProps )
{
    const { t } = useTranslation( "common" );
    
    const toastIcon: ReactNode = toast.variant === ToastVariant.SUCCESS ? <BsCheckCircleFill       size={ 20 } color={ "var( --green-500 )"  } /> :
                                 toast.variant === ToastVariant.WARNING ? <BsExclamationCircleFill size={ 20 } color={ "var( --orange-500 )" } /> :
                                 toast.variant === ToastVariant.ERROR   ? <BsBugFill               size={ 20 } color={ "var( --red-500 )"    } /> : 
                                                                          <BsInfoCircleFill        size={ 20 } color={ "var( --blue )"       } />; 
    
    const toastVariantCssClass: string = toast.variant === ToastVariant.INFO    ? styles.info    :
                                         toast.variant === ToastVariant.SUCCESS ? styles.success :
                                         toast.variant === ToastVariant.WARNING ? styles.warning :
                                         toast.variant === ToastVariant.ERROR   ? styles.error   : "";
    
    const toastTitle: string = toast.variant === ToastVariant.SUCCESS ? t( "success" ) :
                               toast.variant === ToastVariant.WARNING ? t( "warning" ) :
                               toast.variant === ToastVariant.ERROR   ? t( "error"   ) : 
                                                                        t( "info"    );
    return(
        <div className={ `${ styles.container } ${ toastVariantCssClass }` }>
            <div className={ styles.icon_text_div }>
                <span className={ styles.icon /* span needed here to apply a css class on it and guarantee a min size */ }>
                    { toastIcon }
                </span>
                <div className={ styles.text_div }>
                    <label className={ styles.title }>{ toastTitle }</label>
                    <label className={ styles.text }>{ toast.message }</label>
                </div>
            </div>
            <BsXLg className={ styles.close_toast_icon } />
        </div>
    )
}