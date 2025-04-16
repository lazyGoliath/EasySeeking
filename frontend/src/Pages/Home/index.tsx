import HomeWrapper from "../../components/custom/HomeWrapper";
import { Button } from "../../components/ui/button";
import { PlayCircle } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeWrapper />
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center bg-gradient-to-b from-background to-muted">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Create Your Perfect Resume
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Transform your career journey with AI-powered resume creation. Stand out to employers with a professionally crafted resume in minutes.
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            <PlayCircle className="mr-2 h-5 w-5" />
            Watch Video
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-muted-foreground">Leverage advanced AI to create resumes that stand out</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">Professional Templates</h3>
            <p className="text-muted-foreground">Choose from a variety of industry-specific templates</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">ATS Optimized</h3>
            <p className="text-muted-foreground">Ensure your resume passes automated screening systems</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">© 2025 EasySeeking. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;