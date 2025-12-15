import { GoogleGenAI, Type } from "@google/genai";
import { Perfume } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPerfumeRecommendations = async (userPreference: string): Promise<Perfume[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest 3 specific perfumes (real or realistic concepts) based on this user preference: "${userPreference}". 
      Focus on variety within the constraints. Be evocative in descriptions.`,
      config: {
        systemInstruction: "You are a world-class 'Nez' (perfumer) and sommelier of scents. Your goal is to match users with their perfect olfactory signature.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              brand: { type: Type.STRING },
              description: { type: Type.STRING, description: "A poetic and sensory description of the scent profile." },
              notes: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "List of top, middle, and base notes." 
              },
              intensity: { type: Type.INTEGER, description: "Intensity scale from 1 to 5" },
              price: { type: Type.STRING, description: "Estimated price range e.g. '$120 - $150'" }
            },
            required: ["name", "brand", "description", "notes", "intensity", "price"]
          }
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) return [];
    
    return JSON.parse(jsonStr) as Perfume[];
  } catch (error) {
    console.error("Failed to get recommendations:", error);
    // Return empty array to handle gracefully in UI
    return [];
  }
};

export const generatePerfumeVisual = async (name: string, description: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Create a photorealistic product shot of a luxury perfume bottle named "${name}". 
            Context: ${description}. 
            Style: Minimalist, elegant, high-end commercial product photography, 4k, soft lighting, botanical elements in background if applicable. 
            The bottle design should reflect the notes provided.`,
          },
        ],
      },
      // Image generation models do not support responseMimeType or responseSchema
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to generate image:", error);
    return null;
  }
};