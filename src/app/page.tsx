import Link from "next/link";
import { HandDrawnCard, HandDrawnButton, SectionHeader } from "@/components/ui";
import { tokens } from "@/lib/design";

const cards = [
  {
    title: "Farm Visit Research Guide",
    description: "Field-ready questions, observation checklists, and a problem-to-product mapper for every farm visit.",
    href: "/farm-visit-research-guide",
    accent: tokens.colors.accent,
  },
  {
    title: "Livestock Tech Stack",
    description: "Competitive intelligence, PRD requirements, and tradeoff mapping across the leading livestock AgTech platforms.",
    href: "/livestock-tech-stack",
    accent: tokens.colors.secondary,
  },
];

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: tokens.colors.background, color: tokens.colors.foreground, fontFamily: "var(--font-patrick)" }}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:px-14">
        <SectionHeader title="Herdos" subtitle="Hand-Drawn AgTech Toolkit" accent={tokens.colors.secondary} />
        <p style={{ maxWidth: 720, fontSize: "1.05rem", lineHeight: 1.8, color: tokens.colors.foreground, marginBottom: 32 }}>
          A sketchbook-inspired product system for farmer research, livestock market analysis, and early-stage AgTech strategy. Everything here is built to feel handcrafted, approachable, and easy to reuse.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {cards.map(card => (
            <HandDrawnCard key={card.href} style={{ padding: 24, minHeight: 260, display: "flex", flexDirection: "column", justifyContent: "space-between", borderColor: card.accent }}>
              <div>
                <div style={{ color: card.accent, fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 12 }}>
                  {card.title.replace(/\s/g, " ")}
                </div>
                <h2 style={{ margin: 0, fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)", lineHeight: 1.05 }}>{card.title}</h2>
                <p style={{ margin: "18px 0 0", color: tokens.colors.foreground, opacity: 0.86, lineHeight: 1.75 }}>{card.description}</p>
              </div>
              <Link href={card.href} style={{ alignSelf: "flex-start", marginTop: 24 }}>
                <HandDrawnButton type="button">Explore</HandDrawnButton>
              </Link>
            </HandDrawnCard>
          ))}
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <HandDrawnCard style={{ padding: 24 }}>
            <div style={{ fontSize: "0.85rem", color: tokens.colors.secondary, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
              Why hand-drawn?
            </div>
            <p style={{ margin: 0, color: tokens.colors.foreground, lineHeight: 1.75 }}>
              This system embraces paper textures, wobbly borders, and playful typography so the product feels collaborative rather than corporate. It is designed for research, field work, and storytelling.
            </p>
          </HandDrawnCard>
          <HandDrawnCard style={{ padding: 24 }}> 
            <div style={{ fontSize: "0.85rem", color: tokens.colors.accent, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
              Built for reuse
            </div>
            <p style={{ margin: 0, color: tokens.colors.foreground, lineHeight: 1.75 }}>
              Shared tokens and UI primitives keep the look consistent across the app while making future pages faster to build. Every component here is meant to be composable.
            </p>
          </HandDrawnCard>
        </div>
      </div>
    </main>
  );
}
