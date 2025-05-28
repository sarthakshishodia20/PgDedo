// sample PG listings ka data - testing ke liye banaya hai
const sampleListings=[
  {
    title: "Dk Hostel",
    description: "This PG is located in front of GLA gate-01",
    price: 3000,
    location: "Mathura",
    landmark: "Front of GLA",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPpXoRFZWRR_1kXmd5PgzzVdFFt9FFHNGrw&s",
    owner: {
      name: "Rajesh Kumar",
      contact: "+91 9876543210"
    }
  },
  {
    title: "Maa Vaishno PG",
    description: "Affordable rooms with homely food near GLA market road",
    price: 3500,
    location: "Mathura",
    landmark: "Near GLA Market",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxwHtWggH6RRiK4Ix6poCVkf71VkMWrUXZg&s",
    owner: {
      name: "Sunita Sharma",
      contact: "+91 8765432109"
    }
  },
  {
    title: "Green Stay Hostel",
    description: "Spacious rooms with greenery and fresh air",
    price: 4000,
    location: "Mathura",
    landmark: "Behind GLA Boys Hostel",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl3CsWNG4DgU0_NOc5kU63MrGn4t13K05RJA&s",
    owner: {
      name: "Amit Singh",
      contact: "+91 7654321098"
    }
  },
  {
    title: "Sunrise PG",
    description: "Sunny rooms with modern furniture and strong Wi-Fi",
    price: 3200,
    location: "Mathura",
    landmark: "GLA Chowk",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1cVNHzqV8a8K1I3-FfCmGhfuFQMgNCo_EAQ&s",
    owner: {
      name: "Priya Gupta",
      contact: "+91 6543210987"
    }
  },
  {
    title: "Shree Balaji Hostel",
    description: "Safe and peaceful environment for girls",
    price: 3700,
    location: "Mathura",
    landmark: "Opp. GLA Gate No. 2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMXIrNhi23CqmcELy1J5b7M-m5JpDqPr6pw&s",
    owner: {
      name: "Meera Devi",
      contact: "+91 5432109876"
    }
  },
  {
    title: "Comfort Zone PG",
    description: "Deluxe single and sharing rooms for students",
    price: 2800,
    location: "Mathura",
    landmark: "Near Sai Mandir",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvJYYn1oSxfePLScgFgj07K2JiSgfGU6ds8Q&s",
    owner: {
      name: "Vikash Agarwal",
      contact: "+91 4321098765"
    }
  },
  {
    title: "Laxmi Boys Hostel",
    description: "Well-maintained rooms with attached bathrooms",
    price: 3600,
    location: "Mathura",
    landmark: "Near GLA Gym",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPpXoRFZWRR_1kXmd5PgzzVdFFt9FFHNGrw&s",
    owner: {
      name: "Ramesh Yadav",
      contact: "+91 3210987654"
    }
  },
  {
    title: "Shanti PG",
    description: "Peaceful environment and delicious meals",
    price: 3100,
    location: "Mathura",
    landmark: "Opp. C Block GLA",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxwHtWggH6RRiK4Ix6poCVkf71VkMWrUXZg&s",
    owner: {
      name: "Kavita Jain",
      contact: "+91 2109876543"
    }
  },
  {
    title: "Rama Residency",
    description: "Comfortable living with 24/7 water and electricity",
    price: 3900,
    location: "Mathura",
    landmark: "GLA Service Road",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl3CsWNG4DgU0_NOc5kU63MrGn4t13K05RJA&s",
    owner: {
      name: "Suresh Chandra",
      contact: "+91 1098765432"
    }
  },
  {
    title: "Jai PG",
    description: "Budget-friendly rooms with neat interiors",
    price: 2700,
    location: "Mathura",
    landmark: "Beside Anand Dham",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1cVNHzqV8a8K1I3-FfCmGhfuFQMgNCo_EAQ&s",
    owner: {
      name: "Deepak Verma",
      contact: "+91 9087654321"
    }
  },
  {
    title: "The Hostel Co.",
    description: "Modern stay with lounge and study zone",
    price: 4500,
    location: "Mathura",
    landmark: "GLA Tech Street",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMXIrNhi23CqmcELy1J5b7M-m5JpDqPr6pw&s",
    owner: {
      name: "Arjun Malhotra",
      contact: "+91 8976543210"
    }
  },
  {
    title: "Krishna Boys PG",
    description: "Spacious balconies with scenic campus view",
    price: 3900,
    location: "Mathura",
    landmark: "GLA Side Lane",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvJYYn1oSxfePLScgFgj07K2JiSgfGU6ds8Q&s",
    owner: {
      name: "Mohan Lal",
      contact: "+91 7865432109"
    }
  },
  {
    title: "Rudra Girls PG",
    description: "Female-only PG with laundry and mess",
    price: 3500,
    location: "Mathura",
    landmark: "Opposite GLA Women's Hostel",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPpXoRFZWRR_1kXmd5PgzzVdFFt9FFHNGrw&s",
    owner: {
      name: "Sushma Devi",
      contact: "+91 6754321098"
    }
  },
  {
    title: "GLA Corner Stay",
    description: "Well-ventilated rooms ideal for students",
    price: 3300,
    location: "Mathura",
    landmark: "GLA Road Corner",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxwHtWggH6RRiK4Ix6poCVkf71VkMWrUXZg&s",
    owner: {
      name: "Ravi Sharma",
      contact: "+91 5643210987"
    }
  },
  {
    title: "Peace Haven PG",
    description: "Calm and cozy rooms with garden views",
    price: 3400,
    location: "Mathura",
    landmark: "Near GLA Main Gate",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl3CsWNG4DgU0_NOc5kU63MrGn4t13K05RJA&s",
    owner: {
      name: "Anita Kumari",
      contact: "+91 4532109876"
    }
  },
  {
    title: "Urban Nest Hostel",
    description: "Modern rooms with study zones and cafeteria",
    price: 4200,
    location: "Mathura",
    landmark: "GLA Tech Park",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1cVNHzqV8a8K1I3-FfCmGhfuFQMgNCo_EAQ&s",
    owner: {
      name: "Rohit Gupta",
      contact: "+91 3421098765"
    }
  },
  {
    title: "Lotus Girls PG",
    description: "Secure and homely environment for girls only",
    price: 3600,
    location: "Mathura",
    landmark: "Opposite GLA Girls Hostel",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMXIrNhi23CqmcELy1J5b7M-m5JpDqPr6pw&s",
    owner: {
      name: "Pooja Singh",
      contact: "+91 2310987654"
    }
  },
  {
    title: "Elysium PG",
    description: "Affordable rooms with 24/7 security and Wi-Fi",
    price: 3100,
    location: "Mathura",
    landmark: "Near Sai Mandir",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvJYYn1oSxfePLScgFgj07K2JiSgfGU6ds8Q&s",
    owner: {
      name: "Manoj Tiwari",
      contact: "+91 1209876543"
    }
  },
  {
    title: "Tranquil Stay",
    description: "Quiet rooms with excellent natural lighting",
    price: 3000,
    location: "Mathura",
    landmark: "Beside GLA Library",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPpXoRFZWRR_1kXmd5PgzzVdFFt9FFHNGrw&s",
    owner: {
      name: "Neha Agarwal",
      contact: "+91 9198765432"
    }
  },
  {
    title: "Vishal Boys PG",
    description: "Spacious rooms with attached bathrooms and study tables",
    price: 3800,
    location: "Mathura",
    landmark: "GLA Sports Complex",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpxwHtWggH6RRiK4Ix6poCVkf71VkMWrUXZg&s",
    owner: {
      name: "Vishal Kumar",
      contact: "+91 8087654321"
    }
  }
]

// data export kar rahe hain
module.exports={data:sampleListings};
