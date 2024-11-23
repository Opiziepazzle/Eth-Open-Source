// import React from 'react'
import { Button } from './ui/button'

const CustomBtn = (props:any) => {
    
    if(props.icon){
        return (
            <div className={`rounded-full ${props?.style} ${props.colored == "yes" ? "bg-gradient-to-r from-[#E8D07A] to-[#5312D6] ":"bg-white text-black"} p-[1px]`}>
                <Button onClick={props?.onClick} className={`rounded-full h-full  w-full ${props.colored == "yes" ?"bg-black text-white  hover:bg-slate-700":"bg-white text-black "}`}><img src={`${props.icon}`} alt="" className={props.iconStyle} />{props.text}</Button>
            </div>
        )
    }
    if(props.text){
        return (
            <div className={`rounded-full ${props?.style}  ${props.colored == "yes" ? "bg-gradient-to-r from-[#E8D07A] to-[#5312D6]":"bg-white text-black"} p-[1px]`}>

                <Button onClick={props?.onClick} className='rounded-full  h-full w-full  bg-black text-white hover:text-black'>{props.text}</Button>
            </div>
        )
    }

}

export default CustomBtn
