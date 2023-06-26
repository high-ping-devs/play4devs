export default function LikeButton({transform}: {transform?: string}) {
  return (
    <button className={`bg-pink shadow-boxShadow flex gap-1 p-2 rounded ${transform}`}>
      <img src="/assets/Heart.svg" alt="Coracao"  className="self-center"/>
      <span>Curtir</span>
    </button>
  )
}