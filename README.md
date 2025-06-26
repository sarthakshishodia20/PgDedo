# PG DEDO – Pg Finder Type Website

**PG Dedo** ek simple web app hai jisme students apni PG dhund sakte hain, aur owners apne PG listings add/edit/manage kar sakte hain. UI bilkul Airbnb jaisa clean aur mobile-friendly hai.

---

## Features
- PG listings add/edit/delete (owners ke liye)  
- Role-based login/logout (student/owner)  
- Reviews & ratings system  
- Notice board with auto-delete after 24 hrs  
- Photo uploads via Cloudinary  
- Search & filter by location, price, rating  
- Interactive maps with Mapbox API  

---

## Screenshots

Navbar  
![Navbar](https://res.cloudinary.com/did71cuai/image/upload/v1749021170/pnavbar_wfjrg2.png)

Homepage  
![Homepage](https://res.cloudinary.com/did71cuai/image/upload/v1749021259/phome_zgvmfi.png)

Listing Info  
![Listing](https://res.cloudinary.com/did71cuai/image/upload/v1749021269/pinfo_vrtbxa.png)

Notice Board  
![Notice](https://res.cloudinary.com/did71cuai/image/upload/v1749021277/pnotice_a7elcz.png)

Map View  
![Map](https://res.cloudinary.com/did71cuai/image/upload/v1749021287/pmap_avu8is.png)

Footer  
![Footer](https://res.cloudinary.com/did71cuai/image/upload/v1749021307/pfoot_lojj6i.png)

---

## Tech Stack
Node.js, Express.js, MongoDB, Mongoose, Passport.js, Cloudinary, EJS, Bootstrap 5, Mapbox API

---

## Quick Start

### Utils Folder (Helper Functions)
- **utils/wrapAsync.js**: Error handle karne ke liye
- **utils/ExpressError.js**: Custom error banane ke liye
- **utils/cloudinary.js**: Photo upload ke liye setup

### Middleware Folder
- **middleware.js**: Security check karne ke functions

## Kaise Kaam Karta Hai Ye Sab (Detailed Functionality)

### Login-Logout Ka System
- Email aur password se register kar sakte hain
- Student ya Owner choose kar sakte hain registration mein
- Password secure store hota hai, hash karke
- Login karne ke baad session banta hai
- Logout karne pe session clear ho jata hai

### PG Listing Ka Kaam
- Naye PG add kar sakte hain title, description, price, location ke saath
- Photos upload kar sakte hain Cloudinary pe
- Apne PG edit kar sakte hain (sirf owner)
- Delete bhi kar sakte hain (sirf owner)
- Saare PG dekh sakte hain search ke saath
- Individual PG ka detail page bhi hai

### Review System Ka Jugaad
- Students review de sakte hain 1-5 stars ke saath
- Comment likh sakte hain limited characters mein
- Average rating calculate hota hai automatically
- Apna review delete kar sakte hain
- Listing page pe saare reviews dikhte hain

### Notice Board Ka Feature
- PG owners students ke liye notice post kar sakte hain
- Teen types hain: General Info, Important Notice, Urgent Alert
- 24 ghante baad automatically delete ho jaate hain
- Sidebar mein compact format mein dikhte hain
- Owner apne notice delete kar sakte hain

### Search Aur Filter
- Title, location, landmark se search kar sakte hain
- Price range se filter kar sakte hain
- Location wise search kar sakte hain
- Price aur rating se sort kar sakte hain

### Photo Upload Ka System
- Cloudinary use kiya hai photos store karne ke liye
- Listing create karte time photo upload kar sakte hain
- Photos automatically optimize ho jaati hain
- Secure URLs milte hain photos ke

## Security Ke Liye Kya Kiya Hai

### Login Security
- Password hash karke store karta hai, plain text mein nahi
- Session based authentication hai, cookies use karta hai
- CSRF attacks se bachne ka setup hai
- Input validation properly karta hai

### Permission System
- Role based access hai, student aur owner alag alag permissions
- Sirf owner apne PG manage kar sakte hain
- Sirf review author apna review delete kar sakte hain
- Protected routes hain middleware ke saath

### Data Validation
- Server side validation hai Joi schemas se
- Client side bhi validation hai better experience ke liye
- XSS attacks se bachne ke liye input sanitize karta hai
- MongoDB use kiya hai toh SQL injection ka tension nahi

## Database Kaise Design Kiya

### User Table
- email, fullName, userType, phone store karta hai
- Passport.js se authentication integrate kiya
- Email pe index banaya hai fast search ke liye

### Listing Table
- title, description, image, price, location, landmark store karta hai
- User table se reference hai author ke liye
- Search ke liye text indexes banaye hain

### Review Table
- rating, comment, author, listing ka reference store karta hai
- Efficient queries ke liye compound indexes banaye hain
- Virtual properties hain formatted display ke liye

### Notice Table
- content, type, author, listing ka reference store karta hai
- TTL index hai 24 hours baad auto-delete ke liye
- Listing based queries ke liye compound indexes hain

## Kya Kya URLs Hain (API Endpoints)

### Login-Logout Ke Routes
- GET /register - Registration ka form dikhata hai
- POST /register - Naya user banata hai
- GET /login - Login ka form dikhata hai
- POST /login - User ko login karta hai
- GET /logout - User ko logout karta hai

### PG Listing Ke Routes
- GET /listings - Saare PG listings dikhata hai
- GET /listings/new - Naya PG add karne ka form (sirf owners)
- POST /listings - Naya PG create karta hai
- GET /listings/:id - Individual PG ka detail page
- PUT /listings/:id - PG update karta hai (sirf owner)
- DELETE /listings/:id - PG delete karta hai (sirf owner)

### Review Ke Routes
- POST /listings/:id/reviews - Naya review add karta hai
- DELETE /listings/:id/reviews/:reviewId - Review delete karta hai (sirf author)

### Notice Ke Routes
- POST /listings/:id/notices - Naya notice add karta hai (sirf owner)
- DELETE /listings/:id/notices/:noticeId - Notice delete karta hai (sirf owner)

## Middleware Functions (Security Check Karne Wale)

### Authentication Middleware
- isLoggedIn: Check karta hai user logged in hai ya nahi
- isAuthor: Check karta hai user listing ka owner hai ya nahi
- isReviewAuthor: Check karta hai user review ka author hai ya nahi

### Validation Middleware
- validateListing: Listing ka data validate karta hai Joi se
- validateReview: Review ka data validate karta hai Joi se
- validateNotice: Notice ka data validate karta hai

### File Upload Middleware
- multer configuration photo upload ke liye
- Cloudinary integration cloud storage ke liye

## Error Handling (Jab Kuch Galat Ho Jaye)

### Custom Error Classes
- ExpressError class banaya hai specific errors ke liye
- Async error wrapper use kiya hai route handlers mein
- Global error handling middleware lagaya hai

### Error Types
- Validation errors user-friendly messages ke saath
- Authentication errors redirect ke saath
- Database errors fallback responses ke saath
- File upload errors retry options ke saath

## Environment Setup (Secret Cheezein)

### Required Environment Variables (.env file mein)
- MONGODB_URL: Database connection string
- CLOUDINARY_CLOUD_NAME: Cloudinary account name
- CLOUDINARY_API_KEY: Cloudinary API key
- CLOUDINARY_API_SECRET: Cloudinary API secret
- SESSION_SECRET: Session encryption secret

### Development vs Production
- Alag alag database URLs environments ke liye
- Debug mode configuration
- Static files serving configuration
- Port configuration defaults ke saath

## Deployment Kaise Kare

### Production Setup
- Environment variables properly configure karne hain
- Database connection optimize karna hai
- Static files CDN se serve karne hain
- Error logging aur monitoring setup karna hai

### Performance Optimization
- Database indexing fast queries ke liye
- Image optimization Cloudinary se
- Static content ke liye caching strategies
- Response compression middleware

## Future Mein Kya Add Kar Sakte Hain

### Planned Features
- Advanced search filters (amenities, room types)
- Booking system PG rooms ke liye
- Payment integration advance booking ke liye
- Chat system students aur owners ke beech
- Mobile app development
- Email notifications notices ke liye
- Google Maps integration location display ke liye

### Technical Improvements
- API rate limiting
- Advanced caching Redis ke saath
- Microservices architecture
- Real-time notifications WebSockets ke saath
- Progressive Web App (PWA) features

---

## Kaise Install Kare Aur Run Kare

### Prerequisites
- Node.js (version 14 ya usse upar)
- MongoDB (local ya cloud instance)
- Cloudinary account image storage ke liye

### Installation Steps

```bash
git clone https://github.com/sarthakshishodia20/PgDedo.git
cd PgDedo
npm install
