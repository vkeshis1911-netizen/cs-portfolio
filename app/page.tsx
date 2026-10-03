import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Download,
  Globe,
  Braces,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NeuralPortrait } from "@/components/neural-portrait"
import { FocusTicker } from "@/components/focus-ticker"

type TimelineItem = { title: string; subtitle: string; date: string; description?: string }

const cardHover =
  "group cursor-pointer shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
const iconTile =
  "h-10 w-10 shrink-0 rounded-xl border border-brand/20 bg-brand/10 text-brand flex items-center justify-center"
const tagStyle = "font-mono text-[11px] font-normal text-muted-foreground bg-background"
const ctaStyle = "text-sm font-medium inline-flex items-center text-foreground group-hover:text-brand transition-colors"

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">
        {index} <span className="text-muted-foreground/50">/</span> {eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{description}</p>}
    </div>
  )
}

export default function Home() {
  const mostRecentProject = {
    title: "BladeForge",
    description:
      "An open-source synthetic data generation tool for building customizable 3D environments and AI training datasets.",
    tags: ["Open Source", "Synthetic Data", "AI", "Computer Vision", "3D"],
    image: "/bladeforge-logo.png",
    link: "https://bladeforge.vardan.app/#showcase",
  }

  const groupProjects = [
    {
      title: "LiveLectureAI",
      description:
        "A collaborative full-stack platform deployed live, built by the team for real users and real workflows.",
      tags: ["Group Project", "Live Demo", "Full Stack"],
      image: "/live-lecture-ai.png",
      link: "https://leclive-prodject.onrender.com/",
      external: true,
      cta: "Open Website",
      type: "website",
    },
    {
      title: "RecipeRecommendation",
      description:
        "A personalized recipe discovery experience that recommends dishes from available ingredients and user preferences.",
      tags: ["Group Project", "Recommendations", "Full Stack"],
      image: "/recipe-recommendation.png",
      link: "/projects/recipe-recommendation",
      external: false,
      cta: "View Project Page",
      type: "page",
    },
  ]

  const completedProjects = [
    {
      title: "Quant Visualizer",
      description:
        "A web application demonstrating pairs trading in quantitative finance, providing tools for understanding complex mathematical ideas.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/492624444-928c45b1-f80e-4fe8-9046-1339a43e5e2a-xt1hbxdoKwTxuaHXe7FwA4HsqgPxGU.png",
      tags: ["Python", "Django", "Finance", "Data Visualization"],
      link: "https://quant-visualizer.vardan.app/",
      external: true,
    },
    {
      title: "Virtual Painter",
      description:
        "Real-time color marker tracking using OpenCV that allows users to draw in live video feed with yellow and pink markers.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/30301f90-9aba-4862-828d-21816e84e1af-o99cRASFMtXxbSLARjjYxm9dlWXg4V.jpg",
      tags: ["C++", "OpenCV", "Computer Vision"],
      link: "/projects/virtual-painter",
      external: false,
    },
    {
      title: "Web Crawler",
      description:
        "Explores real websites, collects statistics, and analyzes URL discovery, page parsing, and word frequency patterns.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aded8b6f-6eef-4003-8b49-6859cfd4e506-a78qisOOO4BfrXrRM5Cuh0JP95NhM7.jpg",
      tags: ["Python", "Web Scraping", "Data Analysis"],
      link: "/projects/web-crawler",
      external: false,
    },
  ]

  const skills = [
    { name: "C++", icon: "cpp" },
    { name: "Python", icon: "python" },
    { name: "Java", icon: "java" },
    { name: "R", icon: "r" },
    { name: "TensorFlow", icon: "tensorflow" },
    { name: "HTML/CSS", icon: "html" },
    { name: "MySQL", icon: "mysql" },
    { name: "SQLite", icon: "sqlite" },
    { name: "AWS", icon: "aws" },
    { name: "DigitalOcean", icon: "", logoUrl: "https://cdn.simpleicons.org/digitalocean/0080FF" },
    { name: "Django", icon: "django" },
    { name: "FastAPI", icon: "fastapi" },
    { name: "Git", icon: "git" },
    { name: "Figma", icon: "figma" },
    { name: "RESTful API", icon: "" },
  ]

  const education: TimelineItem[] = [
    {
      title: "University of Pennsylvania",
      subtitle: "M.S. in Engineering in Artificial Intelligence",
      date: "Aug 2026 - Present",
    },
    {
      title: "University of California, Irvine",
      subtitle: "B.S. in Computer Science",
      date: "Completed June 2026",
    },
    {
      title: "Glendale Community College",
      subtitle: "Computer Science Major",
      date: "President of Robotics Club",
    },
  ]

  const experience: TimelineItem[] = [
    {
      title: "Software Developer",
      subtitle: "American Verification Processing Solutions",
      date: "July 2026 - Present",
      description:
        "Develop production software for merchant batch and chargeback data workflows across bank-specific parsing, validation, previews, and CRM submission.",
    },
    {
      title: "Software Engineer",
      subtitle: "Bizskip",
      date: "Feb 2026 - May 2026",
      description:
        "Built React and Next.js workflows for local business discovery, waitlists, provider listings, and dashboards.",
    },
    {
      title: "Research Computing Assistant",
      subtitle: "Caltech",
      date: "July 2024 - Sept 2024",
      description: "Maintained research IT systems, optimized CMS performance, and managed Data Center operations.",
    },
    {
      title: "Data Structures & Linear Algebra Tutor",
      subtitle: "GCC Learning Center",
      date: "Aug 2022 - Jul 2024",
      description: "Delivered personalized math tutoring and developed educational materials for students.",
    },
  ]

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#recent-project", label: "Featured", desktopOnly: true },
    { href: "#group-projects", label: "Team Projects" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/70">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground font-mono text-xs font-semibold text-background">
                VK
              </span>
              <span className="hidden lg:inline text-sm font-semibold tracking-tight">Vardan Keshishyan</span>
            </Link>
            <div className="flex items-center gap-4 md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${link.desktopOnly ? "hidden md:inline" : ""} text-sm text-muted-foreground hover:text-foreground transition-colors`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <a href="/resume.pdf" download="Vardan's__Resume__.pdf">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <FocusTicker />
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-balance">Vardan Keshishyan</h1>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-muted-foreground mb-6 text-balance">
                AI Master's Student & Developer
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I'm pursuing a master's in Artificial Intelligence at{" "}
                <span className="font-medium text-foreground">the University of Pennsylvania</span>, passionate about
                building innovative solutions in quantitative finance, computer vision, and AI.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="#recent-project">
                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#contact">Get In Touch</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href="/resume.pdf" download="Vardan's__Resume__.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-5 text-sm text-muted-foreground">
                <a
                  href="https://github.com/VardanKeshishyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/vardan-keshishyan-9734961b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a
                  href="mailto:vardankeshishyan1@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="pointer-events-none absolute inset-8 rounded-full bg-brand/20 blur-3xl" />
              <NeuralPortrait />
            </div>
          </div>
        </div>
      </section>

      {/* Most Recent Project Section */}
      <section id="recent-project" className="py-24 px-6 border-y border-border/70 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading
            index="01"
            eyebrow="Latest work"
            title="Featured Project"
            description="The newest project I'm currently featuring from my recent work."
          />
          <a href={mostRecentProject.link} target="_blank" rel="noopener noreferrer" className="block max-w-4xl mx-auto">
            <Card className={`${cardHover} overflow-hidden py-0`}>
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-64 bg-muted/60 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-border">
                  <Image
                    src={mostRecentProject.image || "/placeholder.svg"}
                    alt={mostRecentProject.title}
                    fill
                    className="object-contain p-10 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col justify-center gap-6 py-8">
                  <CardHeader>
                    <div className={iconTile}>
                      <Braces className="h-5 w-5" />
                    </div>
                    <CardTitle className="flex items-center justify-between gap-4 text-2xl">
                      <span>{mostRecentProject.title}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors shrink-0" />
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{mostRecentProject.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {mostRecentProject.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className={tagStyle}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className={ctaStyle}>
                      Open Project <ExternalLink className="ml-2 h-4 w-4" />
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </a>
        </div>
      </section>

      {/* Group Projects Section */}
      <section id="group-projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading
            index="02"
            eyebrow="Collaboration"
            title="Team Projects"
            description="Team-built projects with a live website and a dedicated project explanation page."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {groupProjects.map((project) => (
              <Link
                key={project.title}
                href={project.link}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                className="block"
              >
                <Card className={`${cardHover} h-full overflow-hidden pt-0`}>
                  <div className="relative h-48 overflow-hidden border-b border-border">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <div className={iconTile}>
                      {project.type === "website" ? (
                        <Globe className="h-5 w-5" />
                      ) : project.type === "github" ? (
                        <Github className="h-5 w-5" />
                      ) : (
                        <Braces className="h-5 w-5" />
                      )}
                    </div>
                    <CardTitle className="flex items-center justify-between gap-4">
                      <span>{project.title}</span>
                      {project.external ? (
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors shrink-0" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors shrink-0" />
                      )}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className={tagStyle}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className={ctaStyle}>
                      {project.cta}
                      {project.external ? (
                        <ExternalLink className="ml-2 h-4 w-4" />
                      ) : (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      )}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* My Projects Section */}
      <section id="projects" className="py-24 px-6 border-t border-border/70">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading
            index="03"
            eyebrow="Selected work"
            title="Independent Projects"
            description="A showcase of my recent work in quantitative finance, computer vision, and web technologies."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {completedProjects.map((project) => (
              <Link
                key={project.title}
                href={project.link}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                className="block"
              >
                <Card className={`${cardHover} h-full overflow-hidden pt-0`}>
                  <div className="relative h-48 overflow-hidden border-b border-border">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-4">
                      {project.title}
                      {project.external ? (
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors shrink-0" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand transition-colors shrink-0" />
                      )}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className={tagStyle}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-y border-border/70 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <SectionHeading index="04" eyebrow="Background" title="About" />
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {[
              { heading: "Education", icon: GraduationCap, items: education },
              { heading: "Experience", icon: Briefcase, items: experience },
            ].map(({ heading, icon: Icon, items }) => (
              <div key={heading} className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
                <h3 className="mb-6 flex items-center gap-3 text-lg font-semibold">
                  <span className={iconTile}>
                    <Icon className="h-5 w-5" />
                  </span>
                  {heading}
                </h3>
                <ol className="relative space-y-7 border-l border-border pl-6">
                  {items.map((item) => (
                    <li key={item.title} className="relative">
                      <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-brand ring-4 ring-brand/15" />
                      <h4 className="font-semibold leading-snug">{item.title}</h4>
                      <p className="text-muted-foreground">{item.subtitle}</p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground/80">{item.date}</p>
                      {item.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-2">{item.description}</p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Technical Skills</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg border border-border bg-muted/60 flex items-center justify-center shrink-0 transition-colors group-hover:border-brand/30">
                        {skill.logoUrl ? (
                          <img src={skill.logoUrl} alt={`${skill.name} logo`} className="h-6 w-6 object-contain" />
                        ) : skill.icon ? (
                          <img
                            src={`https://skillicons.dev/icons?i=${skill.icon}`}
                            alt={`${skill.name} logo`}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <Braces className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm font-medium">{skill.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center shadow-sm md:px-12">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
            <div className="relative">
              <SectionHeading
                index="05"
                eyebrow="Contact"
                title="Let's Connect"
                description="I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out!"
              />
              <div className="-mt-4 flex flex-col gap-6 justify-center mb-8">
                <Button asChild size="lg" className="mx-auto">
                  <a href="mailto:vardankeshishyan1@gmail.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Me
                  </a>
                </Button>
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 text-sm text-muted-foreground">
                  <p>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">Email</span>{" "}
                    <a href="mailto:vardankeshishyan1@gmail.com" className="text-foreground hover:text-brand transition-colors">
                      vardankeshishyan1@gmail.com
                    </a>
                  </p>
                  <p>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">Phone</span>{" "}
                    <a href="tel:+17472319907" className="text-foreground hover:text-brand transition-colors">
                      (747) 231-9907
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                {[
                  { href: "https://github.com/VardanKeshishyan", label: "GitHub", icon: Github, external: true },
                  { href: "https://www.linkedin.com/in/vardan-keshishyan-9734961b5/", label: "LinkedIn", icon: Linkedin, external: true },
                  { href: "mailto:vardankeshishyan1@gmail.com", label: "Email", icon: Mail, external: false },
                ].map(({ href, label, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Vardan Keshishyan.</p>
            <div className="flex gap-4">
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
