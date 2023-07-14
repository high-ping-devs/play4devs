export default function SmallButton({prefixIcon, altTextPrefix, sufixIcon, altTextSufix, color, btnText, btnFunction}: {prefixIcon?: string; altTextPrefix?: string; sufixIcon?: string; altTextSufix?: string; color: string; btnText: string; btnFunction: any}) {
    return (
        <button onClick={btnFunction} className="flex justify-center items-center mobileS:w-[90%] max-w-[326px] h-14 bg-green mb-8 shadow-boxShadow rounded-[0.25rem] gap-2">
            <img
                src={prefixIcon}
                alt={altTextPrefix}
                className="w-6"
            />
            <span className="text-base font-semibold leading-5 text-black">
                {btnText}
            </span>
            <img
                src={sufixIcon}
                alt={altTextSufix}
                className="w-6"
            />
        </button>
    )
}

