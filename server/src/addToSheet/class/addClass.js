
const mysql = require('mysql');

exports.handler = async (event) => {
	let response;

	try {
		response = new Promise((resolve) => {
			const db = mysql.createConnection({
				host: 'db-base-di-dati.ckehalncburp.us-east-1.rds.amazonaws.com',
				port: '3306',
				user: 'admin',
				password: 'ineedtopass3exams',
				database: 'Pathfinder_Sheets'
			});


			const queryAddClass ="INSERT INTO Classi (NomeClasse,CodPer,Livello) VALUES ('"+event['NomeClasse']+"',"+event['CodPer']+","+event['Livello']+")";
			const queryGetCLassStats=`
			select sum(stat.Livello) as LivelloPersonaggio, sum(stat.PF) as PF, sum(stat.BAB) as BAB, sum(stat.Tempra) as Tempra, sum(stat.Volonta) as Volonta, sum(stat.Riflessi) as Riflessi, Max(CompArmature) as CompArmature, Max(CompScudi) as CompScudi, max(CompArmiEsotiche) as CompArmiEsotiche, max(CompArmiGuerra) as CompArmiGuerra, max(Incantatore) as Incantatore
			from (Select C.Livello,DadoVita*Livello as PF,floor(BAB*Livello) as BAB,floor(Tempra*Livello) as Tempra,floor(Volonta*Livello) as Volonta,floor(Riflessi*Livello) as Riflessi,CompArmature,CompScudi,CompArmiEsotiche,CompArmiGuerra, Incantatore
				from Classi as C,DettaglioClasse as DC 
				where C.NomeClasse=DC.NomeClasse And CodPer=`+event['CodPer']+`) stat;`
			const queryGetRaceDimension="select Taglia from Razze where Nome=(select razza from Personaggi where CodPer="+event['CodPer']+")";
			const queryGetPgStat="Select Forza,Destrezza,Costituzione,Saggezza from Personaggi where CodPer="+event['CodPer'];

            db.connect();


			db.query(queryAddClass, (err, resultAddClass) => {
				if (err) throw err;
				db.query(queryGetCLassStats, (err, classStat) => {
					if (err) throw err;
					db.query(queryGetRaceDimension, (err, raceDimension) => {
						if (err) throw err;
						db.query(queryGetPgStat, (err, pgStat) => {
							if (err) throw err;

							const forza = (pgStat[0].Forza-10)/2;
							const destrezza = (pgStat[0].Destrezza-10)/2;
							const costituzione = (pgStat[0].Costituzione-10)/2;
							const saggezza = (pgStat[0].Saggezza-10)/2;

							const PF = classStat[0].PF + (costituzione* classStat[0].LivelloPersonaggio)
							const BMC = forza + classStat[0].BAB + raceDimension[0].Taglia;
							const DMC = 10 + forza + destrezza + raceDimension[0].Taglia
							const Tempra = classStat[0].Tempra + costituzione;
							const Riflessi = classStat[0].Riflessi + destrezza;
							const Volonta = classStat[0].Volonta + saggezza;

							const queryUpdatePersonaggio = "update Personaggi set HP="+PF
											+", BAB="+classStat[0].BAB
											+", BMC="+BMC
											+", DMC="+DMC
											+", Tempra="+Tempra
											+", Riflessi="+Riflessi
											+", Volonta="+Volonta
											+", CompArmature="+classStat[0].CompArmature
											+", CompScudi="+classStat[0].CompScudi
											+", CompeArmiEsotiche="+classStat[0].CompArmiEsotiche
											+", CompeArmiGuerra="+classStat[0].CompArmiGuerra
											+", Incantatore="+classStat[0].Incantatore
											+" where CodPer="+event['CodPer'];

							db.query(queryUpdatePersonaggio, (err, result) => {
								if (err) throw err;
								db.end();
								resolve({
									statusCode: 202,
									body: {
										addClas: resultAddClass,
										updatePersonaggio: result
									}
								});
							});
						});
					});
				});
			});
		});
	} catch (e) {
		console.log(e);
		response = {
			statusCode: 500,
			body: e
		};
	}

	return response;
};
