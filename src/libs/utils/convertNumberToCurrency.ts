type ConvertNumberToCurrencyProps = {
    price: number;
    options?: {
        withCurrency: boolean;
    };
};

export const convertNumberToCurrency = ({ price, options }: ConvertNumberToCurrencyProps) => {
    let currencySettings = {};
    if (options?.withCurrency) {
        currencySettings = {
            style: 'currency',
            currency: 'IDR',
        };
    }

    let currency;
    currency = new Intl.NumberFormat('id-ID', {
        ...currencySettings,
        minimumFractionDigits: 0,
    }).format(price);
    if (options?.withCurrency) {
        currency = currency.replace(/\s/g, '');
    }

    return currency;
};
