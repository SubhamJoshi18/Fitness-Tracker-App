import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import fitnessLogger from '../libs/logger';

class GeminiApi {
  private apiKey: string;
  private model: GenerativeModel;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.model = this.initializeGemini();
  }

  initializeGemini() {
    try {
      const genAi = new GoogleGenerativeAI(this.apiKey as string);
      const model = genAi.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });
      return model;
    } catch (err) {
      fitnessLogger.error(`Error initializing the Gemini Api Configuration`);
      process.exit(1);
    }
  }

  async generateFoodDetails(foodName: string) {
    const prompt = `
    Give me detailed nutritional information for a ${foodName}, formatted as a JSON object with the fields: food_name, food_calorie, protein, fat, carbohydrates, fiber, and sugar. For example, if the food is 'apple', respond with {'food_name': 'apple', 'food_calorie': 52, 'protein': 0.3, 'fat': 0.2, 'carbohydrates': 14, 'fiber': 2.4, 'sugar': 10.4}

    `;
    const result = await this.model.generateContent(prompt);
    const generatePrompt = result.response.text();
    return generatePrompt;
  }
}

export default GeminiApi;
