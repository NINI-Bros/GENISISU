'use client'

import { useEffect, useRef } from "react"

export default function Event1 () {
  const titleRef = useRef<HTMLElement | null>(null)
  useEffect(()=>{
    const yeon = titleRef.current?.querySelector('.suyeon') as HTMLElement | null
    setTimeout(()=>{
      yeon && yeon.classList.add('on')
    },3500)
  }, [])

  return(
    <section id="event1">
      <article>
        <h2>Hyundai Morgans</h2>
        <article className="title_item" ref={titleRef}>
          <h1>
            GEN<span>I</span>S<span>I</span>SU
          </h1>
          <h1 className="suyeon">YEON</h1>
        </article>
        {/* 0925 기획으로 인한 임시 숨김 */}
        {/* <button onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{
          e.preventDefault();
          alert('준비중 입니다.')
        }} className="mainBtn">VIEW MORE</button> */}
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