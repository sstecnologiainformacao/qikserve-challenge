export const calculateTotal = (items) => {
    const reducedTotal = items.reduce((total, item) => {
        return total + ((item.price / 100) * item.amount)
    }, 0);
    return reducedTotal;
}

export const calculateTotalPayable = (total, promos) => {
    let newTotal = total;
    promos.forEach(promo => {
        if (promo.isReducible) {
            newTotal = newTotal - promo.value;
        }
    });
    return newTotal;
}

export const handlePromotion = (promotion, item) => {
    switch(promotion.type) {
        case 'QTY_BASED_PRICE_OVERRIDE':
            if (item.amount >= promotion.required_qty) {
                return calculateBasedPriceOverride(promotion, item);
            }
            break;
        case 'BUY_X_GET_Y_FREE':
            if (item.amount >= promotion.required_qty) {
                return calculateBuyXGetYFree(item, promotion);
            }
            break;
        case 'FLAT_PERCENT': 
            return calculateFlatPercent(item, promotion);
        default: return null;
    }
    return null;
}

export const calculateBasedPriceOverride = (promotion, item) => {
    const timesToApply = Math.floor(item.amount / promotion.required_qty);
    const remainder = item.amount % promotion.required_qty
    const atADiscount = timesToApply * (promotion.price / 100);
    return {
        type: promotion.type,
        isReducible: true,
        value: (((item.price / 100) * item.amount) - (atADiscount + ((remainder * item.price) / 100))),
    };
}

export const calculateBuyXGetYFree = (item, promotion) => {
    const timesToApply = Math.floor(item.amount / promotion.required_qty);
    return {
        item: item.name,
        type: promotion.type,
        isReducible: false,
        value: (item.price / 100) * timesToApply,
        free: timesToApply,
    };
}

export const calculateFlatPercent = (item, promotion) => {
    return {
        type: promotion.type,
        isReducible: true,
        value: ((item.price / 100) * (item.amount * (promotion.amount / 100))),
    };
}