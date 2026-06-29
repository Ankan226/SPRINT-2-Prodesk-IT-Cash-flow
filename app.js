
let state = {
  salary:       0,
  expenses:     [],
  currency:     'INR',
  exchangeRate: 1
};

let chartInstance = null;

const SYMBOLS     = { INR: '₹',   USD: '$',  EUR: '€',   GBP: '£'   };
const PDF_SYMBOLS = { INR: 'Rs.', USD: '$',  EUR: 'EUR', GBP: 'GBP' };

const SLICE_COLORS = [
  '#6c63ff', '#ff6584', '#f59e0b', '#3b82f6',
  '#10b981', '#f97316', '#e879f9', '#14b8a6',
  '#ef4444', '#84cc16', '#06b6d4', '#a855f7'
];

const salaryInput         = document.getElementById('salaryInput');
const setSalaryBtn        = document.getElementById('setSalaryBtn');
const salaryError         = document.getElementById('salaryError');
const expenseNameInput    = document.getElementById('expenseNameInput');
const expenseAmountInput  = document.getElementById('expenseAmountInput');
const addExpenseBtn       = document.getElementById('addExpenseBtn');
const expenseError        = document.getElementById('expenseError');
const displaySalary       = document.getElementById('displaySalary');
const displayExpenses     = document.getElementById('displayExpenses');
const displayBalance      = document.getElementById('displayBalance');
const alertBanner         = document.getElementById('alertBanner');
const expenseList         = document.getElementById('expenseList');
const emptyState          = document.getElementById('emptyState');
const chartEmpty          = document.getElementById('chartEmpty');
const downloadBtn         = document.getElementById('downloadBtn');
const currencySelect      = document.getElementById('currencySelect');
const currencyLabelSalary = document.getElementById('currencyLabelSalary');
const currencyLabelExp    = document.getElementById('currencyLabelExp');

function saveToStorage() {
  localStorage.setItem('cashflow_state', JSON.stringify(state));
}

function loadFromStorage() {
  const raw = localStorage.getItem('cashflow_state');
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    state.salary       = parsed.salary       || 0;
    state.expenses     = parsed.expenses     || [];
    state.currency     = parsed.currency     || 'INR';
    state.exchangeRate = parsed.exchangeRate || 1;
  } catch (e) {
    localStorage.removeItem('cashflow_state');
  }
}

function totalExpenses() {
  return state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
}

function remainingBalance() {
  return state.salary - totalExpenses();
}

function fmt(valueInINR) {
  const converted = valueInINR * state.exchangeRate;
  const symbol    = SYMBOLS[state.currency] || '₹';
  return `${symbol}${converted.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

function toINR(valueInSelectedCurrency) {
  return valueInSelectedCurrency / state.exchangeRate;
}

function updateCurrencyLabels() {
  const symbol = SYMBOLS[state.currency] || '₹';
  currencyLabelSalary.textContent = symbol;
  currencyLabelExp.textContent    = symbol;
  currencySelect.value            = state.currency;
}

function render() {
  const expenses = totalExpenses();
  const balance  = remainingBalance();

  displaySalary.textContent   = fmt(state.salary);
  displayExpenses.textContent = fmt(expenses);
  displayBalance.textContent  = fmt(balance);

  displayBalance.classList.remove('critical', 'success');

  if (state.salary > 0 && balance < state.salary * 0.10) {
    displayBalance.classList.add('critical');
    alertBanner.classList.remove('hidden');
  } else {
    displayBalance.classList.add('success');
    alertBanner.classList.add('hidden');
  }

  updateCurrencyLabels();
  renderExpenseList();
  renderChart(expenses, balance);
}

function renderExpenseList() {
  expenseList.innerHTML = '';

  if (state.expenses.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  state.expenses.forEach((exp, i) => {
    const color = SLICE_COLORS[i % SLICE_COLORS.length];
    const li    = document.createElement('li');
    li.className  = 'expense-item';
    li.dataset.id = exp.id;

    li.innerHTML = `
      <div class="expense-info">
        <span class="expense-dot" style="background:${color}"></span>
        <div>
          <span class="expense-name">${escapeHTML(exp.name)}</span>
          <span class="expense-date">${exp.date}</span>
        </div>
      </div>
      <div class="expense-right">
        <span class="expense-amount" style="color:${color}">-${fmt(exp.amount)}</span>
        <button class="delete-btn" title="Delete">🗑</button>
      </div>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => deleteExpense(exp.id));
    expenseList.appendChild(li);
  });
}

function renderChart(expenses, balance) {
  const canvas = document.getElementById('expenseChart');

  if (state.expenses.length === 0) {
    canvas.classList.add('hidden');
    chartEmpty.classList.remove('hidden');
    if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
    return;
  }

  canvas.classList.remove('hidden');
  chartEmpty.classList.add('hidden');

  const labels = [...state.expenses.map(e => e.name), 'Remaining Balance'];
  const values = [...state.expenses.map(e => e.amount * state.exchangeRate), Math.max(balance * state.exchangeRate, 0)];
  const colors = [...state.expenses.map((_, i) => SLICE_COLORS[i % SLICE_COLORS.length]), '#22c55e'];

  const data = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: colors,
      borderColor:     colors,
      borderWidth: 2,
      hoverOffset: 10
    }]
  };

  if (chartInstance) {
    chartInstance.data = data;
    chartInstance.update();
  } else {
    chartInstance = new Chart(canvas, {
      type: 'doughnut',
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#e2e8f0', font: { size: 11 }, padding: 12, boxWidth: 14 }
          },
          tooltip: {
            callbacks: {
              label: ctx => {
                const sym = SYMBOLS[state.currency] || '₹';
                return `  ${ctx.label}: ${sym}${Number(ctx.raw).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
              }
            }
          }
        }
      }
    });
  }
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function handleSetSalary() {
  const value = parseFloat(salaryInput.value);
  if (isNaN(value) || value <= 0 || salaryInput.value.trim() === '') {
    salaryError.classList.remove('hidden');
    salaryInput.focus();
    return;
  }
  salaryError.classList.add('hidden');
  state.salary = toINR(value);
  saveToStorage();
  render();
  salaryInput.value = '';
}

function handleAddExpense() {
  const name   = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (!name || isNaN(amount) || amount <= 0) {
    expenseError.classList.remove('hidden');
    if (!name) expenseNameInput.focus();
    else expenseAmountInput.focus();
    return;
  }

  expenseError.classList.add('hidden');

  state.expenses.push({
    id:     Date.now().toString(),
    name,
    amount: toINR(amount),
    date:   new Date().toLocaleDateString('en-IN', {
              day: 'numeric', month: 'short', year: 'numeric'
            })
  });

  saveToStorage();
  render();
  expenseNameInput.value   = '';
  expenseAmountInput.value = '';
  expenseNameInput.focus();
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter(exp => exp.id !== id);
  saveToStorage();
  render();
}

async function fetchExchangeRate(targetCurrency) {
  if (targetCurrency === 'INR') {
    state.exchangeRate = 1;
    state.currency     = 'INR';
    saveToStorage();
    render();
    return;
  }

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/INR`);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    if (!data.rates[targetCurrency]) throw new Error('Not found');
    state.exchangeRate = data.rates[targetCurrency];
    state.currency     = targetCurrency;
    saveToStorage();
    render();
  } catch (err) {
    alert('Could not fetch exchange rate. Showing INR values.');
    currencySelect.value = 'INR';
    state.exchangeRate   = 1;
    state.currency       = 'INR';
    render();
  }
}

function downloadPDF() {
  if (state.expenses.length === 0 && state.salary === 0) {
    alert('Nothing to export yet. Set a salary and add expenses first.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc        = new jsPDF();
  const symbol     = PDF_SYMBOLS[state.currency] || 'Rs.';
  const lineHeight = 8;
  let   y          = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Cash-Flow - Expense Report', 14, y);
  y += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, y);
  y += 12;

  doc.setTextColor(0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', 14, y);
  y += lineHeight;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const sal = (state.salary       * state.exchangeRate).toFixed(2);
  const exp = (totalExpenses()    * state.exchangeRate).toFixed(2);
  const bal = (remainingBalance() * state.exchangeRate).toFixed(2);
  doc.text(`Total Salary:      ${symbol}${sal}`, 14, y); y += lineHeight;
  doc.text(`Total Expenses:    ${symbol}${exp}`, 14, y); y += lineHeight;
  doc.text(`Remaining Balance: ${symbol}${bal}`, 14, y); y += lineHeight + 4;

  doc.setFont('helvetica', 'bold');
  doc.text('Expense Breakdown', 14, y);
  y += lineHeight;

  doc.setFontSize(9);
  doc.text('#',      14,  y);
  doc.text('Name',   24,  y);
  doc.text('Date',   110, y);
  doc.text('Amount', 160, y);
  y += 2;
  doc.setLineWidth(0.3);
  doc.line(14, y, 196, y);
  y += lineHeight - 2;

  doc.setFont('helvetica', 'normal');
  state.expenses.forEach((e, i) => {
    if (y > 270) { doc.addPage(); y = 20; }
    const converted = (e.amount * state.exchangeRate).toFixed(2);
    doc.text(String(i + 1),           14,  y);
    doc.text(e.name.substring(0, 40), 24,  y);
    doc.text(e.date,                  110, y);
    doc.text(`${symbol}${converted}`, 160, y);
    y += lineHeight;
  });

  y += 2;
  doc.line(14, y, 196, y);
  y += lineHeight;
  doc.setFont('helvetica', 'bold');
  doc.text(`Total: ${symbol}${exp}`, 130, y);

  doc.save(`cash-flow-report-${Date.now()}.pdf`);
}

setSalaryBtn.addEventListener('click', handleSetSalary);
salaryInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSetSalary(); });
addExpenseBtn.addEventListener('click', handleAddExpense);
expenseAmountInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleAddExpense(); });
salaryInput.addEventListener('input', () => salaryError.classList.add('hidden'));
expenseNameInput.addEventListener('input', () => expenseError.classList.add('hidden'));
expenseAmountInput.addEventListener('input', () => expenseError.classList.add('hidden'));
currencySelect.addEventListener('change', e => fetchExchangeRate(e.target.value));
downloadBtn.addEventListener('click', downloadPDF);

(function init() {
  loadFromStorage();
  render();
  salaryInput.focus();
})();