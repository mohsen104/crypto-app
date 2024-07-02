const currencyFormater = (current_price, currency) => new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(current_price);

export default currencyFormater;