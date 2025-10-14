"use client"

import Image from "next/image"
import AutoScroll from "embla-carousel-auto-scroll"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

interface Logo {
  id: string
  description: string
  image: string
  className?: string
}

interface Logos3Props {
  heading?: string
  logos?: Logo[]
  className?: string
}

const DEFAULT_IMAGE_CLASS = "h-12 w-[160px] rounded-lg object-cover"

const Logos3 = ({
  heading = "Trusted by these companies",
  logos = [
    {
      id: "logo-1",
      description: "Product design workshop",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
      className: DEFAULT_IMAGE_CLASS,
    },
    {
      id: "logo-2",
      description: "Team collaborating on laptops",
      image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&q=80",
      className: DEFAULT_IMAGE_CLASS,
    },
    {
      id: "logo-3",
      description: "Developer working at a desk",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
      className: DEFAULT_IMAGE_CLASS,
    },
    {
      id: "logo-4",
      description: "Team celebrating success",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      className: DEFAULT_IMAGE_CLASS,
    },
    {
      id: "logo-5",
      description: "Modern workspace with neon lights",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80",
      className: DEFAULT_IMAGE_CLASS,
    },
    {
      id: "logo-6",
      description: "Developers pairing over code",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      className: DEFAULT_IMAGE_CLASS,
    },
    {
      id: "logo-7",
      description: "Conference networking event",
      image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=400&q=80",
      className: DEFAULT_IMAGE_CLASS,
    },
    {
      id: "logo-8",
      description: "Creative team brainstorming",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=400&q=80",
      className: DEFAULT_IMAGE_CLASS,
    },
  ],
  className,
}: Logos3Props) => {
  return (
    <section className={className}>
      <div className="container flex flex-col items-center text-center">
        <h1 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
          {heading}
        </h1>
      </div>
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true, stopOnInteraction: false })]}
          >
            <CarouselContent className="ml-0">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex shrink-0 items-center justify-center">
                    <div className="overflow-hidden rounded-xl bg-[color:var(--color-surface-muted)]/60 p-4 shadow-sm">
                      <Image
                        src={logo.image}
                        alt={logo.description}
                        width={160}
                        height={96}
                        className={logo.className ?? DEFAULT_IMAGE_CLASS}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  )
}

export { Logos3 }
