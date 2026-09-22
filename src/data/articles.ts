import { Article } from "@/types";
import { FACTS } from "./facts";

export const ARTICLES: Record<string, Article> = {
  "quantum-entanglement-instant-telemetry": {
    slug: "quantum-entanglement-instant-telemetry",
    factId: "fact-01",
    title: "Quantum Entanglement: How Particles Coordinate Across Light-Years Faster Than Light",
    subtitle: "Investigating the non-local fabric of spacetime and why Einstein's 'spooky action' is revolutionizing 21st-century communications.",
    category: "science-physics",
    categoryName: "Science & Physics",
    readTime: "4 mins read",
    publishedDate: "September 21, 2026",
    lastUpdated: "September 22, 2026",
    author: {
      name: "Dr. Aris Vance",
      role: "Quantum Biophysics Fellow",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    heroImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=85",
    imageCaption: "A laser-pumped beta barium borate crystal splitting ultraviolet photons into pairs of quantum-entangled daughter particles.",
    keyTakeaways: [
      "Entangled particles maintain zero-latency correlation regardless of the spatial distance separating them.",
      "The phenomenon does not violate special relativity because no classical message or faster-than-light data transfer occurs without a decryption key.",
      "Modern orbital satellites such as Micius have demonstrated entanglement teleportation over 1,200 km through vacuum space.",
      "Quantum key distribution (QKD) provides mathematically unbreakable encryption because eavesdropping alters particle spins instantly.",
    ],
    sections: [
      {
        heading: "The Paradox That Baffled Einstein",
        content: [
          "In 1935, Albert Einstein, Boris Podolsky, and Nathan Rosen published a legendary critique of quantum mechanics known as the EPR Paradox. Their central premise was that nothing in the universe could travel faster than light. Therefore, if measuring particle A instantly determined particle B's momentum or spin across light-years, either quantum mechanics was incomplete or reality embraced non-locality.",
          "Einstein held that particles must carry 'hidden variables'—pre-programmed internal instructions like a pair of shoes placed in separate boxes. If you open one box and find a left shoe, you immediately know the other box contains the right shoe, without any magical signal traversing space.",
        ],
        quote: "Physics should represent reality in time and space, free from spooky actions at a distance. — Albert Einstein, 1947",
      },
      {
        heading: "Bell's Theorem and the Death of Hidden Variables",
        content: [
          "In 1964, Northern Irish physicist John Stewart Bell devised a mathematical theorem capable of testing Einstein's hypothesis. If hidden variables dictated particle behavior, experimental measurements across random angular detectors would follow strict probabilistic limits.",
          "Over the subsequent six decades, dozens of ultra-precise optical experiments—culminating in the 2022 Nobel Prize in Physics awarded to Alain Aspect, John Clauser, and Anton Zeilinger—conclusively shattered Bell's inequalities. The universe is fundamentally non-local: the particles do not decide their spin until the precise moment of measurement.",
        ],
      },
      {
        heading: "Orbital Quantum Mesh and the Future Internet",
        content: [
          "Today, quantum entanglement has exited purely theoretical physics into production engineering. Ground stations in Europe and Asia are deploying optical quantum transceivers that beam single entangled photons to low-Earth orbit satellites.",
          "Because any unauthorized interception alters the superposition state and collapses the wave function, eavesdropping creates undeniable quantum noise. For global banking networks and sensitive scientific telemetry, this heralds the dawn of physically unhackable communication channels.",
        ],
      },
    ],
    didYouKnowBreakdowns: [
      {
        point: "Entangled Atoms",
        detail: "Scientists have successfully entangled entire clouds of thousands of rubidium atoms, not just isolated photons.",
      },
      {
        point: "Cosmic Test",
        detail: "In 2018, MIT researchers used light emitted from quasars 12 billion light-years away to choose detector angles, ruling out local hidden variables dating back to the dawn of the universe.",
      },
    ],
    sources: [
      {
        name: "Experimental proof of Bell inequalities violation",
        publication: "Physical Review Letters",
        url: "https://journals.aps.org/prl/",
      },
      {
        name: "Satellite-based entanglement distribution over 1200 kilometers",
        publication: "Science Magazine",
        url: "https://science.org",
      },
    ],
    relatedFactSlugs: [
      "neutron-stars-sugar-cube-pyramid",
      "voyager-1-golden-record-plasma-waves",
      "ai-transformer-attention-mechanism-human-working-memory",
    ],
  },
  "neutron-stars-sugar-cube-pyramid": {
    slug: "neutron-stars-sugar-cube-pyramid",
    factId: "fact-02",
    title: "Neutron Stars: The Extreme Physics of Collapsed Stellar Giants",
    subtitle: "Inside the celestial relics where atomic empty space is squeezed out of existence, creating densities beyond human comprehension.",
    category: "deep-space",
    categoryName: "Deep Space & Astronomy",
    readTime: "3 mins read",
    publishedDate: "September 19, 2026",
    lastUpdated: "September 20, 2026",
    author: {
      name: "Eleni Thorne",
      role: "Astrophysicist & Science Editor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    heroImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=85",
    imageCaption: "Rendering of a rapidly spinning pulsar with powerful magnetic dipole jets ionizing surrounding interstellar hydrogen.",
    keyTakeaways: [
      "A neutron star packs the mass of 1.4 to 2.1 Suns into a sphere just 20 kilometers in diameter.",
      "The gravitational force is 200 billion times stronger than Earth's surface gravity.",
      "Subatomic electron degeneracy pressure fails, forcing electrons and protons to merge into pure neutronium.",
      "Some neutron stars (magnetars) have magnetic fields strong enough to dissolve atomic bonds from thousands of miles away.",
    ],
    sections: [
      {
        heading: "When Stars Run Out of Fuel",
        content: [
          "Every living star exists in a delicate equilibrium: the inward crush of gravity versus the outward thermal pressure generated by nuclear fusion in its core. When massive stars run out of hydrogen and helium, they sequentially fuse heavier elements—carbon, neon, oxygen, and silicon—until iron fills the core.",
          "Because iron fusion absorbs energy rather than releasing it, the star's thermal furnace suddenly turns off. In a fraction of a second, gravitational collapse implodes the core at nearly 25% the speed of light, sparking a violent supernova.",
        ],
      },
      {
        heading: "One Billion Tons in a Coffee Spoon",
        content: [
          "Normal atoms are more than 99.9999999% empty space. If an atom's nucleus were the size of a marble in the center of a football stadium, the electrons would be gnats circling the upper bleachers. In a neutron star, gravity crushes those stadiums out of existence.",
          "The density is so absurd that a single cubic centimeter weighs approximately 400 million to 1 billion metric tons. Dropping a regular marshmallow onto the surface of a neutron star would release more kinetic explosive force than an atomic bomb.",
        ],
      },
    ],
    didYouKnowBreakdowns: [
      {
        point: "Starquakes",
        detail: "A crack of just one micrometer in a neutron star's iron crust triggers a starquake whose gamma-ray flash can blind Earth's space telescopes across the galaxy.",
      },
      {
        point: "Superfluid Core",
        detail: "The interior of a neutron star acts as a zero-friction neutron superfluid with zero electrical resistance.",
      },
    ],
    sources: [
      {
        name: "NICER Neutron Star Interior Composition Explorer",
        publication: "NASA Astrophysics Division",
      },
      {
        name: "Equation of State of Dense Matter in Neutron Stars",
        publication: "Annual Review of Nuclear and Particle Science",
      },
    ],
    relatedFactSlugs: [
      "quantum-entanglement-instant-telemetry",
      "saturn-titan-atmosphere-human-flight",
      "voyager-1-golden-record-plasma-waves",
    ],
  },
};

export function getArticleBySlug(slug: string): Article {
  if (ARTICLES[slug]) {
    return ARTICLES[slug];
  }

  // Generate a rich fallback article using fact metadata if not explicitly authored in dictionary
  const fact = FACTS.find((f) => f.slug === slug) || FACTS[0];

  return {
    slug: fact.slug,
    factId: fact.id,
    title: fact.title,
    subtitle: fact.hook,
    category: fact.category,
    categoryName: fact.categoryName,
    readTime: fact.readTime + " read",
    publishedDate: fact.date,
    lastUpdated: "September 2026",
    author: fact.author,
    heroImage: fact.imageUrl,
    imageCaption: `High-resolution telemetry capture related to ${fact.title}. Verified by the Nexus Editorial Science Board.`,
    keyTakeaways: [
      `${fact.hook}`,
      `Verified by multi-source peer evaluation: ${fact.source}.`,
      "Exhibits fundamental principles changing contemporary scientific understanding.",
      "Documented in modern empirical research repositories.",
    ],
    sections: [
      {
        heading: "Empirical Context & Discovery",
        content: [
          fact.summary,
          "Across multiple research institutes and observational laboratories, scientists have examined this anomaly to determine how fundamental laws of physics, biology, and historical documentation align with observed reality.",
          "The implications stretch beyond conventional academic curiosities, directly informing next-generation computational algorithms, ecological stewardship, and humanity's understanding of our universe.",
        ],
      },
      {
        heading: "Scientific Significance & Future Telemetry",
        content: [
          "As analytical tools continue to advance in resolution and computational power, researchers expect to uncover deeper sub-mechanisms governing this phenomenon.",
          "The intersection of empirical observation and technological experimentation ensures that this discovery will serve as a foundational milestone for decades to come.",
        ],
      },
    ],
    didYouKnowBreakdowns: [
      {
        point: "Primary Metric",
        detail: fact.statHighlight ? `${fact.statHighlight.value} — ${fact.statHighlight.label}` : "Extensively verified in peer-reviewed journals.",
      },
      {
        point: "Source Attribution",
        detail: `Original data logged via ${fact.source}.`,
      },
    ],
    sources: [
      {
        name: fact.source,
        publication: "Nexus Verified Repository",
        url: fact.sourceUrl || "#",
      },
    ],
    relatedFactSlugs: FACTS.filter((f) => f.slug !== fact.slug)
      .slice(0, 3)
      .map((f) => f.slug),
  };
}
