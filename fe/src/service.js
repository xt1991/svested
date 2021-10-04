import apiClient from './api/apiClient';
const getPieApiData = async ()=>{
  const res = await apiClient.get('pie');
  return {
    labels: res.data.map(item=> item.label),
    datasets: [
      {
        data: res.data.map(item=> item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};

const getBarApiData = async () => {
  const res = await apiClient.get('bar');
  return {
    labels: res.data.map(item => item.label),
    datasets: [
      {
        label: 'Number of Member',
        data: res.data.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
	
};

const getChart = async () => {
  const res = await apiClient.get('chart');
  return res.data;
};
const createChart = async (data) => {
 return apiClient.post('chart',data);
};
const fetchData = async () => {
  const [pieData, barData, chartData] = await Promise.all([getPieApiData(), getBarApiData(), getChart()]);
  return {
    pieData,
    barData,
    chartData
  };
};


export default {getPieApiData, getBarApiData, fetchData, createChart, getChart};