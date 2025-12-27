🏬 StockSense – Smart Inventory & Stock Alert System

StockSense is a full-stack inventory management system built for retail and ecommerce businesses to maintain real-time stock visibility, avoid stockouts, manage suppliers, and gain insights through analytics.

Backend: Node.js + Express + MongoDB
Frontend: Next.js + Tailwind CSS
Deployment: Vercel + Render

🚀 Live Demo
🔗 Frontend: https://stock-sense-jz9yta5dj-aviral1511s-projects.vercel.app/
🔗 Backend API: https://stocksense-dj8o.onrender.com/api


🌟 Features
🧩 Inventory Management
Add, Update, Delete Products
Detailed product view page
Reorder level threshold
⚠ Stock Alerts & Tracking
Low stock & warning status coloring
Dedicated Low Stock Page
Email notifications when stock goes below threshold


🔗 Supplier Module
Add supplier details
Link suppliers to products
Contact info stored for reordering


📊 Analytics & Insights
Stock quantity bar chart
Low-stock vs normal stock pie chart
Summary dashboard cards


🔍 Utility Features
Search, Sort & Filter inventory
Clean responsive UI with Tailwind
Fully deployed & cloud-connected


🏗 System Architecture
Next.js (Frontend)  →  Express.js API  →  MongoDB Atlas
          ↑                |
      Axios Calls      Nodemailer (Alerts)


📂 Project Structure
StockSense
├── backend (Express + MongoDB API)
│   ├── src
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── config/db.js
│   │   └── server.js
│   └── .env
└── frontend (Next.js + Tailwind)
    ├── app/
    ├── components/
    ├── lib/api.js
    ├── public/
    └── .env

📸 Screenshots

<img width="1879" height="997" alt="image" src="https://github.com/user-attachments/assets/bf1f3b7c-fbc4-4f26-ba4c-81d77361fe4c" />

	
	
🛠️ Tech Stack
Category	Technology
Frontend	Next.js, Tailwind CSS, Axios
Backend	Node.js, Express.js
Database	MongoDB Atlas
Alerts	Nodemailer
Deployment	Vercel (FE), Render (BE)


⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/Aviral1511/StockSense.git
cd StockSense

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

MONGO_URI=your-mongodb-url
EMAIL_USER=your-email
EMAIL_PASS=your-email-app-password
PORT=5000


Run server: npm run dev

3️⃣ Frontend Setup
cd frontend
npm install


Create .env:
NEXT_PUBLIC_API_URL=http://localhost:5000/api


Start:
npm run dev


🧭 Roadmap / Future Enhancements
Feature	Status
CSV Import/Export	⏳ Planned
Authentication/User Roles	⏳ Planned
Barcode/QR Product Scanner	⏳ Future upgrade
Predictive Restocking (ML)	🔥 Future potential
Mobile App	🔥 Possible extension
🤝 Contribution


Feel free to fork, improve & PR.
Suggestions are welcome!


📄 License

This project is open-source under MIT License.

✨ Author

Aviral Tiwari
👨‍💻 Full Stack Developer | AI/ML Enthusiast
