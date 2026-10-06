import { TbCurrencyReal, TbCurrencyDollar, TbCurrencyEuro } from "react-icons/tb";

export class Currency
{
    static readonly USD = new Currency( "USD", "american_dolar", "$", <TbCurrencyDollar /> );
    static readonly BRL = new Currency( "BRL", "brazilian_real", "R$", <TbCurrencyReal /> );
    static readonly EUR = new Currency( "EUR", "euro", "€", <TbCurrencyEuro /> );
    
    private static ALL: readonly Currency[] = [ Currency.USD, Currency.BRL, Currency.EUR ]
    
    private readonly codeISO: string;
    private readonly nameKey: string;
    private readonly symbol: string;
    private readonly icon: React.ReactNode;
    
    private constructor( codeISO: string, nameKey: string, symbol: string, icon: React.ReactNode )
    {
        this.codeISO = codeISO;
        this.nameKey = nameKey;
        this.symbol  = symbol;
        this.icon    = icon;
    }
    
    public getCodeISO(): string 
    { 
        return this.codeISO;
    }
    
    public getNameKey(): string
    { 
        return this.nameKey;
    }
    
    public getSymbol(): string
    { 
        return this.symbol;
    }
    
    public getIcon(): React.ReactNode 
    { 
        return this.icon; 
    }
    
    static values(): readonly Currency[]
    {
        return Currency.ALL;
    }
    
    static getCurrencyByCodeISO( codeISO: string ): Currency | undefined
    {
        return Currency.ALL.find( currency => currency.codeISO === codeISO )
    }
}