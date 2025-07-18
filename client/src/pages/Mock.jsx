import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import { Alert, AlertDescription } from "@/components/ui/alert.jsx";
import Navbar from "@/components/Navbar";
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  Send, 
  RefreshCw,
  Trophy,
  CheckCircle,
  XCircle,
  Star,
  Lightbulb,
  BookOpen
} from "lucide-react";

const Mock = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const navigate = useNavigate();

  // Mock questions database
  const mockQuestions = [
    {
      id: 1,
      question: "Explain the difference between var, let, and const in JavaScript. When would you use each one?",
      domain: "web-dev",
      difficulty: "medium",
      expectedPoints: [
        "Scope differences (function vs block)",
        "Hoisting behavior",
        "Reassignment rules",
        "Temporal dead zone for let/const",
        "Best practices and use cases"
      ],
      timeLimit: 10
    },
    {
      id: 2,
      question: "Design a function to find the longest palindromic substring in a given string. Explain your approach and analyze the time complexity.",
      domain: "dsa",
      difficulty: "hard",
      expectedPoints: [
        "Different approaches (brute force, expand around centers, dynamic programming)",
        "Time and space complexity analysis",
        "Implementation details",
        "Edge cases handling",
        "Optimization considerations"
      ],
      timeLimit: 20
    },
    {
      id: 3,
      question: "How would you design a distributed cache system? Discuss the key components and challenges.",
      domain: "system-design",
      difficulty: "hard",
      expectedPoints: [
        "Cache strategies (LRU, LFU, etc.)",
        "Consistency models",
        "Partitioning strategies",
        "Failure handling",
        "Performance considerations"
      ],
      timeLimit: 25
    },
    {
      id: 4,
      question: "Explain the bias-variance tradeoff in machine learning. How does it relate to overfitting and underfitting?",
      domain: "ai-ml",
      difficulty: "medium",
      expectedPoints: [
        "Definition of bias and variance",
        "Relationship to model complexity",
        "Overfitting vs underfitting",
        "Methods to balance the tradeoff",
        "Real-world examples"
      ],
      timeLimit: 15
    }
  ];

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Get stored preferences and load question
    const domain = localStorage.getItem("selectedDomain");
    const difficulty = localStorage.getItem("selectedDifficulty");
    
    if (domain && difficulty) {
      setSelectedDomain(domain);
      setSelectedDifficulty(difficulty);
      loadRandomQuestion(domain, difficulty);
    }
  }, [navigate]);

  useEffect(() => {
    // Timer effect
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentQuestion && !isSubmitted) {
      // Auto-submit when time runs out
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, currentQuestion]);

  const loadRandomQuestion = (domain, difficulty) => {
    const filteredQuestions = mockQuestions.filter(q => 
      q.domain === domain && q.difficulty === difficulty
    );
    
    if (filteredQuestions.length === 0) {
      // Fallback to any question if no exact match
      const question = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
      setCurrentQuestion(question);
      setTimeLeft(question.timeLimit * 60);
    } else {
      const question = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      setCurrentQuestion(question);
      setTimeLeft(question.timeLimit * 60);
    }
  };

  const generateEvaluation = (userAnswer, question) => {
    // Simulate AI evaluation
    const wordCount = userAnswer.split(' ').length;
    const hasKeywords = question.expectedPoints.some(point => 
      userAnswer.toLowerCase().includes(point.toLowerCase().split(' ')[0])
    );
    
    let score = 0;
    const strengths = [];
    const improvements = [];
    
    // Basic scoring logic
    if (wordCount > 50) {
      score += 2;
      strengths.push("Detailed explanation provided");
    } else {
      improvements.push("Could provide more detailed explanation");
    }
    
    if (hasKeywords) {
      score += 3;
      strengths.push("Covered key concepts");
    } else {
      improvements.push("Could address more key points");
    }
    
    if (userAnswer.includes("example") || userAnswer.includes("for instance")) {
      score += 2;
      strengths.push("Good use of examples");
    } else {
      improvements.push("Consider adding practical examples");
    }
    
    if (userAnswer.length > 200) {
      score += 2;
      strengths.push("Comprehensive answer");
    }
    
    if (question.difficulty === "hard" && score >= 7) {
      score += 1; // Bonus for hard questions
    }
    
    // Cap score at 10
    score = Math.min(score, 10);
    
    const overallComments = [
      "Good foundation, but could expand on key concepts",
      "Solid understanding demonstrated with room for improvement",
      "Well-structured answer with good technical depth",
      "Excellent response showing strong technical knowledge",
      "Outstanding answer with comprehensive coverage"
    ];
    
    const overall = overallComments[Math.min(Math.floor(score / 2), overallComments.length - 1)];
    
    return { score, strengths, improvements, overall };
  };

  const handleSubmit = async () => {
    if (!currentQuestion || isSubmitted) return;
    
    setIsLoading(true);
    
    // Simulate evaluation processing
    setTimeout(() => {
      const evaluationResult = generateEvaluation(answer, currentQuestion);
      setEvaluation(evaluationResult);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleNewQuestion = () => {
    setAnswer("");
    setIsSubmitted(false);
    setEvaluation(null);
    loadRandomQuestion(selectedDomain, selectedDifficulty);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-destructive";
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar isAuthenticated={true} onLogout={handleLogout} />
        <div className="max-w-2xl mx-auto px-4 py-20">
          <Card className="bg-gradient-card border-0 shadow-elegant text-center">
            <CardContent className="p-12">
              <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Loading Mock Interview...
              </h2>
              <p className="text-muted-foreground">
                Preparing your personalized mock interview question
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar isAuthenticated={true} onLogout={handleLogout} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mock Interview</h1>
              <p className="text-muted-foreground">
                {getDomainLabel(selectedDomain)} • {selectedDifficulty}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant={timeLeft < 300 ? "destructive" : "outline"} className="px-3 py-1">
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeLeft)}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Target className="w-4 h-4 mr-1" />
              {currentQuestion.difficulty}
            </Badge>
          </div>
        </div>

        {/* Time Warning */}
        {timeLeft <= 300 && timeLeft > 0 && !isSubmitted && (
          <Alert className="mb-6 border-warning bg-warning/10">
            <Clock className="w-4 h-4" />
            <AlertDescription>
              <strong>Warning:</strong> Only {formatTime(timeLeft)} remaining!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question Card */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Mock Interview Question</span>
                </CardTitle>
                <CardDescription>
                  Take your time to provide a comprehensive answer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-foreground leading-relaxed">
                    {currentQuestion.question}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Answer Section */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Your Answer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type your answer here... Be detailed and explain your reasoning."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={isSubmitted}
                  className="min-h-[200px] resize-none"
                />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {answer.length} characters • {answer.split(' ').filter(word => word.length > 0).length} words
                  </span>
                  
                  {!isSubmitted ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={!answer.trim() || isLoading}
                      variant="hero"
                      className="min-w-[120px]"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Evaluating...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Answer
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleNewQuestion}
                      variant="outline"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New Question
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Evaluation Results */}
            {evaluation && (
              <Card className="bg-gradient-card border-0 shadow-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span>Evaluation Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score */}
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getScoreColor(evaluation.score)} mb-2`}>
                      {evaluation.score}/10
                    </div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.round(evaluation.score / 2)
                              ? "text-warning fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <Progress value={evaluation.score * 10} className="h-3 max-w-xs mx-auto" />
                  </div>

                  {/* Overall Feedback */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Overall Assessment</h4>
                    <p className="text-muted-foreground">{evaluation.overall}</p>
                  </div>

                  {/* Strengths */}
                  {evaluation.strengths.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 text-success mr-2" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {evaluation.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                            <span className="text-foreground">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Areas for Improvement */}
                  {evaluation.improvements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <Lightbulb className="w-4 h-4 text-warning mr-2" />
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-2">
                        {evaluation.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Lightbulb className="w-4 h-4 text-warning mt-0.5" />
                            <span className="text-foreground">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expected Points */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-sm">Key Points to Cover</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentQuestion.expectedPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span className="text-sm text-foreground">{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <span className="text-sm">Interview Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-foreground">
                  • Structure your answer clearly
                </div>
                <div className="text-sm text-foreground">
                  • Provide specific examples
                </div>
                <div className="text-sm text-foreground">
                  • Explain your reasoning
                </div>
                <div className="text-sm text-foreground">
                  • Consider edge cases
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mock;