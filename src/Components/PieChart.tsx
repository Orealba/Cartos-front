import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Transaccion } from '../Pages/Transacciones';

interface Props {
  transacciones: Transaccion[];
}

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7f50',
  '#a83279',
  '#4bc0c0',
];

export const PieChart: React.FC<Props> = ({ transacciones }) => {
  const gastos = transacciones.filter((t) => t.type === 'EXPENSE');

  const gastosPorCategoria = gastos.reduce((acc, transaccion) => {
    const key = transaccion.categoryId;
    acc[key] = (acc[key] || 0) + transaccion.amount;
    return acc;
  }, {} as Record<number, number>);

  const data = Object.entries(gastosPorCategoria).map(([key, value]) => ({
    name: `Categoría ${key}`, // puedes reemplazar por el nombre real si lo tienes
    value,
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label
            outerRadius={100}
            fill="#8884d8"
            dataKey="value">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
