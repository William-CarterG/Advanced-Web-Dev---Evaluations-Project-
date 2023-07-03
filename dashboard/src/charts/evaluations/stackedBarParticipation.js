import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';



function StackedBarParticipation() {
  const labels = [""];

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Sin empezar',
          data: [10],
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Terminaron',
          data: [20],
          backgroundColor: 'rgb(54, 162, 235)',
        }
      ]
    };

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Respuestas'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Estados'
            }
          }
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); 
      }
    };
  }, []);

  return (
    <div className='h-[25vh]'>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default StackedBarParticipation;