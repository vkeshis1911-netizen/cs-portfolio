import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WebCrawlerPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/#projects" className="text-primary hover:underline text-sm">
              ← Back to Projects
            </Link>
          </div>
          <h1 className="text-5xl font-bold mb-6 text-balance">Web Crawler Project</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            A comprehensive web crawler that explores websites, collects statistics, and analyzes URL patterns
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge>Python</Badge>
            <Badge>Web Scraping</Badge>
            <Badge>Data Analysis</Badge>
            <Badge>URL Parsing</Badge>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="relative h-96 rounded-lg overflow-hidden border border-border">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aded8b6f-6eef-4003-8b49-6859cfd4e506-a78qisOOO4BfrXrRM5Cuh0JP95NhM7.jpg"
              alt="Web Crawler Project"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The goal was to explore a real website, collect statistics, and understand how crawlers handle URL
              discovery, page parsing, and word frequency analysis.
            </p>
            <div className="bg-card border border-border rounded-lg p-6 my-6">
              <p className="text-sm italic">
                <span className="font-semibold text-foreground">Note:</span> I didn't put the data that I got (crawling
                specific servers) because it may violate several rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What It Does Section */}
      <section className="px-6 py-12 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">What It Does</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">URL Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Visits and records all unique URL pages across the target website
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Page Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Identifies the longest page by word count for content analysis</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Word Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Finds the 50 most frequent words across all crawled pages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subdomain Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Tracks how many pages exist under each subdomain</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Report Example Section */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">What The Report Looks Like</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Results</h3>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-lg mb-2">
                  <span className="font-semibold">Unique pages visited:</span> 10,175
                </p>
                <div className="mt-4">
                  <p className="font-semibold mb-2">Longest page:</p>
                  <p className="text-muted-foreground ml-4">URL: http://www.example.com/~cs224</p>
                  <p className="text-muted-foreground ml-4">Word count: 104,961</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Top 50 Most Frequent Words</h3>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  {[
                    "events (27623)",
                    "search (13679)",
                    "isg (10738)",
                    "april (9989)",
                    "day (9925)",
                    "research (9696)",
                    "talks (8015)",
                    "reunion (8004)",
                    "outlook (7991)",
                    "next (7562)",
                    "data (7362)",
                    "us (6338)",
                    "news (6290)",
                    "read (5884)",
                    "received (5786)",
                    "upcoming (5639)",
                    "navigation (5602)",
                    "talk (5527)",
                    "views (5495)",
                    "file (5484)",
                    "calendar (5437)",
                    "enter (5321)",
                    "export (5286)",
                    "information (5264)",
                    "systems (5019)",
                    "may (4989)",
                    "jump (4810)",
                    "scheduled (4714)",
                    "contact (3894)",
                    "database (3853)",
                    "students (3741)",
                    "faculty (3648)",
                    "award (3538)",
                    "projects (3516)",
                    "group (3497)",
                    "people (3487)",
                    "best (3272)",
                    "two (3219)",
                    "courses (3182)",
                    "home (3150)",
                    "ieee (3092)",
                    "welcome (3087)",
                    "like (3024)",
                    "publications (3007)",
                    "fellow (2947)",
                    "recent (2941)",
                  ].map((word) => (
                    <div key={word} className="text-muted-foreground">
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Subdomains</h3>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="space-y-2 text-muted-foreground">
                  <p>accessibility.example.com (5)</p>
                  <p>archive.example.com (183)</p>
                  <p>asterix.example.com (5)</p>
                  <p>cecs.example.com (10)</p>
                  <p>cert.example.com (8)</p>
                  <p className="text-sm italic mt-4">...and more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="px-6 py-12 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-yellow-500">Disclaimer</h3>
            <p className="text-muted-foreground leading-relaxed">
              I know some classes require students to create web crawlers. This project represents my own independent
              implementation and is shared here for demonstration only. Please do not submit this code as your own work
              for any course.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Technical Implementation</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">URL Discovery & Parsing</h3>
              <p className="text-muted-foreground leading-relaxed">
                The crawler implements intelligent URL discovery by parsing HTML content and extracting links. It
                maintains a queue of URLs to visit and a set of visited URLs to avoid duplicates.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Content Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each page is analyzed for word count and content. The system tracks the longest page and maintains
                frequency counts for all words encountered across the entire crawl.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Subdomain Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                The crawler intelligently categorizes pages by subdomain, providing insights into the structure and
                organization of the target website.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Vardan Keshishyan</p>
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
