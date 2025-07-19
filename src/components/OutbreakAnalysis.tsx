import { PredictionResult } from "@/types";
import { calculateOutbreakMetrics } from "@/utils/predictionEngine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangleIcon, TrendingUpIcon, ClockIcon, UsersIcon } from "lucide-react";

interface OutbreakAnalysisProps {
  predictions: PredictionResult[];
}

export default function OutbreakAnalysis({ predictions }: OutbreakAnalysisProps) {
  const metrics = calculateOutbreakMetrics(predictions);
  const topDisease = predictions[0]?.disease.name || "Unknown";
  
  // Risk level indicator
  const getRiskColor = () => {
    switch (metrics.riskLevel) {
      case "very high":
        return "text-red-500";
      case "high":
        return "text-orange-500";
      case "medium":
        return "text-amber-500";
      default:
        return "text-blue-500";
    }
  };
  
  const getRiskProgressValue = () => {
    switch (metrics.riskLevel) {
      case "very high":
        return 95;
      case "high":
        return 75;
      case "medium":
        return 50;
      default:
        return 25;
    }
  };
  
  const getRiskProgressColor = () => {
    switch (metrics.riskLevel) {
      case "very high":
        return "bg-red-600";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-amber-500";
      default:
        return "bg-blue-500";
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-blue-200 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white pb-4">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5" />
            Outbreak Analysis for {topDisease}
          </CardTitle>
          <div className="text-sm text-blue-100">
            Predictive analytics for disease spread and containment strategies
          </div>
        </CardHeader>
        
        <CardContent className="pt-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/50 border border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangleIcon className={`h-4 w-4 ${getRiskColor()}`} />
                  Outbreak Risk Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Current Risk:</span>
                  <span className={`font-bold text-lg capitalize ${getRiskColor()}`}>
                    {metrics.riskLevel}
                  </span>
                </div>
                <Progress 
                  value={getRiskProgressValue()} 
                  className={`h-2 ${getRiskProgressColor()}`} 
                />
                <div className="text-xs text-muted-foreground mt-2">
                  Based on disease contagiousness and case probability
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 border border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-blue-500" />
                  Transmission Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Spread Rate (R₀):</span>
                    <span className="font-medium">{metrics.spreadRate.toFixed(1)}</span>
                  </div>
                  <Progress value={metrics.spreadRate * 20} className="h-1.5" />
                  
                  <div className="mt-3 pt-3 border-t border-blue-100">
                    <div className="flex justify-between items-center text-sm">
                      <span>New cases if uncontained:</span>
                      <span className="font-semibold">
                        ~{metrics.affectedPopulationEstimate} people
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/50 border border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-amber-500" />
                  Containment Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="py-3 px-4 bg-amber-50 rounded-md border border-amber-100 text-center">
                    <div className="text-sm text-muted-foreground">Estimated time to containment:</div>
                    <div className="font-bold text-lg text-amber-700">
                      {metrics.timeToContainment}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mt-1">
                    With proper isolation and contact tracing protocols
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 border border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-indigo-500" />
                  Population Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Potential affected population:</span>
                    <span className="font-medium">
                      {metrics.affectedPopulationEstimate.toLocaleString()} people
                    </span>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <div className="text-sm font-medium mb-1">Recommended Actions:</div>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Monitor close contacts for symptoms</li>
                      <li>Implement enhanced hygiene protocols</li>
                      {metrics.riskLevel === 'high' || metrics.riskLevel === 'very high' ? (
                        <li className="text-red-600 font-medium">Alert local health authorities</li>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}