import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function RecipeRecommendationPage() {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-primary">
              VK
            </Link>
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/#group-projects" className="text-primary hover:underline text-sm">
              ← Back to Group Projects
            </Link>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-balance">RecipeRecommendation</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A group-built recipe recommendation platform that helps users discover meals from available ingredients and
            personalized preferences.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge>Group Project</Badge>
            <Badge>Recommendations</Badge>
            <Badge>Full Stack</Badge>
            <Badge>Search UX</Badge>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a href="https://github.com/VardanKeshishyan/The-Recipe" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Repository
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="relative h-96 rounded-lg overflow-hidden border border-border">
            <Image src="/recipe-recommendation.png" alt="RecipeRecommendation" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Overview</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              RecipeRecommendation was built as a collaborative project focused on making meal discovery feel easier and
              more personalized. Instead of forcing users to search from scratch, the experience centers around what
              they already have, what they like, and what they want to cook next.
            </p>
            <p>
              The interface combines ingredient-based search, recommendation flows, and saved content into a cleaner
              experience that feels more like a guided kitchen companion than a simple recipe list.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">What It Does</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Lets users search recipes by ingredients they already have available.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Surfaces more relevant recipe suggestions through personalized recommendation flows.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Organizes results into focused tabs like search, recommendations, and saved kitchen content.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Creates a more polished recipe browsing experience for repeat use instead of one-off searches.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Why It Matters</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Practical Use</h3>
              <p className="text-muted-foreground leading-relaxed">
                The project solves a real everyday problem: people often know what ingredients they have, but not what
                they can make with them. This turns that friction into a more useful discovery flow.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Team Collaboration</h3>
              <p className="text-muted-foreground leading-relaxed">
                As a group project, it also demonstrates product thinking, collaboration, and building a cleaner user
                experience around recommendation and search features.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Project Link</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The repository includes the project implementation and supporting details for the work behind the app.
          </p>
          <Button asChild variant="outline">
            <a href="https://github.com/VardanKeshishyan/The-Recipe" target="_blank" rel="noopener noreferrer">
              Open GitHub Repository
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Vardan Keshishyan</p>
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
