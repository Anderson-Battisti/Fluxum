package com.fluxum.model.enums;

/**
 * 
 * @author Anderson Battisti
 */
public enum Currency
{
    USD( "$" ),
    BRL( "R$" ),
    EUR( "€" );
    
    private final String symbol;
    
    Currency( String symbol )
    {
        this.symbol = symbol;
    }
    
    public String getSymbol()
    {
        return symbol;
    }
}