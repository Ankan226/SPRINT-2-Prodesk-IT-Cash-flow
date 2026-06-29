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

<img width="1671" height="906" alt="image" src="https://github.com/user-attachments/assets/478d931a-0077-4a80-9a8f-a6b7b69d59e5" />

---

## Expense Management

- Add unlimited expenses
- Automatic balance calculation
- Delete expenses
- Real-time UI update

<img width="795" height="900" alt="image" src="https://github.com/user-attachments/assets/45b47c5a-1e9e-4da4-8e13-99692ec98100" />

<img width="822" height="887" alt="image" src="https://github.com/user-attachments/assets/45843057-fa23-4adf-8169-646857ce73c4" />


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

<img width="1212" height="673" alt="image" src="https://github.com/user-attachments/assets/cffca89e-7830-4297-ab0b-1b32a26506e3" />

---

## Data Visualization

Interactive Doughnut Chart using Chart.js.

Displays:

- Remaining Balance
- Individual Expenses

<img width="847" height="587" alt="image" src="https://github.com/user-attachments/assets/952edb50-b6a8-42bc-bdb5-376847f11f22" />


---

## PDF Report

Download complete expense report including:

- Salary
- Expenses
- Remaining Balance
- Date
- Expense Table

<img width="1016" height="750" alt="image" src="https://github.com/user-attachments/assets/2acf1205-bf59-4bc4-bc24-8207ee10283f" />

---

## Alert System

If balance becomes less than 10% of salary:

- Balance becomes red
- Warning banner appears

<img width="921" height="445" alt="image" src="https://github.com/user-attachments/assets/c6a159c4-5297-4cb5-b030-0e016910fcd1" />

---

# Input Validation

The application prevents:

- Empty Salary
- Negative Salary

<img width="867" height="231" alt="image" src="https://github.com/user-attachments/assets/922c12a9-c47a-4102-9507-ecabe74e17a0" />

- Empty Expense Name
  
<img width="853" height="251" alt="image" src="https://github.com/user-attachments/assets/ae787602-abb7-40d0-99f8-823ae21cea95" />
- Negative Expense Amount

<img width="847" height="213" alt="image" src="https://github.com/user-attachments/assets/acac27ae-bb3c-4ad4-ba89-70fdf4212885" />
- Invalid Number Input
  
<img width="862" height="236" alt="image" src="https://github.com/user-attachments/assets/4e30facb-16c0-4880-9f8b-7ac012f0e5de" />




---

# How to Run

Live Link:- https://cash-flow-prodesk-it-ankan.netlify.app/

OR

Open index.html file & run using VS Code Live Server

---


# Author

Ankan Pal, IIT PATNA
