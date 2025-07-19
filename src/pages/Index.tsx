import { useState } from "react";
import { PatientData, PredictionResult } from "@/types";
import { predictDisease, getTopPredictions } from "@/utils/predictionEngine";
import { aiPredictDisease, RegionalRiskMetrics } from "@/utils/aiPredictionEngine";
import PatientForm from "@/components/PatientForm";
import DiseaseCard from "@/components/DiseaseCard";
import OutbreakAnalysis from "@/components/OutbreakAnalysis";
import AIAnalysisPanel from "@/components/AIAnalysisPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  ArrowLeftIcon,
  BrainCircuitIcon, 
  BadgeInfoIcon, 
  ActivityIcon,
  HeartPulseIcon,
  ShieldIcon,
  TestTubeIcon
} from "lucide-react";

export default function Index() {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [aiConfidenceScore, setAIConfidenceScore] = useState<number>(0);
  const [regionalRiskMetrics, setRegionalRiskMetrics] = useState<RegionalRiskMetrics | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const handleSubmit = (data: PatientData) => {
    // Get traditional prediction results
    const baseResults = predictDisease(data);
    
    // Get AI-enhanced prediction results
    const aiResults = aiPredictDisease(data);
    
    setPatientData(data);
    setPredictions(aiResults.predictions);
    setAIConfidenceScore(aiResults.aiConfidenceScore);
    setRegionalRiskMetrics(aiResults.regionalRiskMetrics);
    setShowResults(true);
  };
  
  const handleReset = () => {
    setPatientData(null);
    setPredictions([]);
    setAIConfidenceScore(0);
    setRegionalRiskMetrics(null);
    setShowResults(false);
  };
  
  return (
    <div className="min-h-screen virus-pattern-bg medical-gradient">
      <div className="medical-header py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2">
            <HeartPulseIcon size={32} className="text-white/90" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Disease Prediction & Outbreak Analysis
            </h1>
          </div>
          <p className="text-center text-blue-100 mt-2">
            AI-powered early detection system for disease outbreaks
          </p>
          <div className="flex items-center justify-center mt-2 gap-1 text-sm text-blue-100">
            <BrainCircuitIcon size={16} />
            <span>Using advanced machine learning for predictive analytics</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        {!showResults ? (
          <div className="space-y-8">
            <div className="health-stats-grid mb-8">
              <Card className="health-data-card pulse-animation">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ActivityIcon className="h-5 w-5 text-blue-500" />
                    Early Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Detect potential outbreaks days before symptoms become widespread
                  </p>
                </CardContent>
              </Card>
              
              <Card className="health-data-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldIcon className="h-5 w-5 text-blue-500" />
                    Preventative Action
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Take proactive measures before diseases spread throughout communities
                  </p>
                </CardContent>
              </Card>
              
              <Card className="health-data-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BrainCircuitIcon className="h-5 w-5 text-blue-500" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithms analyze patterns across multiple data points
                  </p>
                </CardContent>
              </Card>
              
              <Card className="health-data-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TestTubeIcon className="h-5 w-5 text-blue-500" />
                    Symptom Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive symptom analysis for accurate disease prediction
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-lg border-blue-200 patient-input-panel">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100">
                <CardTitle className="flex items-center gap-2">
                  <BadgeInfoIcon className="h-5 w-5 text-primary" />
                  Patient Information Entry
                </CardTitle>
                <CardDescription>
                  Enter patient symptoms and details to receive AI-powered disease predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Alert className="bg-primary/10 border-primary/20 mb-6">
                  <BadgeInfoIcon className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-primary">Early Stage Detection</AlertTitle>
                  <AlertDescription>
                    Our AI system can detect disease outbreaks at early stages, even before symptoms fully develop. 
                    Enter all available patient information below for the most accurate analysis.
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-center">
                  <PatientForm onSubmit={handleSubmit} />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="shadow-md border-blue-200">
              <CardHeader className="bg-blue-50/50 border-b border-blue-100 pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeftIcon size={16} />
                    Back to Patient Form
                  </Button>
                  <div className="px-4 py-1 bg-blue-100 rounded-full">
                    <p className="text-sm text-blue-700">
                      Results for patient: {patientData?.age} years, {patientData?.gender}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="ai-analysis" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="ai-analysis" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <span className="flex items-center gap-2">
                        <BrainCircuitIcon className="h-4 w-4" />
                        AI Analysis
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="predictions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <span className="flex items-center gap-2">
                        <TestTubeIcon className="h-4 w-4" />
                        Disease Predictions
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="outbreak" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                      <span className="flex items-center gap-2">
                        <ActivityIcon className="h-4 w-4" />
                        Outbreak Analysis
                      </span>
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* AI Analysis Tab */}
                  <TabsContent value="ai-analysis" className="mt-6">
                    {regionalRiskMetrics && (
                      <AIAnalysisPanel 
                        predictions={predictions}
                        aiConfidenceScore={aiConfidenceScore}
                        regionalRiskMetrics={regionalRiskMetrics}
                      />
                    )}
                  </TabsContent>
                  
                  {/* Disease Predictions Tab */}
                  <TabsContent value="predictions" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getTopPredictions(predictions).map((prediction, index) => (
                        <DiseaseCard 
                          key={prediction.disease.id} 
                          prediction={prediction}
                          rank={index} 
                        />
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Outbreak Analysis Tab */}
                  <TabsContent value="outbreak" className="mt-6">
                    <OutbreakAnalysis predictions={predictions} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
        
        <footer className="mt-16 px-6 py-8 bg-blue-50/80 rounded-lg shadow-inner text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4">
            <HeartPulseIcon size={24} className="text-blue-500" />
            <h3 className="text-blue-800 font-medium text-lg">AI-Powered Disease Prediction System</h3>
          </div>
          <p className="text-blue-700">
            This tool uses advanced predictive analytics for early disease detection and outbreak forecasting.
          </p>
          <p className="mt-4 text-sm text-blue-600">
            © 2025 Disease Prediction System
          </p>
        </footer>
      </div>
    </div>
  );
}