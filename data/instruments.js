/* eslint-disable quotes */
/**
 * @type {Array<Array<string|number|null|boolean>>} instruments - Array containing arrays with data of instruments
 */

const instruments = [
	['B1-01', 'Basse1', '', null, 8, 6.6, 'TRUE',1],
	['B1-02', 'Basse1', 'très lourd avec pieds fixes', null, 8, 8, 'FALSE',2],
	['B1-03', 'Basse1', '', null, 8, 7.2, 'TRUE',3],
	['B1-04', 'Basse1', '', 46, 8, 7.2, 'TRUE',4],
	['B1-05', 'Basse1', '', null, 8, 6.8, 'TRUE',5],
	['B1-06', 'Basse1', '', null, 10, 6.6, 'TRUE',6],
	['B1-07', 'Basse1', '', null, 8, 6.6, 'TRUE',7],
	['B1-08', 'Basse1', 'à débosseler', null, 11, 6.8, 'TRUE',8],
	['B1-09','Basse1','',null, 8, 6.3, 'FALSE', null],
	['B1-10', 'Basse1', '', 41, 11, 7.7,'TRUE', 10],
	['B1-11', 'Basse1', '', null, null, null, 'TRUE', 11],
	['B1-12', 'Basse1', '', null, null, null, 'TRUE', 12],
	['B1-13', 'Basse1', '', 41, 8, 6.4, 'TRUE', 13],
	['B1-14', 'Basse1', '', null, null, null, 'TRUE', 14],
	['B1-15', 'Basse1', '', null, null, null, 'TRUE', 15],
	['B2-01', 'Basse2', '', null, null, null, 'TRUE', 16],
	['B2-02', 'Basse2', '', null, null, null, 'FALSE', 18],
	['B2-04', 'Basse2', '', null, null, null, 'TRUE', 19],
	['B2-04', 'Basse2', '', null, null, null, 'TRUE', 20 ],
	['B2-05', 'Basse2', '', 37, 10, 6.8, 'TRUE', 21 ],
	['B2-06', 'Basse2', '', null, null, 5.65, 'TRUE', 22],
	['B2-07', 'Basse2', '', null, null, null, 'TRUE', 23],
	['B2-08', 'Basse2', '', null, null, 5.6, 'TRUE', 24],
	['B2-09', 'Basse2', '', null, null, null, 'TRUE', 25],
	['B2-10', 'Basse2', '', null, null, null, 'TRUE', 26],
	['B2-11', 'Basse2', '', null, null, null, 'TRUE', 27],
	['B2-12', 'Basse2', '', null, 10, 5.92, 'TRUE', 28],
	['B2-14', 'Basse2', '', null, null, null, 'TRUE', 29],
	['B2-15' ,'Basse2', 'Cerclage à réparer', null, null, null, 'TRUE', 26],
	['2B-01','Dobra', '', null, 8, null, 'TRUE', 27],
	['2B-02', 'Dobra', '', null, null, null, 'TRUE', 28],
	['2B-03','Dobra', 'Réglage défaillant', null, null, null, 'TRUE', 29],
	['2B-04', 'Dobra', '', null, null, null, 'TRUE', 30],
	['2B-05', 'Dobra', '', null, null, null, 'TRUE', 31],
	['2B-06', 'Dobra', 'Marqué 2B-12 correction', null, null, null, 'TRUE', 32],
	['2B-07', 'Dobra', '', null, null, null, 'TRUE', 32],
	['2B-08','Dobra', '', null, null, null, 'TRUE', 33],
	['2B-09', 'Dobra', '', null, null, null, 'TRUE', 34],
	['2B-10', 'Dobra', '', null, null, null, 'TRUE', 35],
	['2B-11', 'Dobra', '', null, null, 4.65, 'TRUE', 36],
	['2B-12', 'Dobra', 'A supprimer', null, null, null, 'TRUE', null],
	['2B-13', 'Dobra', '', null, null, null, 'TRUE', 37],
	['2B-14', 'Dobra', 'noté 2B-27 à corriger', null, null, null, 'TRUE', 38],
	['2B-16', 'Dobra', '', null, null, null, 'TRUE', 39],
	['2B-18', 'Dobra', '', null, null, null, 'TRUE', 40],
	['2B-22','Dobra', '', null, null, 5.32, 'TRUE', 41],
	['2B-24', 'Dobra', '', 42, 8, 5.5, 'TRUE', 42],
	['2B-26', 'Dobra', '', null, 8, null, 'TRUE', 42],
	['2B-27', 'Dobra', '', 40, 8, 5.12, 'TRUE', 43],
	['R-00', 'Repinique', '', null, 6, 2.75, 'TRUE', 44],
	['R-01', 'Repinique', '', null, 6, 2.75, 'TRUE', 45],
	['R-02', 'Repinique', '', null, 6, null, 'TRUE', 46],
	['R-03', 'Repinique', '', 28, 8, 3.15, 'TRUE', 47],
	['R-04', 'Repinique', 'hs',null, 6, 2.75, 'TRUE', 48],
	['R-05', 'Repinique', '', null, 3, 15, 'TRUE', 49],
	['R-06', 'Repinique', '', null, 8, 2.75, 'TRUE', 50],
	['R-07', 'Repinique', 'essais tirants à crochets', null, 8, 2.6, 'TRUE', 51],
	['R-08', 'Repinique', '', null, 6, null, 'TRUE', 52],
	['R-09', 'Repinique', 'Achat Lise nov.2021', 30, 6, null, 'TRUE', 53],
	['R-10', 'Repinique', 'Izzo commande kalando nov.21', null, null, null, 'TRUE', 54],
	['R-11', 'Repinique', 'Izzo commande kalando nov.21', null, null, null, 'TRUE', 55],
	['CC-01', 'Caixa', '',null, null, null, 'FALSE', 56],
	['CC-02', 'Caixa', '',null, null, null, 'FALSE', 57],
	['CC-03', 'Caixa', '',null, null, null, 'FALSE', 58],
	['CC-04', 'Caixa', '',null, null, null, 'FALSE', null],
	['CC-05', 'Caixa', '',null, null, null, 'FALSE', null],
	['CC-06', 'Caixa', '',null, null, null, 'FALSE', 59],
	['CC-07', 'Caixa', '',null, null, null, 'FALSE', null],
	['CC-08', 'Caixa', '',null, null, null, 'FALSE', 60],
	['CC-09', 'Caixa', '',null, null, null, 'FALSE', null],
	['CC-10', 'Caixa', '',null, null, null, 'FALSE', 70]
];
  
module.exports = instruments;