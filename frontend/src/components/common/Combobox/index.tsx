import styles from './styles.module.css';
import {FiChevronDown, FiChevronUp} from "react-icons/fi";
import {ReactNode, useState} from "react";
import {autoUpdate, flip, shift, size, useDismiss, useFloating, useInteractions} from "@floating-ui/react";
import {useTranslation} from "react-i18next";

interface ComboboxProps<T>
{
    label: string;
    comboboxOptions: T[];
    getKey: ( item: T ) => string | number;
    renderOption: ( item: T ) => ReactNode;
    onSelect?: ( item: T ) => void;
}

export function Combobox<T>( { label, comboboxOptions, getKey, renderOption, onSelect }: ComboboxProps<T> )
{
    const [ isOpen, setIsOpen ] = useState( false );
    const [ selected, setSelected ] = useState<T | null>( null );
    
    const { t } = useTranslation( "common" );
    
    const { refs, floatingStyles, context } = useFloating( 
    {
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: 
        [ 
            flip(), 
            shift(),
            size
            (
                {
                    apply( { rects, elements } )
                    {
                        Object.assign( elements.floating.style,
                        {
                            width: `${ rects.reference.width }px`  
                        } );
                    }
                }
            )  
        ],
        whileElementsMounted: autoUpdate,
    } );
    
    const dismiss = useDismiss( context );
    
    const { getReferenceProps } = useInteractions( [ dismiss ] );
    
    const referenceProps: Record<string, unknown> = getReferenceProps( { onClick: () => setIsOpen( open => !open ) } )
    
    function handleSelection( item: T )
    {
        setSelected( item );
        setIsOpen( false );
        onSelect?.( item );
    }
    
    return(
        <div>
            <div ref={ refs.setReference } { ...referenceProps } className={ styles.field_container }>
                <button className={ styles.button }>{ selected ? renderOption( selected ) : t( "select" ) + "..." }</button>
                { isOpen ? <FiChevronUp className={ styles.open_closed_icon } /> : <FiChevronDown className={ styles.open_closed_icon }/> }
                <label className={ styles.floating_label }>{ label }</label>
            </div>
            
            { isOpen && comboboxOptions.length > 0 &&
                ( 
                    <ul ref={ refs.setFloating } style={ floatingStyles } className={ styles.options_container }>
                        { comboboxOptions.map( option => ( <li key={ getKey( option ) } className={ styles.option } onClick={ () => handleSelection( option ) }>{ renderOption( option ) }</li> ) ) }
                    </ul>
                )
            }
        </div>
    );
}