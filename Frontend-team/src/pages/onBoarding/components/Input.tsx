// import React from 'react'
import GloomyTags from 'react-tag-maker'

export default function Input(props: any) {
  return (
    <div className="w-full flex flex-col justify-between">
    <p className="text-sm text-[#101323] mb-1">{props.title}</p>
    <div className="border border-border rounded-2xl p-2 w-full">
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        className="bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:outline-none w-full"
      />
    </div>
  </div>
  )
}


export function TagFields(props: any) {
  return (
  <div className="w-full flex flex-col justify-between">
    <p className="text-sm text-[#101323] mb-1">{props.title}</p>
    <div className="border border-border rounded-2xl p-2 w-full ">

      <GloomyTags
        state={props.skill}
        setState={props.setSkill} 
        classNames={{ tag: 'px-4 py-2 bg-white text-center rounded-full bg-black text-[#101323]', input: "bg-transparent border-none focus:outline-none focus:ring-0 focus-visible:outline-none w-full bg-black" }}
        
      />
    </div>
  </div>
  )
}
