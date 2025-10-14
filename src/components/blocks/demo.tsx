import { Logos3 } from "@/components/blocks/logos3"

const imageClass = "h-12 w-[160px] rounded-lg object-cover"

const demoData = {
  heading: "Trusted by these companies",
  logos: [
    {
      id: "logo-1",
      description: "Creative agency workspace",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
      className: imageClass,
    },
    {
      id: "logo-2",
      description: "Design sprint planning",
      image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&q=80",
      className: imageClass,
    },
    {
      id: "logo-3",
      description: "Product review meeting",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
      className: imageClass,
    },
    {
      id: "logo-4",
      description: "Engineering stand-up",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      className: imageClass,
    },
    {
      id: "logo-5",
      description: "Startup founders collaborating",
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80",
      className: imageClass,
    },
    {
      id: "logo-6",
      description: "Pair programming session",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      className: imageClass,
    },
    {
      id: "logo-7",
      description: "Community meetup",
      image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=400&q=80",
      className: imageClass,
    },
    {
      id: "logo-8",
      description: "Strategy workshop",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=400&q=80",
      className: imageClass,
    },
  ],
}

function Logos3Demo() {
  return <Logos3 {...demoData} />
}

export { Logos3Demo }
