export const About = ()=>{
    return (
        <section className="relative py-10 sm:py-16 px-4 sm:px-10 lg:px-24 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] drop-shadow-sm">
          About Prasanth Nursery 🌿
        </h2>
        <p className="font-[Lora,serif] text-base sm:text-lg lg:text-xl text-[var(--color-primary)] leading-loose max-w-5xl mx-auto text-justify sm:text-center mb-6 sm:mb-12">
          At <span className="font-semibold text-[var(--color-primary)]">Prasanth Nursery</span>, we don’t just grow plants — we nurture living stories.
          From soulful wooden greens to blooming florals and clean air companions,
          each leaf we raise carries care, love, and a breath of nature straight from the rich soil of Tamil Nadu to your home.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10">
          <div className="card-fade fade-delay-100 backdrop-blur-sm border-2 border-[var(--color-primary-light)] p-6 rounded-tl-3xl rounded-br-3xl shadow-md hover:shadow-[0_10px_40px_rgba(0,128,0,0.2)] transition duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">🌱 Our Mission</h3>
            <p className="text-[var(--color-primary-dark)]">
              We aim to bring nature closer to hearts and homes, promoting a sustainable green lifestyle with every plant sold.
            </p>
          </div>
          <div className="card-fade fade-delay-300 backdrop-blur-sm border-2 border-[var(--color-primary-light)] p-6 rounded-tl-3xl rounded-br-3xl shadow-md hover:shadow-[0_10px_40px_rgba(0,128,0,0.2)] transition duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">🪴 What We Offer</h3>
            <p className="text-[var(--color-primary-dark)]">
              From flowering favorites to care kits, we provide healthy plants, garden essentials, and a real-time platform to find available greens nearby.
            </p>
          </div>
          <div className="card-fade fade-delay-500 backdrop-blur-sm border-2 border-[var(--color-primary-light)] p-6 rounded-tl-3xl rounded-br-3xl shadow-md hover:shadow-[0_10px_40px_rgba(0,128,0,0.2)] transition duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">🌼 Why Choose Us</h3>
            <p className="text-[var(--color-primary-dark)]">
              With quality-first cultivation, friendly support, and a commitment to eco-living, we make gardening simple, stylish, and sustainable.
            </p>
          </div>
        </div>
      </section>
    )
};