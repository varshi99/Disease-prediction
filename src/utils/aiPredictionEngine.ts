import { PatientData, PredictionResult, Disease } from "@/types";
import { diseases, symptoms } from "@/data/database";
import { predictDisease } from "./predictionEngine";

export interface RegionalRiskMetrics {
  transmissionRate: number;
  potentialCasesPerWeek: number;
  earlyDetectionConfidence: number;
  geographicalSpreadRisk: 'low' | 'medium' | 'high' | 'very high';
  demographicRiskGroups: string[];
  earlyInterventionWindow: string;
  recentSimilarCases: number;
}

// Enhanced AI prediction model for early disease detection and outbreak prediction
export function aiPredictDisease(patientData: PatientData): {
  predictions: PredictionResult[],
  aiConfidenceScore: number,
  regionalRiskMetrics: RegionalRiskMetrics
} {
  // Get base predictions from traditional algorithm
  const basePredictions = predictDisease(patientData);
  
  // Apply AI enhancements to improve early detection
  const enhancedPredictions = basePredictions.map(prediction => {
    // Early stage detection enhancement - detect diseases even with fewer symptoms
    let enhancedProbability = prediction.probability;
    
    // Early symptom pattern recognition (simulating AI analysis)
    // Some diseases have specific early symptoms that are highly indicative
    const earlyIndicators = getEarlyDiseaseIndicators(prediction.disease.id, patientData.symptoms);
    if (earlyIndicators.detected) {
      enhancedProbability += earlyIndicators.confidenceBoost;
      prediction.riskFactors.push("Early symptom pattern detected");
    }
    
    // Account for seasonal patterns
    const seasonalFactor = calculateSeasonalFactor(prediction.disease.id);
    enhancedProbability *= seasonalFactor;
    
    // Add more specific recommendations based on AI analysis
    if (earlyIndicators.detected) {
      prediction.recommendations.unshift("Early symptom pattern suggests monitoring for disease progression");
    }
    
    // Add data-driven isolation recommendations for highly contagious diseases
    if (prediction.outbreakRisk === 'high' || prediction.outbreakRisk === 'very high') {
      const isolationPeriod = getRecommendedIsolationPeriod(prediction.disease.id);
      prediction.recommendations.push(`Isolate for at least ${isolationPeriod} days to prevent spread`);
    }
    
    return {
      ...prediction,
      probability: Number(enhancedProbability.toFixed(2))
    };
  });
  
  // Re-sort based on enhanced probabilities
  const sortedPredictions = enhancedPredictions.sort((a, b) => b.probability - a.probability);
  
  // Calculate overall AI confidence score (0-100)
  const aiConfidenceScore = calculateAIConfidenceScore(sortedPredictions, patientData);
  
  // Generate regional outbreak metrics
  const regionalRiskMetrics = generateRegionalRiskMetrics(sortedPredictions[0], patientData);
  
  return {
    predictions: sortedPredictions,
    aiConfidenceScore,
    regionalRiskMetrics
  };
}

function getEarlyDiseaseIndicators(diseaseId: string, patientSymptoms: string[]): { detected: boolean, confidenceBoost: number } {
  // Early detection patterns for specific diseases
  const earlyIndicatorPatterns: Record<string, { symptoms: string[], boost: number }> = {
    "covid19": { 
      symptoms: ["fatigue", "loss_of_taste", "loss_of_smell"], 
      boost: 15
    },
    "influenza": { 
      symptoms: ["fatigue", "body_ache", "chills"], 
      boost: 12
    },
    "pneumonia": { 
      symptoms: ["fatigue", "shortness_of_breath"], 
      boost: 10
    },
    "measles": { 
      symptoms: ["fever", "cold"], 
      boost: 8
    },
    "dengue": { 
      symptoms: ["fever", "joint_pain", "body_ache"], 
      boost: 18
    }
  };
  
  const pattern = earlyIndicatorPatterns[diseaseId];
  if (!pattern) {
    return { detected: false, confidenceBoost: 0 };
  }
  
  // Check if the early pattern symptoms are present
  const matchedSymptoms = pattern.symptoms.filter(s => patientSymptoms.includes(s));
  
  // Early detection requires fewer matching symptoms than full diagnosis
  const detected = matchedSymptoms.length >= Math.ceil(pattern.symptoms.length / 2);
  
  return {
    detected,
    confidenceBoost: detected ? pattern.boost : 0
  };
}

function calculateSeasonalFactor(diseaseId: string): number {
  // Current month (1-12)
  const currentMonth = new Date().getMonth() + 1;
  
  // Seasonal patterns for different diseases
  const seasonalFactors: Record<string, number[]> = {
    "influenza": [1.4, 1.3, 1.1, 0.9, 0.7, 0.6, 0.6, 0.7, 0.9, 1.0, 1.2, 1.3], // Higher in winter
    "common_cold": [1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3], // Higher in winter
    "pneumonia": [1.2, 1.2, 1.1, 0.9, 0.8, 0.8, 0.8, 0.8, 0.9, 1.0, 1.1, 1.2], // Higher in winter
    "dengue": [0.8, 0.8, 0.9, 1.0, 1.2, 1.3, 1.4, 1.3, 1.2, 1.0, 0.9, 0.8]  // Higher in summer
  };
  
  return seasonalFactors[diseaseId]?.[currentMonth - 1] || 1.0;
}

function getRecommendedIsolationPeriod(diseaseId: string): number {
  // Recommended isolation periods by disease (days)
  const isolationPeriods: Record<string, number> = {
    "covid19": 7,
    "influenza": 5,
    "measles": 14,
    "pneumonia": 7,
    "common_cold": 3,
    "strep_throat": 2,
    "gastroenteritis": 2
  };
  
  return isolationPeriods[diseaseId] || 5; // Default to 5 days
}

function calculateAIConfidenceScore(predictions: PredictionResult[], patientData: PatientData): number {
  if (predictions.length === 0) return 0;
  
  const topPrediction = predictions[0];
  
  // Base confidence from top prediction probability
  let confidenceScore = topPrediction.probability * 0.7;
  
  // Adjust confidence based on symptom coverage
  const symptomCoverageRatio = patientData.symptoms.length / topPrediction.disease.symptoms.length;
  confidenceScore += Math.min(symptomCoverageRatio * 20, 20); // Up to 20 points
  
  // Reduce confidence if multiple diseases have similar probabilities
  if (predictions.length > 1) {
    const probabilityGap = topPrediction.probability - predictions[1].probability;
    if (probabilityGap < 10) {
      confidenceScore -= (10 - probabilityGap) * 0.5;
    }
  }
  
  // Add confidence if we have detailed patient information
  if (patientData.preExistingConditions && patientData.preExistingConditions.length > 0) {
    confidenceScore += 5;
  }
  if (patientData.vaccinationStatus) {
    confidenceScore += 5;
  }
  
  return Math.min(Math.max(confidenceScore, 0), 100);
}

function generateRegionalRiskMetrics(topPrediction: PredictionResult, patientData: PatientData): RegionalRiskMetrics {
  // Base transmission rate by disease contagiousness
  const baseTransmissionRates = {
    'low': 0.8,
    'medium': 1.5,
    'high': 2.3,
    'very high': 3.5
  };
  
  const transmissionRate = baseTransmissionRates[topPrediction.disease.contagiousness];
  
  // Calculate potential cases per week based on transmission rate
  const potentialCasesPerWeek = Math.round(Math.pow(transmissionRate, 2) * 10);
  
  // Early detection confidence based on AI confidence and symptom coverage
  const earlyDetectionConfidence = 
    topPrediction.probability < 50 ? 60 : 
    topPrediction.probability < 70 ? 75 : 
    topPrediction.probability < 85 ? 85 : 95;
  
  // Geographical spread risk based on disease contagiousness and outbreak risk
  const contagiousnessScore = 
    topPrediction.disease.contagiousness === 'low' ? 1 :
    topPrediction.disease.contagiousness === 'medium' ? 2 :
    topPrediction.disease.contagiousness === 'high' ? 3 : 4;
  
  const outbreakRiskScore = 
    topPrediction.outbreakRisk === 'low' ? 1 :
    topPrediction.outbreakRisk === 'medium' ? 2 :
    topPrediction.outbreakRisk === 'high' ? 3 : 4;
    
  const spreadRiskScore = contagiousnessScore * outbreakRiskScore;
  
  const geographicalSpreadRisk: 'low' | 'medium' | 'high' | 'very high' = 
    spreadRiskScore <= 3 ? 'low' :
    spreadRiskScore <= 6 ? 'medium' :
    spreadRiskScore <= 12 ? 'high' : 'very high';
  
  // Determine demographic risk groups
  const demographicRiskGroups = getDemographicRiskGroups(topPrediction.disease.id, patientData);
  
  // Early intervention window
  const earlyInterventionWindow = 
    topPrediction.disease.incubationPeriod === "1-3 days" ? "24-48 hours" :
    topPrediction.disease.incubationPeriod === "2-5 days" ? "48-72 hours" :
    topPrediction.disease.incubationPeriod === "1-4 days" ? "24-72 hours" :
    topPrediction.disease.incubationPeriod === "2-14 days" ? "3-5 days" :
    topPrediction.disease.incubationPeriod === "4-10 days" ? "2-4 days" :
    topPrediction.disease.incubationPeriod === "10-14 days" ? "5-7 days" : "3-5 days";
  
  // Simulate recent similar cases data
  const recentSimilarCases = Math.round(
    (spreadRiskScore * 5) + (Math.random() * 20)
  );
  
  return {
    transmissionRate,
    potentialCasesPerWeek,
    earlyDetectionConfidence,
    geographicalSpreadRisk,
    demographicRiskGroups,
    earlyInterventionWindow,
    recentSimilarCases
  };
}

function getDemographicRiskGroups(diseaseId: string, patientData: PatientData): string[] {
  const riskGroups: string[] = [];
  
  // Disease-specific demographic risks
  switch(diseaseId) {
    case "covid19":
      riskGroups.push("Elderly (65+)");
      riskGroups.push("Immunocompromised individuals");
      riskGroups.push("People with respiratory conditions");
      break;
    case "influenza":
      riskGroups.push("Young children");
      riskGroups.push("Elderly (65+)");
      riskGroups.push("Pregnant women");
      break;
    case "pneumonia":
      riskGroups.push("Elderly (65+)");
      riskGroups.push("Young children");
      riskGroups.push("People with chronic lung diseases");
      break;
    case "measles":
      riskGroups.push("Unvaccinated children");
      riskGroups.push("Pregnant women");
      riskGroups.push("Immunocompromised individuals");
      break;
    case "dengue":
      riskGroups.push("Children and young adults");
      riskGroups.push("Previously infected individuals (risk of severe dengue)");
      break;
    default:
      riskGroups.push("General population");
  }
  
  // Add age-specific risk groups based on patient data
  if (patientData.age < 12) {
    riskGroups.push("School-aged children");
  } else if (patientData.age >= 65) {
    riskGroups.push("Senior communities");
  }
  
  return riskGroups;
}