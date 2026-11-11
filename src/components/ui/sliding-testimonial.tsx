import Image from "next/image";
import { BlurFade, Card, Marquee, RevealText } from "@glinui/ui";

const testimonials = [
  {
    name: "Alena Zhukova",
    profession: "Software Engineer",
    description:
      "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/d9/d9c92c307069c91922e976dc9e1663932fb3f15b586238742b9a8434e61e6c67.avif",
    image:
      "https://cdn.21st.dev/assets/mirror/61/61bddcda17909e2fedbf3733e812157d4954db38f6f0c24571416f75b92557a6.svg",
  },
  {
    name: "Aiko",
    profession: "Design Engineer",
    description:
      "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/d9/d9c92c307069c91922e976dc9e1663932fb3f15b586238742b9a8434e61e6c67.avif",
    image:
      "https://cdn.21st.dev/assets/mirror/61/61bddcda17909e2fedbf3733e812157d4954db38f6f0c24571416f75b92557a6.svg",
  },
  {
    name: "kinpe Zhukova",
    profession: "Software Engineer",
    description:
      "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results..",
    avatar:
      "https://cdn.21st.dev/assets/mirror/d9/d9c92c307069c91922e976dc9e1663932fb3f15b586238742b9a8434e61e6c67.avif",
    image:
      "https://cdn.21st.dev/assets/mirror/61/61bddcda17909e2fedbf3733e812157d4954db38f6f0c24571416f75b92557a6.svg",
  },
  {
    name: "Lisa Kemp",
    profession: "Frontend Developer",
    description:
      "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results..",
    avatar:
      "https://cdn.21st.dev/assets/mirror/d9/d9c92c307069c91922e976dc9e1663932fb3f15b586238742b9a8434e61e6c67.avif",
    image:
      "https://cdn.21st.dev/assets/mirror/61/61bddcda17909e2fedbf3733e812157d4954db38f6f0c24571416f75b92557a6.svg",
  },
  {
    name: "Saud",
    profession: "Game Developer",
    description:
      "Simple is the perfect tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/d9/d9c92c307069c91922e976dc9e1663932fb3f15b586238742b9a8434e61e6c67.avif",
    image:
      "https://cdn.21st.dev/assets/mirror/61/61bddcda17909e2fedbf3733e812157d4954db38f6f0c24571416f75b92557a6.svg",
  },
  {
    name: "Paula Smith",
    profession: "UX Designer",
    description:
      "Simple is a great tool for building user interfaces. It's easy to use and has a lot of features. I've been using it for a while now and I'm really happy with the results.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/d9/d9c92c307069c91922e976dc9e1663932fb3f15b586238742b9a8434e61e6c67.avif",
    image:
      "https://cdn.21st.dev/assets/mirror/61/61bddcda17909e2fedbf3733e812157d4954db38f6f0c24571416f75b92557a6.svg",
  },
];

export default function SlidingTestimonial() {
  return (
    <section
      className="mx-auto mt-section w-full overflow-hidden"
      aria-labelledby="testimonial-title"
    >
      <header className="mx-auto mb-7 max-w-xl px-4 text-center sm:mb-10">
        <BlurFade delay={50} duration={500} blur={3} yOffset={6}>
          <p className="mb-0 font-mono text-[10px] uppercase tracking-[0.15em] text-subtle">
            Client notes
          </p>
        </BlurFade>
        <h2
          id="testimonial-title"
          className="mb-0 mt-3 font-serif text-[clamp(1.8rem,3.8vw,2.7rem)] font-medium leading-tight tracking-[-0.04em] text-ink"
        >
          <RevealText text="What clients say" direction="left" duration={0.65} delay={100} />
        </h2>
        <BlurFade delay={220} duration={550} blur={4} yOffset={7}>
          <p className="mb-0 mt-3 text-sm leading-relaxed text-muted">
            Kind words from people building thoughtful digital experiences.
          </p>
        </BlurFade>
      </header>
      <div
        className="testimonial-mask w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:overflow-x-auto"
        role="region"
        aria-label="Client testimonials"
        tabIndex={0}
      >
        <Marquee
          direction="left"
          speed={52}
          gap={24}
          pauseOnHover
          className="w-full py-2 sm:gap-8"
        >
          {testimonials.map((testimonial) => (
            <Card
              variant="glass"
              className="flex min-h-[190px] w-[min(360px,calc(100vw-40px))] shrink-0 flex-col justify-between overflow-hidden rounded-card p-0 sm:min-h-[205px] sm:w-[clamp(330px,38vw,440px)]"
              key={testimonial.name}
            >
              <BlurFade delay={100} duration={550} blur={4} yOffset={7}>
                <p className="mb-0 px-5 py-5 font-serif text-[17px] font-normal leading-[1.5] text-ink sm:px-6 sm:py-6 sm:text-lg">
                  &ldquo;{testimonial.description}&rdquo;
                </p>
              </BlurFade>
              <footer className="flex min-h-[68px] items-center gap-3 border-t border-line px-4 py-3 sm:px-5">
                <Image
                  className="size-10 shrink-0 rounded-full border border-line object-cover"
                  src={testimonial.avatar}
                  alt=""
                  width={44}
                  height={44}
                  unoptimized
                />
                <div className="min-w-0 flex-1">
                  <h3 className="m-0 truncate text-xs font-semibold text-ink">
                    {testimonial.name}
                  </h3>
                  <p className="mb-0 mt-1 truncate text-[11px] text-muted">
                    {testimonial.profession}
                  </p>
                </div>
                <span className="h-8 w-px shrink-0 bg-line" aria-hidden="true" />
                <Image
                  className="h-9 w-[76px] shrink-0 object-contain opacity-70 grayscale sm:w-[92px]"
                  src={testimonial.image}
                  alt=""
                  width={112}
                  height={40}
                  unoptimized
                />
              </footer>
            </Card>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
