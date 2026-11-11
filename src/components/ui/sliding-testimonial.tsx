import Image from "next/image";

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

function TestimonialCards({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 gap-6" aria-hidden={duplicate}>
      {testimonials.map((testimonial) => (
        <article className="flex min-h-[168px] w-[min(390px,calc(100vw-54px))] shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-border bg-card text-card-foreground sm:min-h-[178px] sm:w-[clamp(300px,42vw,460px)]" key={testimonial.name}>
          <p className="m-0 px-[17px] py-[17px] font-serif text-[17px] font-normal leading-[1.45] text-foreground sm:px-[22px] sm:py-[21px] sm:text-[clamp(17px,1.7vw,22px)]">
            &ldquo;{testimonial.description}&rdquo;
          </p>
          <footer className="flex min-h-[65px] items-center gap-[9px] border-t border-border px-[13px] py-2.5 sm:gap-3 sm:px-[17px]">
            <Image
              className="size-[35px] shrink-0 rounded-full border border-border object-cover sm:size-10"
              src={testimonial.avatar}
              alt=""
              width={44}
              height={44}
              unoptimized
            />
            <div className="min-w-0 flex-1">
              <h3 className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-semibold text-foreground">{testimonial.name}</h3>
              <p className="mt-[3px] overflow-hidden text-ellipsis whitespace-nowrap text-[10px] text-muted-foreground">{testimonial.profession}</p>
            </div>
            <span className="h-[31px] w-px shrink-0 bg-border" aria-hidden="true" />
            <Image
              className="h-[34px] w-[70px] shrink-0 object-contain opacity-70 grayscale sm:w-[92px]"
              src={testimonial.image}
              alt=""
              width={112}
              height={40}
              unoptimized
            />
          </footer>
        </article>
      ))}
    </div>
  );
}

export default function SlidingTestimonial() {
  return (
    <section className="mx-auto mt-[68px] w-full max-w-[1500px] overflow-hidden sm:mt-[clamp(64px,9vw,126px)]" aria-labelledby="testimonial-title">
      <header className="mx-auto mb-[22px] px-4 text-center sm:mb-[30px]">
        <p className="m-0 font-mono text-[9px] leading-relaxed tracking-[.12em] text-[#898781]">CLIENT NOTES</p>
        <h2 id="testimonial-title" className="mt-[9px] font-serif text-[27px] font-medium leading-tight text-[#181817] sm:text-[clamp(27px,3vw,38px)]">What clients say</h2>
        <span className="mt-[9px] block text-xs text-[#73716d]">Kind words from people building thoughtful digital experiences.</span>
      </header>
      <div
        className="w-full overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] motion-reduce:overflow-x-auto"
        aria-label="Client testimonials"
        tabIndex={0}
      >
        <div className="flex w-max animate-x-slider gap-6 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none sm:gap-10">
          <TestimonialCards />
          <TestimonialCards duplicate />
        </div>
      </div>
    </section>
  );
}