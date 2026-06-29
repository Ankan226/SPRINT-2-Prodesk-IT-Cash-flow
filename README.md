  # Cash-Flow – Salary & Expense Tracker

## Sprint 02 Project

A responsive Salary & Expense Tracker built using HTML, CSS, and JavaScript.

This project helps users manage their monthly salary and expenses while providing real-time balance calculation, persistent storage, PDF report generation, currency conversion, and expense visualization.

---

# Live Features

## Phase 1 

✅ Set Monthly Salary

✅ Add Expenses

✅ Dynamic Expense List

✅ Remaining Balance Calculation

✅ Input Validation

---

## Phase 2

✅ LocalStorage Persistence

✅ Delete Expense

✅ Auto Update Balance

✅ Chart.js Doughnut Chart

---

## Phase 3

✅ PDF Report Generation (jsPDF)

✅ Currency Conversion API

✅ Threshold Alert (<10% balance)

---

# Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API
- Chart.js
- jsPDF
- Exchange Rate API

---

# Project Structure

```
Cash-Flow/
│
├── index.html
├── style.css
├── app.js
├── README.md
├── Prompts.md
└── assets/
```

---

# Features

## Salary Management

- Set monthly salary
- Update salary anytime
- Validation against invalid inputs

---

## Expense Management

- Add unlimited expenses
- Automatic balance calculation
- Delete expenses
- Real-time UI update

---

## Persistent Storage

Data is automatically stored using LocalStorage.

The application restores previous data after page refresh.

---

## Currency Conversion

Supports:

- INR
- USD
- EUR
- GBP

Uses real-time exchange rates.

---

## Data Visualization

Interactive Doughnut Chart using Chart.js.

Displays:

- Remaining Balance
- Individual Expenses

---

## PDF Report

Download complete expense report including:

- Salary
- Expenses
- Remaining Balance
- Date
- Expense Table

---

## Alert System

If balance becomes less than 10% of salary:

- Balance becomes red
- Warning banner appears

---

# Input Validation

The application prevents:

- Empty Salary
- Negative Salary
- Empty Expense Name
- Negative Expense Amount
- Invalid Number Input

---

# How to Run

Live Link:- https://cash-flow-prodesk-it-ankan.netlify.app/

OR

Open index.html file & run using VS Code Live Server

---


# Author

Ankan Pal, IIT PATNA