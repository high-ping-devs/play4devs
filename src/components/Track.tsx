export default function Track(props: any) {
  return (
    <div className="flex justify-center mobileS:w-[100%] max-w-[800px] h-12 mb-4">
      <img
        className=" flex justify-center items-center pr-4"
        src="/assets/trackPicture.png"
        alt="Capa da música"
      />
      <div className="flex flex-col pr-8 justify-center items-start mobileM:w-[70%] mobileS:w-[60%] gap-1">
        <span className="font-semibold text-sm text-black">{props.title}</span>
        <span className="font-normal text-xs text-[#323232]">
          {props.artist}
        </span>
      </div>
      <span className="flex justify-center items-center text-sm font-normal">
        {props.time}
      </span>
    </div>
  );
}
