import Image from "next/image";


export const Hero = () => {
    return (
         <main className="flex flex-col md:flex-row items-center justify-between px-6 py-10 sm:py-18 max-w-7xl mx-auto">
          <div className="max-w-xl">
            <span className="text-xs font-medium uppercase bg-[var(--color-accent-mid)] text-[var(--color-accent-dark)] px-4 py-2 rounded-tl-xl rounded-br-xl sm:rounded-tl-2xl rounded-xs sm:rounded-br-2xl">
              Fresh & Green Everyday
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
              WELCOME TO OUR
              <br /> BEAUTIFUL NURSERY IN
              <br /> THE 🌿 HEART OF NATURE
            </h1>
            <p className="mt-4 text-[var(--color-primary-dark)]">
              Discover lush plants, expert gardening tips, and the green beauty your home deserves. Our nursery brings nature closer to you.
            </p>
            <div className="mt-6 flex gap-4">
              <div className="bg-[var(--color-accent-mid)] text-[var(--color-accent-dark)] px-5 py-2 hover:bg-[var(--color-primary-dark)] rounded-tl-xl rounded-br-xl rounded-xs transition cursor-pointer">
                Explore Plants
              </div>
              <div className="border border-[var(--color-primary)] text-[var(--color-accent-light)] px-5 py-2 rounded-md hover:bg-[var(--color-primary-light)] hover:text-white  rounded-tl-xl rounded-br-xl rounded-xs transition cursor-pointer">
                Need Help? 🌱
              </div>
            </div>
          </div>
          <div className="relative mt-10 md:mt-0 w-full max-w-[400px] aspect-square flex items-center  justify-center">
            <div className="absolute w-2/3 aspect-square rounded-tl-[25%] rounded-tr-[25%] rounded-bl-[25%] rounded-br-[25%] bg-green-200 opacity-30 animate-ripple" />
            <div className="absolute w-2/3 aspect-square rounded-tl-[25%] rounded-tr-[25%] rounded-bl-[25%] rounded-br-[25%] bg-green-300 opacity-20 animate-ripple delay-200" />
            <div className="absolute w-2/3  aspect-square rounded-tl-[25%] rounded-tr-[25%] rounded-bl-[25%] rounded-br-[25%] bg-green-400 opacity-10 animate-ripple delay-400" />
            <Image
              src="/hero_1.png"
              alt="Nursery showcase"
              fill
              className="object-contain drop-shadow-md relative z-10"
            />
          </div>
        </main>
    )
};