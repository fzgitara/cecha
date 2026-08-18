import {
  person,
  summary,
  experience,
  skills,
  projects,
  education,
} from "./content.js";

function Nav() {
  const links = ["Projects", "Experience", "Skills", "Contact"];
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          Cecha
        </a>
        <nav className="hidden gap-6 text-sm text-soft sm:flex">
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

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-2xl scroll-mt-10 px-6 py-14">
      <h2 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-soft">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-2xl px-6 pt-16 pb-4">
      <p className="mb-4 font-mono text-xs text-soft">{person.location}</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {person.name}
      </h1>
      <p className="mt-3 text-lg font-medium text-ink">
        {person.role}
        <span className="text-soft"> — {person.tagline}</span>
      </p>
      <p className="mt-6 max-w-xl leading-relaxed text-soft">{summary}</p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a href={`mailto:${person.email}`} className="underline underline-offset-4 hover:text-soft">
          {person.email}
        </a>
        <a href={person.github} className="underline underline-offset-4 hover:text-soft">
          GitHub
        </a>
        <a href={person.linkedin} className="underline underline-offset-4 hover:text-soft">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-10">
        {experience.map((job) => (
          <article key={job.role + job.org}>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-semibold">
                {job.role} <span className="font-normal text-soft">— {job.org}</span>
              </h3>
              <p className="font-mono text-xs text-soft sm:text-right">{job.period}</p>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-soft">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-soft/60" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {skills.map((s) => (
          <div key={s.group}>
            <h3 className="mb-1.5 text-sm font-semibold">{s.group}</h3>
            <p className="text-sm leading-relaxed text-soft">{s.items}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="space-y-8">
        {projects.map((p) => (
          <div key={p.name}>
            <h3 className="font-semibold">
              <a href={p.url} className="underline underline-offset-4 hover:text-soft">
                {p.name}
              </a>
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-soft">{p.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-xl leading-relaxed text-soft">
        Open to full-time roles and interesting side projects. Currently based in
        Gresik, Indonesia — happy to work remote or relocate.
      </p>
      <div className="mt-6 space-y-1.5 font-mono text-sm">
        <p>
          <span className="text-soft">email&nbsp;&nbsp;&nbsp;</span>
          <a href={`mailto:${person.email}`} className="underline underline-offset-4 hover:text-soft">
            {person.email}
          </a>
        </p>
        <p>
          <span className="text-soft">phone&nbsp;&nbsp;</span>
          <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="underline underline-offset-4 hover:text-soft">
            {person.phone}
          </a>
        </p>
        <p>
          <span className="text-soft">github&nbsp;</span>
          <a href={person.github} className="underline underline-offset-4 hover:text-soft">
            github.com/fzgitara
          </a>
        </p>
        <p>
          <span className="text-soft">linkedin</span>
          <a href={person.linkedin} className="underline underline-offset-4 hover:text-soft">
            {" "}
            linkedin.com/in/fzgitara
          </a>
        </p>
      </div>
      <div className="mt-10 space-y-1">
        <h3 className="text-sm font-semibold">Education</h3>
        {education.map((e) => (
          <p key={e.school} className="text-sm text-soft">
            {e.school} — {e.detail}
          </p>
        ))}
      </div>
      <p className="mt-10 text-sm leading-relaxed text-soft">
        Also plays in <a href="https://open.spotify.com/artist/5qs51CER7OntyvT3Gy7kNU" className="text-ink underline underline-offset-4 hover:text-soft">Melody of Jessica</a> — a
        Gresik band whose song became a terrace anthem for Gresik United fans.
      </p>
    </Section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <hr className="mx-auto max-w-2xl border-line" />
        <Projects />
        <hr className="mx-auto max-w-2xl border-line" />
        <Experience />
        <hr className="mx-auto max-w-2xl border-line" />
        <Skills />
        <hr className="mx-auto max-w-2xl border-line" />
        <Contact />
      </main>
      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-between gap-2 px-6 font-mono text-xs text-soft">
          <span>© 2026 Fachrizal Gita Rahmanda</span>
          <span>Built with React + Vite</span>
        </div>
      </footer>
    </div>
  );
}
