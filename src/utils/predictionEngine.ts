import { PatientData, PredictionResult, Disease } from "@/types";
import { diseases, symptoms } from "@/data/database";

// Weights for different factors in disease prediction
const SYMPTOM_MATCH_WEIGHT = 0.7;
const AGE_RISK_WEIGHT = 0.15;
const TRAVEL_HISTORY_WEIGHT = 0.15;

export function predictDisease(patientData: PatientData): PredictionResult[] {
  // Calculate disease probabilities
  const predictions = diseases.map(disease => {
    // Calculate symptom match percentage
    const matchedSymptoms = disease.symptoms.filter(symptomId => 
      patientData.symptoms.includes(symptomId)
    );
    
    const symptomMatchScore = matchedSymptoms.length / disease.symptoms.length;
    
    // Calculate age risk factor (simplified)
    let ageRiskFactor = 0;
    if (patientData.age < 12) {
      ageRiskFactor = disease.id === "measles" || disease.id === "common_cold" ? 0.8 : 0.2;
    } else if (patientData.age > 65) {
      ageRiskFactor = disease.id === "pneumonia" || disease.id === "influenza" ? 0.8 : 0.4;
    } else {
      ageRiskFactor = 0.5;
    }
    
    // Travel history factor (simplified)
    const travelFactor = patientData.travelHistory ? 
      (disease.id === "dengue" || disease.id === "covid19" ? 0.7 : 0.3) : 0.1;
    
    // Calculate overall probability
    const probability = (
      symptomMatchScore * SYMPTOM_MATCH_WEIGHT +
      ageRiskFactor * AGE_RISK_WEIGHT +
      travelFactor * TRAVEL_HISTORY_WEIGHT
    ) * 100;
    
    // Generate risk factors
    const riskFactors = [];
    if (patientData.age < 12 || patientData.age > 65) {
      riskFactors.push("Age-related risk");
    }
    if (patientData.travelHistory) {
      riskFactors.push("Recent travel history");
    }
    if (patientData.preExistingConditions && patientData.preExistingConditions.length > 0) {
      riskFactors.push("Pre-existing health conditions");
    }
    
    // Determine outbreak risk based on disease contagiousness and probability
    let outbreakRisk: 'low' | 'medium' | 'high' | 'very high' = 'low';
    if (disease.contagiousness === 'very high' && probability > 60) {
      outbreakRisk = 'very high';
    } else if (disease.contagiousness === 'high' && probability > 50) {
      outbreakRisk = 'high';
    } else if (disease.contagiousness === 'medium' && probability > 60) {
      outbreakRisk = 'medium';
    }
    
    // Generate recommendations
    const recommendations = [];
    recommendations.push(`Consider testing for ${disease.name}`);
    if (outbreakRisk === 'high' || outbreakRisk === 'very high') {
      recommendations.push("Self-isolate to prevent potential spread");
      recommendations.push("Contact health authorities");
    }
    recommendations.push("Monitor symptoms closely");
    if (disease.severity === 'high' || disease.severity === 'critical') {
      recommendations.push("Seek immediate medical attention");
    }
    
    return {
      disease,
      probability: Number(probability.toFixed(2)),
      riskFactors,
      outbreakRisk,
      recommendations
    };
  });
  
  // Sort predictions by probability (highest first)
  return predictions.sort((a, b) => b.probability - a.probability);
}

export function getTopPredictions(predictions: PredictionResult[], count: number = 3): PredictionResult[] {
  return predictions.slice(0, count);
}

export function getSymptomNames(symptomIds: string[]): string[] {
  return symptomIds
    .map(id => symptoms.find(s => s.id === id)?.name || "")
    .filter(name => name !== "");
}

export function calculateOutbreakMetrics(predictions: PredictionResult[]): { 
  riskLevel: 'low' | 'medium' | 'high' | 'very high',
  affectedPopulationEstimate: number,
  spreadRate: number,
  timeToContainment: string
} {
  const topPrediction = predictions[0];
  
  if (!topPrediction) {
    return {
      riskLevel: 'low',
      affectedPopulationEstimate: 0,
      spreadRate: 0,
      timeToContainment: 'N/A'
    };
  }
  
  const riskLevel = topPrediction.outbreakRisk;
  
  let affectedPopulationEstimate = 0;
  let spreadRate = 0;
  let timeToContainment = 'N/A';
  
  switch (riskLevel) {
    case 'very high':
      affectedPopulationEstimate = 5000;
      spreadRate = 3.2;
      timeToContainment = '3-6 months';
      break;
    case 'high':
      affectedPopulationEstimate = 2000;
      spreadRate = 2.1;
      timeToContainment = '2-4 months';
      break;
    case 'medium':
      affectedPopulationEstimate = 500;
      spreadRate = 1.5;
      timeToContainment = '1-2 months';
      break;
    case 'low':
      affectedPopulationEstimate = 50;
      spreadRate = 0.8;
      timeToContainment = '2-3 weeks';
      break;
  }
  
  return {
    riskLevel,
    affectedPopulationEstimate,
    spreadRate,
    timeToContainment
  };
}