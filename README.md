# 🐾 Dog Breed Encyclopedia

A responsive web application that lets users explore, search, filter, and sort dog breeds using **The Dog API**. Built with vanilla JavaScript, HTML, and CSS as part of a web development project.

---

## 📌 Project Purpose

The Dog Breed Encyclopedia allows users to discover detailed information about hundreds of dog breeds from around the world. Users can search by breed name, filter by temperament or size, sort by various attributes, and save their favorite breeds — all in a clean, responsive interface.

---

## 🌐 API Used

**The Dog API**
- Base URL: `https://api.thedogapi.com/v1/`
- Free tier API key required → [Get your key here](https://thedogapi.com/)
- Key endpoints used:
  - `GET /breeds` — Fetch all dog breeds with details
  - `GET /breeds/search?q={name}` — Search breeds by name
  - `GET /images/{image_id}` — Fetch breed images

---

## ✨ Planned Features

### Core Features (Milestones 2 & 3)
- 🔍 **Search** — Search dog breeds by name using a live search bar (with debouncing)
- 🎛️ **Filter** — Filter breeds by:
  - Temperament (e.g., friendly, intelligent, loyal)
  - Size group (small, medium, large)
  - Life expectancy range
- 🔃 **Sort** — Sort results by:
  - Name (A–Z / Z–A)
  - Weight (ascending / descending)
  - Life expectancy
- ❤️ **Favorites** — Like/save your favorite breeds (stored in Local Storage)
- 🌙 **Dark / Light Mode** — Theme toggle with preference saved in Local Storage
- 📄 **Breed Detail View** — Click a breed card to see full details (temperament, origin, weight, height, lifespan)

### Bonus Features
- ⏱️ **Debouncing** on search input to reduce unnecessary API calls
- 📦 **Pagination** to manage large lists of breeds
- 🔄 **Loading Indicators** while data is being fetched
- 💾 **Local Storage** for favorites and dark mode preference

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and markup |
| CSS3 | Styling and responsive layout |
| JavaScript (ES6+) | Logic, API calls, DOM manipulation |
| Fetch API | Fetching data from The Dog API |
| Array HOFs | `filter()`, `sort()`, `map()`, `find()` for data operations |
| Local Storage | Persisting favorites and theme preference |

> 💡 No frameworks used — pure vanilla JavaScript.

---

## 📁 Project Structure

```
dog-breed-encyclopedia/
│
├── index.html          # Main HTML file
├── style.css           # Stylesheet (responsive design)
├── app.js              # Main JavaScript file
│
├── js/
│   ├── api.js          # API fetch logic
│   ├── render.js       # UI rendering functions
│   ├── filter.js       # Search, filter, sort logic (HOFs)
│   └── storage.js      # Local storage utilities
│
└── README.md           # Project documentation
```

---

## 🚀 How to Run the Project

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge)
- A free API key from [https://thedogapi.com/](https://thedogapi.com/)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dog-breed-encyclopedia.git
   cd dog-breed-encyclopedia
   ```

2. **Add your API key**

   Open `js/api.js` and replace the placeholder with your key:
   ```javascript
   const API_KEY = "your_api_key_here";
   ```

3. **Open in browser**

   Simply open `index.html` in your browser — no build tools or server needed.

   Or use VS Code's **Live Server** extension for a better experience.

---

## 📅 Project Milestones

| Milestone | Description | Deadline |
|---|---|---|
| Milestone 1 | Project setup, idea selection, README | 23rd March |
| Milestone 2 | API integration, data display, responsiveness | 1st April |
| Milestone 3 | Search, filter, sort, dark mode, favorites | 8th April |
| Milestone 4 | Final cleanup, deployment, documentation | 10th April |

---

## 🌍 Deployment

The project will be deployed using **GitHub Pages** (or Netlify).

Live link will be added here after deployment.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@avanejarikhta57-dotcom](https://github.com/avanejarikhta57-dotcom)

---

## 📄 License

This project is for educational purposes only.
