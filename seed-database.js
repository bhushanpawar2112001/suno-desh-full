const axios = require('axios');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    const response = await axios.post('http://localhost:3000/seed');
    
    if (response.status === 200) {
      console.log('✅ Database seeded successfully!');
      console.log('📊 Created dummy data including:');
      console.log('   - 6 categories (Politics, Technology, Business, Sports, Entertainment, Health)');
      console.log('   - 8 articles with Hindi and English content');
      console.log('   - 2 users (admin@sunodesh.com, editor@sunodesh.com)');
      console.log('');
      console.log('🔑 Login credentials:');
      console.log('   Admin: admin@sunodesh.com / admin123');
      console.log('   Editor: editor@sunodesh.com / admin123');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.log('');
    console.log('💡 Make sure:');
    console.log('   1. Backend server is running on http://localhost:3000');
    console.log('   2. MongoDB connection is established');
    console.log('   3. .env file is properly configured');
  }
}

seedDatabase(); 