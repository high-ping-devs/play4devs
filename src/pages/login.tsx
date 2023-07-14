import Image from "next/image";

export default function Login() {
  return (
    <div className="bg-white flex flex-col justify-center items-center w-screen h-screen">
      <Image width={88} height={1} src="/assets/logo.svg" alt="Logo"></Image>
      <h1 className="text-black font-semibold text-2xl px-6 text-center mt-14 pb-2">
        Boas-vindas ao play4devs!
      </h1>
      <p className="text-gray font-normal text-base px-10 text-center">
        Compartilhe suas playlists favoritas para programar
      </p>
      <a
        href="/api/auth/login"
        className="min-w-[50%] max-w-[20rem] h-14 bg-green border-2 border-black border-solid rounded-lg 
        mt-14 ml-4 mr-4 px-4 shadow-boxShadow flex justify-center items-center text-base font-semibold text-black"
      >
        Entrar
      </a>
    </div>
  );
}
