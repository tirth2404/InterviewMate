import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { ScrollArea } from "@/components/ui/scroll-area.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import Navbar from "@/components/Navbar";
import { 
  Send, 
  Bot, 
  User, 
  ArrowLeft, 
  Clock, 
  MessageSquare,
  Lightbulb,
  CheckCircle,
  XCircle
} from "lucide-react";

const Interview = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const scrollAreaRef = useRef(null);
  const navigate = useNavigate();

  const totalQuestions = 5;

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Get stored preferences
    const domain = localStorage.getItem("selectedDomain");
    const difficulty = localStorage.getItem("selectedDifficulty");
    
    if (domain && difficulty) {
      setSelectedDomain(domain);
      setSelectedDifficulty(difficulty);
      startInterview(domain, difficulty);
    }
  }, [navigate]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const startInterview = (domain, difficulty) => {
    setInterviewStarted(true);
    const welcomeMessage = {
      id: 1,
      type: "ai",
      content: `Welcome to your ${difficulty} level ${domain.replace('-', ' ')} interview! I'm your AI interviewer. Let's start with the first question:

**Question ${currentQuestion}/${totalQuestions}:**
Can you explain the concept of closures in JavaScript and provide a practical example of when you would use them?

Take your time to think through your answer and explain your reasoning clearly.`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
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

  const generateAIResponse = (userMessage) => {
    const responses = [
      {
        content: `Great answer! You demonstrated a solid understanding of the concept. 

Let me provide some feedback:
✅ You correctly explained the core concept
✅ Your example was relevant and well-structured
💡 Consider also mentioning how closures affect memory management

**Question ${currentQuestion + 1}/${totalQuestions}:**
Now, let's move on to algorithms. Can you implement a function to find the second largest element in an array? Walk me through your approach.`,
        feedback: {
          rating: 8,
          suggestions: [
            "Great explanation of the core concept",
            "Consider adding more real-world examples",
            "Memory management aspect could be expanded"
          ]
        }
      },
      {
        content: `Excellent solution! Your approach is both efficient and easy to understand.

**Feedback:**
✅ Optimal time complexity
✅ Good edge case handling
✅ Clear code structure

**Question ${currentQuestion + 1}/${totalQuestions}:**
Let's discuss system design. How would you design a URL shortener service like bit.ly? Consider scalability and performance requirements.`,
        feedback: {
          rating: 9,
          suggestions: [
            "Excellent algorithm implementation",
            "Good consideration of edge cases",
            "Code is clean and readable"
          ]
        }
      },
      {
        content: `Good thinking! You're approaching this systematically.

**Areas to expand on:**
🔄 Consider discussing load balancing strategies
🔄 Think about database sharding approaches
✅ Good mention of caching layers

**Question ${currentQuestion + 1}/${totalQuestions}:**
Final question: Describe a challenging project you worked on and how you overcame the technical difficulties you faced.`,
        feedback: {
          rating: 7,
          suggestions: [
            "System design thinking is solid",
            "Could elaborate more on scalability",
            "Good understanding of basic concepts"
          ]
        }
      }
    ];

    const randomResponse = responses[Math.min(currentQuestion - 1, responses.length - 1)];
    
    return {
      id: messages.length + 1,
      type: "ai",
      content: randomResponse.content,
      timestamp: new Date(),
      feedback: randomResponse.feedback
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      if (currentQuestion >= totalQuestions) {
        // Interview completed
        const completionMessage = {
          id: messages.length + 2,
          type: "ai",
          content: `🎉 **Interview Completed!**

Congratulations! You've successfully completed your ${selectedDifficulty} level ${getDomainLabel(selectedDomain)} interview.

**Overall Performance:**
📊 Average Score: 8.2/10
🎯 Questions Answered: ${totalQuestions}/${totalQuestions}
⏱️ Total Time: 32 minutes

**Summary:**
✅ Strong technical knowledge
✅ Good problem-solving approach
💡 Could improve on system design scalability concepts

Great job! Keep practicing to continue improving your interview skills.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, completionMessage]);
      } else {
        const aiResponse = generateAIResponse(inputValue);
        setMessages(prev => [...prev, aiResponse]);
        setCurrentQuestion(prev => prev + 1);
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const progress = ((currentQuestion - 1) / totalQuestions) * 100;

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navbar isAuthenticated={true} onLogout={handleLogout} />
        <div className="max-w-2xl mx-auto px-4 py-20">
          <Card className="bg-gradient-card border-0 shadow-elegant text-center">
            <CardContent className="p-12">
              <MessageSquare className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Loading Your Interview...
              </h2>
              <p className="text-muted-foreground">
                Please wait while we prepare your personalized interview experience
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
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Interview</h1>
              <p className="text-muted-foreground">
                {getDomainLabel(selectedDomain)} • {selectedDifficulty}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="px-3 py-1">
              <Clock className="w-4 h-4 mr-1" />
              {Math.floor((Date.now() - (messages[0]?.timestamp?.getTime() || Date.now())) / 60000)} min
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Question {Math.min(currentQuestion, totalQuestions)}/{totalQuestions}
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Interview Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-card border-0 shadow-card h-[600px] flex flex-col">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <span>Interview Session</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 p-0">
                <ScrollArea ref={scrollAreaRef} className="h-full p-6">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex space-x-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === "user" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          
                          <div className={`rounded-lg p-4 ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}>
                            <div className="prose prose-sm max-w-none">
                              {message.content.split('\n').map((line, index) => (
                                <p key={index} className={`${
                                  message.type === "user" ? "text-primary-foreground" : "text-foreground"
                                } ${index === 0 ? "mt-0" : ""} ${index === message.content.split('\n').length - 1 ? "mb-0" : ""}`}>
                                  {line}
                                </p>
                              ))}
                            </div>
                            <div className={`text-xs mt-2 ${
                              message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}>
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex space-x-3 max-w-[80%]">
                          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="bg-muted rounded-lg p-4">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              
              <div className="border-t border-border/50 p-6">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Type your answer here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading || currentQuestion > totalQuestions}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading || currentQuestion > totalQuestions}
                    variant="hero"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Interview Tips */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <span>Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <span className="text-sm text-foreground">Think out loud while solving</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <span className="text-sm text-foreground">Ask clarifying questions</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <span className="text-sm text-foreground">Explain your reasoning</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                  <span className="text-sm text-foreground">Consider edge cases</span>
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            {messages.some(m => m.feedback) && (
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm">Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {messages
                    .filter(m => m.feedback)
                    .slice(-1)
                    .map((message, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Latest Score</span>
                          <span className="font-semibold">{message.feedback?.rating}/10</span>
                        </div>
                        <Progress value={(message.feedback?.rating || 0) * 10} className="h-2" />
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;