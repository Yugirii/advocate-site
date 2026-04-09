import Image from "next/image";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={`${styles.main} font-[var(--font-body)] text-black`}>
      <section className={styles.hero}>
        <Image
          src="/Images/aboutus.jpg"
          alt="Advocate team and travel consultation"
          fill
          sizes="100vw"
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroInner}>
            <h1
              className={`font-display uppercase text-2xl leading-[0.95] tracking-[0.05em] text-amber-500 sm:text-3xl md:text-4xl`}
            >
              Affordable Journeys,
              <span className="block">Quality Experiences.</span>
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-white/95 sm:text-base max-md:mt-3">
              We provide individualized travel solutions, competitive pricing,
              and end-to-end support, from planning and documentation to
              ticketing and post-trip assistance, all under the direction of
              our dedication to service excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 md:py-20 max-md:px-4 max-md:py-10">
          <h2
            className={`font-display text-center text-4xl uppercase tracking-[0.05em] text-[#50a7a4] sm:text-5xl`}
          >
            About Us
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-7 max-md:text-sm max-md:leading-6">
            Established in 2019, Advocate Tours and Travel Incorporated is a
            duly registered and accredited travel agency located in Pasig City,
            Philippines. Its mission is to empower aspiring and start-up travel
            agents to successfully build and grow their own travel businesses
            through Advo Quickfix, a one-stop partner for all travel business
            needs, while also offering dependable, convenient, and high-quality
            travel services to direct clients such as solo-travellers,
            families, corporate, pilgrimage and leisure groups.
          </p>

          <div className="mt-12 grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-[1.12fr_1fr] min-[900px]:gap-[2.2rem]">
            <div className="w-full overflow-hidden rounded-sm">
              <Image
                src="/Images/aboutuspage.jpg"
                alt="Advocate team in a tourism training and affiliation event"
                width={980}
                height={620}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="w-full">
              <h3 className="text-2xl font-semibold leading-tight text-[#111111]">
                Tourism Association Affiliation
              </h3>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-7">
                Our integrity, professionalism, and commitment to industry
                standards are demonstrated by our accreditation by the
                Department of Tourism (DOT) and our pride in being members of
                reputable travel associations like PATA, PHILTOA, PTAA, and TPB
                Philippines.
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 items-start gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-8">
            <div className="w-full">
              <h3 className="text-2xl font-semibold leading-tight text-[#111111]">Our Goals</h3>

              <div className="mt-8">
                <h4
                  className={`font-display text-xl uppercase leading-[1.25] tracking-[0.02em] text-[#50a7a4] max-md:text-lg`}
                >
                  To provide trustworthy, open, and customer-focused travel
                  services
                </h4>
                <p className="mt-3 text-base leading-7 max-md:text-sm max-md:leading-6">
                  We are committed to delivering transparent, reliable, and customer-centered travel
                  solutions, ensuring that every client receives honest guidance, competitive pricing,
                  and personalized support from planning to post-trip assistance.
                </p>
              </div>

              <div className="mt-8">
                <h4
                  className={`font-display text-xl uppercase leading-[1.25] tracking-[0.02em] text-[#50a7a4] max-md:text-lg`}
                >
                  To make travel experiences smooth and unforgettable
                </h4>
                <p className="mt-3 text-base leading-7 max-md:text-sm max-md:leading-6">
                  We strive to create seamless and memorable journeys by handling every detail with care -
                  from documentation and ticketing to on-ground coordination - so our clients can travel
                  with confidence and peace of mind.
                </p>
              </div>

              <div className="mt-8">
                <h4
                  className={`font-display text-xl uppercase leading-[1.25] tracking-[0.02em] text-[#50a7a4] max-md:text-lg`}
                >
                  To encourage and enable up-and-coming travel business owners
                </h4>
                <p className="mt-3 text-base leading-7 max-md:text-sm max-md:leading-6">
                  Through Advo Quickfix, we empower aspiring and start-up travel entrepreneurs by
                  providing comprehensive support, industry expertise, and reliable partnerships that
                  help them build, grow, and sustain successful travel businesses.
                </p>
              </div>
            </div>

            <div className="w-full overflow-hidden rounded-sm">
              <Image
                src="/Images/aboutuspage2.jpg"
                alt="Advocate team training session"
                width={980}
                height={860}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[var(--background)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 text-center">
          <h2 className="text-3xl font-semibold leading-tight text-black sm:text-4xl">
            Advocate Tours and Travel Incorporated
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-[#2d2d2d]">
            Duly licensed by the Department of Tourism (DOT), we are a proud member of 
            PATA, PTAA, PHILTOA, TPB Philippines, NAITAS, and NITAS. We are committed to 
            providing exceptional travel services and fostering strong partnerships within 
            the travel industry.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            <Image
              src="/Images/Department_of_Tourism.svg"
              alt="Department of Tourism"
              width={90}
              height={90}
              className="object-contain h-auto"
            />
            <Image
              src="/Images/PATA.png"
              alt="PATA"
              width={180}
              height={65}
              className="object-contain h-auto"
            />
            <Image
              src="/Images/PHILTOA.png"
              alt="PHILTOA"
              width={200}
              height={65}
              className="object-contain h-auto"
            />
            <Image
              src="/Images/PTAA.jpg"
              alt="PTAA"
              width={170}
              height={65}
              className="object-contain h-auto"
            />
            <Image
              src="/Images/TPB.png"
              alt="TPB Philippines"
              width={100}
              height={80}
              className="object-contain h-auto"
            />
            <Image
              src="/Images/NAITAS.jpg"
              alt="NAITAS"
              width={186}
              height={80}
              className="object-contain h-auto"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
