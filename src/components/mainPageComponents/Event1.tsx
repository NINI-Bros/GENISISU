'use client'

import { DOMElement, ReactElement, useEffect, useRef } from "react"

export default function Event1 () {


  const titleRef = useRef<HTMLElement | null>(null)
  useEffect(()=>{
    const yeon = titleRef.current?.querySelector('.suyeon') as HTMLElement | null
    setTimeout(()=>{
      yeon && yeon.classList.add('on')
    },3500)

  },[])

  return(
    <section id="event1">
    <article>
      <h2>Hyundai Morgans</h2>
      <article className="title_item" ref={titleRef}>
        <h3>
          GEN<span>I</span>S<span>I</span>SU
        </h3>
        <h3 className="suyeon">YEON</h3>
      </article>
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        alert('준비중 입니다.')
      }} className="mainBtn">VIEW MORE</button>
    </article>

    <figure>
      <video src="/video/main_video.mp4" muted={true} autoPlay={true} loop={true}></video>
    </figure>

    <aside className="progress_bar">
      <span>G90 BLACK</span>
      <div className="timeline">
        <div></div>
      </div>
      <span>CONCEPT CAR</span>
    </aside>
  </section>

  )
}