import { PredictionResult } from "@/types";
import { RegionalRiskMetrics } from "@/utils/aiPredictionEngine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BrainCircuitIcon, 
  TrendingUpIcon, 
  AlertTriangleIcon, 
  CalendarIcon, 
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  ShieldIcon
} from "lucide-react";

interface AIAnalysisPanelProps {
  predictions: PredictionResult[];
  aiConfidenceScore: number;
  regionalRiskMetrics: RegionalRiskMetrics;
}

export default function AIAnalysisPanel({ 
  predictions, 
  aiConfidenceScore, 
  regionalRiskMetrics 
}: AIAnalysisPanelProps) {
  const topDisease = predictions[0]?.disease;
  
  if (!topDisease) return null;
  
  // Format AI confidence score color
  const getConfidenceColor = () => {
    if (aiConfidenceScore >= 80) return "text-green-600";
    if (aiConfidenceScore >= 60) return "text-blue-600";
    if (aiConfidenceScore >= 40) return "text-amber-600";
    return "text-red-600";
  };
  
  // Format spread risk badges
  const getSpreadRiskBadge = () => {
    switch (regionalRiskMetrics.geographicalSpreadRisk) {
      case "very high":
        return <Badge variant="destructive" className="bg-red-600">Very High Risk</Badge>;
      case "high":
        return <Badge className="bg-orange-500">High Risk</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium Risk</Badge>;
      default:
        return <Badge className="bg-green-600">Low Risk</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main AI Analysis Card */}
        <Card className="lg:col-span-2 shadow-md border-blue-200">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <BrainCircuitIcon className="h-5 w-5" />
              AI-Enhanced Disease Analysis
            </CardTitle>
            <p className="text-sm text-blue-100">
              Advanced pattern recognition for early-stage disease detection
            </p>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">AI Confidence Score</div>
                <div className={`font-bold text-lg ${getConfidenceColor()}`}>{aiConfidenceScore}%</div>
              </div>
              <Progress 
                value={aiConfidenceScore} 
                className="h-2" 
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Based on symptom pattern recognition and seasonal disease trends
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
                <h3 className="font-medium flex items-center gap-2 text-blue-800 mb-2">
                  <AlertTriangleIcon className="h-4 w-4" />
                  Primary Concern: {topDisease.name}
                </h3>
                <div className="text-sm text-muted-foreground">
                  <p>{topDisease.description}</p>
                  <div className="mt-2 pt-2 border-t border-blue-100 grid grid-cols-2 gap-y-1 gap-x-4 text-sm">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-muted-foreground">Incubation: </span>
                      <span className="font-medium">{topDisease.incubationPeriod}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ShieldIcon className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-muted-foreground">Severity: </span>
                      <span className="font-medium capitalize">{topDisease.severity}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                  Disease Progression Prediction
                </h3>
                <div className="text-sm">
                  <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-md">
                    <div className="font-medium text-amber-800 mb-1">Early Intervention Window:</div>
                    <div className="flex justify-between items-center">
                      <div className="text-muted-foreground">Optimal treatment timeframe:</div>
                      <Badge variant="outline" className="border-amber-400 text-amber-700 bg-amber-50">
                        {regionalRiskMetrics.earlyInterventionWindow}
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Early intervention significantly increases treatment effectiveness and reduces spread potential
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50/70 border border-green-100 rounded-md">
                <h3 className="font-medium text-green-800 mb-1">
                  AI-Recommended Treatment Approach:
                </h3>
                <div className="text-sm text-muted-foreground">
                  {topDisease.treatmentApproach}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Regional Risk Assessment */}
        <Card className="shadow-md border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Regional Risk Assessment
            </CardTitle>
            <p className="text-sm text-blue-100">
              Geographical spread potential analysis
            </p>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <h3 className="text-sm font-medium">Geographical Spread Risk:</h3>
                  {getSpreadRiskBadge()}
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on disease contagiousness and local transmission patterns
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                  <span>Transmission Rate (R₀):</span>
                  <span className="font-semibold">
                    {regionalRiskMetrics.transmissionRate.toFixed(1)}
                  </span>
                </div>
                <Progress 
                  value={regionalRiskMetrics.transmissionRate * 20} 
                  className="h-1.5" 
                />
              </div>
              
              <div className="bg-blue-50/70 p-3 rounded-md border border-blue-100">
                <div className="text-sm font-medium mb-1 flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4 text-blue-500" />
                  Potential Weekly Cases:
                </div>
                <div className="text-lg font-semibold text-blue-800">
                  {regionalRiskMetrics.potentialCasesPerWeek}
                </div>
                <div className="text-xs text-muted-foreground">
                  If containment measures are not implemented
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <UsersIcon className="h-4 w-4 text-amber-600" />
                  At-Risk Demographics:
                </div>
                <div className="space-y-1.5">
                  {regionalRiskMetrics.demographicRiskGroups.map((group, index) => (
                    <div key={index} className="bg-amber-50/50 text-amber-800 text-sm py-1 px-2 rounded border border-amber-100">
                      {group}
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-sm">
                <span>Similar cases detected recently:</span>
                <Badge variant="outline" className="font-semibold">
                  {regionalRiskMetrics.recentSimilarCases}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Early detection confidence:</span>
                <span className="font-semibold">{regionalRiskMetrics.earlyDetectionConfidence}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}