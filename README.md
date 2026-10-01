# 🎓 TaskTrack – Student Assignment Tracker

A modern, responsive, and intuitive Full Stack Web Development assignment tracker built with **ReactJS** and **Vite**. Designed specifically for students to organize coursework, monitor submission deadlines, prioritize deliverables, and stay on top of their academic schedule.

---

## 🌟 Key Features

### 1. Complete Assignment Management (CRUD)
- **Add New Assignments:** Easily record assignments with title, subject/course, due date, priority, and optional description notes.
- **Edit Assignments:** Update any details including deadlines, course names, and priorities at any time.
- **Delete with Confirmation:** Safe deletion workflow with a confirmation modal previewing the assignment details before removal.
- **Toggle Completion Status:** Toggle between **Pending** and **Completed** with celebratory confetti animation upon completion!

### 2. Comprehensive Statistics Dashboard
- **Total Assignments Counter:** Live count of all active and archived tasks.
- **Pending Tasks:** Quick overview of upcoming work to complete.
- **Completed Tasks:** Tracks achievements and academic milestones.
- **Overdue Tasks:** Dynamically detects assignments whose deadline has passed (highlighted in crimson).
- **Interactive Progress Bar:** Visual completion percentage bar with motivational guidance based on your academic workload.
- **Quick-Filter Cards:** Click any statistic card to immediately filter the view to those items.

### 3. Search, Filters & Sorting
- **Real-Time Search:** Search across assignment titles, subjects, and descriptions simultaneously.
- **Subject Filter:** Filter by specific courses or view all subjects.
- **Priority Filter:** Filter by High, Medium, or Low urgency.
- **Status Filter:** Filter by All, Pending, Completed, or Overdue.
- **Multiple Sort Options:**
  - Due Date (Earliest First)
  - Due Date (Latest First)
  - Priority (High to Low)
  - Alphabetical (A to Z)
  - Recently Added
- **Layout Switching:** Toggle between **Card Grid View** and **Compact Table List View**.

### 4. LocalStorage Data Persistence
- All assignment data and user preferences are automatically stored in the browser's `localStorage`.
- Data remains intact across page refreshes and browser restarts.
- Includes pre-seeded sample data on first launch for instant exploration.
- **Reset Demo Data** button in the navigation bar to easily restore initial sample assignments anytime.

### 5. Form Validation & UX Polish
- Required field validation on Title, Subject, and Due Date with inline error alerts.
- Support for selecting existing subjects or typing a custom subject.
- **Dark Mode & Light Mode:** Seamless theme toggle with persistent theme preference.
- Non-intrusive floating toast notifications for user actions.
- Fully responsive on mobile phones, tablets, and desktop displays.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-driven UI development and state management |
| **Vite 8** | Ultra-fast next-generation frontend build tool and dev server |
| **Vanilla CSS** | Custom CSS variables, responsive grid/flexbox, animations, and dark/light themes |
| **Lucide React** | Modern, clean iconography for user interface elements |
| **Canvas Confetti** | Micro-interaction celebratory animation on task completion |
| **HTML5 LocalStorage** | Client-side persistent data storage |

---

## 📁 Project Structure

```text
student ass/
├── index.html                   # HTML entry point with Google Fonts & metadata
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite configuration
├── README.md                    # Detailed documentation and guide
├── public/                      # Static assets and icons
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application orchestrator & state manager
    ├── App.css                  # Component styling, layouts, animations & responsive rules
    ├── index.css                # Global design tokens, color variables & CSS reset
    ├── components/
    │   ├── Navbar.jsx           # Header with brand, date, theme switch & action buttons
    │   ├── DashboardStats.jsx   # 4 metric cards and dynamic progress percentage bar
    │   ├── FilterBar.jsx        # Search input, dropdowns, status pills, sort & view mode
    │   ├── AssignmentCard.jsx   # Individual assignment card & list row with actions
    │   ├── AssignmentList.jsx   # Grid and list view renderer with empty states
    │   ├── AssignmentModal.jsx  # Reusable modal for adding & editing with validation
    │   ├── DeleteConfirmModal.jsx # Confirmation dialog before deleting an assignment
    │   └── Toast.jsx            # Floating action notification alerts
    ├── data/
    │   └── initialData.js       # Pre-seeded sample student assignments and default subjects
    └── utils/
        ├── dateUtils.js         # Date formatting, relative urgency & overdue calculation
        └── storage.js           # LocalStorage helpers for assignments and theme
```

---

## 🚀 Installation & How to Run

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (comes bundled with Node.js)

### Step 1: Open the Project Directory
Open your terminal (PowerShell, Command Prompt, or VS Code integrated terminal) in this project folder:
```bash
cd "c:\Users\Dhakshana\OneDrive\Documents\student ass"
```

### Step 2: Install Dependencies
*(Dependencies are already installed, but if setting up on a new computer, run:)*
```bash
npm install
```

### Step 3: Start the Development Server
Run the following command to launch the live development server:
```bash
npm run dev
```

### Step 4: Open in Your Browser
Once the server starts, open your web browser (Chrome, Edge, Firefox, Brave) and navigate to:
```text
http://localhost:5173/
```
*(or `http://127.0.0.1:5173/`)*

---

## 📦 Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled, minified bundle will be generated in the `dist/` directory ready for deployment on platforms like Vercel, Netlify, or GitHub Pages.

To preview the production build locally:
```bash
npm run preview
```

---

## 💡 Quick Tips for Evaluation
1. **Try Adding an Assignment:** Click "+ Add Assignment", leave a field blank to see validation messages, then submit a valid assignment.
2. **Test Search & Filters:** Type a keyword in the search bar or click "High" priority to filter immediately.
3. **Toggle Status:** Click the "Mark Done" button on any pending card to celebrate with confetti and watch the progress bar advance.
4. **Test Dark/Light Mode:** Click the Sun/Moon icon in the top header to toggle between themes.
5. **Switch Views:** Use the Grid / List toggle on the right side of the search bar to inspect both presentation styles.
6. **Reset Anytime:** Click "Reset Demo" in the top bar if you want to restore the clean initial sample dataset.
