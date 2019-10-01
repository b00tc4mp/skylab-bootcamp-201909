// definir variables domconst pasapalabra = document.querySelector('.pasapalabra')
const pasapalabra = document.querySelector('.pasapalabra')
const buttons = document.querySelector('.botones')
const display = document.querySelector('.display')
const letters = document.querySelector('.letters')
const startB = document.getElementById('start')
const pasapalabraB = document.getElementById('pasapalabra')
const endB = document.getElementById('end')
const stopB = document.getElementById('stop')
const sendB = document.getElementById('send')
const respuesta = document.getElementById('answer')
const feedback = document.getElementById('feedback')


// definir letras dom
const letraa = document.getElementById('a');
const letrab = document.getElementById('b');
const letrac = document.getElementById('c');
const letrad = document.getElementById('d');
const letrae = document.getElementById('e');
const letraf = document.getElementById('f');
const letrag = document.getElementById('g');
const letrah = document.getElementById('h');
const letrai = document.getElementById('i');
const letraj = document.getElementById('j');
const letrak = document.getElementById('k');
const letral = document.getElementById('l');
const letram = document.getElementById('m');
const letran = document.getElementById('n');
const letrañ = document.getElementById('ñ');
const letrao = document.getElementById('o');
const letrap = document.getElementById('p');
const letraq = document.getElementById('q');
const letrar = document.getElementById('r');
const letras = document.getElementById('s');
const letrat = document.getElementById('t');
const letrav = document.getElementById('v');
const letraw = document.getElementById('w');
const letrax = document.getElementById('x');
const letray = document.getElementById('y');
const letraz = document.getElementById('z');


function apear(){
    sendB.style.visibility = 'visible';
    endB.style.visibility = 'visible';
    stopB.style.visibility = 'visible';
    pasapalabraB.style.visibility = 'visible';
    startB.style.visibility = 'hidden'; 
}
function disapear(){
    sendB.style.visibility = 'hidden';
    endB.style.visibility = 'hidden';
    stopB.style.visibility = 'hidden';
    pasapalabraB.style.visibility = 'hidden';
    startB.innerHTML = 'Jugar otra vez?'
    startB.style.visibility = 'visible';
}
 let multiplesQuestions = [
    [
        { letter: "a", answer: "abducir", status: 0, question: "CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien" },
        { letter: "a", answer: "aparecer", status: 0, question: "CON LA A. Manifestarse, dejarse ver, por lo común, causando sorpresa, admiración u otro movimiento del ánimo" },
        { letter: "a", answer: "anglosajon", status: 0, question: "CON LA A. Dicho de una persona: De procedencia y lengua inglesas" },
        { letter: "a", answer: "aroma", status: 0, question: "CON LA A. Perfume, olor muy agradable" },
        { letter: "a", answer: "acera", status: 0, question: "CON LA A. Orilla de la calle o de otra vía pública" },
    ],
    [
        { letter: "b", answer: "bingo", status: 0, question: "CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso" },
        { letter: "b", answer: "bar", status: 0, question: "CON LA B. Lugar donde pasan horas los universitarios" },
        { letter: "b", answer: "baraja", status: 0, question: "CON LA B. Conjunto completo de cartas empleado para juegos de azar" },
        { letter: "b", answer: "beato", status: 0, question: "CON LA B. Dicho de una persona: Beatificada por el papa" },
        { letter: "b", answer: "buhardilla", status: 0, question: "CON LA B. Parte de un edificio situada inmediatamente debajo del tejado, con techo en pendiente y destinada a vivienda" },
    ],
    [
        { letter: 'c', answer: "churumbel", status: 0, question: "CON LA C. Niño, crío, bebé" },
        { letter: 'c', answer: "cartabon", status: 0, question: "CON LA C. Plantilla de madera, plástico u otro material, en forma de triángulo rectángulo escaleno, que se utiliza en dibujo" },
        { letter: 'c', answer: "ceja", status: 0, question: "CON LA C. Parte de la cara, prominente, curvilínea y cubierta de pelo, situada sobre la cuenca del ojo" },
        { letter: 'c', answer: "cian", status: 0, question: "CON LA C. Dicho de un color: Azul verdoso, complementario del rojo" },
        { letter: 'c', answer: "corona", status: 0, question: "CON LA C. Aro, hecho de flores, de ramas o de metal, que ciñe la cabeza y se usa como adorno, insignia honorífica o símbolo de dignidad o realeza" },
    ],
    [
        { letter: "d", answer: "diarrea", status: 0, question: "CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida" },
        { letter: "d", answer: "dragon", status: 0, question: "CON LA D. Criatura fantástica sobre la que volaba Daenerys Targaryen" },
        { letter: "d", answer: "dibujo", status: 0, question: "CON LA D.  Delineación o imagen dibujada" },
        { letter: "d", answer: "dedal", status: 0, question: "CON LA D. Utensilio pequeño, ligeramente cónico y hueco, con la superficie llena de hoyuelos y cerrado a veces por un casquete esférico para proteger el dedo al coser" },
        { letter: "d", answer: "duda", status: 0, question: "CON LA D. Suspensión o indeterminación del ánimo entre dos juicios o dos decisiones, o bien acerca de un hecho o una noticia" },
    ],
    [
        { letter: "e", answer: "ectoplasma", status: 0, question: "CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación" },
        { letter: "e", answer: "estornudar", status: 0, question: "CON LA E. Despedir o arrojar con violencia el aire de los pulmones, por la espiración involuntaria y repentina promovida por un estímulo que actúa sobre la membrana pituitaria" },
        { letter: "e", answer: "entrada", status: 0, question: "CON LA E. Espacio por donde se entra a alguna parte" },
        { letter: "e", answer: "emanacion", status: 0, question: "CON LA E. Acción y efecto de emanar" },
        { letter: "e", answer: "embalsamador", status: 0, question: "CON LA E. adj. Que embalsama" },
    ],
    [
        { letter: "f", answer: "facil", status: 0, question: "CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad" },
        { letter: "f", answer: "fosil", status: 0, question: "CON LA F. Dicho de una sustancia de origen orgánico o de un resto de organismo: Que está más o menos petrificado" },
        { letter: "f", answer: "fiebre", status: 0, question: "CON LA F. Fenómeno patológico que se manifiesta por elevación de la temperatura normal del cuerpo y mayor frecuencia del pulso y la respiración" },
        { letter: "f", answer: "faba", status: 0, question: "CON LA F. Fruto y semilla de la judía" },
        { letter: "f", answer: "fobia", status: 0, question: "CON LA F. Aversión exagerada a alguien o a algo" },
    ],
    [
        { letter: "g", answer: "galaxia", status: 0, question: "CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas" },
        { letter: "g", answer: "gota", status: 0, question: "CON LA G. Pequeña porción de un líquido, con forma esferoidal" },
        { letter: "g", answer: "gato", status: 0, question: "CON LA G. Mamífero carnívoro de la familia de los félidos, digitígrado, doméstico, de unos 50 cm de largo desde la cabeza hasta el arranque de la cola" },
        { letter: "g", answer: "gobernador", status: 0, question: "CON LA G. Que gobierna" },
        { letter: "g", answer: "genoma", status: 0, question: "CON LA G. Secuencia de nucleótidos que constituye el ADN de un individuo o de una especie" },
    ],
    [
        { letter: "h", answer: "harakiri", status: 0, question: "CON LA H. Suicidio ritual japonés por desentrañamiento" },
        { letter: "h", answer: "hoguera", status: 0, question: "CON LA H. Fuego hecho al aire libre con materias combustibles que levantan mucha llama" },
        { letter: "h", answer: "higo", status: 0, question: "CON LA H. Segundo fruto, o el más tardío, de la higuera, blando, de gusto dulce" },
        { letter: "h", answer: "hobbit", status: 0, question: "CON LA H. Habitantes de la Comarca, raza del protagonista de la famosa trilogía de J.R.R. Tolkien" },
        { letter: "h", answer: "habitacion", status: 0, question: "CON LA H. En una vivienda, cada uno de los espacios entre tabiques destinados a dormir, comer, etc" },
    ],
    [
        { letter: "i", answer: "iglesia", status: 0, question: "CON LA I. Templo cristiano" },
        { letter: "i", answer: "Internet", status: 0, question: "CON LA I. Red informática mundial, descentralizada" },
        { letter: "i", answer: "invadir", status: 0, question: "CON LA I. Irrumpir, entrar por la fuerza" },
        { letter: "i", answer: "intencion", status: 0, question: "CON LA I. Determinación de la voluntad en orden a un fin" },
        { letter: "i", answer: "impulsar", status: 0, question: "CON LA I. Dar empuje para producir movimiento" },
    ],
    [
        { letter: "j", answer: "jabali", status: 0, question: "CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba" },
        { letter: "j", answer: "jauria", status: 0, question: "CON LA J. Conjunto de perros mandados por el mismo perrero que levantan la caza en una montería" },
        { letter: "j", answer: "jamon", status: 0, question: "CON LA J. Pierna trasera del cerdo, curada o cocida entera" },
        { letter: "j", answer: "juramento", status: 0, question: "CON LA J. Afirmación o negación de algo, poniendo por testigo a Dios, o en sí mismo o en sus criaturas" },
        { letter: "j", answer: "jabalina", status: 0, question: "CON LA J. Arma, a manera de pica o venablo, que se usaba más comúnmente en la caza mayor, y actualmente en una modalidad deportiva" },
    ],
    [
        { letter: "k", answer: "kamikaze", status: 0, question: "CON LA K. Persona que se juega la vida realizando una acción temeraria" },
        { letter: "k", answer: "kebab", status: 0, question: "CON LA K. Masa de carne picada que, ensartada en una varilla, se asa haciéndose girar ante una fuente de calor" },
        { letter: "k", answer: "koala", status: 0, question: "CON LA K. Mamífero marsupial arborícola parecido a un oso pequeño, propio de los eucaliptales australianos" },
        { letter: "k", answer: "kosobar", status: 0, question: "CON LA K. Natural de Kosovo, provincia autónoma de Serbia" },
        { letter: "k", answer: "kilobyte", status: 0, question: "CON LA K. Unidad equivalente a 1024 (210) bytes" },

    ],
    [
        { letter: "l", answer: "licantropo", status: 0, question: "CON LA L. Hombre lobo" },
        { letter: "l", answer: "lengua", status: 0, question: "CON LA L. Órgano muscular situado en la cavidad de la boca de los vertebrados y que sirve para gustar y deglutir" },
        { letter: "l", answer: "lealtad", status: 0, question: "CON LA L. Cumplimiento de lo que exigen las leyes de la fidelidad y las del honor y hombría de bien" },
        { letter: "l", answer: "loro", status: 0, question: "CON LA L. Papagayo, ave, y más particularmente el que tiene el plumaje con fondo rojo" },
        { letter: "l", answer: "liar", status: 0, question: "CON LA L. Formar un cigarrillo envolviendo la picadura en el papel de fumar" },
    ],
    [
        { letter: "m", answer: "misantropo", status: 0, question: "CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas" },
        { letter: "m", answer: "meteorito", status: 0, question: "CON LA M. Fragmento de un cuerpo celeste que cae sobre la Tierra, o sobre un astro cualquiera" },
        { letter: "m", answer: "musculo", status: 0, question: "CON LA M. Órgano compuesto principalmente de fibras contráctiles" },
        { letter: "m", answer: "monte", status: 0, question: "CON LA M. Gran elevación natural del terreno" },
        { letter: "m", answer: "mundana", status: 0, question: "CON LA M. Dicho de una persona: Inclinada a los placeres y frivolidades de la vida social" },
    ],
    [
        { letter: "n", answer: "necedad", status: 0, question: "CON LA N. Demostración de poca inteligencia" },
        { letter: "n", answer: "nariz", status: 0, question: "CON LA N. Órgano prominente del rostro humano, entre la frente y la boca, con dos orificios" },
        { letter: "n", answer: "neandertal", status: 0, question: "CON LA N. Dicho de un individuo: De un grupo extinto de homínidos que vivió en gran parte de Europa y parte de Asia durante el Paleolítico medio" },
        { letter: "n", answer: "necio", status: 0, question: "CON LA N. Ignorante y que no sabe lo que podía o debía saber" },
        { letter: "n", answer: "no", status: 0, question: "CON LA N. Expresa negación" },
    ],
    [
        { letter: "ñ", answer: "señal", status: 0, question: "CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo." },
        { letter: "ñ", answer: "diseñar", status: 0, question: "CONTIENE LA Ñ. hacer un diseño" },
        { letter: "ñ", answer: "antaño", status: 0, question: "CONTIENE LA Ñ. En un tiempo pasado" },
        { letter: "ñ", answer: "añorar", status: 0, question: "CONTIENE LA Ñ. Recordar con pena la ausencia, privación o pérdida de alguien o algo muy querido" },
        { letter: "ñ", answer: "ñu", status: 0, question: "CONTIENE LA Ñ. Mamífero rumiante africano de la familia de los antílopes, de color pardo grisáceo, cuya cabeza recuerda la de un toro" },
    ],
    [
        { letter: "o", answer: "orco", status: 0, question: "CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien" },
        { letter: "o", answer: "orquesta", status: 0, question: "CON LA O. Conjunto de músicos que interpretan obras musicales con diversos instrumentos y bajo la guía de un director" },
        { letter: "o", answer: "orar", status: 0, question: "CON LA O. Hablar en público para persuadir y convencer a los oyentes o mover su ánimo" },
        { letter: "o", answer: "once", status: 0, question: "CON LA O. Diez más uno" },
        { letter: "o", answer: "oso", status: 0, question: "CON LA O. Mamífero carnívoro plantígrado, de gran tamaño, de pelaje pardo, largo y espeso, cabeza grande, ojos pequeños, extremidades fuertes y gruesas, con garras, y cola muy corta, que vive en los montes boscosos" },
    ],
    [
        { letter: "p", answer: "protoss", status: 0, question: "CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft" },
        { letter: "p", answer: "piña", status: 0, question: "CON LA P. Edificio en el que reside Bob Esponja" },
        { letter: "p", answer: "presa", status: 0, question: "CON LA P. Muro grueso de piedra u otro material que se construye a través de un río, arroyo o canal, para almacenar el agua a fin de derivarla o regular su curso fuera del cauce" },
        { letter: "p", answer: "peaje", status: 0, question: "CON LA P. Derecho de tránsito" },
        { letter: "p", answer: "poliglota", status: 0, question: "CON LA P. Dicho de una persona: Que habla varias lenguas" },
    ],
    [
        { letter: "q", answer: "queso", status: 0, question: "CON LA Q. Producto obtenido por la maduración de la cuajada de la leche" },
        { letter: "q", answer: "quad", status: 0, question: "CON LA Q. Vehículo todoterreno de cuatro ruedas similar a una motocicleta" },
        { letter: "q", answer: "quiste", status: 0, question: "CON LA Q. Vejiga membranosa que se desarrolla anormalmente en diferentes regiones del cuerpo y que contiene líquido o materias alteradas" },
        { letter: "q", answer: "empaquetar", status: 0, question: "CON LA Q. Hacer paquetes" },
        { letter: "q", answer: "adquirir", status: 0, question: "CON LA Q. Ganar, conseguir con el propio trabajo o industria" },
    ],
    [
        { letter: "r", answer: "raton", status: 0, question: "CON LA R. Roedor" },
        { letter: "r", answer: "remo", status: 0, question: "CON LA R. Instrumento en forma de pala larga y estrecha, que sirve para mover las embarcaciones haciendo palanca en el agua" },
        { letter: "r", answer: "robert", status: 0, question: "CON LA R. Cabeza de la casa Baratheon y Rey de los Siete Reinos hasta su muerte" },
        { letter: "r", answer: "robar", status: 0, question: "CON LA R. Quitar o tomar para sí con violencia o con fuerza lo ajeno" },
        { letter: "r", answer: "resina", status: 0, question: "CON LA R. Sustancia sólida o de consistencia pastosa, insoluble en el agua, soluble en el alcohol y en los aceites esenciales, y capaz de arder en contacto con el aire, obtenida naturalmente como producto que fluye de varias plantas" },
    ],
    [
        { letter: "s", answer: "stackoverflow", status: 0, question: "CON LA S. Comunidad salvadora de todo desarrollador informático" },
        { letter: "s", answer: "serpiente", status: 0, question: "CON LA S. Animal identificativo de la Casa Slytherin" },
        { letter: "s", answer: "sopa", status: 0, question: "CON LA S. Plato compuesto de un caldo y uno o más ingredientes sólidos cocidos en él" },
        { letter: "s", answer: "soplar", status: 0, question: "CON LA S. Despedir aire con violencia por la boca, alargando los labios un poco abiertos por su parte media" },
        { letter: "s", answer: "sentimiento", status: 0, question: "CON LA S. Hecho o efecto de sentir o sentirse" },
    ],
    [
        { letter: "t", answer: "terminator", status: 0, question: "CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984" },
        { letter: "t", answer: "tormenta", status: 0, question: "CON LA T. Perturbación atmosférica violenta acompañada de aparato eléctrico y viento fuerte, lluvia, nieve o granizo" },
        { letter: "t", answer: "tirano", status: 0, question: "CON LA T. Dicho de una persona: Que obtiene contra derecho el gobierno de un Estado, especialmente si lo rige sin justicia y a medida de su voluntad" },
        { letter: "t", answer: "tension", status: 0, question: "CON LA T. Estado de un cuerpo sometido a la acción de fuerzas opuestas que lo atraen" },
        { letter: "t", answer: "tubo", status: 0, question: "CON LA T. Pieza hueca, de forma por lo común cilíndrica y generalmente abierta por ambos extremos" },
    ],
    [
        { letter: "u", answer: "unamuno", status: 0, question: "CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914" },
        { letter: "u", answer: "untar", status: 0, question: "CON LA U. Aplicar y extender superficialmente aceite u otra materia pingüe sobre algo" },
        { letter: "u", answer: "uralita", status: 0, question: "CON LA U. Material de construcción hecho a base de cemento y de fibras, generalmente de asbesto, usado sobre todo en cubiertas y tejados" },
        { letter: "u", answer: "urticaria", status: 0, question: "CON LA U. Enfermedad eruptiva de la piel, cuyo síntoma más notable es una comezón parecida a la que producen las picaduras de la ortiga" },
        { letter: "u", answer: "unir", status: 0, question: "CON LA U. Hacer que una cosa esté al lado de otra, o en contacto con ella formando un todo" },
    ],
    [
        { letter: "v", answer: "vikingos", status: 0, question: "CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa" },
        { letter: "v", answer: "vertical", status: 0, question: "CON LA V. Dicho de una recta o de un plano: Que es perpendicular a un plano horizontal" },
        { letter: "v", answer: "vertebrado", status: 0, question: "CON LA V. Que tiene vértebras" },
        { letter: "v", answer: "vocal", status: 0, question: "CON LA V. Perteneciente o relativo a la voz" },
        { letter: "v", answer: "vertedero", status: 0, question: "CON LA V. Lugar adonde o por donde se vierte algo" },
    ],
    [
        { letter: "w", answer: "sandwich", status: 0, question: "CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso"},
        { letter: "w", answer: "walkman", status: 0, question: "CONTIENE LA W. Reproductor portátil de casetes provisto de auriculares" },
        { letter: "w", answer: "wolframio", status: 0, question: "CONTIENE LA W. ambién conocido como tungsteno,​ es un elemento químico de número atómico 74 que se encuentra en el grupo 6 de la tabla periódica de los elementos. Su símbolo es W." },
        { letter: "w", answer: "wasabi", status: 0, question: "CONTIENE LA W.  Pasta de color verde y picante que se sirve para acompañar delicias como el sushi o el sashimi" },
        { letter: "w", answer: "weber", status: 0, question: "CONTIENE LA W. Unidad de flujo magnético del sistema internacional, equivalente al flujo magnético que, al atravesar un circuito de una sola espira, símboo wb" },
    ],
    [
        { letter: "x", answer: "botox", status: 0, question: "CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética" },
        { letter: "x", answer: "xenofoba", status: 0, question: "CONTIENE LA X. Dicho de una persona: Que siente o manifiesta xenofobia" },
        { letter: "x", answer: "mexico", status: 0, question: "CONTIENE LA X. País de América ubicado en la parte meridional de América del Norte" },
        { letter: "x", answer: "xenon", status: 0, question: "CONTIENE LA X. Elemento químico o cuerpo simple, gaseoso, incoloro e inodoro, encontrado en el aire" },
        { letter: "x", answer: "silofono", status: 0, question: "CONTIENE LA X. Instrumento músico compuesto de láminas de madera, sostenidas por hilos de seda o cuerda de tripa, de espesor y longitud tales que, golpeados con un martillo dan notas diferentes" },
    ],
    [
        { letter: "y", answer: "peyote", status: 0, question: "CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos"},
        { letter: "y", answer: "yate", status: 0, question: "CONTIENE LA Y. Embarcación de gala o de recreo"},
        { letter: "y", answer: "ayahuasca", status: 0, question: "CONTIENE LA Y. Liana de la selva de cuyas hojas se prepara un brebaje de efectos alucinógenos, empleado por chamanes con fines curativos"},
        { letter: "y", answer: "yihad", status: 0, question: "CONTIENE LA Y. Guerra santa de los musulmanes"},
        { letter: "y", answer: "yacare", status: 0, question: "CONTIENE LA Y. Caimán"},
    ],
    [
        { letter: "z", answer: "zen", status: 0, question: "CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional"},
        { letter: "z", answer: "zoo", status: 0, question: "CON LA Z. Parque zoológico"},
        { letter: "z", answer: "zapato", status: 0, question: "CON LA Z. Calzado que no pasa del tobillo, con la parte inferior de suela y lo demás de piel"},
        { letter: "z", answer: "zorro", status: 0, question: "CON LA Z. Mamífero cánido de menos de un metro de longitud, incluida la cola, de hocico alargado y orejas empinadas, pelaje de color pardo rojizo y muy espeso"},
        { letter: "z", answer: "zocatearse", status: 0, question: "CON LA Z. Dicho de un fruto: Ponerse zocato"},
    ] 
];

function randomQ(mQ){
    randomQuestions=[]
    for (let i=0;i<mQ.length;i++){
        let rnum=Math.floor(Math.random()*(5))
        randomQuestions.push(mQ[i][rnum])
    }
    return randomQuestions
}
//definir preguntas para la partida
let questions = randomQ(multiplesQuestions)

let index = 0
let letter = document.getElementById(questions[index].letter)

//pintar letra seleccionada
function selectedletter(l){
    l.style.backgroundColor = 'blue'
}

//pintar respuesta correcta
function rAnswer(l){
    l.style.backgroundColor = 'green'
}

//pintar respuesta incorrecta
function wAnswer(l){
    l.style.backgroundColor = 'red'
}

//pintar respuesta normal
function nAnswer(l){
    l.style.backgroundColor= '#76daf8'
}

//contador de puntos final
function points(p){
    points=0
    for (let i=0; i < p.length;  i++){
        points+=p[i].status
    }
    return points
}
//funcion para pasar al siguiente indice saltando respuesta falsas
function nextIndex(p,n){
    if (n === 26){
        n = 0
        if (p[n].status !== 0){
            return nextIndex(p,n)
        }
        return n
    }else if (p[n+1].status !== 0 && n+1<26) {
        n++
        return nextIndex(p,n)
    } else{
        n++
        return n
    }
}
//funcion que verifica que todo a sido completado
function completed(p){
    counter=0
    for (let i=0;i<p.length;i++){
        if (p[i].status !== 0){
            counter++
        }
    }
    return counter!==27
}

//funciones relacionadas con eventos
let responder = function(event){
    if (respuesta.value.toLowerCase() === questions[index].answer){
        questions[index].status=1
        rAnswer(letter)
        feedback.innerHTML = 'Correcto!'
        nextquestion(questions,index)
        letter = document.getElementById(questions[index].letter)
        selectedletter(l)
    }else if (respuesta.value.toLowerCase() !== questions[index].answer){
        questions[index].status=-1
        wAnswer(letter)
        feedback.innerHTML = 'Incorrecto! La respuesta correcta es ' + questions[index].answer + '.'
        nextquestion(questions,index)
        letter = document.getElementById(questions[index].letter)
        selectedletter(letter)
    } else if (answer.value.toLowerCase() === 'pasapalabra'){
        questions[index].status=0
        feedback.innerHTML = ''
        nAnswer(letter)
        nextquestion(questions,index)
        letter = document.getElementById(questions[index].letter)
        selectedletter(letter)
    }
}
let pasarpalabra = function(event){
    nAnswer(letter)
    feedback.innerHTML = ''
    nextquestion(questions,index)
    letter = document.getElementById(questions[index].letter)
    selectedletter(letter)
}
function nextquestion(q,i){
    if (completed(questions)){
        index = nextIndex(q,i)
        display.innerHTML = questions[index].question
        respuesta.value = ''
    }
    else {
        display.innerHTML = 'Felicidades! tu puntuacion es ' + points(q) + 'puntos!'
    }
    
}

//poner en relacion clicks
sendB.onclick = responder
pasapalabraB.onclick = pasarpalabra

buttons.addEventListener('click', e => {
    if (e.target.matches('button') || e.target.matches('input')) { 
        const key=e.target
        const action = key.dataset.action
        const previousKeyType = pasapalabra.dataset.previousKeyType
        if (action === 'start'){
            pasapalabra.dataset.previousKeyType = 'start'
            apear()
            display.innerHTML = questions[index].question
            selectedletter(letter)
        }if (action === "end"){
            pasapalabra.dataset.previousKeyType = 'end'
            disapear()
            }
        }
})

