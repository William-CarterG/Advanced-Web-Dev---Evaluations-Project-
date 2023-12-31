import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

function ResultBar({ values }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {

        const data = {
            labels: values["questionsNumbers"],
            datasets: [
                {
                    label: 'Correctas',
                    data: values["correct"],
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                    borderRadius: 2,
                    borderSkipped: false
                }, {
                    label: 'Incorrectas',
                    data: values["incorrect"],
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderWidth: 1,
                    borderRadius: 2,
                    borderSkipped: false
                },
                {
                    label: 'No enviadas',
                    data: values["noSended"],
                    backgroundColor: 'rgb(201, 203, 207)',
                    borderWidth: 1,
                    borderRadius: 2,
                    borderSkipped: false
                }
            ]
        };

        if (chartRef.current) {
            chartRef
                .current
                .destroy();
        }

        const ctx = canvasRef
            .current
            .getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Numero de la pregunta'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Respuestas'
                        }
                    }
                },
                animation: false
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef
                    .current
                    .destroy();
            }
        };
    }, [values]);

    return (
        <div className='lg:h-[25vh] h-[35vh] w-full'>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default ResultBar;
