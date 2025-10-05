import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const completedProjects = [
    {
      title: "Quant Visualizer",
      description:
        "A web application demonstrating pairs trading in quantitative finance, providing tools for understanding complex mathematical ideas.",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/492624444-928c45b1-f80e-4fe8-9046-1339a43e5e2a-xt1hbxdoKwTxuaHXe7FwA4HsqgPxGU.png",
      tags: ["Python", "Django", "Finance", "Data Visualization"],
      link: "https://quant-visualizer.vercel.app/",
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

  const upcomingProjects = [
    {
      title: "DeepfakeDetector",
      description:
        "AI-powered system to detect and analyze deepfake videos using advanced machine learning techniques.",
      image: "/deepfake-detection-ai-neural-network.jpg",
      tags: ["Python", "TensorFlow", "Computer Vision", "AI"],
      status: "In Development",
    },
    {
      title: "Unbeatable Checkers",
      description:
        "Implementation of minimax algorithm with alpha-beta pruning to create an unbeatable checkers Bot opponent.",
      image: "/checkers-game-board-ai-strategy.jpg",
      tags: ["Python", "Game Theory", "Algorithms"],
      status: "Planning",
    },
    {
      title: "CameraMind",
      description:
        "AI system that understands the world using cameras, processing visual information to make intelligent decisions.",
      image: "/ai-camera-vision-understanding-world.jpg",
      tags: ["Python", "AI", "Computer Vision", "Deep Learning"],
      status: "Research Phase",
    },
  ]

  const skills = [
    "C++",
    "Python",
    "Java",
    "R",
    "JavaScript",
    "HTML/CSS",
    "MySQL",
    "SQLite",
    "AWS",
    "DigitalOcean",
    "Django",
    "FastAPI",
    "Git",
    "RESTful API",
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary">
              VK
            </Link>
            <div className="flex items-center gap-6">
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
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
              <div className="flex gap-4">
                <Button asChild size="lg">
                  <Link href="#projects">
                    View My Work <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#contact">Get In Touch</Link>
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

      {/* Completed Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-4 text-center">Completed Projects</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            A showcase of my recent work in quantitative finance, computer vision, and web technologies.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {completedProjects.map((project) => (
              <Link
                key={project.title}
                href={project.link}
                target={project.external ? "_blank" : undefined}
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

      {/* Upcoming Projects Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-4 text-center">Upcoming Projects</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Exciting projects currently in development, exploring AI, game theory, and computer vision.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingProjects.map((project) => (
              <Card key={project.title} className="border-dashed">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{project.status}</Badge>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
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
                  <p className="text-sm text-muted-foreground">GPA: 3.34 | Sep 2024 - Jun 2026</p>
                </div>
                <div>
                  <h4 className="font-semibold">Glendale Community College</h4>
                  <p className="text-muted-foreground">Computer Science Major</p>
                  <p className="text-sm text-muted-foreground">GPA: 3.92 | President of Robotics Club</p>
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
                  <p className="text-muted-foreground">GCC Learning Center | Jan 2022 - Jul 2024</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Delivered personalized math tutoring and developed educational materials for students.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-primary">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
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
            <a
              href="mailto:vardankeshishyan1@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
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
            <p className="text-sm text-muted-foreground">© 2025 Vardan Keshishyan. Built with Next.js</p>
            <div className="flex gap-4">
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Projects
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
