import Image from "next/image";

export default function Track(props: any) {
  return (
    <div className="flex justify-center mobileS:w-[100%] max-w-[800px] h-12 mb-4">
      <Image
        className=" flex justify-center items-center mr-4 img-frame shadow-boxShadow"
        loader={() => props.image}
        src={props.image}
        width={48}
        height={1}
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
