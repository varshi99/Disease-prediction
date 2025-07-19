import { PredictionResult } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangleIcon, ShieldIcon, ActivityIcon, HeartPulseIcon, AlertCircleIcon } from "lucide-react";

interface DiseaseCardProps {
  prediction: PredictionResult;
  rank: number;
}

export default function DiseaseCard({ prediction, rank }: DiseaseCardProps) {
  const { disease, probability, riskFactors, outbreakRisk } = prediction;
  
  // Determine card styling based on disease severity and rank
  const getBorderColor = () => {
    if (rank === 0 && probability > 70) return "border-red-300";
    if (rank === 0) return "border-amber-300";
    if (rank === 1) return "border-amber-200";
    return "border-blue-200";
  };
  
  // Determine header styling based on disease severity
  const getHeaderStyle = () => {
    switch (disease.severity) {
      case "critical":
        return "bg-gradient-to-r from-red-600 to-red-700 text-white";
      case "high":
        return "bg-gradient-to-r from-red-500 to-amber-500 text-white";
      case "medium":
        return "bg-gradient-to-r from-amber-500 to-amber-600 text-white";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-600 text-white";
    }
  };
  
  // Get the badge color for outbreak risk
  const getOutbreakRiskBadge = () => {
    switch (outbreakRisk) {
      case "very high":
        return <Badge className="bg-red-500 hover:bg-red-600">Very High Outbreak Risk</Badge>;
      case "high":
        return <Badge className="bg-amber-500 hover:bg-amber-600">High Outbreak Risk</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium Outbreak Risk</Badge>;
      default:
        return <Badge className="bg-blue-500 hover:bg-blue-600">Low Outbreak Risk</Badge>;
    }
  };
  
  // Get icon based on disease severity
  const getSeverityIcon = () => {
    switch (disease.severity) {
      case "critical":
      case "high":
        return <AlertTriangleIcon className="h-5 w-5" />;
      case "medium":
        return <AlertCircleIcon className="h-5 w-5" />;
      default:
        return <ShieldIcon className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className={`shadow-md ${getBorderColor()} hover:shadow-lg transition-shadow disease-card relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-16 h-16">
        <div className={`absolute transform rotate-45 translate-y-[-50%] translate-x-[25%] ${rank === 0 ? 'bg-amber-500' : 'bg-blue-500'} text-white py-1 px-6 text-xs font-bold`}>
          {rank === 0 ? "TOP" : `#${rank + 1}`}
        </div>
      </div>
      
      <CardHeader className={`pb-3 ${getHeaderStyle()}`}>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            {getSeverityIcon()}
            {disease.name}
          </CardTitle>
        </div>
        <div className="text-sm opacity-90 mt-1">
          {disease.description}
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-3">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm text-muted-foreground">Match Probability</div>
              <div className="font-medium text-lg">{probability}%</div>
            </div>
            <Progress value={probability} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <HeartPulseIcon className="h-4 w-4 text-red-500" />
              <span>Severity:</span>
              <span className="font-medium capitalize">{disease.severity}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ActivityIcon className="h-4 w-4 text-blue-500" />
              <span>Incubation:</span>
              <span className="font-medium">{disease.incubationPeriod}</span>
            </div>
          </div>
          
          <div className="pt-1">
            {getOutbreakRiskBadge()}
          </div>
          
          {riskFactors.length > 0 && (
            <div className="text-sm">
              <div className="font-medium text-amber-700 mb-1">Risk Factors:</div>
              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground pl-1">
                {riskFactors.map((factor, i) => (
                  <li key={i}>{factor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}