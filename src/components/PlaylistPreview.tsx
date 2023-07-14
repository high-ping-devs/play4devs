import React from 'react'

interface PlaylistPreviewProps {
  imgUrl: string
  username: string
  playlistName: string
}
export default function PlaylistPreview(props: PlaylistPreviewProps) {
  return (
    <div className="flex flex-col gap-1 w-40 h-full">
      <img src={props.imgUrl} alt="Capa da playlist" className="rounded border-2 shadow-boxShadow h-full" />
      <span className='text-xs text-gray mt-2'>{props.username}</span>
      <span className='text-sm font-semibold'>{props.playlistName}</span>
    </div>
  )
}
