const sampleListings=[
  {
    title: "Dk Hostel",
    description: "This PG is located in front of GLA gate-01",
    price: 3000,
    location: "Mathura",
    landmark: "Front of GLA",
    image: "https://sdmntprwestus2.oaiusercontent.com/files/00000000-4018-61f8-ae71-77287ae2dc93/raw?se=2025-05-26T18%3A18%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=a7bd77de-58b7-5743-b35d-8f8d2afa8abe&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-25T23%3A39%3A45Z&ske=2025-05-26T23%3A39%3A45Z&sks=b&skv=2024-08-04&sig=DTtG0FjeDC6Vp3gU16RLK9Zj0kbwqhpBxUxNq03bXHg%3D"
  },
  {
    title: "Maa Vaishno PG",
    description: "Affordable rooms with homely food near GLA market road",
    price: 3500,
    location: "Mathura",
    landmark: "Near GLA Market",
    image: "https://images.unsplash.com/photo-1667403206415-0e51a54727d4?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Green Stay Hostel",
    description: "Spacious rooms with greenery and fresh air",
    price: 4000,
    location: "Mathura",
    landmark: "Behind GLA Boys Hostel",
    image: "https://images.unsplash.com/photo-1567290886180-d7d5d49c5af1?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Sunrise PG",
    description: "Sunny rooms with modern furniture and strong Wi-Fi",
    price: 3200,
    location: "Mathura",
    landmark: "GLA Chowk",
    image: "https://images.unsplash.com/photo-1667403206415-0e51a54727d4?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Shree Balaji Hostel",
    description: "Safe and peaceful environment for girls",
    price: 3700,
    location: "Mathura",
    landmark: "Opp. GLA Gate No. 2",
    image: "https://images.unsplash.com/photo-1567290886180-d7d5d49c5af1?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Comfort Zone PG",
    description: "Deluxe single and sharing rooms for students",
    price: 2800,
    location: "Mathura",
    landmark: "Near Sai Mandir",
    image: "https://sdmntprwestus2.oaiusercontent.com/files/00000000-4018-61f8-ae71-77287ae2dc93/raw?se=2025-05-26T18%3A18%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=a7bd77de-58b7-5743-b35d-8f8d2afa8abe&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-25T23%3A39%3A45Z&ske=2025-05-26T23%3A39%3A45Z&sks=b&skv=2024-08-04&sig=DTtG0FjeDC6Vp3gU16RLK9Zj0kbwqhpBxUxNq03bXHg%3D"
  },
  {
    title: "Laxmi Boys Hostel",
    description: "Well-maintained rooms with attached bathrooms",
    price: 3600,
    location: "Mathura",
    landmark: "Near GLA Gym",
    image: "https://images.unsplash.com/photo-1667403206415-0e51a54727d4?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Shanti PG",
    description: "Peaceful environment and delicious meals",
    price: 3100,
    location: "Mathura",
    landmark: "Opp. C Block GLA",
    image: "https://images.unsplash.com/photo-1567290886180-d7d5d49c5af1?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Rama Residency",
    description: "Comfortable living with 24/7 water and electricity",
    price: 3900,
    location: "Mathura",
    landmark: "GLA Service Road",
    image: "https://images.unsplash.com/photo-1667403206415-0e51a54727d4?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Jai PG",
    description: "Budget-friendly rooms with neat interiors",
    price: 2700,
    location: "Mathura",
    landmark: "Beside Anand Dham",
    image: "https://images.unsplash.com/photo-1567290886180-d7d5d49c5af1?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "The Hostel Co.",
    description: "Modern stay with lounge and study zone",
    price: 4500,
    location: "Mathura",
    landmark: "GLA Tech Street",
    image: "https://sdmntprwestus2.oaiusercontent.com/files/00000000-4018-61f8-ae71-77287ae2dc93/raw?se=2025-05-26T18%3A18%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=a7bd77de-58b7-5743-b35d-8f8d2afa8abe&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-25T23%3A39%3A45Z&ske=2025-05-26T23%3A39%3A45Z&sks=b&skv=2024-08-04&sig=DTtG0FjeDC6Vp3gU16RLK9Zj0kbwqhpBxUxNq03bXHg%3D"
  },
  {
    title: "Krishna Boys PG",
    description: "Spacious balconies with scenic campus view",
    price: 3900,
    location: "Mathura",
    landmark: "GLA Side Lane",
    image: "https://images.unsplash.com/photo-1667403206415-0e51a54727d4?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "Rudra Girls PG",
    description: "Female-only PG with laundry and mess",
    price: 3500,
    location: "Mathura",
    landmark: "Opposite GLA Women’s Hostel",
    image: "https://images.unsplash.com/photo-1567290886180-d7d5d49c5af1?w=600&auto=format&fit=crop&q=60"
  },
  {
    title: "GLA Corner Stay",
    description: "Well-ventilated rooms ideal for students",
    price: 3300,
    location: "Mathura",
    landmark: "GLA Road Corner",
    image: "https://sdmntprwestus2.oaiusercontent.com/files/00000000-4018-61f8-ae71-77287ae2dc93/raw?se=2025-05-26T18%3A18%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=a7bd77de-58b7-5743-b35d-8f8d2afa8abe&skoid=9ccea605-1409-4478-82eb-9c83b25dc1b0&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-25T23%3A39%3A45Z&ske=2025-05-26T23%3A39%3A45Z&sks=b&skv=2024-08-04&sig=DTtG0FjeDC6Vp3gU16RLK9Zj0kbwqhpBxUxNq03bXHg%3D"
  },
  {
  title: "Peace Haven PG",
  description: "Calm and cozy rooms with garden views",
  price: 3400,
  location: "Mathura",
  landmark: "Near GLA Main Gate",
  image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=600&auto=format&fit=crop&q=60"
},
{
  title: "Urban Nest Hostel",
  description: "Modern rooms with study zones and cafeteria",
  price: 4200,
  location: "Mathura",
  landmark: "GLA Tech Park",
  image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600&auto=format&fit=crop&q=60"
},
{
  title: "Lotus Girls PG",
  description: "Secure and homely environment for girls only",
  price: 3600,
  location: "Mathura",
  landmark: "Opposite GLA Girls Hostel",
  image: "https://images.unsplash.com/photo-1556909218-843c1de13b89?w=600&auto=format&fit=crop&q=60"
},
{
  title: "Elysium PG",
  description: "Affordable rooms with 24/7 security and Wi-Fi",
  price: 3100,
  location: "Mathura",
  landmark: "Near Sai Mandir",
  image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60"
},
{
  title: "Tranquil Stay",
  description: "Quiet rooms with excellent natural lighting",
  price: 3000,
  location: "Mathura",
  landmark: "Beside GLA Library",
  image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&auto=format&fit=crop&q=60"
},
{
  title: "Vishal Boys PG",
  description: "Spacious rooms with attached bathrooms and study tables",
  price: 3800,
  location: "Mathura",
  landmark: "GLA Sports Complex",
  image: "https://images.unsplash.com/photo-1533777324565-a04df0e527b7?w=600&auto=format&fit=crop&q=60"
},
]


module.exports={data:sampleListings};