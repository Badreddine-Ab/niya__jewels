import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notre Histoire — NIYA Jewels",
  description: "L'histoire de Najih Hiba et de la naissance de NIYA Jewels.",
}

export default function NotreHistoire() {
  return (
    <div className="bg-cream-50 min-h-screen">

      {/* HERO: Full-bleed portrait with gradient overlay */}
      <div className="relative overflow-hidden" style={{ height: "88vh", maxHeight: "920px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hiba-portrait.jpg"
          alt="Najih Hiba — Fondatrice NIYA Jewels"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 15%" }}
        />

        {/* Gradient: subtle top darkening + strong bottom overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,26,26,0.12) 0%, rgba(26,26,26,0.02) 35%, rgba(26,26,26,0.72) 85%, rgba(26,26,26,0.85) 100%)",
          }}
        />

        {/* Title — pinned to bottom of the photo */}
        <div className="absolute bottom-0 left-0 right-0 px-8 sm:px-16 pb-10 text-center">
          <span className="text-rose-300 text-[9px] tracking-[0.5em] uppercase font-light block mb-3">
            La fondatrice
          </span>
          <h1
            className="text-cream-50"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              textShadow: "0 2px 24px rgba(0,0,0,0.4)",
            }}
          >
            Notre Histoire
          </h1>
          <div className="flex items-center justify-center gap-5 mt-5">
            <div className="w-14 h-px bg-gold-400 opacity-55" />
            <span className="text-gold-400 opacity-60 text-xs">♡</span>
            <div className="w-14 h-px bg-gold-400 opacity-55" />
          </div>
        </div>
      </div>

      {/* Author identity card */}
      <div className="bg-white border-b border-rose-100 py-7 px-6 text-center">
        <p
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "1.9rem",
            color: "#C9A96E",
            lineHeight: 1.2,
          }}
        >
          Najih Hiba
        </p>
        <p className="text-charcoal-400 text-[9px] tracking-[0.45em] uppercase font-light mt-1.5">
          Fondatrice &amp; Créatrice · NIYA Jewels
        </p>
      </div>

      {/* Story content */}
      <div className="py-20 px-6">
        <div className="max-w-[680px] mx-auto">

          {/* Chapter label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-6 h-px bg-rose-300" />
            <span className="text-rose-400 text-[9px] tracking-[0.45em] uppercase font-light">
              Les débuts
            </span>
          </div>

          {/* Editorial lede */}
          <h2
            className="mb-10 text-charcoal-800"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
              fontWeight: 300,
              lineHeight: 1.3,
              letterSpacing: "0.02em",
            }}
          >
            Niya n&apos;est pas née dans le bruit…{" "}
            <em style={{ color: "#C85572", fontStyle: "italic" }}>
              elle est née dans le silence.
            </em>
          </h2>

          {/* Story paragraphs */}
          <div
            className="space-y-6 text-charcoal-500 font-light"
            style={{ fontSize: "0.95rem", lineHeight: 2, letterSpacing: "0.02em" }}
          >
            <p>Je m&apos;appelle Najih Hiba.</p>
            <p>
              Dans ces moments où le cœur parle doucement, mais avec une vérité immense.
            </p>
            <p>
              C&apos;est une histoire qui commence avec presque rien… juste une{" "}
              <em style={{ color: "#C9A96E", fontStyle: "italic" }}>niya</em>, une intention
              sincère, fragile mais pleine de vie.
            </p>
            <p>
              Je me souviens de ces jours où tout semblait incertain. Un stage, des moyens
              limités, mais un cœur rempli de rêves. Un désir profond de devenir cette femme
              capable de créer, de construire, d&apos;exister pleinement… même quand tout paraît
              difficile.
            </p>
          </div>

          {/* Pull quote */}
          <blockquote
            className="my-16 py-8 px-2 text-center"
            style={{ borderTop: "1px solid #EDA0B0", borderBottom: "1px solid #EDA0B0" }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.35rem, 3vw, 2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "#8A2F47",
                lineHeight: 1.55,
                letterSpacing: "0.02em",
              }}
            >
              &ldquo;Tout commence par l&apos;amour,<br />
              la volonté et la persévérance.&rdquo;
            </p>
          </blockquote>

          {/* Continuation */}
          <div
            className="space-y-6 text-charcoal-500 font-light"
            style={{ fontSize: "0.95rem", lineHeight: 2, letterSpacing: "0.02em" }}
          >
            <p>
              <strong className="font-normal" style={{ color: "#C85572" }}>
                Niya, c&apos;est cette étincelle.
              </strong>{" "}
              Celle qui naît au fond de soi quand on refuse d&apos;abandonner. Celle qui grandit
              doucement, nourrie par l&apos;espoir, la patience et la foi en soi.
            </p>
            <p>
              Chaque détail, chaque pas, chaque création porte une part de mon histoire… une
              part de mes doutes, mais surtout une part de ma force.
            </p>
            <p>
              Ce n&apos;est pas seulement une marque.<br />
              C&apos;est une émotion. Une énergie. Une présence.
            </p>
            <p>
              Et aujourd&apos;hui, si Niya continue de grandir…<br />
              c&apos;est parce qu&apos;elle résonne avec vous.
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "#2D2D2D",
                letterSpacing: "0.025em",
              }}
            >
              Parce qu&apos;au fond, nous avons tous une niya qui attend de devenir quelque chose
              de grand.
            </p>
          </div>

          {/* Instagram CTA */}
          <div className="pt-14 flex justify-center">
            <a
              href="https://www.instagram.com/niya__jewels"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-rose-500 text-white text-[10px] tracking-[0.3em] uppercase font-light hover:bg-rose-600 transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Suivre sur Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Closing banner */}
      <div className="bg-rose-50 border-t border-rose-100 py-16 px-6 text-center">
        <p
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            color: "#C85572",
            lineHeight: 1.4,
          }}
        >
          Merci de faire partie de l&apos;aventure NIYA ♡
        </p>
      </div>
    </div>
  )
}
