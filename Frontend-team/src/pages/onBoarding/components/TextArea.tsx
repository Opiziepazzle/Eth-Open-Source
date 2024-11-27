// import React from 'react'

export default function TextArea(props:any) {
  return (
    <div className="w-full flex flex-col justify-between">
    <p className="text-sm text-[#101323] mb-1">{props.title}</p>
    <div className="border border-border rounded-2xl p-2 w-full">
        <textarea
            name={props.placeholder}
            id="" 
            className='bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:outline-none w-full' 
            placeholder={props.placeholder} 
        ></textarea>
    </div>
  </div>
  )
}
