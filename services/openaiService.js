// Ensure dotenv is loaded first
require('dotenv').config();

const OpenAI = require('openai');

// Debug: Log the API key status
console.log('OPENAI_API_KEY exists:', !!process.env.OPENAI_API_KEY);
console.log('OPENAI_API_KEY length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0);

// Only initialize OpenAI if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('OpenAI client initialized successfully');
  } catch (error) {
    console.error('Failed to initialize OpenAI client:', error);
  }
} else {
  console.error('OPENAI_API_KEY not found in environment variables');
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
      // Return helpful mock response when OpenAI is not available
      return this.getMockParentingAdvice(question);
    }
    
    const context = "You are a supportive AI assistant for mothers. Provide helpful, practical advice based on the question asked. Keep responses warm, encouraging, and actionable.";
    
    try {
      const response = await this.generateResponse(question, context);
      return response;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      // Return mock response if OpenAI quota exceeded
      if (error.status === 429 || error.code === 'insufficient_quota') {
        return `Thank you for your question: "${question}". \n\nI'm a helpful AI assistant for mothers, but I'm currently experiencing quota limitations. Here's some general advice:\n\n• This is a common parenting concern that many mothers face\n• Consider consulting with your pediatrician or a parenting expert\n• Connect with other moms in online communities for support\n• Remember that every child is unique and develops at their own pace\n\n*Note: This is a temporary response while we resolve API limitations. Full AI features will be restored soon!*`;
      }
      throw error;
    }
  }

  static async generatePromptResponse(promptType) {
    if (!openai) {
      // Return helpful mock response when OpenAI is not available
      return this.getMockPromptResponse(promptType);
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

  // Mock responses when OpenAI is not available
  static getMockParentingAdvice(question) {
    const responses = [
      `Thank you for your question: "${question}"

🤱 **Helpful Parenting Advice:**

• **Trust your instincts** - You know your child better than anyone else
• **Every child develops at their own pace** - Don't compare with others
• **Create consistent routines** - Children thrive with predictability
• **Take care of yourself too** - A happy mom means a happy family
• **Connect with other parents** - You're not alone in this journey

💡 **Consider consulting:**
• Your pediatrician for health-related concerns
• Parenting books or trusted online resources
• Local parenting groups or mom communities
• Family counselors for behavioral guidance

*Remember: This is general advice. For specific concerns, always consult with healthcare professionals.*

🌟 **You're doing great, mama!**`,
      
      `Great question: "${question}"

👶 **Parenting Wisdom:**

• **Patience is key** - Parenting is a marathon, not a sprint
• **Celebrate small wins** - Every milestone matters
• **It's okay to ask for help** - Strong parents seek support
• **Quality time over quantity** - Make moments count
• **Self-compassion** - You're learning too, and that's okay

📚 **Helpful Resources:**
• American Academy of Pediatrics guidelines
• Local parenting classes or workshops
• Trusted parenting websites and apps
• Mom support groups in your community

*This is supportive guidance while our AI features are being enhanced. For urgent concerns, contact your healthcare provider.*

💪 **Keep up the amazing work!**`,
      
      `Your question: "${question}" is so important!

🌈 **Parenting Tips:**

• **Communication is everything** - Talk to your child at their level
• **Positive reinforcement works** - Praise good behavior
• **Consistency builds security** - Stick to your boundaries
• **Model the behavior you want** - Children learn by watching
• **Make time for play** - Fun strengthens your bond

🤝 **Support Network:**
• Join local mom groups or playgroups
• Connect with other parents online
• Don't hesitate to reach out to family
• Consider parenting coaches or counselors

*These are general suggestions. Every family situation is unique, so trust your judgment and seek professional advice when needed.*

❤️ **You've got this!**`
    ];
    
    // Return a random helpful response
    return responses[Math.floor(Math.random() * responses.length)];
  }

  static getMockPromptResponse(promptType) {
    const responses = {
      'parenting_tips': `🌟 **Daily Parenting Tips for Success:**

• **Morning Routine Magic:** Start each day with a consistent routine - it sets a positive tone
• **Active Listening:** When your child speaks, put down devices and give full attention
• **Positive Language:** Use "please" and "thank you" - children mirror what they hear
• **One-on-One Time:** Spend 15 minutes daily with each child doing their favorite activity
• **Patience Practice:** Take deep breaths before reacting - model emotional regulation

💡 **Remember:** Small, consistent actions create lasting positive changes in your family dynamic!`,
      
      'health_wellness': `🌿 **Health & Wellness for New Moms:**

• **Prioritize Sleep:** Rest when baby rests - your body needs recovery time
• **Nutritious Meals:** Keep healthy snacks handy for quick energy boosts
• **Stay Hydrated:** Especially important if breastfeeding - aim for 8-10 glasses daily
• **Gentle Exercise:** Start with walks, gradually add yoga or light workouts
• **Mental Health:** Don't ignore feelings - postpartum support is crucial

🤱 **Self-Care Isn't Selfish:** Taking care of yourself helps you better care for your family!`,
      
      'family_planning': `📅 **Smart Family Planning Strategies:**

• **Weekly Family Meetings:** Discuss upcoming events and everyone's needs
• **Flexible Schedules:** Build in buffer time for unexpected moments
• **Age-Appropriate Activities:** Choose outings that work for all family members
• **Budget-Friendly Fun:** Parks, libraries, and home activities can be just as engaging
• **Backup Plans:** Always have indoor alternatives for outdoor activities

👨‍👩‍👧‍👦 **Family Time:** Quality connections matter more than expensive activities!`
    };
    
    return responses[promptType] || responses['parenting_tips'];
  }
}

module.exports = OpenAIService; 