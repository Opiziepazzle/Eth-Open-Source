// import React from 'react'

export const OBNavbar = ({ firstIndex }: { firstIndex: number }) => {
    return (
        <div className="z-50 p-7 flex justify-between">
            <img src="/DarkEthOpenSource.svg" alt="logo" className="w-[172px] " />
            <div className="flex gap-5">
                <div className={`w-14 h-[6px] rounded-full ${firstIndex > 0 ? "bg-[#101323]" : "bg-[#EAECF5]"}`} />
                <div className={`w-14 h-[6px] rounded-full ${firstIndex > 1 ? "bg-[#101323]" : "bg-[#EAECF5]"}`} />
                <div className={`w-14 h-[6px] rounded-full ${firstIndex > 2 ? "bg-[#101323]" : "bg-[#EAECF5]"}`} />
                <div className={`w-14 h-[6px] rounded-full ${firstIndex > 3 ? "bg-[#101323]" : "bg-[#EAECF5]"}`} />
            </div>
        </div>
    )
}
