export const AER_PRODUCTION_DATA = {
  lastUpdated: '2024-10-31',
  source: 'Alberta Energy Regulator ST37',
  updateFrequency: 'Monthly',
  
  current: {
    oil: 2950000,
    gas: 11200,
  },
  
  historical: [
    { date: '2024-01-01', oil: 2820000, gas: 10950 },
    { date: '2024-02-01', oil: 2835000, gas: 11050 },
    { date: '2024-03-01', oil: 2870000, gas: 11100 },
    { date: '2024-04-01', oil: 2890000, gas: 11150 },
    { date: '2024-05-01', oil: 2910000, gas: 11180 },
    { date: '2024-06-01', oil: 2925000, gas: 11200 },
    { date: '2024-07-01', oil: 2940000, gas: 11220 },
    { date: '2024-08-01', oil: 2945000, gas: 11210 },
    { date: '2024-09-01', oil: 2950000, gas: 11200 },
    { date: '2024-10-01', oil: 2950000, gas: 11200 },
  ],
  
  byBasin: [
    { basin: 'Athabasca Oil Sands', oil: 1850000, gas: 0 },
    { basin: 'Cold Lake Oil Sands', oil: 195000, gas: 180 },
    { basin: 'Peace River Oil Sands', oil: 210000, gas: 450 },
    { basin: 'Montney', oil: 180000, gas: 6200 },
    { basin: 'Duvernay', oil: 95000, gas: 1800 },
    { basin: 'Cardium', oil: 125000, gas: 850 },
    { basin: 'Viking', oil: 85000, gas: 620 },
    { basin: 'Clearwater', oil: 210000, gas: 1100 },
  ]
};