Aplicație Web pentru generarea de teste online


Link demo: https://youtu.be/jSPJcc_EXDA
Link-uri git: 
•	 https://github.com/DumitrascuMaria/project-CC-FE
•	https://github.com/DumitrascuMaria/project-CC-BE
Heroku: https://boiling-temple-58077.herokuapp.com/

1.	Introducere
În cadrul acestui proiect am realizat o aplicație web pentru crearea de teste/examene, destinată instituțiilor de învățământ, putând fi folosită atât de profesori cât și de studenți/elevi. 
Tehnologiile folosite sunt următoarele: 
•	Pentru stilizarea aplicației: ReactJS
•	Serviciul de cloud folosit: Google Cloud Platform
•	Baza de date: MySQL

2.	Descriere problemă
Se dorește realizarea unei aplicații utile în sistemul de învățământ care să ofere o interfață nouă și prietenoasă pentru a da evaluări în mediul online.
Aplicația este utilizată în următorul mod: profesorul se autentifică și este redirecționat către o pagină unde poate adăuga/șterge întrebările viitorului test, iar studenții se autentifică și răspund la întrebările primite, afișăndu-le la final nota. Totodată, se trimite un mail automat cu numele studentului și punctajul obținut la test.

3.	Descriere API
Pentru generarea de mail-uri am folosit un API_KEY de SendGrid, care a fost obținută rapid prin generarea unui cont în platforma lor. În folderul de BE am creat un nou fisier js pentru tratarea funcției de trimitere de mail-uri, funcție care are ca parametri receiver-ul, sender-ul, subiectul mesajului și mesajul propriu-zis. Prin metoda post de mai jos am apelat funcția de trimitere a unui mail:

		router.post("/sendMail", async (req, res) => {
		  const { receiver, sender, subject, msg } = req.body;
		  if (!receiver || !sender || !subject || !msg) {
		    return res.status(400).send("Bad request. Missing parametres.");
		  }

		  try {
		    const sendMailResponse = await sendMail(receiver, sender, subject, msg);
		  } catch (err) {
		    console.log(err);
		    return res.send("Something went wrong");
		  }
		});

În restul aplicației, am folosit următoarele rute: 
app.use("/questions", questionsRouter);
app.use("/student", studentsRouter);



4.	Flux de date
•	Exemple de request / response

 Pe partea de FE am făcut un request pentru a obține toate întrebările din baza de date 
 
	  useEffect(() => {
	    const fetchData = async () => {
	      const result = await axios.get(
		`${process.env.REACT_APP_API_URL}/questions`
	      );

	      if (result.data.data) {
		let questionsArray = result.data.data;
		questionsArray.reverse();
		setQuestions(result.data.data);
	      }
	    };

Pe partea de BE am tratat request-ul și am returnat datele din baza de date, dacă totul era în regulă.

	router.get("/", (req, res) => {
	  connection.query("SELECT * FROM questions", (err, results) => {
	    if (err) {
	      return res.send(err);
	    }

	    return res.json({
	      data: results,
	    });
	  });
	});

•	Metode HTTP

	Metodele HTTP utilizate în cadrul acestei aplicații sunt: GET(pentru obținerea datelor din baza de date), POST(pentru adăugarea unei noi întrebări în baza de date) și DELETE(pentru ștergerea unei anumite întrebări).

5.	Capturi ecran aplicație

Ecranul de login: 
 



![image](https://user-images.githubusercontent.com/72390543/168482812-0dfa460b-2277-4e89-9e86-97d769e2c8a6.png)







Ecranul profesorului: 
 
![image](https://user-images.githubusercontent.com/72390543/168482943-27e61487-5dfe-4433-83dc-bd01311a04a8.png)


Ecranul Studentului/Elevului: 
 

![image](https://user-images.githubusercontent.com/72390543/168482945-778ca983-5068-4ef5-9387-32a6a774fb71.png)







Ecranul notei finale: 
 ![image](https://user-images.githubusercontent.com/72390543/168482951-b60ecde8-3fbe-4bb8-beb1-2dc6d8176142.png)



6.	Referințe

http://carment.ase.ro/cc/curs/index.html
https://gurita-alexandru.gitbook.io/cloud-computing-2022-simpre/
https://www.mysqltutorial.org/mysql-cheat-sheet.aspx
https://www.tutorialspoint.com/expressjs/expressjs_quick_guide.htm

