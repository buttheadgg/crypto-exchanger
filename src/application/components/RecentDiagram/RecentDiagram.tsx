import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { DiagramItem } from "../types/types";
import recentExchangesStore from "../../stores/recentExchagesStore";
import { observer } from "mobx-react-lite";

const COLORS = [
  "#2364E5",
  "#2EF2FF",
  "#2F7AF2",
  "#B860DA",
  "#C8EA80",
  "#E88D4B",
  "#76FA4D",
];


const renderCustomLabel = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    outerRadius,
    fill,
    name,
  } = props;


  const isMobile = window.innerWidth <= 833;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const offset1 = isMobile ? 20 : 20;
  const offset2 = isMobile ? 20 : 30;
  const offset3 = isMobile ? 20 : 35;
  const exOffset = isMobile ? 3 : 10;
  const labelFontSize = isMobile ? 12 : 16;
  
  const sx = cx + (outerRadius + offset1) * cos; 
  const sy = cy + (outerRadius + offset1) * sin;
  const mx = cx + (outerRadius + offset2) * cos; 
  const my = cy + (outerRadius + offset3) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * exOffset;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 10} 
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        fontSize={labelFontSize}
        fontWeight="bold"
      >
        {name}
      </text>
    </g>
  );
};



const RecentDiagram = () => {
  const transformDiagramData = (
    items: DiagramItem[] | undefined
  ): { name: string; value: number }[] => {
    if (!items) return [];
    return items
      .map((item) => ({
        name: item.name,
        value: Number(item.value),
      }))
      .filter((item) => item.value > 0);
  };

  const data = transformDiagramData(recentExchangesStore.diagramData?.diagram);

  return (
    <ResponsiveContainer width={500} height={500}>
      <PieChart>
        <Pie
          data={data}
          cx="200"
          cy="200"
          innerRadius={40}
          outerRadius={85}
          dataKey="value"
          labelLine
          label={renderCustomLabel}
          isAnimationActive={false}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default observer(RecentDiagram);
