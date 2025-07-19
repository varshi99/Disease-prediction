export interface Symptom {
  id: string;
  name: string;
  description: string;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  contagiousness: 'low' | 'medium' | 'high' | 'very high';
  incubationPeriod: string;
  treatmentApproach: string;
}

export interface PatientData {
  age: number;
  gender: 'male' | 'female' | 'other';
  symptoms: string[];
  travelHistory?: boolean;
  preExistingConditions?: string[];
  vaccinationStatus?: string;
}

export interface PredictionResult {
  disease: Disease;
  probability: number;
  riskFactors: string[];
  outbreakRisk: 'low' | 'medium' | 'high' | 'very high';
  recommendations: string[];
}