const currencyNotation = (currency) => {
    return new Intl.NumberFormat("en-GB", {
        notation: "compact",
        compactDisplay: "short",
    }).format(currency);
}

export default currencyNotation;