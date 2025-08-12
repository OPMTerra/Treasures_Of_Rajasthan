# Treasures of Rajasthan – Handcraft E-Commerce Site

Welcome to the source code for **Treasures of Rajasthan**, a modern e-commerce web application showcasing handcrafted products from Rajasthan, India. This project is built with React, Tailwind CSS, and features a custom shopping cart, checkout flow, smooth and product customization experience.

## 🌐 Live Demo

Visit the deployed site on Netlify: [treasures-of-rajasthan.netlify.app](https://treasures-of-rajasthan.netlify.app/)

---

## 📦 Project Structure

```
Handcraft_site/
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── public/               # Static assets and base HTML
│   └── index.html
├── src/                  # Source code
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   ├── index.css         # Global styles
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context providers
│   ├── data/             # Product data
│   ├── pages/            # Route-based pages
│   ├── product/          # Dynamic product pages
│   ├── shop/             # Shop page
│   └── styles/           # CSS variables
└── README.md
```

---

## 🚀 Features

- **Product Catalog**: Browse handcrafted products with rich details and images.
- **Product Customization**: Select colors, patterns, and preview changes live.
- **Shopping Cart**: Add, remove, and update items with real-time badge updates.
- **Checkout Flow**: Multi-step checkout with progress bar and order confirmation.
- **Accessibility**: Alt attributes, keyboard navigation, and ARIA best practices.
- **Responsive Design**: Mobile-friendly layouts using Tailwind CSS.
- **Deployment Ready**: Optimized for Netlify and static hosting.

---

## 🛠️ Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/OPMTerra/Handcraft-website.git
   cd Handcraft_site
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running Locally
- **Start the development server:**
  ```sh
  npm start
  ```
- Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Building for Production
- **Create an optimized build:**
  ```sh
  npm run build
  ```
- The output will be in the `build/` directory, ready for deployment.

---

## 🧩 Tech Stack
- **Frontend:** React, Tailwind CSS
- **Routing:** React Router
- **State Management:** React Context API
- **Deployment:** Netlify

---

## 📚 Key Files & Folders
- `src/components/` – UI elements (modals, buttons, cards, etc.)
- `src/pages/` – Main pages (Home, Cart, Checkout, Confirmation, About, NotFound)
- `src/context/` – Cart, User, and Session context providers
- `src/product/[id]/` – Dynamic product detail and customization
- `src/data/products.js` – Product catalog data
- `public/index.html` – Base HTML template

---

## 📝 Accessibility & Best Practices
- All images use descriptive `alt` attributes.
- Buttons and interactive elements are keyboard accessible.
- ARIA roles and labels are used where appropriate.
- Unused imports and deployment warnings are resolved.

---

## 🏗️ Deployment

This project is ready for static hosting. To deploy on Netlify:
1. Push your code to GitHub.
2. Connect your repository to Netlify.
3. Set the build command to `npm run build` and the publish directory to `build/`.
4. Deploy!

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


## 🙋 FAQ

**Q: Where can I see the live site?**  
A: [https://treasures-of-rajasthan.netlify.app/](https://treasures-of-rajasthan.netlify.app/)

**Q: How do I add new products?**  
A: Update `src/data/products.js` and add images to the appropriate public/static folder.

**Q: Who built this?**  
A: Crafted by OPMTerra and contributors.

---

## 📬 Contact

For questions or feedback, please open an issue or contact via GitHub.
