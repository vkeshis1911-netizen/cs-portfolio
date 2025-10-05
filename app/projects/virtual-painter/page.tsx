import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function VirtualPainterPage() {
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
          <h1 className="text-5xl font-bold mb-6 text-balance">Virtual Painter</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Real-time color marker tracking and drawing application using OpenCV and C++
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <Badge>C++</Badge>
            <Badge>OpenCV</Badge>
            <Badge>Computer Vision</Badge>
            <Badge>Real-time Processing</Badge>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="relative h-96 rounded-lg overflow-hidden border border-border">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/30301f90-9aba-4862-828d-21816e84e1af-o99cRASFMtXxbSLARjjYxm9dlWXg4V.jpg"
              alt="Virtual Painter"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Description</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Color Marker Tracker program utilizes the OpenCV library to detect and track yellow and pink markers
              in a live video feed. The program performs the following steps:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Video Capture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The program accesses the video feed from a connected camera.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Color Detection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The program converts each frame of the video to the HSV color space and applies a color range to
                  filter out yellow and pink markers. It creates binary masks for the detected colors.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Contour Detection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The program finds contours in the binary masks to identify the markers' positions. It filters out
                  small contours based on their area and approximates the contours' shapes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Tracking and Drawing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The program tracks the markers by determining the center point of each contour. It then draws circles
                  around the markers using their respective colors.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Display</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The program displays the video feed with the markers and circles drawn in real-time.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Continuous Update</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The program continuously updates the markers' positions and redraws the circles as the markers move
                  within the video feed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Images */}
      <section className="px-6 py-12 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Demo</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden border border-border">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4oC5ThefdwceZjnesj20dz0ErDcsHj.png"
                alt="Virtual Painter Demo 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden border border-border">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xFx7fJdl2WolnS8IaYkpUxhFdkfc4B.png"
                alt="Virtual Painter Demo 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Real-time tracking and drawing with yellow and pink markers in a live video feed</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Conversion of video frames to the HSV color space for color detection</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Detection of contours and filtering based on contour area</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Approximation of contour shapes to find the markers' center points</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Drawing circles around the markers using their respective colors</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">•</span>
              <span>Continuous updates of marker positions and circles in real-time</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Installation & Usage */}
      <section className="px-6 py-12 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Installation</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>Clone the repository:</p>
            <pre className="bg-navy-950 p-4 rounded-lg overflow-x-auto">
              <code>git clone https://github.com/VardanKeshishyan/ColorMarkerTracker</code>
            </pre>
            <p>Navigate to the project directory:</p>
            <pre className="bg-navy-950 p-4 rounded-lg overflow-x-auto">
              <code>cd ColorMarkerTracker</code>
            </pre>
            <p>Compile the program using a C++ compiler and link with OpenCV libraries</p>
          </div>

          <h2 className="text-3xl font-bold mb-6 mt-12">Usage</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>Run the program, and it will access the video feed from the connected camera.</p>
            <p>The program will detect yellow and pink markers in the live video feed.</p>
            <p>
              As you move the yellow and pink markers within the camera's view, the program will track their positions
              and draw circles around them using their respective colors.
            </p>
            <p>The drawn circles will be updated in real-time based on the markers' movements.</p>
            <p>Enjoy the interactive drawing experience using the yellow and pink markers.</p>
            <p className="font-semibold text-foreground">Press the 'Esc' key to exit the program.</p>
          </div>
        </div>
      </section>

      {/* License & Contribution */}
      <section className="px-6 py-12">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">License</h2>
              <p className="text-muted-foreground">This project is licensed under the MIT License.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Contribution</h2>
              <p className="text-muted-foreground mb-4">
                Contributions to the Color Marker Tracker project are welcome. Feel free to fork the repository and
                submit pull requests with your improvements.
              </p>
              <p className="text-muted-foreground">
                If you find any issues or have suggestions for enhancements, please create an issue in the GitHub
                repository.
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
