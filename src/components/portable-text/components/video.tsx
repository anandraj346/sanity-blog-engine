"use client"
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Video({ data }: {
  data: { videoUrl: string; };
}) {
  return (
    <div className='mt-12 p-4 md:p-4 border border-dashed rounded-3xl aspect-video'>
      <div className="h-full w-full rounded-2xl overflow-hidden">
        <ReactPlayer 
          url={data.videoUrl} 
          width="100%"
          height="100%"
          playing={false}
          controls={true}
        />
      </div>
    </div>
  )
}