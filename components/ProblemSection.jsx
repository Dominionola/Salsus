import Link from "next/link";
import Image from "next/image";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";

export default function ProblemSection() {
    const problems = [
        {
            image: "/images/lab_research.png",
            title: "Unknown Ingredients",
            subtitle: "The Blind Spot",
            desc: "Many consumers take medication without understanding the active ingredients or their potential side effects."
        },
        {
            image: "/images/medication_dosage.png",
            title: "Silent Overdose",
            subtitle: "Dosage Risks",
            desc: "Without clear dosage guidance, common drugs can become toxic. We flag high-strength formulations instantly."
        },
        {
            image: "/images/fragmented_data.png",
            title: "Fragmented Data",
            subtitle: "Verification Limits",
            desc: "Official registries exist but are hard to navigate. We unify this data into a single, readable risk score."
        }
    ];

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div className="max-w-xl">
                    <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4 font-medium leading-tight">
                        The Safety Gap
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Why we built the intelligence layer for public health. Addressing the critical disconnects in modern medication safety.
                    </p>
                </div>

                <Link href="#" className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors mt-6 md:mt-0">
                    LEARN MORE <ArrowLongRightIcon className="w-5 h-5" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {problems.map((item, index) => (
                    <Card key={index} className="border-none shadow-none bg-transparent group overflow-hidden">
                        <div className="relative aspect-[4/3] w-full mb-6 rounded-2xl overflow-hidden border border-primary/10">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Floating Label */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-primary rounded-full uppercase tracking-widest border border-primary/10">
                                    0{index + 1}
                                </span>
                            </div>
                        </div>

                        <CardContent className="px-0">
                            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2 font-bold">{item.subtitle}</p>
                            <h3 className="font-serif text-2xl text-foreground mb-3 font-medium group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-sm text-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-4">
                                {item.desc}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
