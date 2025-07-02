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
import { apiClient } from '../../services/api';
import { BotonDesplegableResumen } from '../Botones/BotonDesplegable/BotonDesplegableResumen';
import './ResumenGraficos.css';

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

  const totalValue = chartData.reduce((sum, { value }) => sum + value, 0);

  return (
    <div>
      {/* Selector de periodo (igual a tus botones del Header) */}
      <div className="w-full flex justify-center mt-10">
        <BotonDesplegableResumen
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      </div>

      <div className="w-full flex justify-center ">
        <div
          className="
          bg-myGray/50 rounded-2xl
          px-8 sm:px-8 md:px-20 lg:px-40  
          overflow-visible
          py-4 sm:py-6 md:py-8 lg:py-0
          mt-2 sm:mt-3 md:mt-4 
          w-full  
          min-h-[900px]
          
        ">
          <div className="w-full h-100">
            <ResponsiveContainer
              width="100%"
              height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                  {chartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  wrapperClassName="bg-myGray text-[#15464e] rounded-lg p-2"
                  contentStyle={{
                    backgroundColor: '',
                    borderColor: 'transparent',
                  }}
                  itemStyle={{ color: '#ccc9bd' }}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(2)}€`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Lista de transacciones */}
          {/* Resumen por categoría (ya sumadas) */}
          <h2 className="text-white mb-3">Total por categorías</h2>
          <div className="space-y-4">
            {chartData.map(({ name, value }) => {
              const percent = totalValue
                ? ((value / totalValue) * 100).toFixed(0)
                : '0';
              return (
                <div key={name}>
                  <div
                    className="
            bg-myGray rounded-xl w-full
            h-auto sm:h-11 md:h-12 lg:h-12
            flex items-center
            px-6
          ">
                    {/* Nombre al principio */}

                    <span className="text-white text-base flex-1">{name}</span>

                    {/* Importe perfectamente centrado */}
                    <span className="text-white text-base font-bold flex-1 text-center">
                      {value.toFixed(2)}€
                    </span>

                    {/* Porcentaje al final */}
                    <span className="text-white text-base flex-1 text-right">
                      {percent}%
                    </span>
                  </div>
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
