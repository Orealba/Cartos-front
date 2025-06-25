import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { apiClient } from '../services/api';
const COLORS = [
  '#eaa31e',
  '#FFB300',
  '#FFA500',
  '#FF8C00',
  '#FF7F50',
  '#FFD580',
  '#FFE699',
];

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

type Period = '1M' | '3M' | '6M' | '12M';

const ResumenGraficos: React.FC<Props> = ({ token }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('1M');
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = apiClient(token);
      try {
        const [expensesRes, categoriesRes] = await Promise.all([
          api.get('/api/transactions'),
          api.get('/api/categories'),
        ]);
        setExpenses(expensesRes.content);
        setCategories(categoriesRes.content || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const now = new Date();
    const dateLimit = new Date();

    switch (selectedPeriod) {
      case '1M':
        dateLimit.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        dateLimit.setMonth(now.getMonth() - 3);
        break;
      case '6M':
        dateLimit.setMonth(now.getMonth() - 6);
        break;
      case '12M':
        dateLimit.setFullYear(now.getFullYear() - 1);
        break;
    }

    const filtered = expenses.filter((e) => new Date(e.date) >= dateLimit);
    setFilteredExpenses(filtered);

    const categoryMap = new Map<number, string>(
      categories.map((cat) => [cat.id, cat.name]),
    );

    const totals: Record<string, number> = {};
    filtered.forEach((e) => {
      const name = categoryMap.get(e.category_id) || 'Unknown';
      totals[name] = (totals[name] || 0) + e.amount;
    });

    const data: ChartData[] = Object.entries(totals).map(([name, value]) => ({
      name,
      value,
    }));

    setChartData(data);
  }, [selectedPeriod, expenses, categories]);

  return (
    <div className="bg-gray-800 bg-opacity-60 rounded-xl p-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Gastos por Categoría</h2>

      {/* Selector de período */}
      <div className="mb-4">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as Period)}
          className="border border-gray-600 px-3 py-1 rounded bg-gray-700 text-white">
          <option value="1M">Último mes</option>
          <option value="3M">Últimos 3 meses</option>
          <option value="6M">Últimos 6 meses</option>
          <option value="12M">Último año</option>
        </select>
      </div>

      {/* Gráfico */}
      <div className="mb-6">
        <ResponsiveContainer
          width="100%"
          height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label>
              {chartData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937', // gray-800
                borderColor: '#4b5563', // gray-600
                color: '#f9fafb', // gray-50
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Lista de transacciones */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Transacciones</h3>
        <ul className="space-y-2">
          {filteredExpenses.map((expense) => {
            const categoryName =
              categories.find((c) => c.id === expense.category_id)?.name ||
              'Unknown';
            return (
              <li
                key={expense.id}
                className="flex justify-between items-center px-3 py-2 rounded bg-gray-700 bg-opacity-50">
                <span>{categoryName}</span>
                <span className="text-sm text-gray-300">
                  {new Date(expense.date).toLocaleDateString()}
                </span>
                <span className="font-medium">
                  {expense.amount.toFixed(2)}€
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ResumenGraficos;
