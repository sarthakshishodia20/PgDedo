PG DEDO – Bhai Log Ka PG Finder
Kya Hai Ye Project?
PG Dedo ek simple aur powerful web app hai jisme students apni PG dhund sakte hain, aur PG owners apne listings add, edit, aur manage kar sakte hain. Is app mein reviews, ratings, notices, photos upload karna, aur Mapbox API ke through location dekhna possible hai. UI bilkul Airbnb jaisa clean aur responsive design ka hai — mobile-friendly bhi.

Features
PG Listing Management: Owners apne PG listings add, edit, aur delete kar sakte hain
Login-Logout System: Role-based authentication (student/owner) with session management
Reviews & Ratings: Students PG ko rate kar sakte hain aur reviews de sakte hain
Notice Board: PG owners ke liye notice post karne ka feature, jo 24 ghante baad auto-delete ho jata hai
Photo Upload: Cloudinary integration ke saath photos upload kar sakte hain
Search & Filter: Location, price, aur rating ke basis par easily search aur filter kar sakte hain
Mapbox Integration: PG locations Mapbox API se dikha sakte hain interactive maps ke zariye
Responsive UI: Bootstrap 5 ke saath mobile-friendly design

Screenshots
Navbar
<img src="https://res.cloudinary.com/did71cuai/image/upload/v1749021170/pnavbar_wfjrg2.png" width="600"/>
Homepage
<img src="https://res.cloudinary.com/did71cuai/image/upload/v1749021259/phome_zgvmfi.png" width="600"/>
Listing Info Page
<img src="https://res.cloudinary.com/did71cuai/image/upload/v1749021269/pinfo_vrtbxa.png" width="600"/>
Notice Board
<img src="https://res.cloudinary.com/did71cuai/image/upload/v1749021277/pnotice_a7elcz.png" width="600"/>
Map View (Mapbox API)
<img src="https://res.cloudinary.com/did71cuai/image/upload/v1749021287/pmap_avu8is.png" width="600"/>
Footer
<img src="https://res.cloudinary.com/did71cuai/image/upload/v1749021307/pfoot_lojj6i.png" width="600"/>
Tech Stack
Backend: Node.js, Express.js, MongoDB, Mongoose, Passport.js, Cloudinary
Frontend: EJS, HTML5, CSS3, Bootstrap 5, JavaScript, Font Awesome
APIs: Mapbox for interactive location maps
Authentication: Session-based with role management (student/owner)
Quick Folder Structure
index.js — Main server entry point
models/ — Database schemas (User, Listing, Review, Notice)
routes/ — Auth, Listings, Reviews, Notices routes
views/ — EJS templates for UI
utils/ — Helper functions
middleware/ — Authentication and validation middlewares

Mapbox Integration
Mapbox API se PG locations listings aur details page par dikhaye jate hain
Interactive map jisme markers, popups, aur location-based filtering hai
User ko PG dhundhne mein madad karta hai visual location ke through

Kaise Chalaye?
Repo clone karo
npm install se dependencies install karo
.env file mein MongoDB, Cloudinary, Mapbox, aur Session secrets daalo
MongoDB service chalu karo (local ya cloud)
npm start command se server run karo
Browser mein jaake visit karo: http://localhost:8080/listings
