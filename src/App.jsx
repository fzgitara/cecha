import { useEffect, useRef, useState } from "react";
import {
  person,
  summary,
  experience,
  skills,
  projects,
  education,
} from "./content.js";

const wrap = "mx-auto max-w-6xl px-6 md:px-10";
const link =
  "underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Nav() {
  const links = ["Projects", "Experience", "Skills", "Contact"];
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper">
      <div className={`${wrap} flex items-center justify-between py-4`}>
        <a href="#top" className="font-display text-2xl leading-none">
          Cecha
        </a>
        <nav className="flex gap-5 text-sm text-soft sm:gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-ink">
              {l}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const facts = [
    ["Based in", person.location],
    ["Focus", person.tagline],
    ["Experience", "7+ years"],
    ["Status", "Open to full-time roles"],
  ];
  return (
    <section id="top" className={`${wrap} grid gap-14 pt-16 pb-20 md:pt-24 lg:grid-cols-[1.7fr_1fr] lg:gap-20`}>
      <div>
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {person.role}
        </p>
        <h1 className="font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.5rem]">
          <em className="text-soft">Fachrizal</em>
          <br />
          Gita Rahmanda
        </h1>
        <p className="mt-10 max-w-xl leading-relaxed text-soft">{summary}</p>
      </div>

      <dl className="self-end border-t border-line">
        {facts.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 border-b border-line py-3.5 text-sm">
            <dt className="font-mono text-xs uppercase tracking-widest text-soft">{k}</dt>
            <dd className="text-right">{v}</dd>
          </div>
        ))}
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-5 text-sm">
          <a href={`mailto:${person.email}`} className={link}>
            Email
          </a>
          <a href={person.github} className={link}>
            GitHub
          </a>
          <a href={person.linkedin} className={link}>
            LinkedIn
          </a>
        </div>
      </dl>
    </section>
  );
}

function SectionTitle({ index, children }) {
  return (
    <div className="mb-12 flex items-baseline gap-4 border-b border-line pb-4">
      <span className="font-mono text-xs text-accent">{index}</span>
      <h2 className="font-display text-4xl sm:text-5xl">{children}</h2>
    </div>
  );
}

function Shot({ project }) {
  const host = new URL(project.url).host;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.name}`}
      className="group block overflow-hidden rounded-lg border border-line bg-raised"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-xs text-soft">
        <span>{host}</span>
        <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          visit ↗
        </span>
      </div>
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          width="1440"
          height="900"
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </a>
  );
}

function Projects() {
  return (
    <section id="projects" className={`${wrap} scroll-mt-16 py-20`}>
      <SectionTitle index="01">Selected work</SectionTitle>
      <div className="space-y-24">
        {projects.map((p, i) => (
          <Reveal key={p.name} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
              <Shot project={p} />
            </div>
            <div className="lg:col-span-5">
              <h3 className="font-display text-4xl">{p.name}</h3>
              <p className="mt-4 leading-relaxed text-soft">{p.desc}</p>
              <p className="mt-5 font-mono text-xs text-soft">{p.stack.join("  /  ")}</p>
              <a href={p.url} target="_blank" rel="noreferrer" className={`${link} mt-6 inline-block text-sm`}>
                Visit site ↗
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className={`${wrap} scroll-mt-16 py-20`}>
      <SectionTitle index="02">Experience</SectionTitle>
      <div className="divide-y divide-line">
        {experience.map((job) => (
          <Reveal key={job.role + job.org} className="grid gap-3 py-8 first:pt-0 md:grid-cols-[14rem_1fr] md:gap-10">
            <p className="font-mono text-xs text-soft md:pt-1.5">{job.period}</p>
            <div>
              <h3 className="text-lg font-medium">
                {job.role} <span className="text-accent">·</span> {job.org}
              </h3>
              <ul className="mt-3 max-w-2xl space-y-2 text-sm leading-relaxed text-soft">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className={`${wrap} scroll-mt-16 py-20`}>
      <SectionTitle index="03">Skills</SectionTitle>
      <dl className="divide-y divide-line border-y border-line">
        {skills.map((s) => (
          <div key={s.group} className="grid gap-1.5 py-5 md:grid-cols-[14rem_1fr] md:gap-10">
            <dt className="font-mono text-xs uppercase tracking-widest text-soft md:pt-0.5">{s.group}</dt>
            <dd>{s.items}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className={`${wrap} scroll-mt-16 pt-20 pb-24`}>
      <SectionTitle index="04">Contact</SectionTitle>
      <Reveal>
        <p className="max-w-xl text-soft">
          Open to full-time roles and interesting side projects. Based in Gresik, Indonesia —
          happy to work remote or relocate.
        </p>
        <a
          href={`mailto:${person.email}`}
          className="mt-8 inline-block break-all font-display text-4xl underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent sm:text-6xl"
        >
          {person.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
          <a href={`tel:${person.phone.replace(/\s/g, "")}`} className={link}>
            {person.phone}
          </a>
          <a href={person.github} className={link}>
            github.com/fzgitara
          </a>
          <a href={person.linkedin} className={link}>
            linkedin.com/in/fzgitara
          </a>
        </div>

        <div className="mt-20 grid gap-10 border-t border-line pt-10 text-sm text-soft md:grid-cols-2">
          <div>
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest">Education</h3>
            {education.map((e) => (
              <p key={e.school}>
                <span className="text-ink">{e.school}</span> — {e.detail}
              </p>
            ))}
          </div>
          <p className="leading-relaxed">
            Also plays in{" "}
            <a href="https://open.spotify.com/artist/5qs51CER7OntyvT3Gy7kNU" className={`${link} text-ink`}>
              Melody of Jessica
            </a>
            , a Gresik band whose song became a terrace anthem for Gresik United fans.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-line py-8">
        <div className={`${wrap} flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-soft`}>
          <span>© 2026 Fachrizal Gita Rahmanda</span>
          <span>Built with React + Vite</span>
        </div>
      </footer>
    </div>
  );
}
