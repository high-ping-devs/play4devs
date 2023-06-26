import Image from "next/image";

export default function Login() {
  return (
    <div className="mobile:bg-white mobile:flex mobile:flex-col mobile:justify-center mobile:items-center mobile:w-screen mobile:h-screen">
      <Image width={88} height={1} src="/assets/logo.svg" alt="Logo"></Image>
      <h1 className="mobile:text-black mobile:font-semibold mobile:text-2xl mobile:px-6 mobile:text-center mobile:mt-14 mobile:pb-2">
        Boas-vindas ao play4devs!
      </h1>
      <p className="mobile:text-[#323232] mobile:font-normal mobile:text-base mobile:px-10 mobile:text-center">
        Compartilhe suas playlists favoritas para programar
      </p>
      <a
        href="/api/auth/login"
        className="mobile:w-80 mobile:h-14 mobile:bg-green mobile:border-2 mobile:border-black mobile:border-solid mobile:rounded-lg mobile:mt-14 mobile:px-4 mobile:shadow-boxShadow flex justify-center items-center text-base font-semibold text-black"
      >
        Entrar
      </a>
    </div>
  );
}
