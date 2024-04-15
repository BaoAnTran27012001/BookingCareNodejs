const { BardAPI } = require('bard-api-node');
async function testAssistant() {
  try {
    const bard = new BardAPI();

    // Set API key
    const apiKey = 'AIzaSyA52cYI__2wBs5h31ml6K534UPSzNewpl0'; // Replace 'YOUR_API_KEY' with the obtained API key
    // Initialize chat with API key
    bard.initializeChat(apiKey);
    // Send a query to Bard
    const response = await bard.getBardResponse("Is gout servere ?");
    console.log(response);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAssistant();