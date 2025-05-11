// Gemini API integration service

interface GeminiResponse {
  text: string;
  data?: any;
}

interface GeminiStreamResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

// Process query with Gemini 2.0 Flash API
export async function processWithGemini(
  query: string,
  onPartialResponse?: (text: string) => void
): Promise<GeminiResponse> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Gemini API key not found');
    return mockResponseForQuery(query); // Fallback to mock if API key is missing
  }
  
  try {
    // For streaming responses
    if (onPartialResponse) {
      console.log('Making streaming request to Gemini 2.0 Flash API');
      const requestBody = {
        contents: [{
          parts: [{
            text: `${query}\n\nRespond with information about referral partners that match this query. Extract any client names or specific requirements.`
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      };
      
      console.log('Request body:', JSON.stringify(requestBody).substring(0, 200) + '...');
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log('Gemini API response status:', response.status, response.statusText);
      
      if (!response.ok || !response.body) {
        const errorText = await response.text();
        console.error('Gemini API error details:', errorText);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let partialResponse = '';
      
      console.log('Starting to read streaming response');

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Streaming response complete');
          break;
        }
        
        const chunk = decoder.decode(value, { stream: true });
        console.log('Received chunk:', chunk.length, 'bytes');
        
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        console.log('Parsed', lines.length, 'lines from chunk');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = line.substring(6);
              console.log('Processing JSON data:', jsonData.substring(0, 100) + '...');
              
              const data = JSON.parse(jsonData) as GeminiStreamResponse;
              if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                const newText = data.candidates[0].content.parts[0].text;
                console.log('Extracted new text:', newText.substring(0, 50) + '...');
                
                partialResponse += newText;
                onPartialResponse(partialResponse);
              } else {
                console.log('No text content found in response candidates');
              }
            } catch (e) {
              console.error('Error parsing streaming response:', e);
              console.error('Problematic line:', line.substring(0, 200) + '...');
            }
          } else {
            console.log('Skipping non-data line:', line.substring(0, 50) + '...');
          }
        }
      }
      
      // Process the response to extract structured data
      const extractedData = extractDataFromResponse(partialResponse, query);
      return {
        text: partialResponse,
        data: extractedData
      };
    } 
    // For non-streaming responses
    else {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${query}\n\nRespond with information about referral partners that match this query. Extract any client names or specific requirements.`
              }]
            }],
            generationConfig: {
              temperature: 0.2,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          }),
        }
      );

      const data = await response.json();
      const responseText = data.candidates[0]?.content?.parts[0]?.text || '';
      
      // Process the response to extract structured data
      const extractedData = extractDataFromResponse(responseText, query);
      return {
        text: responseText,
        data: extractedData
      };
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Fallback to mock response if API call fails
    return mockResponseForQuery(query);
  }
}

// Function to extract structured data from the Gemini response
function extractDataFromResponse(responseText: string, query: string): { networkPartners: any[], externalPartners: any[] } {
  try {
    // Try to identify if this is a tax attorney search in California (for demo purposes)
    if (query.toLowerCase().includes('tax') && query.toLowerCase().includes('attorney') && 
        query.toLowerCase().includes('california')) {
      return {
        networkPartners: [
          {
            id: 'partner1',
            name: 'Nathan Aldrin',
            company: 'Aldrin LLC',
            specialty: 'Tax Attorney',
            location: 'California',
            referralsSent: 25,
            referralsReceived: 17,
            trustScore: 9
          },
          {
            id: 'partner2',
            name: 'Jenny Johansen',
            company: 'JJ&R Partners LLC',
            specialty: 'Tax Attorney',
            location: 'California',
            referralsSent: 5,
            referralsReceived: 9,
            trustScore: 7
          }
        ],
        externalPartners: [
          {
            id: 'partner3',
            name: 'Bill Robins',
            company: 'Robins Tax Law',
            specialty: 'Tax Attorney',
            location: 'California',
            closeRate: 78,
            reputationScore: 9.8,
            totalReferrals: 40
          }
        ]
      };
    }
    
    // For other queries, try to extract information from the response
    // This is a simplified implementation - in a real application, you would use more sophisticated parsing
    const networkPartners: any[] = [];
    const externalPartners: any[] = [];
    
    // Look for patterns that might indicate network partners
    if (responseText.includes('network') || responseText.includes('existing')) {
      // Extract names that might be in the format "Name - from Company"
      const nameMatches = responseText.match(/([A-Z][a-z]+ [A-Z][a-z]+)\s*-\s*from\s*([^.]+)/g) || [];
      
      nameMatches.forEach((match, index) => {
        const parts = match.split(/\s*-\s*from\s*/i);
        if (parts.length === 2) {
          networkPartners.push({
            id: `extracted-partner-${index}`,
            name: parts[0].trim(),
            company: parts[1].trim(),
            specialty: query.toLowerCase().includes('attorney') ? 'Attorney' : 
                     query.toLowerCase().includes('financial') ? 'Financial Advisor' : 'Professional',
            location: query.match(/in\s+([A-Za-z\s]+)/) ? query.match(/in\s+([A-Za-z\s]+)/)![1] : 'Unknown',
            referralsSent: Math.floor(Math.random() * 30) + 5,
            referralsReceived: Math.floor(Math.random() * 20) + 3,
            trustScore: Math.floor(Math.random() * 3) + 7
          });
        }
      });
    }
    
    // Look for patterns that might indicate external partners
    if (responseText.includes('also found') || responseText.includes('not in your')) {
      // Try to extract external partner information
      const externalMatch = responseText.match(/also found ([A-Z][a-z]+ [A-Z][a-z]+)/i);
      if (externalMatch) {
        externalPartners.push({
          id: 'extracted-external-1',
          name: externalMatch[1],
          company: `${externalMatch[1].split(' ')[1]} Professional Services`,
          specialty: query.toLowerCase().includes('attorney') ? 'Attorney' : 
                   query.toLowerCase().includes('financial') ? 'Financial Advisor' : 'Professional',
          location: query.match(/in\s+([A-Za-z\s]+)/) ? query.match(/in\s+([A-Za-z\s]+)/)![1] : 'Unknown',
          closeRate: Math.floor(Math.random() * 15) + 70,
          reputationScore: (Math.floor(Math.random() * 15) + 85) / 10,
          totalReferrals: Math.floor(Math.random() * 30) + 20
        });
      }
    }
    
    // If we couldn't extract any structured data, return empty arrays
    return {
      networkPartners: networkPartners.length > 0 ? networkPartners : [],
      externalPartners: externalPartners.length > 0 ? externalPartners : []
    };
  } catch (error) {
    console.error('Error extracting data from response:', error);
    return {
      networkPartners: [],
      externalPartners: []
    };
  }
}

// Mock function to generate responses based on query patterns
function mockResponseForQuery(query: string): GeminiResponse {
  // Normalize query for pattern matching
  const normalizedQuery = query.toLowerCase();
  
  // Mock referral partner search
  if (normalizedQuery.includes('find me') && 
      (normalizedQuery.includes('attorney') || normalizedQuery.includes('lawyer'))) {
    
    if (normalizedQuery.includes('tax') && normalizedQuery.includes('california')) {
      return {
        text: "I found 2 matches within your existing network: 1. Nathan Aldrin - from Aldrin LLC. You've sent him $25k of referral business to him and he's sent you $17k of business in the past year. You also have him marked with a trust/like score of 9. 2. Jenny Johansen - from JJ&R Partners LLC. You've sent her $5k of referral business and she's sent you $9k of business in the past year. Her trust/like score is a 7. I also found Bill Robins. He is not in your existing network, but his referral close rate is 78%, has a 9.8 reputation score, and has sent over 40 referrals to his partners. You should consider adding him to your network for California.",
        data: {
          networkPartners: [
            {
              id: 'partner1',
              name: 'Nathan Aldrin',
              company: 'Aldrin LLC',
              specialty: 'Tax Attorney',
              location: 'California',
              inNetwork: true,
              referralsSent: 25,
              referralsReceived: 17,
              trustScore: 9
            },
            {
              id: 'partner2',
              name: 'Jenny Johansen',
              company: 'JJ&R Partners LLC',
              specialty: 'Tax Attorney',
              location: 'California',
              inNetwork: true,
              referralsSent: 5,
              referralsReceived: 9,
              trustScore: 7
            }
          ],
          externalPartners: [
            {
              id: 'partner3',
              name: 'Bill Robins',
              company: 'Robins Tax Law',
              specialty: 'Tax Attorney',
              location: 'California',
              inNetwork: false,
              closeRate: 78,
              reputationScore: 9.8,
              totalReferrals: 40
            }
          ]
        }
      };
    }
    
    // Generic attorney search
    if (normalizedQuery.includes('attorney') || normalizedQuery.includes('lawyer')) {
      return {
        text: "I found 3 attorneys in your network that might be a good match. Would you like me to filter by specialty or location?",
        data: {
          networkPartners: [
            {
              id: 'partner4',
              name: 'Sarah Williams',
              company: 'Williams Legal',
              specialty: 'Estate Planning',
              location: 'New York',
              inNetwork: true,
              referralsSent: 15,
              referralsReceived: 12,
              trustScore: 8
            },
            {
              id: 'partner5',
              name: 'Michael Chen',
              company: 'Chen & Associates',
              specialty: 'Business Law',
              location: 'Chicago',
              inNetwork: true,
              referralsSent: 8,
              referralsReceived: 10,
              trustScore: 9
            }
          ],
          externalPartners: [
            {
              id: 'partner6',
              name: 'Jessica Davis',
              company: 'Davis Legal Group',
              specialty: 'Corporate Law',
              location: 'Boston',
              inNetwork: false,
              closeRate: 82,
              reputationScore: 9.5,
              totalReferrals: 35
            }
          ]
        }
      };
    }
  }
  
  // Mock financial advisor search
  if (normalizedQuery.includes('find me') && 
      (normalizedQuery.includes('financial advisor') || normalizedQuery.includes('financial planner'))) {
    return {
      text: "I found 2 financial advisors in your network that might be a good match for your client.",
      data: {
        networkPartners: [
          {
            id: 'partner7',
            name: 'Robert Johnson',
            company: 'Johnson Financial',
            specialty: 'Retirement Planning',
            location: 'Dallas',
            inNetwork: true,
            referralsSent: 20,
            referralsReceived: 15,
            trustScore: 9
          },
          {
            id: 'partner8',
            name: 'Emily Wilson',
            company: 'Wilson Wealth',
            specialty: 'Investment Management',
            location: 'Miami',
            inNetwork: true,
            referralsSent: 12,
            referralsReceived: 8,
            trustScore: 7
          }
        ],
        externalPartners: []
      }
    };
  }
  
  // Default response for unrecognized queries
  return {
    text: "I'm not sure I understand what you're looking for. Could you please specify the type of professional you need? For example, 'Find me a tax attorney in California' or 'Find me a financial advisor specializing in retirement planning.'",
    data: {
      networkPartners: [],
      externalPartners: []
    }
  };
}

// Mock function to process notification responses
export async function processNotificationResponse(
  notificationId: string,
  response: string
): Promise<{ success: boolean; message: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock response
  if (response.toLowerCase().includes('yes')) {
    return {
      success: true,
      message: "Great! I've sent a reminder to James about the Bob Smith lead."
    };
  } else {
    return {
      success: true,
      message: "No problem. I won't send a reminder at this time."
    };
  }
}
