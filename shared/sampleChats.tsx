// Sample chat conversations for each AI agent
export const sampleChats = {
    1: [ // General Physician
        { sender: "agent", message: "Hello! I'm here to help with your general health concerns. What symptoms are you experiencing today?" },
        { sender: "user", message: "I've been having a headache for the past 2 days and feeling a bit tired." },
        { sender: "agent", message: "I understand that can be concerning. Can you tell me if the headache is constant or comes and goes? Any fever?" },
        { sender: "user", message: "It's mostly constant, especially when I look at screens. No fever though." },
        { sender: "agent", message: "This sounds like it could be tension or eye strain related. Try taking regular breaks from screens, stay hydrated, and consider using a warm compress. If it persists beyond a few more days, please consult with a healthcare provider." }
    ],
    2: [ // Pediatrician
        { sender: "agent", message: "Hi there! I'm here to help with your child's health. What's concerning you about your little one today?" },
        { sender: "user", message: "My 3-year-old has been refusing to eat and seems more cranky than usual." },
        { sender: "agent", message: "That can be worrying for parents. How long has this been going on? Any fever or other symptoms?" },
        { sender: "user", message: "About 2 days now. No fever, but they're also sleeping more than usual." },
        { sender: "agent", message: "This could be a mild illness coming on. Keep them hydrated, offer small portions of their favorite foods, and monitor for fever. If symptoms worsen or persist beyond 3-4 days, please contact your pediatrician." }
    ],
    3: [ // Dermatologist
        { sender: "agent", message: "Hello! I'm here to help with your skin concerns. What skin issue would you like to discuss today?" },
        { sender: "user", message: "I've noticed some red, itchy patches on my arms that appeared recently." },
        { sender: "agent", message: "I can help with that. When did these patches first appear? Have you used any new products or been exposed to anything unusual?" },
        { sender: "user", message: "They showed up about a week ago. I did start using a new laundry detergent around that time." },
        { sender: "agent", message: "That's likely the culprit - contact dermatitis from the new detergent. Switch back to your old detergent, wash the affected area gently, and apply a fragrance-free moisturizer. If it doesn't improve in a few days, consider seeing a dermatologist." }
    ],
    4: [ // Psychologist
        { sender: "agent", message: "Hello, I'm here to provide emotional support. How are you feeling today, and what would you like to talk about?" },
        { sender: "user", message: "I've been feeling really anxious about work lately. It's affecting my sleep." },
        { sender: "agent", message: "I'm sorry you're going through this. Work anxiety is very common. What specifically about work is causing you the most stress?" },
        { sender: "user", message: "I have a big presentation next week and I keep worrying I'll mess it up." },
        { sender: "agent", message: "That anticipatory anxiety is understandable. Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8. Practice your presentation in small chunks, and remember that preparation is your best ally against anxiety." }
    ],
    5: [ // Nutritionist
        { sender: "agent", message: "Hi! I'm excited to help you with your nutrition goals. What would you like to work on with your diet today?" },
        { sender: "user", message: "I want to lose weight but I'm always hungry between meals." },
        { sender: "agent", message: "Great goal! Let's work on that hunger. What does a typical day of eating look like for you right now?" },
        { sender: "user", message: "Usually just coffee for breakfast, a sandwich for lunch, and dinner with my family." },
        { sender: "agent", message: "I see the issue! Skipping breakfast is making you hungrier later. Try adding protein and fiber to breakfast - like Greek yogurt with berries, or oatmeal with nuts. This will help stabilize your blood sugar and reduce cravings." }
    ],
    6: [ // Cardiologist
        { sender: "agent", message: "Hello, I'm here to help with heart-related concerns. What symptoms or questions do you have about your cardiovascular health?" },
        { sender: "user", message: "I sometimes feel my heart racing, especially after climbing stairs." },
        { sender: "agent", message: "I understand your concern. How often does this happen, and do you experience any chest pain or dizziness with it?" },
        { sender: "user", message: "It happens maybe 2-3 times a week. No chest pain, but sometimes I feel a bit short of breath." },
        { sender: "agent", message: "This could be related to fitness level or other factors. Start with gentle regular exercise, monitor your heart rate, and keep a symptom diary. If episodes become more frequent or severe, please see a cardiologist for proper evaluation." }
    ],
    7: [ // ENT Specialist
        { sender: "agent", message: "Hi! I'm here to help with ear, nose, and throat concerns. What ENT symptoms are you experiencing?" },
        { sender: "user", message: "I've had a stuffy nose and sinus pressure for over a week now." },
        { sender: "agent", message: "That sounds uncomfortable. Any facial pain, headache, or colored nasal discharge?" },
        { sender: "user", message: "Yes, some facial pressure and the mucus is yellowish-green." },
        { sender: "agent", message: "This suggests a possible sinus infection. Try saline nasal rinses, stay hydrated, and use a humidifier. If symptoms don't improve in 2-3 days or worsen, you should see a healthcare provider for possible antibiotic treatment." }
    ],
    8: [ // Orthopedic
        { sender: "agent", message: "Hello, I'm here to help with your musculoskeletal concerns. Where are you experiencing pain or discomfort?" },
        { sender: "user", message: "My lower back has been aching for the past few days, especially when I sit." },
        { sender: "agent", message: "Lower back pain is very common. Did this start after any specific activity, or did it come on gradually?" },
        { sender: "user", message: "I think it started after I spent a long day working at my desk without taking breaks." },
        { sender: "agent", message: "That's likely postural strain. Try alternating ice and heat, gentle stretching, and take frequent breaks from sitting. Focus on maintaining good posture and consider ergonomic adjustments to your workspace." }
    ],
    9: [ // Gynecologist
        { sender: "agent", message: "Hello, I'm here to discuss women's health concerns in a safe, confidential space. How can I help you today?" },
        { sender: "user", message: "I've been having irregular periods for the past few months." },
        { sender: "agent", message: "I understand this can be concerning. Have there been any changes in your stress levels, weight, or lifestyle recently?" },
        { sender: "user", message: "Yes, I started a new job and have been under more stress than usual." },
        { sender: "agent", message: "Stress can definitely affect menstrual cycles. Focus on stress management techniques like meditation, regular exercise, and adequate sleep. If irregularities persist beyond a few more cycles, please schedule an appointment with a gynecologist." }
    ],
    10: [ // Dentist
        { sender: "agent", message: "Hello! I'm here to help with your dental concerns. What dental issue can I help you with today?" },
        { sender: "user", message: "I've been having tooth sensitivity when I drink cold water." },
        { sender: "agent", message: "Tooth sensitivity can be quite uncomfortable. How long have you been experiencing this, and is it affecting multiple teeth?" },
        { sender: "user", message: "It's been about 2 weeks, mainly on the left side when I bite down on cold foods." },
        { sender: "agent", message: "This could be enamel wear or early cavity development. Switch to a toothpaste for sensitive teeth, avoid extremely cold foods temporarily, and please schedule a dental checkup soon to prevent any progression." }
    ],
    11: [ // Senior Care Advisor
        { sender: "agent", message: "Hello, I'm here to provide gentle guidance for seniors and their caregivers. What challenges are you facing today?" },
        { sender: "user", message: "My 78-year-old mother has been forgetting things more often lately." },
        { sender: "agent", message: "I understand your concern. Can you tell me what types of things she's forgetting - is it recent conversations, appointments, or familiar routines?" },
        { sender: "user", message: "Mostly recent conversations and sometimes she forgets if she's taken her medications." },
        { sender: "agent", message: "Memory changes can be concerning. Consider setting up a pill organizer, establishing consistent daily routines, and keeping a gentle conversation log. It's important to discuss these changes with her doctor for proper evaluation and guidance." }
    ],
    12: [ // Fitness Coach
        { sender: "agent", message: "Hey there! I'm excited to help you reach your fitness goals. What are you looking to achieve with your workout routine?" },
        { sender: "user", message: "I want to start exercising but I haven't worked out in years and don't know where to begin." },
        { sender: "agent", message: "That's awesome that you're ready to start! What's your current activity level, and do you have any physical limitations I should know about?" },
        { sender: "user", message: "I mostly sit at a desk all day. No major limitations, just very out of shape." },
        { sender: "agent", message: "Perfect! Start with 15-20 minute walks daily and basic bodyweight exercises like wall push-ups and chair squats. The key is consistency over intensity. You've got this - every journey starts with that first step!" }
    ],
    13: [ // Wellness Counselor
        { sender: "agent", message: "Hello, I'm here to support your overall well-being journey. What aspects of wellness would you like to work on today?" },
        { sender: "user", message: "I feel like I'm constantly stressed and can't find a good work-life balance." },
        { sender: "agent", message: "Work-life balance challenges are very common today. What does your typical day look like, and where do you feel the biggest pressure points?" },
        { sender: "user", message: "I work long hours, barely take breaks, and feel guilty when I try to relax at home." },
        { sender: "agent", message: "It sounds like you're putting a lot of pressure on yourself. Try setting specific 'work end times' and creating transition rituals between work and personal time. Remember, rest isn't earned - it's essential for your well-being and productivity." }
    ],
    14: [ // Life Coach
        { sender: "agent", message: "Welcome! I'm here to help you achieve your personal and professional goals. What area of your life would you like to focus on today?" },
        { sender: "user", message: "I feel stuck in my career and don't know what direction to take next." },
        { sender: "agent", message: "Career transitions can feel overwhelming, but they're also opportunities for growth. What aspects of your current role do you find most and least fulfilling?" },
        { sender: "user", message: "I like helping people and problem-solving, but I hate the long hours and lack of creativity." },
        { sender: "agent", message: "Great insights! You value helping others and creativity while wanting better work-life balance. Let's explore careers that combine these elements - consider fields like UX design, training and development, or consulting where you can solve problems creatively while maintaining flexibility." }
    ],
    15: [ // Chef Consultant
        { sender: "agent", message: "Hello, fellow food enthusiast! I'm here to help elevate your cooking skills. What culinary adventure shall we embark on today?" },
        { sender: "user", message: "I want to learn to cook but I always seem to mess up even simple recipes." },
        { sender: "agent", message: "Don't worry, cooking is all about practice! What's the last dish you attempted, and what went wrong?" },
        { sender: "user", message: "I tried to make pasta with tomato sauce, but the sauce was too watery and bland." },
        { sender: "agent", message: "Ah, classic beginner mistake! Next time, sauté garlic and onions first, add tomato paste for depth, let the sauce simmer to reduce water, and don't forget to season with salt, pepper, and herbs. The secret is building flavors in layers!" }
    ],
    16: [ // Lifestyle Advisor
        { sender: "agent", message: "Namaste, I'm here to guide you toward a more balanced, natural lifestyle. What aspect of holistic living interests you today?" },
        { sender: "user", message: "I've been feeling tired all the time despite getting enough sleep. I want to try natural approaches." },
        { sender: "agent", message: "Chronic fatigue can have many roots in our lifestyle and energy flow. Tell me about your daily routine - when do you eat, how much water do you drink, and what's your stress level like?" },
        { sender: "user", message: "I eat irregularly, probably don't drink enough water, and I'm constantly stressed." },
        { sender: "agent", message: "I see the pattern. Try starting each day with warm lemon water, establish regular meal times to support your natural rhythms, and incorporate 5 minutes of deep breathing or meditation. These simple changes can significantly boost your natural energy flow." }
    ],
    17: [ // Career Consultant
        { sender: "agent", message: "Hello! I'm here to help advance your professional goals. What career challenges or opportunities would you like to discuss?" },
        { sender: "user", message: "I want to ask for a promotion but I don't know how to approach my boss." },
        { sender: "agent", message: "That's a great career move! How long have you been in your current role, and what specific achievements can you highlight?" },
        { sender: "user", message: "I've been here 2 years and led several successful projects that saved the company money." },
        { sender: "agent", message: "Perfect foundation! Schedule a formal meeting, prepare a 'promotion portfolio' with quantified achievements, research the target role's salary range, and present it as a business case. Show how promoting you benefits the organization, not just your personal goals." }
    ],
    18: [ // Research Analyst
        { sender: "agent", message: "Greetings! I'm here to help you with research and data analysis needs. What topic would you like to explore with evidence-based insights?" },
        { sender: "user", message: "I'm trying to understand the impact of remote work on productivity, but there's so much conflicting information." },
        { sender: "agent", message: "Excellent research question! What specific aspects of productivity are you most interested in - individual performance, team collaboration, or organizational outcomes?" },
        { sender: "user", message: "Mainly individual performance and whether people actually get more or less done at home." },
        { sender: "agent", message: "Based on recent studies, individual productivity often increases 13-50% for remote workers due to fewer interruptions and commute time savings. However, this varies by personality type, home environment, and job requirements. The key factors are workspace setup, clear boundaries, and communication tools." }
    ]
};

// Sample reviews for agents
export const sampleReviews = {
    1: [
        { name: "Sarah M.", rating: 5, comment: "Really helpful for my cold symptoms. Got practical advice quickly and felt reassured about when to see a doctor.", date: "2 days ago" },
        { name: "Mike D.", rating: 4, comment: "Good general guidance, though I wished it could have been more specific to my particular situation.", date: "1 week ago" },
        { name: "Lisa K.", rating: 5, comment: "Perfect for initial health questions. Saved me an unnecessary trip to urgent care!", date: "2 weeks ago" }
    ],
    2: [
        { name: "Jennifer L.", rating: 5, comment: "As a new mom, this pediatrician AI gave me confidence about my baby's feeding patterns. Very gentle and informative.", date: "3 days ago" },
        { name: "David R.", rating: 4, comment: "Helped me understand when my toddler's fever was concerning vs. normal. Good parenting guidance.", date: "1 week ago" },
        { name: "Amy S.", rating: 5, comment: "Great for teenage health questions. My 16-year-old felt comfortable asking sensitive questions.", date: "2 weeks ago" }
    ],
    3: [
        { name: "Rachel T.", rating: 5, comment: "Finally got answers about my skin issues! The advice was spot-on and my eczema improved significantly.", date: "1 day ago" },
        { name: "Tom B.", rating: 4, comment: "Good skincare routine suggestions, though I still needed to see a dermatologist for prescription treatment.", date: "4 days ago" },
        { name: "Nina P.", rating: 5, comment: "Helped me identify a potential allergic reaction quickly. Very knowledgeable about skin conditions.", date: "1 week ago" }
    ],
    4: [
        { name: "Emma W.", rating: 5, comment: "The most understanding AI I've talked to. Really helped me process my anxiety with practical coping strategies.", date: "2 hours ago" },
        { name: "James K.", rating: 5, comment: "Felt heard and supported during a difficult time. The breathing techniques actually work!", date: "3 days ago" },
        { name: "Maria G.", rating: 4, comment: "Good emotional support, though nothing replaces human therapy for deeper issues.", date: "1 week ago" }
    ],
    5: [
        { name: "Kevin H.", rating: 5, comment: "Lost 15 pounds following the meal planning advice! Very motivating and practical nutrition guidance.", date: "5 days ago" },
        { name: "Sophie C.", rating: 4, comment: "Good general nutrition tips, but needed more specific advice for my diabetes management.", date: "1 week ago" },
        { name: "Ryan M.", rating: 5, comment: "Perfect for meal prep beginners. The recipes are simple but nutritious and tasty!", date: "2 weeks ago" }
    ],
    6: [
        { name: "Patricia L.", rating: 5, comment: "Helped me understand my blood pressure readings and when to be concerned. Very reassuring and knowledgeable.", date: "1 day ago" },
        { name: "George F.", rating: 4, comment: "Good heart health advice, but still recommended seeing my cardiologist for chest pain evaluation.", date: "6 days ago" },
        { name: "Linda S.", rating: 5, comment: "Excellent guidance on heart-healthy lifestyle changes. My cholesterol improved after following the advice.", date: "3 weeks ago" }
    ],
    7: [
        { name: "Chris P.", rating: 5, comment: "Cleared up my sinus infection concerns and gave great home remedies. Avoided an unnecessary doctor visit.", date: "2 days ago" },
        { name: "Diana M.", rating: 4, comment: "Helpful for ear infection guidance, though my toddler still needed prescription antibiotics.", date: "1 week ago" },
        { name: "Robert K.", rating: 5, comment: "Great advice for my chronic sinus issues. The nasal rinse recommendation was a game-changer!", date: "2 weeks ago" }
    ],
    8: [
        { name: "Amanda R.", rating: 5, comment: "My back pain improved significantly with the stretching routine and posture tips. Excellent guidance!", date: "3 days ago" },
        { name: "Mark T.", rating: 4, comment: "Good general orthopedic advice, but needed physical therapy referral for my sports injury.", date: "5 days ago" },
        { name: "Carol B.", rating: 5, comment: "Helped me understand my knee pain and gave exercises that actually work. Very knowledgeable!", date: "1 week ago" }
    ],
    9: [
        { name: "Michelle A.", rating: 5, comment: "So comfortable discussing sensitive topics. Got great advice about hormonal changes during menopause.", date: "1 day ago" },
        { name: "Jessica D.", rating: 4, comment: "Helpful for general women's health questions, though still needed in-person exam for specific concerns.", date: "4 days ago" },
        { name: "Nicole S.", rating: 5, comment: "Excellent PCOS guidance and lifestyle recommendations. Felt understood and supported.", date: "2 weeks ago" }
    ],
    10: [
        { name: "Brian L.", rating: 5, comment: "Great dental hygiene tips! My sensitivity issues improved with the recommended toothpaste changes.", date: "2 days ago" },
        { name: "Hannah M.", rating: 4, comment: "Good general dental advice, but still needed to see my dentist for cavity treatment.", date: "1 week ago" },
        { name: "Tony G.", rating: 5, comment: "Helped me with bad breath concerns. The advice was practical and effective!", date: "3 weeks ago" }
    ],
    11: [
        { name: "Elizabeth K.", rating: 5, comment: "Wonderful guidance for caring for my elderly father. Compassionate and very understanding of family dynamics.", date: "1 day ago" },
        { name: "William P.", rating: 5, comment: "As a 72-year-old, I felt heard and respected. Great advice for managing my daily routines.", date: "3 days ago" },
        { name: "Margaret S.", rating: 4, comment: "Good senior care advice, though some situations still require professional geriatric consultation.", date: "1 week ago" }
    ],
    12: [
        { name: "Tyler R.", rating: 5, comment: "Best fitness motivation I've found! Started working out consistently for the first time in years.", date: "2 hours ago" },
        { name: "Ashley C.", rating: 4, comment: "Good beginner workout plans, but needed more advanced routines as I progressed.", date: "5 days ago" },
        { name: "Jake M.", rating: 5, comment: "Excellent exercise modifications for my knee injury. Finally found workouts I can do safely!", date: "1 week ago" }
    ],
    13: [
        { name: "Samantha L.", rating: 5, comment: "Life-changing work-life balance advice! I actually feel relaxed for the first time in months.", date: "1 day ago" },
        { name: "Alex T.", rating: 4, comment: "Good holistic wellness approach, though needed more specific stress management techniques.", date: "4 days ago" },
        { name: "Olivia K.", rating: 5, comment: "Perfect for burnout recovery. The self-care strategies are practical and sustainable.", date: "2 weeks ago" }
    ],
    14: [
        { name: "Jonathan B.", rating: 5, comment: "Incredible career guidance! Finally have a clear action plan for my professional goals.", date: "3 days ago" },
        { name: "Victoria H.", rating: 5, comment: "Helped me gain confidence for job interviews. The preparation strategies really work!", date: "1 week ago" },
        { name: "Daniel W.", rating: 4, comment: "Good life coaching insights, but needed more personalized guidance for my specific situation.", date: "2 weeks ago" }
    ],
    15: [
        { name: "Isabella F.", rating: 5, comment: "My cooking skills improved dramatically! The step-by-step guidance made complex recipes manageable.", date: "2 days ago" },
        { name: "Marcus J.", rating: 4, comment: "Great cooking tips, but wished there were more quick meal options for busy weeknights.", date: "6 days ago" },
        { name: "Stephanie R.", rating: 5, comment: "Perfect for learning international cuisine! The flavor combination advice is excellent.", date: "3 weeks ago" }
    ],
    16: [
        { name: "Priya N.", rating: 5, comment: "Wonderful holistic health approach. The Ayurvedic tips helped balance my energy naturally.", date: "1 day ago" },
        { name: "Carlos M.", rating: 4, comment: "Good natural health advice, though some approaches took longer to see results.", date: "1 week ago" },
        { name: "Yoga_Lover23", rating: 5, comment: "Perfect blend of ancient wisdom and modern practicality. Love the meditation guidance!", date: "2 weeks ago" }
    ],
    17: [
        { name: "Gregory S.", rating: 5, comment: "Got the promotion! The salary negotiation strategies and presentation tips were spot-on.", date: "1 day ago" },
        { name: "Natalie D.", rating: 4, comment: "Good career advancement advice, but needed industry-specific guidance for my field.", date: "5 days ago" },
        { name: "Professional_Dev", rating: 5, comment: "Excellent networking strategies! My LinkedIn connections and opportunities increased significantly.", date: "3 weeks ago" }
    ],
    18: [
        { name: "Dr. Anderson", rating: 5, comment: "Impressive research synthesis! Helped me understand complex data trends for my academic paper.", date: "2 hours ago" },
        { name: "Sarah_Researcher", rating: 4, comment: "Good fact-checking capabilities, but needed more recent studies for cutting-edge research.", date: "4 days ago" },
        { name: "AnalyticalMind", rating: 5, comment: "Excellent at breaking down complex research findings into actionable insights!", date: "1 week ago" }
    ]
};