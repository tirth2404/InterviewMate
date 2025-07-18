import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import Navbar from "@/components/Navbar";
import { 
  MessageSquare, 
  FileText, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  Brain,
  Zap,
  PlayCircle
} from "lucide-react";

const Dashboard = () => {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (email) {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleStartInterview = () => {
    if (!selectedDomain || !selectedDifficulty) {
      return;
    }
    // Store selection for interview page
    localStorage.setItem("selectedDomain", selectedDomain);
    localStorage.setItem("selectedDifficulty", selectedDifficulty);
    navigate("/interview");
  };

  const handleStartMockInterview = () => {
    if (!selectedDomain || !selectedDifficulty) {
      return;
    }
    // Store selection for mock interview page
    localStorage.setItem("selectedDomain", selectedDomain);
    localStorage.setItem("selectedDifficulty", selectedDifficulty);
    navigate("/mock");
  };

  const domains = [
    { value: "web-dev", label: "Web Development" },
    { value: "dsa", label: "Data Structures & Algorithms" },
    { value: "ai-ml", label: "AI & Machine Learning" },
    { value: "system-design", label: "System Design" },
    { value: "databases", label: "Databases" },
    { value: "devops", label: "DevOps" }
  ];

  const difficulties = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ];

  const stats = [
    { title: "Interviews Completed", value: 12, icon: MessageSquare, color: "text-primary" },
    { title: "Practice Questions", value: 45, icon: FileText, color: "text-info" },
    { title: "Success Rate", value: "85%", icon: Target, color: "text-success" },
    { title: "Current Streak", value: 7, icon: TrendingUp, color: "text-warning" }
  ];

  const recentActivity = [
    { title: "Completed Web Dev Interview", time: "2 hours ago", type: "interview" },
    { title: "Practiced DSA Questions", time: "Yesterday", type: "practice" },
    { title: "Mock Interview - System Design", time: "2 days ago", type: "mock" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar isAuthenticated={true} onLogout={handleLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back{userEmail && `, ${userEmail.split('@')[0]}`}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to continue your interview preparation journey?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interview Setup */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-primary" />
                  <span>Start Your Interview Practice</span>
                </CardTitle>
                <CardDescription>
                  Select your domain and difficulty level to begin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Domain</label>
                    <Select onValueChange={setSelectedDomain}>
                      <SelectTrigger className="transition-all focus:shadow-card">
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
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Difficulty</label>
                    <Select onValueChange={setSelectedDifficulty}>
                      <SelectTrigger className="transition-all focus:shadow-card">
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
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleStartInterview}
                    disabled={!selectedDomain || !selectedDifficulty}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Start AI Interview
                  </Button>
                  <Button 
                    variant="gradient" 
                    size="lg" 
                    className="flex-1"
                    onClick={handleStartMockInterview}
                    disabled={!selectedDomain || !selectedDifficulty}
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Mock Interview
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Section */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span>Your Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">Overall Completion</span>
                      <span className="text-muted-foreground">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">Technical Skills</span>
                      <span className="text-muted-foreground">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground">Behavioral Questions</span>
                      <span className="text-muted-foreground">60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => navigate("/practice")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Browse Practice Questions
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/interview")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Continue Last Interview
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Award className="w-4 h-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-6 h-6 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;