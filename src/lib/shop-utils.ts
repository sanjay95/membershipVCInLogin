import { ConsumerInfoProps } from "./context/ConsumerContext";

export const getGeoSpecificPrice = (price: any, currencyRate: any, verifiedUser: any, shoppingUser: any) => {
    const actualPrice = (price * currencyRate);
    const discount = (price * 0.1 * currencyRate);
    var finalPrice = verifiedUser ? (actualPrice - discount) : actualPrice;
    finalPrice = shoppingUser ? (finalPrice - (price * 0.05 * currencyRate)) : finalPrice;
    return finalPrice.toFixed(2);
};

export const updateConsumerState = (storeConsumerInfo: Function, data: any) => {
    const obj = "" + localStorage.getItem("consumerCurrentState");
    let userUpd: ConsumerInfoProps = JSON.parse(obj);
    const usernew = { ...userUpd?.user, ...data };
    storeConsumerInfo((prev) => ({
        ...prev,
        userId: prev.userId,
        user: usernew,
    }));
};