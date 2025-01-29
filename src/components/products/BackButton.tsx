"use client";
import React from 'react';
import {useRouter} from "next/navigation";

export default function BackButton() {
  const router=useRouter();
  return (
    <div>
        <button className="btn btn-dark text-start mb-2" onClick={()=>{router.push('/products'),{scroll:false}}}>Back</button> 
        {/* By default,next.js restores scroll position when using the browser's back and forward buttons.no extra congiguration to do*/}
       {/* If we pass  scroll: false to router.push() we can disable the automatic scrolling to the top of the page on route changes */}
    </div>
  )
}
