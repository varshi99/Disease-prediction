import { useState } from "react";
import { PatientData } from "@/types";
import { symptoms } from "@/data/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

interface PatientFormProps {
  onSubmit: (data: PatientData) => void;
}

export default function PatientForm({ onSubmit }: PatientFormProps) {
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [travelHistory, setTravelHistory] = useState<boolean>(false);
  const [preExistingConditions, setPreExistingConditions] = useState<string[]>([]);
  const [vaccinated, setVaccinated] = useState<string>("");
  
  const handleCheckSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };
  
  const handlePreExistingCondition = (condition: string) => {
    if (preExistingConditions.includes(condition)) {
      setPreExistingConditions(preExistingConditions.filter(c => c !== condition));
    } else {
      setPreExistingConditions([...preExistingConditions, condition]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof age !== "number" || age < 1 || selectedSymptoms.length === 0) {
      alert("Please enter valid age and select at least one symptom");
      return;
    }
    
    const patientData: PatientData = {
      age,
      gender,
      symptoms: selectedSymptoms,
      travelHistory,
      preExistingConditions: preExistingConditions.length > 0 ? preExistingConditions : undefined,
      vaccinationStatus: vaccinated || undefined
    };
    
    onSubmit(patientData);
  };
  
  // Function to determine if a symptom is a critical marker for disease prediction
  const isCriticalSymptom = (id: string): boolean => {
    const criticalSymptoms = ["fever", "cough", "shortness_of_breath", "loss_of_taste", "blue_lips"];
    return criticalSymptoms.includes(id);
  };
  
  return (
    <Card className="w-full max-w-2xl shadow-lg border-blue-200 patient-input-panel">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="text-2xl flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          Patient Information
        </CardTitle>
        <CardDescription className="text-blue-100">
          Enter patient details and symptoms for early disease detection and outbreak prediction
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/50 p-4 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-blue-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M20 21a8 8 0 0 0-16 0"></path>
                </svg>
                Age
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value ? parseInt(e.target.value) : "")}
                required
                className="border-blue-200 focus-visible:ring-blue-400"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-blue-700 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
                  <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0 2 2 0 0 1-4 0 2 2 0 0 0-4 0 2 2 0 0 1-4 0 2 2 0 0 0-2 2Z"></path>
                </svg>
                Gender
              </Label>
              <RadioGroup 
                value={gender} 
                onValueChange={(value) => setGender(value as "male" | "female" | "other")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2 p-2 rounded-md bg-white border border-blue-100">
                  <RadioGroupItem value="male" id="male" className="text-blue-600" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-white border border-blue-100">
                  <RadioGroupItem value="female" id="female" className="text-blue-600" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-white border border-blue-100">
                  <RadioGroupItem value="other" id="other" className="text-blue-600" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="space-y-3 bg-blue-50/30 p-4 rounded-lg">
            <Label className="text-lg font-medium text-blue-700 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
                <path d="m8 15 3 3 5-5"></path>
              </svg>
              Symptoms
              <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs">
                Selected: {selectedSymptoms.length}
              </span>
            </Label>
            <div className="text-sm text-muted-foreground mb-2">Select all symptoms that apply</div>
            <ScrollArea className="h-60 border border-blue-200 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                {symptoms.map((symptom) => {
                  const isCritical = isCriticalSymptom(symptom.id);
                  return (
                    <div 
                      key={symptom.id} 
                      className={`flex items-center space-x-2 p-2 rounded-md 
                        ${selectedSymptoms.includes(symptom.id) ? 
                          isCritical ? "bg-red-50 border border-red-200" : "bg-blue-50 border border-blue-200" : 
                          "bg-white border border-gray-100"}`}
                    >
                      <Checkbox 
                        id={`symptom-${symptom.id}`} 
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={() => handleCheckSymptom(symptom.id)}
                        className={isCritical ? "text-red-500 border-red-500" : ""}
                      />
                      <Label 
                        htmlFor={`symptom-${symptom.id}`} 
                        className={`cursor-pointer ${isCritical ? "font-medium text-red-700" : ""}`}
                        title={symptom.description}
                      >
                        {symptom.name}
                        {isCritical && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <div className="text-sm text-red-500 mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" x2="12" y1="8" y2="12"></line>
                <line x1="12" x2="12.01" y1="16" y2="16"></line>
              </svg>
              <span>Items marked with * are critical symptoms for certain diseases</span>
            </div>
          </div>
          
          <div className="space-y-4 bg-blue-50/30 p-4 rounded-lg">
            <div className="text-lg font-medium text-blue-700 flex items-center gap-2 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18"></path>
                <path d="M21 15.5V6a2 2 0 0 0-2-2H9.5"></path>
                <path d="M16 2v4"></path>
                <path d="M8 2v2"></path>
                <path d="M3 10h7"></path>
                <circle cx="18" cy="18" r="3"></circle>
                <path d="M18 14v1"></path>
                <path d="M18 21v1"></path>
                <path d="M14 18h1"></path>
                <path d="M21 18h1"></path>
                <path d="m17 17 1 1"></path>
                <path d="m19 17-1 1"></path>
                <path d="m17 19 1-1"></path>
                <path d="m19 19-1-1"></path>
              </svg>
              Risk Factors
            </div>
            
            <div className="bg-white p-3 rounded-md border border-blue-100">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 15.5v.01"></path>
                  <path d="M12 12v.01"></path>
                  <path d="M11 17v.01"></path>
                  <path d="M7 14v.01"></path>
                </svg>
                <Switch
                  id="travel"
                  checked={travelHistory}
                  onCheckedChange={setTravelHistory}
                  className="data-[state=checked]:bg-blue-600"
                />
                <div>
                  <Label htmlFor="travel" className="font-medium">Recent Travel History</Label>
                  <p className="text-xs text-muted-foreground">
                    Travel to affected regions increases risk for certain diseases
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                <Label className="font-medium text-blue-700">
                  Pre-existing Conditions 
                  {preExistingConditions.length > 0 && 
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs">
                      {preExistingConditions.length}
                    </span>
                  }
                </Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-3 rounded-md border border-blue-100">
                {['Diabetes', 'Hypertension', 'Asthma', 'Heart Disease', 'Immunocompromised'].map((condition) => (
                  <div 
                    key={condition} 
                    className={`flex items-center space-x-2 p-2 rounded-md 
                      ${preExistingConditions.includes(condition) ? "bg-yellow-50 border border-yellow-200" : ""}`}
                  >
                    <Checkbox 
                      id={`condition-${condition}`} 
                      checked={preExistingConditions.includes(condition)}
                      onCheckedChange={() => handlePreExistingCondition(condition)}
                    />
                    <Label htmlFor={`condition-${condition}`} className="cursor-pointer">
                      {condition}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 bg-white p-3 rounded-md border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
                  <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
                  <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
                </svg>
                <Label className="font-medium text-blue-700">Vaccination Status</Label>
              </div>
              <RadioGroup 
                value={vaccinated} 
                onValueChange={setVaccinated}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
                  <RadioGroupItem value="fully_vaccinated" id="fully_vaccinated" className="text-blue-600" />
                  <Label htmlFor="fully_vaccinated" className="cursor-pointer">Fully Vaccinated</Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
                  <RadioGroupItem value="partially_vaccinated" id="partially_vaccinated" className="text-blue-600" />
                  <Label htmlFor="partially_vaccinated" className="cursor-pointer">Partially Vaccinated</Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-50">
                  <RadioGroupItem value="not_vaccinated" id="not_vaccinated" className="text-blue-600" />
                  <Label htmlFor="not_vaccinated" className="cursor-pointer">Not Vaccinated</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 text-lg"
            disabled={selectedSymptoms.length === 0}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8v8"></path>
              <path d="M8 12h8"></path>
            </svg>
            Analyze Symptoms & Predict Disease
          </Button>
          
          {selectedSymptoms.length === 0 && (
            <p className="text-center text-red-500 text-sm flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              Please select at least one symptom
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}