"use client";

import data from "../data/data-chart";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function Chart() {
  const percentage = data[0].value;

  return (
    <section className="flex flex-col items-center justify-center p-6 border border-gray-100 bg-white shadow-sm rounded-xl">
      <h2 className="text-heading mb-6 text-lg font-semibold">
        Progress Keseluruhan
      </h2>
      <div className="relative h-52 w-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Persentase */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-heading text-3xl font-bold">{percentage}%</span>
          <span className="text-text-secondary text-sm">Selesai</span>
        </div>
      </div>
      {/* Legend */}
      <div className="mt-6 flex gap-6">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-text-secondary text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
