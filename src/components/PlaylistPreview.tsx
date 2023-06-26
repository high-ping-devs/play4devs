import React from 'react'

interface PlaylistPreviewProps {
  imgHeight: string
  imgUrl: string
  username: string
  playlistName: string
}
export default function PlaylistPreview(props: PlaylistPreviewProps) {
  return (
    <div className="flex flex-col gap-1">
      <img src={props.imgUrl}  alt="Capa da playlist" className={`rounded shadow-boxShadow w-40 ${props.imgHeight}`}/>
      <span className='text-xs text-gray'>{props.username}</span>
      <span className='text-sm font-semibold'>{props.playlistName}</span>
    </div>
  )
}
