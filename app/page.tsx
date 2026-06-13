import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Download, Globe, Braces } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
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
    { name: "JavaScript", icon: "javascript" },
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

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary">
              VK
            </Link>
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link
                href="#group-projects"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Group Projects
              </Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                My Projects
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
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
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-sm font-mono mb-4">Hi, my name is</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">Vardan Keshishyan</h1>
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-6 text-balance">
                Computer Science Student & Developer
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                I'm a Computer Science student at <span className="text-primary">UC Irvine</span>, passionate about
                building innovative solutions in quantitative finance, computer vision, and AI. Previously a Research
                Assistant at <span className="text-primary">Caltech</span>.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="#group-projects">
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
            </div>
            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary shadow-2xl shadow-primary/20">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1728793790224%20%281%29-sEJALVp9l2bPq1dOlT89Ae5wybGVFq.jpg"
                  alt="Vardan Keshishyan"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Projects Section */}
      <section id="group-projects" className="py-20 px-6 bg-card/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-4 text-center">Group Projects</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Team-built projects with a live website and a dedicated project explanation page.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {groupProjects.map((project) => (
              <Link
                key={project.title}
                href={project.link}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                className="block"
              >
                <Card className="group h-full overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2 h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
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
                        <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                      )}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-primary font-medium inline-flex items-center">
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
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-4 text-center">My Projects</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A showcase of my recent work in quantitative finance, computer vision, and web technologies.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {completedProjects.map((project) => (
              <Link
                key={project.title}
                href={project.link}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noopener noreferrer" : undefined}
                className="block"
              >
                <Card className="group hover:border-primary transition-all duration-300 h-full cursor-pointer">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      {project.external ? (
                        <ExternalLink className="h-4 w-4 text-primary" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-primary" />
                      )}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
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
      <section id="about" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Education</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">University of California, Irvine</h4>
                  <p className="text-muted-foreground">Computer Science Major</p>
                  <p className="text-sm text-muted-foreground">Sep 2024 - Jun 2026</p>
                </div>
                <div>
                  <h4 className="font-semibold">Glendale Community College</h4>
                  <p className="text-muted-foreground">Computer Science Major</p>
                  <p className="text-sm text-muted-foreground">President of Robotics Club</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Research Assistant</h4>
                  <p className="text-muted-foreground">Caltech | July 2024 - Oct 2024</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Maintained research IT systems, optimized CMS performance, and managed Data Center operations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Math Tutor</h4>
                  <p className="text-muted-foreground">GCC Learning Center | Aug 2022 - Jul 2024</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Delivered personalized math tutoring and developed educational materials for students.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-primary">Skills & Technologies</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group rounded-xl border border-border bg-background px-4 py-3 transition-all duration-300 hover:border-primary/50 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg border border-border bg-muted flex items-center justify-center shrink-0">
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
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to
            say hi, feel free to reach out!
          </p>
          <div className="flex flex-col gap-4 justify-center mb-8">
            <Button asChild size="lg" className="mx-auto">
              <a href="mailto:vardankeshishyan1@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </a>
            </Button>
            <div className="text-muted-foreground space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Email:</span> vardankeshishyan1@gmail.com
              </p>
              <p className="text-sm">
                <span className="font-semibold">Phone:</span> (747) 231-9907
              </p>
            </div>
          </div>
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/VardanKeshishyan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/vardan-keshishyan-9734961b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:vardankeshishyan1@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Vardan Keshishyan.</p>
            <div className="flex gap-4">
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                My Projects
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
