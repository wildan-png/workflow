import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Code, Layers, ChevronRight } from "lucide-react";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">PRD Workflow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Navigation />
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Next.js 15</Badge>
                <Badge variant="outline">shadcn/ui</Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Welcome to Your Next.js Project
          </h1>
        </div>

        {/* Card Navigation */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Navigation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/simple-prd" className="block">
              <Card className="navigation-card hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader className="navigation-card__header">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 mb-4 group-hover:bg-blue-500/20 transition-colors">
                    <Code className="h-6 w-6 text-blue-500" />
                  </div>
                  <CardTitle className="navigation-card__title">Using simple prd</CardTitle>
                  <CardDescription className="navigation-card__description">
                    by using simple prd, the AI create based on app example in this case postman
                  </CardDescription>
                </CardHeader>
                <CardContent className="navigation-card__content">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="navigation-card__badge">Interactive</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </a>

            <a href="/step-by-step_prd-mcp" className="block">
              <Card className="navigation-card hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader className="navigation-card__header">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4 group-hover:bg-purple-500/20 transition-colors">
                    <Layers className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle className="navigation-card__title">Using step by step PRD & MCP</CardTitle>
                  <CardDescription className="navigation-card__description">
                    Breakdown the PRD into steps, from general layout to specific UI detail using mcp and manual css edit 
                  </CardDescription>
                </CardHeader>
                <CardContent className="navigation-card__content">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="navigation-card__badge">Guides</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                Built with Next.js and shadcn/ui
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <a href="https://nextjs.org" className="hover:text-foreground transition-colors">
                Next.js Docs
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a href="https://ui.shadcn.com" className="hover:text-foreground transition-colors">
                shadcn/ui Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
      