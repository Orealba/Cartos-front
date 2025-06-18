import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { apiClient } from '../services/api';

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7f50',
  '#00c49f',
  '#a28bfd',
  '#e0aaff',
];

// Type definitions
interface Expense {
  id: number;
  amount: number;
  date: string;
  category_id: number;
}

interface Category {
  id: number;
  name: string;
}

interface ChartData {
  name: string;
  value: number;
}

interface Props {
  token: string;
}

const SummaryCharts: React.FC<Props> = ({ token }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [byCategory, setByCategory] = useState<ChartData[]>([]);
  const [byDay, setByDay] = useState<ChartData[]>([]);
  const [byMonth, setByMonth] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = apiClient(token);
      try {
        const [expensesData, categoriesData] = await Promise.all([
          api.get('/api/gastos'),
          api.get('/api/categorias'),
        ]);

        setExpenses(expensesData);
        setCategories(categoriesData);
        processChartData(expensesData, categoriesData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, [token]);

  const processChartData = (expenses: Expense[], categories: Category[]) => {
    const categoryMap = new Map<number, string>(
      categories.map((cat) => [cat.id, cat.name]),
    );

    const categoryTotals: Record<string, number> = {};
    expenses.forEach((expense) => {
      const categoryName = categoryMap.get(expense.category_id) || 'Unknown';
      categoryTotals[categoryName] =
        (categoryTotals[categoryName] || 0) + expense.amount;
    });

    const categoryData: ChartData[] = Object.entries(categoryTotals).map(
      ([name, value]) => ({ name, value }),
    );

    const dayTotals: Record<string, number> = {};
    expenses.forEach((expense) => {
      const date = expense.date;
      dayTotals[date] = (dayTotals[date] || 0) + expense.amount;
    });

    const dayData: ChartData[] = Object.entries(dayTotals).map(
      ([name, value]) => ({ name, value }),
    );

    const monthTotals: Record<string, number> = {};
    expenses.forEach((expense) => {
      const month = expense.date.slice(0, 7); // Get "YYYY-MM"
      monthTotals[month] = (monthTotals[month] || 0) + expense.amount;
    });

    const monthData: ChartData[] = Object.entries(monthTotals).map(
      ([name, value]) => ({ name, value }),
    );

    setByCategory(categoryData);
    setByDay(dayData);
    setByMonth(monthData);
  };

  return (
    <div className="grid gap-10">
      {/* Chart: Expenses by Category */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Expenses by Category</h2>
        <ResponsiveContainer
          width="100%"
          height={300}>
          <PieChart>
            <Pie
              data={byCategory}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label>
              {byCategory.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Chart: Expenses by Day */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Expenses by Day</h2>
        <ResponsiveContainer
          width="100%"
          height={300}>
          <BarChart data={byDay}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#8884d8"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart: Expenses by Month */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-2">Expenses by Month</h2>
        <ResponsiveContainer
          width="100%"
          height={300}>
          <BarChart data={byMonth}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#00c49f"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SummaryCharts;
