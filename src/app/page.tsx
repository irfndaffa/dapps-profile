import AboutPortrait from "@/components/about-portrait";
import ExperienceAccordion from "@/components/experience-accordion";
import MobileNav from "@/components/mobile-nav";
import Reveal from "@/components/reveal";
import StatCounter from "@/components/stat-counter";
import {
  achievement,
  activities,
  education,
  experience,
  languages,
  profile,
  skillGroups,
  stats,
} from "@/lib/profile-data";
import { skillIconMap } from "@/lib/skill-icons";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
];

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-paper/70 backdrop-blur-xl backdrop-saturate-150">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5 sm:px-8"
        >
          <a
            href="#top"
            aria-label={profile.name}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-sm font-bold tracking-tight text-white transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-accent-hover active:scale-95"
          >
            ID
          </a>
          <div className="hidden items-center gap-7 text-xs text-ink-soft md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <MobileNav links={navLinks} />
            <a
              href="#contact"
              className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-accent-hover active:opacity-80"
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[88svh] flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8">
          <div className="aurora" />
          <Reveal>
            <p className="text-base font-medium text-ink-soft sm:text-lg">
              Hello, I&rsquo;m
            </p>
            <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              {profile.name}
            </h1>
            <p className="mt-5 text-xl font-semibold tracking-tight text-accent sm:text-3xl">
              {profile.role}.
            </p>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {profile.tagline}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:bg-accent-hover active:scale-[0.98]"
              >
                Get in touch
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                View LinkedIn
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  ›
                </span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-16 grid w-full max-w-md grid-cols-3 gap-4 border-t border-hairline pt-8">
              {stats.map((stat) => (
                <StatCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </Reveal>
        </section>

        {/* About */}
        <section id="about" className="bg-paper-alt">
          <AboutPortrait />
          <div className="relative z-10 mx-auto max-w-3xl px-5 pb-24 sm:px-8 sm:pb-32">
            <Reveal>
              <h2 className="about-heading -mt-36 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tight sm:-mt-48 sm:text-6xl">
                Backend first. Reliability always.
              </h2>
              {profile.about.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Experience */}
        <section id="experience">
          <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Experience
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                Six years across enterprise finance systems, SaaS platforms, and
                mobile — with backend engineering at the core. Tap a role to
                expand it.
              </p>
            </Reveal>

            <div className="mt-14">
              {experience.map((job) => (
                <Reveal key={`${job.role}-${job.period}`}>
                  <ExperienceAccordion job={job} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="bg-paper-alt">
          <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                What I work with
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {skillGroups.map((group, index) => (
                <Reveal key={group.title} delay={index * 60}>
                  <div className="h-full rounded-3xl bg-paper p-8">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {group.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{group.note}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((item) => {
                        const Icon = skillIconMap[item.icon];
                        return (
                          <li
                            key={item.name}
                            className="skill-chip flex items-center gap-2 rounded-full border border-hairline px-3.5 py-1.5 text-sm text-ink"
                          >
                            <Icon
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 text-ink-soft"
                            />
                            {item.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education">
          <div className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Education & beyond
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
              <Reveal>
                <div className="flex h-full flex-col justify-between rounded-3xl bg-paper-alt p-8 sm:p-10">
                  <div>
                    <p className="text-sm font-medium text-ink-soft">
                      {education.period}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                      {education.school}
                    </h3>
                    <p className="mt-2 text-base text-ink-soft">
                      {education.degree}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      GPA {education.gpa}
                    </p>
                  </div>
                  <div className="mt-8 border-t border-hairline pt-6">
                    <p className="text-sm font-semibold">{achievement.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">
                      {achievement.detail}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="h-full rounded-3xl bg-paper-alt p-8 sm:p-10">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Campus activities
                  </h3>
                  <ul className="mt-6 space-y-6">
                    {activities.map((activity) => (
                      <li key={activity.title}>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                          {activity.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 border-t border-hairline pt-6">
                    <h3 className="text-sm font-semibold">Languages</h3>
                    <ul className="mt-3 space-y-1.5">
                      {languages.map((language) => (
                        <li
                          key={language.name}
                          className="text-sm text-ink-soft"
                        >
                          {language.name} · {language.level}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-paper-alt">
          <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
            <Reveal>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Let&rsquo;s build something reliable.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
                Open to backend engineering opportunities and interesting
                technical conversations.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-[background-color,transform] duration-200 hover:bg-accent-hover active:scale-[0.98]"
                >
                  Email me
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
                >
                  Connect on LinkedIn
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    ›
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors duration-200 hover:text-ink"
            >
              {profile.email}
            </a>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-ink"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
