import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Github, Twitter, Facebook } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c2269] via-[#482880] to-[#27164e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Brand Logo */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#905ce6] to-[#3c2269] rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Subscribe to Our Newsletter</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              Get the latest updates, exclusive content, and special offers delivered straight to your inbox.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Sign-up Options */}
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="h-11 border-gray-200 hover:bg-gray-50">
                <Facebook className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-11 border-gray-200 focus:border-[#905ce6] focus:ring-[#905ce6]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#905ce6] hover:bg-[#3c2269] text-white font-medium transition-colors"
            >
              Subscribe Now
            </Button>
          </form>

          {/* Additional Links */}
          <div className="flex justify-center space-x-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-[#905ce6] transition-colors">
              Terms
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-gray-500 hover:text-[#905ce6] transition-colors">
              Privacy
            </a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-gray-500 hover:text-[#905ce6] transition-colors">
              Help
            </a>
          </div>

          {/* Trust Indicator */}
          <div className="text-center">
            <p className="text-xs text-gray-500 leading-relaxed">
              🔒 We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
