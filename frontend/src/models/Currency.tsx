import { TbCurrencyReal, TbCurrencyDollar, TbCurrencyEuro } from "react-icons/tb";
import {useTranslation} from "react-i18next";

export interface Currency
{
    id: number;
    nameKey: string
    abbreviation: string;
    symbol: string;
    icon: React.ReactNode;
}

export const CURRENCIES: Currency[] =
[
    { id: 1, nameKey: "american_dolar", abbreviation: "USD", symbol: "$", icon: <TbCurrencyDollar /> },
    { id: 2, nameKey: "brazilian_real", abbreviation: "BRL", symbol: "R$", icon: <TbCurrencyReal /> },
    { id: 3, nameKey: "euro",           abbreviation: "EUR", symbol: "€", icon: <TbCurrencyEuro /> }
]