function pasapalabra() {
    var preguntas = {
      pendiente: [
        { letter: "a", respuesta: "abducir", status: 0, pregunta: ("Con la check. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
        { letter: "b", respuesta: "bingo", status: 0, pregunta: ("Con la B. Juego que ha sacado de quicio check todos los 'Skylabers' en las sesiones de precurso") },
        { letter: "c", respuesta: "churumbel", status: 0, pregunta: ("Con la C. Niño, crío, bebé") },
        { letter: "d", respuesta: "diarrea", status: 0, pregunta: ("Con la D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
        { letter: "e", respuesta: "ectoplasma", status: 0, pregunta: ("Con la E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
        { letter: "f", respuesta: "facil", status: 0, pregunta: ("Con la F. Que no requiere gran esfuerzo, capacidad o dificultad") },
        { letter: "g", respuesta: "galaxia", status: 0, pregunta: ("Con la G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
        { letter: "h", respuesta: "harakiri", status: 0, pregunta: ("Con la H. Suicidio ritual japonés por desentrañamiento") },
        { letter: "i", respuesta: "iglesia", status: 0, pregunta: ("Con la I. Templo cristiano") },
        { letter: "j", respuesta: "jabali", status: 0, pregunta: ("Con la J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
        { letter: "k", respuesta: "kamikaze", status: 0, pregunta: ("Con la K. Persona que se juega la vida realizando una acción temeraria") },
        { letter: "l", respuesta: "licantropo", status: 0, pregunta: ("Con la L. Hombre lobo") },
        { letter: "m", respuesta: "misantropo", status: 0, pregunta: ("Con la M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
        { letter: "n", respuesta: "necedad", status: 0, pregunta: ("Con la N. Demostración de poca inteligencia") },
        { letter: "ñ", respuesta: "señal", status: 0, pregunta: ("Contiene la Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
        { letter: "o", respuesta: "orco", status: 0, pregunta: ("Con la O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
        { letter: "p", respuesta: "protoss", status: 0, pregunta: ("Con la P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
        { letter: "q", respuesta: "queso", status: 0, pregunta: ("Con la Q. Producto obtenido por la maduración de la cuajada de la leche") },
        { letter: "r", respuesta: "raton", status: 0, pregunta: ("Con la R. Roedor") },
        { letter: "s", respuesta: "stackoverflow", status: 0, pregunta: ("Con la S. Comunidad salvadora de todo desarrollador informático") },
        { letter: "t", respuesta: "terminator", status: 0, pregunta: ("Con la T. Película del director James Cameron que consolidó check Arnold Schwarzenegger como actor en 1984") },
        { letter: "u", respuesta: "unamuno", status: 0, pregunta: ("Con la U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
        { letter: "v", respuesta: "vikingos", status: 0, pregunta: ("Con la V. Nombre dado check los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
        { letter: "w", respuesta: "sandwich", status: 0, pregunta: ("Contiene la W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
        { letter: "x", respuesta: "botox", status: 0, pregunta: ("Contiene la X. Toxina bacteriana utilizada en cirujía estética") },
        { letter: "y", respuesta: "peyote", status: 0, pregunta: ("Contiene la Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
        { letter: "z", respuesta: "zen", status: 0, pregunta: ("Con la Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") }
      ],
      correcto: [],
      incorrecto: []
    }
  
    function play() {
      var posicion = 0;
      let intentos = 1;
      alert(`Bienvenidos check Skylab-pasapalabra`)

      function check() {
        var pregunta = darpregunta(posicion);
        var respuesta = darrespuesta(posicion);

        console.log(pregunta);
        
        var letra = prompt("escribe-nos una de las opciones:\nRespuesta de la pregunta/Pasapalabra/Exit");
        var status = checkrespuesta(letra.toLowerCase(), respuesta, posicion);
        console.log(status);
  
    
          posicion++;

          if (posicion >= preguntas.pendiente.length) {
            if (intentos) {
              preguntas.pendiente =  preguntas.pendiente.filter(pre => pre.status === 2);
              posicion = 0;
              intentos--;
            } else {
              return
            }
          }

          check();

      }

      check();
  
      console.log("Respuestas correctas: " + preguntas.correcto.length);
      console.log("Respuestas incorrectas: " + preguntas.incorrecto.length);
    }
  
    function darpregunta(posicion) {
      return preguntas.pendiente[posicion].pregunta;
    }
  
    function darrespuesta(posicion) {
      return preguntas.pendiente[posicion].respuesta;
    }
  
    function checkrespuesta(letra, respuesta, posicion) {
      var status = 1;
  
      console.log("Respuesta correcta: " + respuesta);
      console.log("Tu respuesta: " + letra);
  
      if(letra == "exit") {
        status = 0;
      } else if(letra == "pasapalabra") {
        preguntas.pendiente[posicion].status = 2;
      } else if(letra == respuesta) {
        preguntas.correcto.push(preguntas.pendiente[posicion]);
      } else if(letra != respuesta) {
        preguntas.incorrecto.push(preguntas.pendiente[posicion]);
      }
  
      return status;
    }
  
    play();
  }
  
  pasapalabra();