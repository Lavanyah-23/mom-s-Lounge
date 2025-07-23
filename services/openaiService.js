const OpenAI = require('openai');

// Only initialize OpenAI if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

class OpenAIService {
  static async generateResponse(prompt, context = '') {
    if (!openai) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
    }
    
    try {
      const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant specializing in parenting advice, motherhood tips, and family-related questions. Provide warm, supportive, and practical advice."
          },
          {
            role: "user",
            content: fullPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  static async generatePostIdea() {
    if (!openai) {
      return "AI features are not available. Please configure OpenAI API key to use AI-powered post ideas.";
    }
    
    const prompt = "Generate a creative and engaging post idea for a moms community platform. The idea should be relevant to motherhood, parenting, or family life. Return only the title and a brief description (2-3 sentences).";
    
    try {
      const response = await this.generateResponse(prompt);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async answerQuestion(question) {
    if (!openai) {
      return "AI features are not available. Please configure OpenAI API key to use AI-powered responses.";
    }
    
    const context = "You are a supportive AI assistant for mothers. Provide helpful, practical advice based on the question asked. Keep responses warm, encouraging, and actionable.";
    
    try {
      const response = await this.generateResponse(question, context);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async generatePromptResponse(promptType) {
    if (!openai) {
      return "AI features are not available. Please configure OpenAI API key to use AI-powered responses.";
    }
    
    const prompts = {
      'parenting_tips': 'What are some effective parenting tips for managing daily routines with young children?',
      'health_wellness': 'What are important health and wellness tips for new mothers?',
      'family_planning': 'What should parents consider when planning family activities and schedules?',
      'emotional_support': 'How can mothers support their emotional well-being while caring for their families?',
      'meal_planning': 'What are some practical meal planning tips for busy families?',
      'sleep_routines': 'How can parents establish healthy sleep routines for their children?'
    };

    const prompt = prompts[promptType] || 'How can I be a better parent?';
    
    try {
      const response = await this.generateResponse(prompt);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OpenAIService; 