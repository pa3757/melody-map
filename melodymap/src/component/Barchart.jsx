import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const MBTIBarChart = ({ mbtiData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // 차트가 다시 생성될 때 기존 차트를 파괴합니다.
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: mbtiData.map((item) => item.type),
          datasets: [
            {
              label: "MBTI 유형 통계",
              data: mbtiData.map((item) => item.count),
              backgroundColor: "rgba(105, 169, 248, 0.5)", // 막대 차트 색상
              borderColor: "rgba(105, 169, 248, 1)", // 막대 테두리 색상
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          maintainAspectRatio: false, // 차트의 비율을 유지하지 않음
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                font: {
                  family: "WavvePADO-Regular", // y축 라벨 폰트 설정
                },
              },
            },
            x: {
              ticks: {
                font: {
                  family: "WavvePADO-Regular", // x축 라벨 폰트 설정
                },
              },
            },
          },
          plugins: {
            tooltip: {
              titleFont: {
                family: "WavvePADO-Regular",
              },
              bodyFont: {
                family: "WavvePADO-Regular",
              },
            },
            legend: {
              labels: {
                font: {
                  family: "WavvePADO-Regular",
                },
              },
            },
          },
        },
      });
    }
  }, [mbtiData]);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MBTIBarChart;
