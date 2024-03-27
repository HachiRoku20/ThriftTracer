import React from 'react';





const AccountCard = ({ accountTitle, accountAmount }) => {
    let compactFormatter = Intl.NumberFormat('en', { notation: 'compact' });
    let commaFormatter = new Intl.NumberFormat('en', {
        useGrouping: true
    });

    return (
        < div className="mx-auto flex min-w-[45%] md:min-w-[30%] flex-col gap-y-4 rounded-md bg-slate-600 p-4 text-center" >
            <dt className="text-base md:leading-7">{accountTitle}</dt>
            <dd className="order-first text-xl font-semibold tracking-tight md:text-5xl">
                ₱{accountAmount > 9999999999 ? compactFormatter.format(accountAmount) : commaFormatter.format(accountAmount)}
            </dd>
        </div >
    )



}

export default AccountCard;