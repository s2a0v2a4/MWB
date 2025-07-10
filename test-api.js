// test-api.js - Script zum Testen der API mit globalem Prefix
const testAPI = async () => {
  const baseURL = 'http://localhost:5000';
  
  console.log('🧪 Testing NestJS API with global prefix...\n');
  
  try {
    // Test Health Check
    console.log('0️⃣ Testing Health Check GET /api');
    const healthResponse = await fetch(`${baseURL}/api`);
    console.log(`Status: ${healthResponse.status}`);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health Response:', JSON.stringify(healthData, null, 2));
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 1: GET Request
    console.log('1️⃣ Testing GET /api/interests');
    const getResponse = await fetch(`${baseURL}/api/interests`);
    console.log(`Status: ${getResponse.status}`);
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('Response:', JSON.stringify(getData, null, 2));
    } else {
      console.log('❌ GET request failed');
      console.log('Response text:', await getResponse.text());
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 2: POST Request
    console.log('2️⃣ Testing POST /api/interests');
    const postData = { interests: [1, 2, 3] };
    const postResponse = await fetch(`${baseURL}/api/interests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    
    console.log(`Status: ${postResponse.status}`);
    
    if (postResponse.ok) {
      const postResult = await postResponse.json();
      console.log('Response:', JSON.stringify(postResult, null, 2));
    } else {
      console.log('❌ POST request failed');
      console.log('Response text:', await postResponse.text());
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 3: GET nach POST
    console.log('3️⃣ Testing GET after POST');
    const getAfterPost = await fetch(`${baseURL}/api/interests`);
    console.log(`Status: ${getAfterPost.status}`);
    
    if (getAfterPost.ok) {
      const finalData = await getAfterPost.json();
      console.log('Response:', JSON.stringify(finalData, null, 2));
    }
    
    console.log('\n' + '✅'.repeat(25) + '\n');
    console.log('🎯 URL Schema Summary:');
    console.log(`   Health Check: ${baseURL}/api`);
    console.log(`   Interests:    ${baseURL}/api/interests`);
    console.log(`   Events:       ${baseURL}/api/events`);
    console.log('\n📝 Frontend should call: /api/interests (proxy will forward)');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your NestJS server is running on http://localhost:5000');
    console.log('Run: npm run start:dev');
  }
};

// Führe den Test aus
testAPI();
