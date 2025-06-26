// src/Components/ResumenGraficos.tsx
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
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

interface ChartData {
  name: string;
  value: number;
}

type Period = '1M' | '3M' | '6M' | '12M';

interface Props {
  token: string;
}

const ResumenGraficos: React.FC<Props> = ({ token }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('1M');
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // ── Fetch de datos ─────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      const api = apiClient(token);
      try {
        const [transRes, catRes] = await Promise.all([
          api.get('/api/transactions?page=0&size=100'),
          api.get('/api/categories?page=0&size=100'),
        ]);
        setExpenses(transRes.content);
        setCategories(catRes.content || []);
      } catch (err) {
        console.error('Error al cargar datos:', err);
      }
    };
    fetchData();
  }, [token]);

  // ── Filtrado y preparación del chart ────────────────────
  useEffect(() => {
    const now = new Date();
    const cutoff = new Date(now);
    switch (selectedPeriod) {
      case '1M':
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        cutoff.setMonth(now.getMonth() - 3);
        break;
      case '6M':
        cutoff.setMonth(now.getMonth() - 6);
        break;
      case '12M':
        cutoff.setFullYear(now.getFullYear() - 1);
        break;
    }
    const filtered = expenses.filter((e) => new Date(e.date) >= cutoff);
    setFilteredExpenses(filtered);

    const mapCat = new Map(categories.map((c) => [c.id, c.name]));
    const totals: Record<string, number> = {};
    filtered.forEach((e) => {
      const name = mapCat.get(e.categoryId) || 'Sin categoría';
      totals[name] = (totals[name] || 0) + e.amount;
    });
    setChartData(
      Object.entries(totals).map(([name, value]) => ({ name, value })),
    );
  }, [selectedPeriod, expenses, categories]);

  return (
    <div>
      {/* Selector de periodo (igual a tus botones del Header) */}
      <div className="w-full flex justify-center mt-30">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as Period)}
          className="border border-gray-600 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-myYellow">
          <option value="1M">Último mes</option>
          <option value="3M">Últimos 3 meses</option>
          <option value="6M">Últimos 6 meses</option>
          <option value="12M">Último año</option>
        </select>
      </div>

      {/* Contenedor principal centrado (idéntico estilo a Header/Body) */}
      <div className="w-full flex justify-center">
        <div
          className="
          bg-myGray/50 rounded-2xl
          px-8 sm:px-8 md:px-20 lg:px-30
          py-4 sm:py-6 md:py-8 lg:py-10
          mt-2 sm:mt-3 md:mt-4 lg:mt-5
          w-full max-w-7xl
          space-y-6
        ">
          {/* Título */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-white text-center">
            Gastos por Categoría
          </h2>

          {/* Gráfico */}
          <div className="w-full h-80">
            <ResponsiveContainer
              width="100%"
              height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label>
                  {chartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    borderColor: '#4b5563',
                    color: '#f9fafb',
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ marginTop: 10, color: '#fbbf24' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Lista de transacciones */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Transacciones</h3>
            {filteredExpenses.map((exp) => {
              const catName =
                categories.find((c) => c.id === exp.categoryId)?.name ||
                'Sin categoría';
              return (
                <div
                  key={exp.id}
                  className="
                  flex justify-between items-center
                  bg-gray-700 bg-opacity-50
                  p-4 rounded-xl
                ">
                  <span className="text-white">{catName}</span>
                  <span className="text-gray-300 text-sm">
                    {new Date(exp.date).toLocaleDateString('es-ES')}
                  </span>
                  <span className="text-white font-medium">
                    {exp.amount.toFixed(2)}€
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumenGraficos;
