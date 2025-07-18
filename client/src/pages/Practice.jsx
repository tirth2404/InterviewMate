import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import Navbar from "@/components/Navbar";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Target, 
  ChevronRight,
  Code,
  Database,
  Globe,
  Brain,
  Server,
  Settings
} from "lucide-react";

const Practice = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const navigate = useNavigate();

  // Mock data for practice questions
  const mockQuestions = [
    {
      id: 1,
      title: "Implement a React Component with Hooks",
      domain: "web-dev",
      difficulty: "medium",
      description: "Create a React component that manages state and side effects using modern hooks patterns.",
      timeEstimate: "30 min",
      tags: ["React", "Hooks", "State Management"]
    },
    {
      id: 2,
      title: "Binary Tree Traversal",
      domain: "dsa",
      difficulty: "easy",
      description: "Implement different tree traversal algorithms (inorder, preorder, postorder).",
      timeEstimate: "20 min",
      tags: ["Trees", "Recursion", "Algorithms"]
    },
    {
      id: 3,
      title: "Design a Chat System",
      domain: "system-design",
      difficulty: "hard",
      description: "Design a scalable real-time chat system with proper architecture and data flow.",
      timeEstimate: "45 min",
      tags: ["System Design", "Scalability", "Real-time"]
    },
    {
      id: 4,
      title: "Linear Regression Implementation",
      domain: "ai-ml",
      difficulty: "medium",
      description: "Implement linear regression from scratch and explain the mathematical concepts.",
      timeEstimate: "35 min",
      tags: ["Machine Learning", "Mathematics", "Python"]
    },
    {
      id: 5,
      title: "Database Query Optimization",
      domain: "databases",
      difficulty: "hard",
      description: "Optimize complex SQL queries and explain indexing strategies.",
      timeEstimate: "40 min",
      tags: ["SQL", "Performance", "Indexing"]
    },
    {
      id: 6,
      title: "Containerize a Web Application",
      domain: "devops",
      difficulty: "medium",
      description: "Create Docker containers for a web application with proper configuration.",
      timeEstimate: "25 min",
      tags: ["Docker", "Containers", "Deployment"]
    },
    {
      id: 7,
      title: "Fibonacci Sequence Optimization",
      domain: "dsa",
      difficulty: "easy",
      description: "Implement efficient solutions for calculating Fibonacci numbers.",
      timeEstimate: "15 min",
      tags: ["Dynamic Programming", "Optimization", "Recursion"]
    },
    {
      id: 8,
      title: "RESTful API Design",
      domain: "web-dev",
      difficulty: "medium",
      description: "Design and implement a RESTful API following best practices.",
      timeEstimate: "30 min",
      tags: ["API", "REST", "Backend"]
    }
  ];

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setQuestions(mockQuestions);
    setFilteredQuestions(mockQuestions);
  }, [navigate]);

  useEffect(() => {
    // Filter questions based on search and filters
    let filtered = questions.filter(question => {
      const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDomain = selectedDomain === "all" || question.domain === selectedDomain;
      const matchesDifficulty = selectedDifficulty === "all" || question.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesDomain && matchesDifficulty;
    });
    
    setFilteredQuestions(filtered);
  }, [questions, searchTerm, selectedDomain, selectedDifficulty]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const getDomainIcon = (domain) => {
    const icons = {
      "web-dev": Globe,
      "dsa": Code,
      "ai-ml": Brain,
      "system-design": Server,
      "databases": Database,
      "devops": Settings
    };
    return icons[domain] || BookOpen;
  };

  const getDomainLabel = (domain) => {
    const labels = {
      "web-dev": "Web Development",
      "dsa": "Data Structures & Algorithms",
      "ai-ml": "AI & Machine Learning",
      "system-design": "System Design",
      "databases": "Databases",
      "devops": "DevOps"
    };
    return labels[domain] || domain;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "bg-success/10 text-success border-success/20",
      medium: "bg-warning/10 text-warning border-warning/20",
      hard: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return colors[difficulty] || "";
  };

  const domains = [
    { value: "all", label: "All Domains" },
    { value: "web-dev", label: "Web Development" },
    { value: "dsa", label: "Data Structures & Algorithms" },
    { value: "ai-ml", label: "AI & Machine Learning" },
    { value: "system-design", label: "System Design" },
    { value: "databases", label: "Databases" },
    { value: "devops", label: "DevOps" }
  ];

  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar isAuthenticated={true} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Practice Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Sharpen your skills with our curated collection of interview questions
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-gradient-card border-0 shadow-card mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map(domain => (
                    <SelectItem key={domain.value} value={domain.value}>
                      {domain.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredQuestions.length} of {questions.length} questions
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredQuestions.map((question, index) => {
            const DomainIcon = getDomainIcon(question.domain);
            return (
              <Card 
                key={question.id} 
                className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2 mb-2">
                      <DomainIcon className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {getDomainLabel(question.domain)}
                      </span>
                    </div>
                    <Badge className={getDifficultyColor(question.difficulty)}>
                      {question.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{question.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {question.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{question.timeEstimate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{question.tags.length} topics</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full group">
                    Start Practice
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No questions found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setSelectedDomain("all");
              setSelectedDifficulty("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;