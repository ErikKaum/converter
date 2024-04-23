import Link from "next/link";

import { ArrowLeftRight } from "lucide-react";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between p-5">
      <div className="flex items-center border-b border-transparent hover:border-b hover:border-slate-200 justify-center space-x-2 ">
        <Link href="/">
          <span className="text-sm">Converter</span>
        </Link>
    
        <div className="flex justify-center items-center w-3 h-3">
          <ArrowLeftRight />
        </div> 
      </div>

      <div className="flex space-x-4">
        <div className="flex border-b border-transparent hover:border-b hover:border-slate-200 justify-center space-x-2 ">
          <Link  href="/about">
            <span className="text-sm">About</span>
          </Link>
        </div>
        
        <div className="flex border-b border-transparent hover:border-b hover:border-slate-200 justify-center space-x-2 ">
          <Link  href="/">
            <span className="text-sm">Twitter/X</span>
          </Link>
        </div>

        <div className="flex border-b border-transparent hover:border-b hover:border-slate-200 justify-center space-x-2 ">
          <Link  href="/">
            <span className="text-sm">Github</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}