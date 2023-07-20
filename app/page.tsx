import Image from 'next/image'
import logo from './logo.svg';

export default function Home() {
  return (
    <div className="relative h-screen pt-[3vh]">
      <spline-viewer loading-anim url="https://prod.spline.design/h97zWDoob7iJHxy4/scene.splinecode" />
      <div className="planet-overlay flex flex-col items-center justify-center">
        <div className="relative">
          <Image src={logo} alt="Desolaris Logo" className="logo w-48" />
        </div>
        <div className="h-[70vh]" />
        <div className="flex gap-[1px]">
          <button className="btn btn-primary btn-nobs relative">
            Claim Free Deck
          </button>
          <button className="btn">Login</button>
          <button className="btn">About</button>
          <button className="btn btn-sm text-2xl"><i className="icon icon-twitter -m-1" /></button>
        </div>
      </div>
    </div>
  )
}
