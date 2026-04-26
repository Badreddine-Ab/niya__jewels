const REVIEWS = [
  {
    name: "Yasmine B.",
    city: "Casablanca",
    rating: 5,
    text: "Je suis tombée amoureuse du collier cœur dès que je l'ai reçu. La qualité est incroyable, exactement comme sur les photos. Je l'ai déjà porté trois fois cette semaine !",
    product: "Collier Cœur Doré",
    date: "avril 2026",
  },
  {
    name: "Soukaina M.",
    city: "Rabat",
    rating: 5,
    text: "Les boucles d'oreilles fleurs sont magnifiques. Légères, élégantes, elles attirent tous les regards. La livraison était rapide et l'emballage tellement soigné ♡",
    product: "Boucles Fleur Dorée",
    date: "avril 2026",
  },
  {
    name: "Imane R.",
    city: "Marrakech",
    rating: 5,
    text: "NIYA Jewels c'est vraiment une pépite ! J'ai commandé la bague lune et elle est parfaite. Très bonne qualité, je recommande sans hésitation à toutes mes amies.",
    product: "Bague Croissant de Lune",
    date: "mars 2026",
  },
  {
    name: "Nadia K.",
    city: "Paris",
    rating: 5,
    text: "Expatriée en France, je cherchais des bijoux qui me rappellent chez moi. NIYA c'est exactement ça — de l'authenticité, de l'élégance et une touche marocaine unique.",
    product: "Set Cœur Doré",
    date: "mars 2026",
  },
  {
    name: "Hajar T.",
    city: "Fès",
    rating: 5,
    text: "Un cadeau pour ma sœur qui a adoré ! Les boucles perle sont raffinées et très tendance. Je reviendrai commander pour moi. Merci NIYA pour ce beau travail.",
    product: "Boucles Perle Dorée",
    date: "avril 2026",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#E07A90", fontSize: "11px" }}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="content-container">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-rose-400 text-[9px] tracking-[0.5em] uppercase font-light block mb-4">
            Elles nous font confiance
          </span>
          <h2
            className="text-charcoal-800"
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            Leurs avis
          </h2>
          <div className="flex items-center justify-center gap-4 my-5">
            <div className="w-10 h-px bg-rose-200" />
            <span className="text-rose-300 text-sm">♡</span>
            <div className="w-10 h-px bg-rose-200" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} style={{ color: "#E07A90", fontSize: "16px" }}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-charcoal-400 text-sm font-light ml-1.5">5.0 · 47 avis</span>
          </div>
        </div>

        {/* Top 3 reviews — editorial columns */}
        <div className="grid grid-cols-1 small:grid-cols-3 gap-0 divide-y small:divide-y-0 small:divide-x divide-rose-100">
          {REVIEWS.slice(0, 3).map((review, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 px-0 small:px-8 py-8 small:py-0 first:pl-0 last:pr-0"
            >
              {/* Stars */}
              <Stars count={review.rating} />

              {/* Large decorative quote mark */}
              <span
                className="select-none leading-none -mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3.5rem",
                  lineHeight: 0.75,
                  color: "#EDA0B0",
                  display: "block",
                }}
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p
                className="text-charcoal-600 font-light flex-1"
                style={{ fontSize: "0.88rem", lineHeight: 1.9, letterSpacing: "0.015em" }}
              >
                {review.text}
              </p>

              {/* Attribution */}
              <div className="pt-5 border-t border-rose-50">
                <p className="text-charcoal-700 text-xs font-light tracking-wider">
                  {review.name}
                </p>
                <p className="text-charcoal-300 text-[10px] font-light mt-0.5">
                  {review.city} · {review.date}
                </p>
                <p className="text-rose-400 text-[9px] font-light tracking-wide mt-1.5">
                  {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-rose-100" />
          <span className="text-rose-300 text-sm">♡</span>
          <div className="flex-1 h-px bg-rose-100" />
        </div>

        {/* Bottom 2 reviews — horizontal with avatar initial */}
        <div className="grid grid-cols-1 small:grid-cols-2 gap-8">
          {REVIEWS.slice(3).map((review, i) => (
            <div key={i} className="flex gap-5">
              {/* Avatar circle */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center mt-0.5">
                <span className="text-rose-400 text-xs font-light">
                  {review.name.charAt(0)}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <Stars count={review.rating} />
                <p
                  className="text-charcoal-600 font-light"
                  style={{ fontSize: "0.88rem", lineHeight: 1.85, letterSpacing: "0.015em" }}
                >
                  {review.text}
                </p>
                <div>
                  <p className="text-charcoal-700 text-xs font-light tracking-wider">
                    {review.name}
                  </p>
                  <p className="text-charcoal-300 text-[10px] font-light mt-0.5">
                    {review.city} · {review.date}
                  </p>
                  <p className="text-rose-400 text-[9px] font-light tracking-wide mt-1">
                    {review.product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-14">
          <p className="text-charcoal-400 text-xs font-light tracking-wider">
            Partagez votre expérience sur Instagram avec{" "}
            <span className="text-rose-400">#NiyaJewels</span>
          </p>
        </div>
      </div>
    </section>
  )
}
