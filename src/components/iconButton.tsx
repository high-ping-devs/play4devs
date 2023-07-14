export default function IconButton({icon, altText, color, linkRed}: {icon: string; altText: string; color: string; linkRed: string}) {
  return (
    <button className={`${color} shadow-boxShadow flex p-2 rounded h-10 w-10 justify-center justify-items-center`}>
      <a href={linkRed} className="self-center">
        <img src={icon} alt={altText}/>
      </a>
    </button>
  )
}