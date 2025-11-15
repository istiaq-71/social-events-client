#!/usr/bin/env node

/**
 * Seed Events Script
 * This script adds sample events to your backend database
 * Usage: node seedEvents.js
 */

const sampleEvents = [
  {
    title: "Community Road Cleanup in Mirpur",
    description: "Join us for a community-driven initiative to clean our neighborhood streets. We'll be collecting litter, sweeping roads, and making our community cleaner and greener. Please bring gloves and bags!",
    eventType: "Cleanup",
    thumbnailUrl: "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop",
    location: "Mirpur 10, Dhaka",
    eventDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    creatorEmail: "admin@socialserve.com",
    creatorName: "Community Admin"
  },
  {
    title: "Tree Plantation Drive 2025",
    description: "Help us plant 500 trees this season! We'll be planting native species to improve our local environment. Bring your family and friends for a fun and meaningful day.",
    eventType: "Plantation",
    thumbnailUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
    location: "Central Park, Dhaka",
    eventDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    creatorEmail: "organizer@socialserve.com",
    creatorName: "Green Initiative"
  },
  {
    title: "Health Checkup Camp",
    description: "Free health screening and consultation from experienced doctors. Blood pressure, diabetes, and general health checkups available. All welcome!",
    eventType: "Healthcare",
    thumbnailUrl: "https://images.unsplash.com/photo-1631217314830-ab7375222f73?w=500&h=300&fit=crop",
    location: "City Hospital Grounds, Dhaka",
    eventDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    creatorEmail: "hospital@socialserve.com",
    creatorName: "City Hospital"
  },
  {
    title: "Educational Workshop: Basic Computer Skills",
    description: "Learn fundamental computer skills including MS Word, Excel, and internet usage. Perfect for beginners of all ages. Free registration!",
    eventType: "Education",
    thumbnailUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    location: "Community Center, Gulshan",
    eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    creatorEmail: "academy@socialserve.com",
    creatorName: "Tech Academy"
  },
  {
    title: "Charity Donation Drive for Children",
    description: "Help us collect donations for underprivileged children. We need books, clothing, and school supplies. Every contribution makes a difference!",
    eventType: "Donation",
    thumbnailUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=300&fit=crop",
    location: "Central Mosque, Dhaka",
    eventDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    creatorEmail: "charity@socialserve.com",
    creatorName: "Hope Foundation"
  },
  {
    title: "Community Sports Day 2025",
    description: "Fun outdoor games and sports activities for all ages. Football, volleyball, badminton, and more. Register your teams now!",
    eventType: "Other",
    thumbnailUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop",
    location: "Stadium Field, Mirpur",
    eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    creatorEmail: "sports@socialserve.com",
    creatorName: "Youth Sports Club"
  },
  {
    title: "Environmental Awareness Seminar",
    description: "Learn about climate change, sustainability, and how you can contribute to environmental conservation. Interactive sessions with expert speakers.",
    eventType: "Education",
    thumbnailUrl: "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop",
    location: "University Auditorium, Dhaka",
    eventDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    creatorEmail: "university@socialserve.com",
    creatorName: "Environmental Department"
  },
  {
    title: "Blood Donation Camp",
    description: "Save lives by donating blood. Our medical team ensures a safe and comfortable experience. Eligibility: 18-65 years, weight 50kg+",
    eventType: "Healthcare",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop",
    location: "Red Crescent Center, Dhaka",
    eventDate: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    creatorEmail: "redcrescent@socialserve.com",
    creatorName: "Red Crescent Society"
  }
];

async function seedEvents() {
  const apiUrl = process.env.API_URL || 'https://social-events-server-xi.vercel.app';
  
  console.log(`🌱 Starting to seed events to ${apiUrl}...`);
  console.log(`📝 Adding ${sampleEvents.length} events...\n`);

  let successCount = 0;
  let failureCount = 0;

  for (const event of sampleEvents) {
    try {
      const endpoints = [
        `${apiUrl}/api/events`,
        `${apiUrl}/events`,
        `${apiUrl}/event`
      ];

      let created = false;
      
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
          });

          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Created: ${event.title}`);
            successCount++;
            created = true;
            break;
          }
        } catch (e) {
          // Try next endpoint
        }
      }

      if (!created) {
        console.log(`❌ Failed: ${event.title} - No valid endpoint found`);
        failureCount++;
      }
    } catch (error) {
      console.log(`❌ Error creating ${event.title}: ${error.message}`);
      failureCount++;
    }
  }

  console.log(`\n🎉 Seeding complete!`);
  console.log(`✅ Success: ${successCount}/${sampleEvents.length}`);
  console.log(`❌ Failed: ${failureCount}/${sampleEvents.length}`);
}

seedEvents().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
