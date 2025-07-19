import { Symptom, Disease } from "@/types";

export const symptoms: Symptom[] = [
  {
    id: "fever",
    name: "Fever",
    description: "Elevated body temperature above 37.5°C (99.5°F)"
  },
  {
    id: "cough",
    name: "Cough",
    description: "Sudden expulsion of air from the lungs"
  },
  {
    id: "cold",
    name: "Cold/Runny Nose",
    description: "Nasal congestion or discharge"
  },
  {
    id: "sore_throat",
    name: "Sore Throat",
    description: "Pain or irritation in the throat"
  },
  {
    id: "headache",
    name: "Headache",
    description: "Pain in the head or upper neck"
  },
  {
    id: "body_ache",
    name: "Body Ache",
    description: "Pain felt throughout the body or in multiple muscle groups"
  },
  {
    id: "fatigue",
    name: "Fatigue",
    description: "Extreme tiredness or lack of energy"
  },
  {
    id: "shortness_of_breath",
    name: "Shortness of Breath",
    description: "Difficulty breathing or feeling like you can't get enough air"
  },
  {
    id: "nausea",
    name: "Nausea",
    description: "Feeling of sickness with an inclination to vomit"
  },
  {
    id: "vomiting",
    name: "Vomiting",
    description: "Forceful expulsion of stomach contents through the mouth"
  },
  {
    id: "diarrhea",
    name: "Diarrhea",
    description: "Loose, watery stools occurring more frequently than usual"
  },
  {
    id: "rash",
    name: "Rash",
    description: "Area of irritated or swollen skin that affects the color or texture of the skin"
  },
  {
    id: "joint_pain",
    name: "Joint Pain",
    description: "Discomfort in one or more joints"
  },
  {
    id: "loss_of_taste",
    name: "Loss of Taste",
    description: "Inability to detect or recognize tastes"
  },
  {
    id: "loss_of_smell",
    name: "Loss of Smell",
    description: "Inability to detect or recognize smells"
  },
  {
    id: "chest_pain",
    name: "Chest Pain",
    description: "Discomfort or pain in the chest area"
  },
  {
    id: "abdominal_pain",
    name: "Abdominal Pain",
    description: "Pain in the area between the chest and groin"
  },
  {
    id: "chills",
    name: "Chills",
    description: "Feeling of coldness with shivering"
  },
  {
    id: "dizziness",
    name: "Dizziness",
    description: "Feeling faint, woozy, weak, or unsteady"
  },
  {
    id: "swollen_glands",
    name: "Swollen Glands",
    description: "Enlarged lymph nodes, usually in the neck, armpits, or groin"
  }
];

export const diseases: Disease[] = [
  {
    id: "covid19",
    name: "COVID-19",
    description: "A respiratory illness caused by the SARS-CoV-2 virus",
    symptoms: ["fever", "cough", "fatigue", "shortness_of_breath", "loss_of_taste", "loss_of_smell"],
    severity: "high",
    contagiousness: "very high",
    incubationPeriod: "2-14 days",
    treatmentApproach: "Supportive care, antivirals for severe cases, vaccination for prevention"
  },
  {
    id: "influenza",
    name: "Influenza (Flu)",
    description: "A viral infection that attacks your respiratory system",
    symptoms: ["fever", "cough", "sore_throat", "body_ache", "headache", "fatigue", "chills"],
    severity: "medium",
    contagiousness: "high",
    incubationPeriod: "1-4 days",
    treatmentApproach: "Bed rest, fluids, antiviral medications, annual vaccination for prevention"
  },
  {
    id: "common_cold",
    name: "Common Cold",
    description: "A viral infection of the upper respiratory tract",
    symptoms: ["cold", "cough", "sore_throat", "headache", "fatigue"],
    severity: "low",
    contagiousness: "medium",
    incubationPeriod: "1-3 days",
    treatmentApproach: "Rest, fluids, over-the-counter medications for symptom relief"
  },
  {
    id: "pneumonia",
    name: "Pneumonia",
    description: "Infection that inflames air sacs in one or both lungs",
    symptoms: ["fever", "cough", "shortness_of_breath", "chest_pain", "fatigue"],
    severity: "high",
    contagiousness: "medium",
    incubationPeriod: "1-3 days",
    treatmentApproach: "Antibiotics, rest, fluids, and possibly hospitalization for severe cases"
  },
  {
    id: "bronchitis",
    name: "Bronchitis",
    description: "Inflammation of the lining of the bronchial tubes",
    symptoms: ["cough", "shortness_of_breath", "chest_pain", "fatigue", "fever"],
    severity: "medium",
    contagiousness: "medium",
    incubationPeriod: "4-6 days",
    treatmentApproach: "Rest, fluids, over-the-counter medications, antibiotics if bacterial"
  },
  {
    id: "sinusitis",
    name: "Sinusitis",
    description: "Inflammation of the sinuses",
    symptoms: ["headache", "cold", "cough", "fatigue"],
    severity: "low",
    contagiousness: "low",
    incubationPeriod: "Variable",
    treatmentApproach: "Nasal decongestants, antibiotics if bacterial, saline nasal spray"
  },
  {
    id: "gastroenteritis",
    name: "Gastroenteritis",
    description: "Inflammation of the stomach and intestines",
    symptoms: ["nausea", "vomiting", "diarrhea", "abdominal_pain", "fever"],
    severity: "medium",
    contagiousness: "high",
    incubationPeriod: "24-48 hours",
    treatmentApproach: "Fluid replacement, rest, gradual return to eating"
  },
  {
    id: "strep_throat",
    name: "Strep Throat",
    description: "Bacterial infection causing inflammation and pain in the throat",
    symptoms: ["sore_throat", "fever", "swollen_glands", "headache"],
    severity: "medium",
    contagiousness: "high",
    incubationPeriod: "2-5 days",
    treatmentApproach: "Antibiotics, pain relievers, rest and fluids"
  },
  {
    id: "measles",
    name: "Measles",
    description: "Highly contagious viral disease causing fever and rash",
    symptoms: ["fever", "cough", "cold", "rash", "fatigue", "loss_of_appetite"],
    severity: "high",
    contagiousness: "very high",
    incubationPeriod: "10-14 days",
    treatmentApproach: "Supportive care, vitamin A supplements, vaccination for prevention"
  },
  {
    id: "dengue",
    name: "Dengue Fever",
    description: "Mosquito-borne viral infection causing fever and joint pain",
    symptoms: ["fever", "headache", "joint_pain", "body_ache", "rash", "fatigue"],
    severity: "high",
    contagiousness: "low",
    incubationPeriod: "4-10 days",
    treatmentApproach: "Pain relievers, fluids, rest, hospital care for severe cases"
  }
];