import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import Navbar from "@/components/Navbar.jsx";
import { 
  Brain, 
  Target, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Star,
  MessageSquare,
  BookOpen,
  TrendingUp
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Master Your Next{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Interview
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Practice with AI-powered interviews, get real-time feedback, and land your dream job. 
                InterviewMate helps you prepare for technical and behavioral interviews with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="animate-float">
              <img
                src={heroImage}
                alt="Professional Interview Preparation"
                className="w-full h-auto rounded-lg shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose InterviewMate?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides everything you need to excel in your interviews
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Practice",
                description: "Get personalized questions and feedback from our advanced AI system tailored to your role and experience level."
              },
              {
                icon: Target,
                title: "Domain-Specific Training",
                description: "Practice with questions from Web Development, Data Structures, AI, and more technical domains."
              },
              {
                icon: TrendingUp,
                title: "Track Your Progress",
                description: "Monitor your improvement over time with detailed analytics and performance insights."
              }
            ].map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                About InterviewMate
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                InterviewMate is built by experienced developers and interview experts who understand 
                the challenges of technical interviews. Our platform combines cutting-edge AI technology 
                with proven interview strategies to help you succeed.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time AI feedback on your answers",
                  "Comprehensive question database",
                  "Multiple difficulty levels",
                  "Progress tracking and analytics"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-card text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Practice Questions</div>
              </Card>
              <Card className="bg-gradient-card border-0 shadow-card text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </Card>
              <Card className="bg-gradient-card border-0 shadow-card text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">5K+</div>
                <div className="text-sm text-muted-foreground">Happy Users</div>
              </Card>
              <Card className="bg-gradient-card border-0 shadow-card text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">AI Support</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of professionals who have successfully landed their dream jobs with InterviewMate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/practice">
              <Button variant="outline" size="xl" className="w-full sm:w-auto border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                View Practice Questions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">I</span>
                </div>
                <span className="text-xl font-bold text-primary">InterviewMate</span>
              </div>
              <p className="text-muted-foreground">
                Your AI-powered interview preparation companion
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>AI Mock Interviews</li>
                <li>Practice Questions</li>
                <li>Progress Tracking</li>
                <li>Real-time Feedback</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Interview Tips</li>
                <li>Technical Guides</li>
                <li>Career Advice</li>
                <li>Success Stories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 InterviewMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
