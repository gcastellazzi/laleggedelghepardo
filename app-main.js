const STORAGE_KEY = "tommy-read-results-v2";
const LAST_READER_KEY = "tommy-read-last-reader";
const VISUAL_SETTINGS_KEY = "tommy-read-visual-settings";
const LENGTH_SETTINGS_KEY = "tommy-read-length-settings";
const TEXT_READ_COUNTS_KEY = "tommy-read-text-read-counts-v1";
const READER_PROGRESS_KEY = "tommy-read-reader-progress-v1";
const DEFAULT_WORD_COUNT_OPTIONS = [100, 150, 200];
let rewardAudioContext = null;

const exercises = [
  {
    id: "ca-co-cu-cia-cio-ciu",
    name: "CA CO CU CIA CIO CIU",
    label: "Suoni C - CA CO CU, CIA CIO CIU",
    texts: [
      {
        title: "La cucina di Cico",
        text: [
          "Cico aveva una cucina piccola ma colorata, con cucchiai appesi, coperchi lucidi e una cassetta piena di carote.",
          "Ogni mattina controllava il cortile, cercava il cane Cuccio e salutava Lucia con un ciao gentile.",
          "Quel giorno voleva cucinare una zuppa calda per la classe, cosi prese ceci, cavolo, cipolle dolci e una focaccia croccante.",
          "Camilla contava i cucchiai, Cecilia puliva le tazze e Marco correva a chiamare gli amici.",
          "Sul tavolo c'erano una ciotola celeste, un coltello corto e un cestino con cacao e ciambelle.",
          "Cuccio annusava tutto con calma, poi si accucciava vicino al camino come un custode curioso.",
          "Quando la zuppa comincio a bollire, Cico chiese a tutti di leggere la ricetta una parola alla volta.",
          "Cacio, cuci, ciuco e ciambella sembravano parole buffe, ma ogni bambino provava a dirle senza fretta.",
          "Lucia sbaglio coperchio e disse copertina, allora rise e riparti piano dalla parola giusta.",
          "La cucina profumava di casa, di cura e di compagnia.",
          "Alla fine Cico porto la zuppa nel cortile, mise le ciotole in cerchio e invito tutti a sedersi.",
          "Ogni cucchiaio era caldo, ogni sorriso era sincero, e anche Cuccio ricevette un piccolo pezzo di focaccia.",
          "Camilla disse che leggere una ricetta era come seguire una strada: bisogna guardare bene ogni segnale.",
          "Cico annui, pulendo il tavolo con un panno pulito.",
          "Poi preparo cartoncini con parole nuove: casa, coda, cura, ciao, ciuco, cacao, cucina, ciotola, cucchiaio e cancello.",
          "I bambini le lessero insieme, prima lentamente e poi con piu coraggio.",
          "Da quel giorno, ogni venerdi, la cucina di Cico divento una piccola scuola di parole, profumi e risate."
        ].join(" ")
      },
      {
        title: "Il cucciolo curioso",
        text: [
          "Il cucciolo Cuci viveva vicino a un cancello verde, in una casa con il cortile pieno di corde, cuscini e palline.",
          "Era curioso di tutto: correva dietro alle cicale, cercava conchiglie nel vaso della nonna e controllava ogni cestino.",
          "Una mattina trovo una mappa colorata sotto un cuscino blu.",
          "Sulla carta c'erano una collina, una cascina, un piccolo campo e una cuccia disegnata con cura.",
          "Cuci prese la mappa con la bocca e corse da Lucia, che stava cucendo una toppa sul cappotto.",
          "Lucia lesse le parole piano: cammina, cerca, conta, ascolta.",
          "Poi chiamo Carlo e Camilla per partire insieme.",
          "Prima tappa: il campo dei cavoli, dove contarono cinque coccinelle su una foglia.",
          "Seconda tappa: la casetta dei conigli, dove Cuci saluto un coniglio con un buffo ciao.",
          "Terza tappa: il cancello antico, chiuso con una catenella corta.",
          "Carlo cerco una chiave ma trovo solo un cucchiaio.",
          "Camilla invece vide una coccinella ferma su una ciotola rossa.",
          "Sotto la ciotola c'era un biglietto con scritto: la sorpresa e' vicina alla cuccia.",
          "Tutti corsero indietro ridendo.",
          "Dentro la cuccia trovarono un sacchetto di biscotti, una palla color crema e una coperta calda.",
          "Cuci scodinzolo cosi forte che fece cadere un cuscino.",
          "Lucia disse che la vera sorpresa era aver letto la mappa insieme.",
          "Carlo aggiunse che ogni parola era stata un passo, e ogni passo aveva portato a qualcosa di bello.",
          "Da allora Cuci ascolta quando i bambini leggono, perche sa che le parole possono aprire cancelli, cucce e avventure."
        ].join(" ")
      },
      {
        title: "Il castello di Carlotta",
        text: [
          "Carlotta viveva in un castello piccolo, con un cortile pieno di carote, cuscini colorati e una cuccia per il cane Ciuffo.",
          "Ogni mattina diceva ciao al cuoco Carlo, che cucinava cioccolata calda e focacce croccanti.",
          "Quel giorno Carlotta voleva preparare una crostata con cura, così prese una ciotola, un cucchiaio e un cesto di ciliegie.",
          "Nel cortile camminava una coccinella curiosa, vicino a una carriola carica di sassi.",
          "Carlotta contò cinque carote, quattro cucchiai e una caraffa con acqua fresca.",
          "Il cuoco le insegnò a leggere la ricetta una parola alla volta, senza correre.",
          "Lesse piano: cuoci, cuci, ciuco, cioccolata, ciuffo e cucù.",
          "Quando sbagliava non si arrabbiava: respirava e ricominciava dalla parola giusta.",
          "Ciuffo abbaiava contento e correva intorno al cancello come un piccolo custode.",
          "A mezzogiorno la crostata era pronta, calda e profumata.",
          "Carlotta la portò nel cortile, mise le ciotole in cerchio e chiamò gli amici.",
          "Tutti mangiarono con gioia, e anche Ciuffo ebbe un piccolo pezzo di focaccia.",
          "Camilla disse che leggere una ricetta è come salire le scale del castello: un gradino alla volta si arriva in cima.",
          "Carlotta annuì, perché aveva capito che la calma è la sua arma più forte.",
          "Da quel giorno, ogni domenica, il castello di Carlotta diventò una piccola scuola di parole, cucina e coraggio."
        ].join(" ")
      }
    ]
  },
  {
    id: "ci-ce-gi-ge-chi-che-ghi-ghe",
    name: "CI CE GI GE, CHI CHE GHI GHE",
    label: "Suoni C/G - CI CE GI GE, CHI CHE GHI GHE",
    texts: [
      {
        title: "Gigi e il ghiaccio",
        text: [
          "Gigi abitava in una casa vicino al gelataio Giorgio, che ogni estate preparava ghiaccioli, gelati e granite leggere.",
          "Un giorno Giorgio chiese aiuto per una festa in piazza.",
          "C'erano bicchieri da lavare, ciliegie da scegliere, pesche da tagliare e ghiaccio da mettere nelle caraffe.",
          "Gigi prese un grembiule grande e chiamo Cecilia, Michele e Margherita.",
          "Cecilia leggeva la lista con voce chiara: dieci ghiaccioli gialli, cinque gelati alla pesca, cento cucchiaini.",
          "Michele controllava che ogni parola fosse capita, perche confondere ci e chi cambiava il senso delle cose.",
          "Quando lesse ciliegia, Gigi penso a una chiave e mise una chiave vera sul tavolo.",
          "Tutti risero, poi Cecilia spiego con calma la differenza.",
          "La festa comincio al tramonto.",
          "I bambini si misero in fila vicino al banco e Giorgio chiese a Gigi di leggere i cartelli.",
          "Gelato, ghiaccio, cioccolato, pesche, ciliegie, cialde e cucchiaini: ogni parola usciva piu sicura della precedente.",
          "A un certo punto una caraffa cadde e il ghiaccio rotolo sotto una sedia.",
          "Michele non si agito, prese una cesta e raccolse tutto.",
          "Margherita preparo un cartello nuovo: chi legge piano legge meglio.",
          "Quella frase piacque a tutti.",
          "Gigi capi che non serviva correre, serviva guardare bene le lettere e ascoltare il suono.",
          "Quando la piazza si riempi di musica, Giorgio regalo ai bambini un ghiacciolo ciascuno.",
          "Gigi scelse quello al limone, Cecilia quello alla ciliegia e Michele quello al cioccolato.",
          "Poi lessero ancora i cartelli, come un gioco gentile sotto le luci della festa."
        ].join(" ")
      },
      {
        title: "La chiave nel cesto",
        text: [
          "Chiara aveva una chiave piccola, lucida e importante: apriva il cancello del giardino delle pesche.",
          "Ogni mercoledi portava li i compagni per leggere all'ombra dei ciliegi.",
          "Quel giorno pero la chiave cadde dentro un grande cesto pieno di fichi, foglie, conchiglie e giochi.",
          "Chiara si mise a cercare, ma ogni oggetto sembrava nascondere la chiave meglio di prima.",
          "Giorgio propose di leggere le etichette una alla volta.",
          "Cecilia prese il primo cartoncino e disse: conchiglie.",
          "Michele lesse il secondo: fichi secchi.",
          "Ginevra lesse il terzo: cinque giochi gialli.",
          "Ogni parola aiutava a svuotare il cesto con ordine.",
          "Sotto un gomitolo grigio trovarono un biglietto: chi cerca con calma trova cio che serve.",
          "La frase era lunga, ma Chiara la divise in pezzetti e la lesse senza paura.",
          "Quando arrivo alla parola cerca, vide un luccichio vicino a una pesca.",
          "Era la chiave.",
          "I bambini applaudirono, poi aprirono il cancello e entrarono nel giardino.",
          "Sotto il ciliegio grande c'erano sedie basse, libri leggeri e una tovaglia con gocce di sole.",
          "Giorgio lesse una storia di giganti gentili.",
          "Cecilia lesse una poesia sulle ghiande.",
          "Chiara lesse il cartello del cancello: chiudi bene quando esci.",
          "Alla fine mise la chiave in una tasca con cerniera.",
          "Da quel giorno il cesto rimase nella classe come gioco di lettura, pieno di parole difficili ma amiche."
        ].join(" ")
      },
      {
        title: "Il ghiro Chicco e la cesta",
        text: [
          "Il ghiro Chicco viveva vicino a una chiesa antica, in un nido caldo tra le ghiande e le foglie.",
          "Era gentile con tutti e ogni sera contava le stelle insieme al gheppio Gigi.",
          "Un giorno trovò una cesta dimenticata sotto un ciliegio carico di ciliegie mature.",
          "Dentro la cesta c'erano una chiave lucida, cinque biglietti e un ghiacciolo che non si scioglieva mai.",
          "Chicco chiamò gli amici: il cinghiale Gennaro, la ghiandaia Chiara e il riccio Cesare.",
          "Insieme lessero i biglietti, uno alla volta, con calma.",
          "Il primo diceva: cerca vicino al ghiaccio.",
          "Il secondo: gira intorno alla chiesa.",
          "Il terzo: chi legge piano legge meglio.",
          "Gli amici risero, perché era proprio vero.",
          "Chiara spiegò la differenza tra ci e chi, tra ge e ghe, e tutti provarono a leggere senza fretta.",
          "Gennaro disse gelato invece di ghiacciolo e scoppiò a ridere.",
          "Chicco non lo prese in giro: gli mostrò le lettere e lo aiutò a correggere.",
          "Quando arrivarono all'ultimo biglietto, trovarono una piccola ghirlanda di fiori e un cesto di noci.",
          "Era il regalo di chi aveva nascosto la cesta tanto tempo prima.",
          "Gli amici festeggiarono sotto il ciliegio, mangiando ciliegie e leggendo ancora.",
          "Chicco capì che le parole difficili diventano amiche quando le leggi con coraggio e gentilezza."
        ].join(" ")
      }
    ]
  },
  {
    id: "gn",
    name: "GN",
    label: "Digramma GN - gnomo, pigna, ragno",
    texts: [
      {
        title: "Lo gnomo nel giardino",
        text: [
          "Nel giardino di Agnese viveva uno gnomo minuscolo, con un cappello verde e una lanterna di legno.",
          "Nessuno lo vedeva di giorno, perche dormiva sotto una pigna grande vicino allo stagno.",
          "Di sera usciva piano, bagnava i gerani, raccoglieva castagne e controllava che ogni ragno avesse la sua ragnatela.",
          "Agnese lo scopri una notte di giugno, quando senti un piccolo starnuto dietro il mughetto.",
          "Lo gnomo si chiamava Gnecco e parlava con voce gentile.",
          "Disse che aveva perso il suo quaderno dei segni, un quaderno pieno di parole con gn.",
          "Agnese prese una torcia e lo aiuto a cercare.",
          "Guardarono sotto la legna, vicino alla lavagna vecchia, accanto al disegno della montagna e dentro un cestino di spugne.",
          "Ogni volta che trovavano una parola, Agnese la leggeva: gnomo, pigna, ragno, stagno, lasagna, montagna.",
          "Gnecco batteva le mani piano, contento di sentire quel suono morbido.",
          "Dopo molti passi trovarono il quaderno sotto una foglia bagnata.",
          "La copertina era umida, ma le parole si leggevano ancora bene.",
          "Per ringraziare Agnese, lo gnomo le dono un segnalibro con una piccola pigna disegnata.",
          "Il giorno dopo, a scuola, Agnese racconto la storia senza dire dove viveva Gnecco.",
          "La maestra preparo una lista di parole con gn e tutti lessero a turno.",
          "Agnese sorrise, perche ogni parola le ricordava il giardino, lo stagno e il suo nuovo amico segreto."
        ].join(" ")
      },
      {
        title: "La lasagna della nonna",
        text: [
          "La nonna di Stefano preparava la lasagna ogni domenica, ma quella volta voleva far leggere la ricetta ai nipoti.",
          "Sul tavolo mise una tovaglia a quadri, una lavagna piccola e una cesta con pigne profumate.",
          "Stefano lesse il titolo: lasagna della nonna.",
          "Agnese lesse gli ingredienti: sfoglia, sugo, formaggio, basilico e un pizzico di pazienza.",
          "Il gatto sonnecchiava vicino alla legna, mentre il forno diventava caldo.",
          "La nonna spiegava che ogni ricetta ha un ordine, proprio come una storia.",
          "Prima si guarda, poi si legge, poi si prova.",
          "Stefano sbaglio la parola gnocchi e disse nocchi.",
          "La nonna non lo fermo con fretta: indico le lettere gn e fece ripetere il suono piano.",
          "Agnese trovo altre parole in cucina: spugna, ragno finto, pigna, disegno, compagna.",
          "Le scrisse sulla lavagna e tutti le lessero prima piano, poi con ritmo.",
          "Quando la lasagna entro nel forno, la casa si riempi di un profumo buonissimo.",
          "I bambini apparecchiarono e misero un cartoncino vicino a ogni piatto.",
          "Su ogni cartoncino c'era una parola con gn da leggere prima di mangiare.",
          "Il nonno lesse montagna, Stefano lesse compagno, Agnese lesse sogno.",
          "La nonna lesse impegno e disse che quella era la parola piu importante.",
          "Dopo pranzo, Stefano copio la ricetta nel suo quaderno.",
          "Scrisse piano, con lettere grandi, e aggiunse un disegno della teglia.",
          "Quel giorno capi che leggere bene puo profumare di casa, forno caldo e famiglia."
        ].join(" ")
      },
      {
        title: "Il ragno Ninni e la castagna",
        text: [
          "Il ragno Ninni viveva in una vigna, tra foglie larghe, grappoli dolci e un piccolo stagno.",
          "Ogni mattina tesseva la sua ragnatela vicino a un castagno carico di castagne.",
          "Era amico di un agnello gentile e di una compagna lumaca chiamata Stella.",
          "Un giorno, sopra una foglia, Ninni trovò un disegno strano fatto con il carbone.",
          "Sembrava una montagna con un segno misterioso in cima.",
          "Ninni chiamò l'insegnante del bosco, un vecchio gufo che conosceva ogni parola con gn.",
          "Il gufo lesse piano: gnomo, sogno, legno, bagno, lasagna, montagna.",
          "Poi spiegò che la g e la n insieme fanno un suono morbido, come un sussurro.",
          "Stella provò a leggere e disse nocchi invece di gnocchi.",
          "Il gufo non rise: indicò le lettere gn e fece ripetere il suono con calma.",
          "Ninni scrisse altre parole su una lavagna di corteccia: ragno, castagna, spugna, compagno, disegno.",
          "L'agnello le lesse tutte, prima lentamente e poi con più sicurezza.",
          "Seguendo il disegno, gli amici salirono verso la montagna.",
          "In cima trovarono una piccola cuccagna: castagne arrostite, miele e un nido di legno caldo.",
          "Era il regalo di uno gnomo gentile che amava chi legge con impegno.",
          "Quella sera, vicino allo stagno, ognuno raccontò un sogno.",
          "Ninni capì che leggere bene è come tessere una tela: un filo alla volta, con pazienza."
        ].join(" ")
      }
    ]
  },
  {
    id: "storie-curiosita",
    name: "Storie e curiosita'",
    label: "Lettura libera - storie e curiosita'",
    texts: [
      {
        title: "Il viaggio tra i pianeti",
        text: [
          "Una sera Leo guardo il cielo dal balcone e vide una luce brillante vicino alla Luna.",
          "Il nonno gli disse che nello spazio ci sono pianeti grandi, piccoli, freddi, caldi e molto lontani.",
          "Leo chiuse gli occhi e immagino di salire su una piccola astronave rossa.",
          "La prima tappa fu Mercurio, vicino al Sole, dove il terreno sembrava una distesa di sassi caldi.",
          "Poi arrivo su Venere, coperta da nubi fitte, luminose e misteriose.",
          "La Terra apparve azzurra, con mari, montagne, nuvole e citta illuminate come puntini.",
          "Marte era rosso e polveroso, pieno di canyon, rocce e colline silenziose.",
          "Leo vide poi Giove, enorme, con grandi strisce colorate e una macchia grande come una tempesta.",
          "Saturno aveva anelli larghi e chiari, fatti di ghiaccio e polvere.",
          "Urano girava inclinato, come se stesse rotolando nello spazio.",
          "Nettuno era blu, lontano e ventoso, quasi un sogno alla fine del viaggio.",
          "Il nonno spiego che i pianeti girano intorno al Sole seguendo strade invisibili chiamate orbite.",
          "Leo penso che ogni pianeta fosse come una pagina diversa di un libro gigantesco.",
          "Al mattino disegno il sistema solare su un foglio, con il Sole al centro e i pianeti in fila.",
          "Scrisse i nomi con lettere grandi e li lesse piano, uno dopo l'altro.",
          "Capire lo spazio non era facile, ma leggere quei nomi lo faceva sentire un vero esploratore."
        ].join(" ")
      },
      {
        title: "La squadra dei campioni",
        text: [
          "Nel cortile della scuola, Matteo e i suoi amici inventarono una partita speciale.",
          "Ognuno doveva scegliere un modo di giocare ispirato a un calciatore famoso.",
          "Paolo ammirava Ronaldo per la potenza del tiro, la concentrazione e la voglia di allenarsi.",
          "Sara pensava a Neymar quando provava finte leggere, cambi di direzione e dribbling divertenti.",
          "Luca correva veloce come Mbappe, scattando sulla fascia e guardando sempre la porta.",
          "Gioia parlava di Lamine, giovane, rapido e coraggioso, capace di provare una giocata anche quando sembrava difficile.",
          "La maestra pero disse che una squadra non vive solo di nomi famosi.",
          "Serve passare la palla, ascoltare i compagni, rialzarsi dopo un errore e rispettare chi gioca dall'altra parte.",
          "Allora i bambini decisero di creare una squadra immaginaria chiamata Stelle del Cortile.",
          "Ogni giocatore aveva un talento diverso: chi correva, chi difendeva, chi leggeva bene il gioco, chi incoraggiava gli altri.",
          "Durante la partita Matteo sbaglio un tiro facile e si arrabbio.",
          "Sara gli disse che anche i campioni sbagliano, ma poi respirano e riprovano.",
          "Alla fine nessuno ricordo il risultato esatto.",
          "Ricordarono invece un passaggio preciso, un applauso gentile, una risata dopo una caduta e un gol costruito insieme.",
          "Matteo capi che i grandi calciatori possono ispirare, ma la cosa piu bella e' giocare con impegno, fantasia e amicizia."
        ].join(" ")
      },
      {
        title: "Mondiale immaginario: Portogallo contro Francia",
        text: [
          "Lo stadio era pieno di bandiere rosse, verdi, blu e bianche, e il pubblico cantava prima del fischio iniziale.",
          "Portogallo e Francia entravano in campo per una partita immaginaria dei mondiali, raccontata come una grande avventura sportiva.",
          "Ronaldo guidava il Portogallo con passi decisi, mentre Mbappe guardava lo spazio davanti a se con gli occhi di chi vuole partire veloce.",
          "Nei primi minuti la Francia teneva palla con calma, cercando passaggi corti e precisi.",
          "Il Portogallo aspettava, chiudeva gli spazi e ripartiva appena trovava un corridoio libero.",
          "Al dodicesimo minuto Mbappe scatto sulla sinistra, supero un difensore e mise un cross basso in area.",
          "Il portiere portoghese usci in tuffo e blocco il pallone tra gli applausi.",
          "Poco dopo Ronaldo ricevette al limite dell'area, controllo di petto e tiro forte verso l'angolo.",
          "Il portiere francese respinse con la punta delle dita, mandando la palla sopra la traversa.",
          "La partita divento piu intensa: un contrasto, una rimessa, un passaggio filtrante, un tiro murato.",
          "Nel secondo tempo la Francia segno con una ripartenza velocissima: Mbappe entro in area e appoggio la palla in rete.",
          "Il Portogallo non si arrese.",
          "A dieci minuti dalla fine, Ronaldo salto piu in alto di tutti su un calcio d'angolo e pareggio con un colpo di testa.",
          "Gli ultimi minuti furono pieni di emozioni, ma nessuno riusci a segnare ancora.",
          "Quando l'arbitro fischio, i giocatori si strinsero la mano.",
          "Il pubblico capi che una grande partita non e' fatta solo dal risultato, ma dal coraggio, dal rispetto e dai momenti che restano nella memoria."
        ].join(" ")
      },
      {
        title: "Mondiale immaginario: Portogallo contro Brasile",
        text: [
          "Portogallo contro Brasile sembrava una festa prima ancora di cominciare.",
          "Sugli spalti c'erano tamburi, sciarpe, maglie colorate e bambini che aspettavano una giocata speciale.",
          "Da una parte Ronaldo voleva guidare il Portogallo con esperienza, dall'altra Neymar cercava fantasia tra le linee.",
          "Il Brasile parti con passaggi rapidi, quasi una danza sul prato verde.",
          "Neymar ricevette vicino alla fascia, fece una finta, poi un tocco morbido per un compagno che entrava in area.",
          "Il difensore portoghese arrivo in scivolata e salvo tutto.",
          "Il Portogallo rispose con ordine: palla a centrocampo, apertura a destra, cross teso e colpo di testa fuori di poco.",
          "Ronaldo alzo il pollice verso il compagno, come per dire che l'idea era giusta.",
          "A meta primo tempo il Brasile passo in vantaggio con un tiro a giro da fuori area.",
          "Il pallone sembrava uscire, poi curvo all'improvviso e fini vicino al palo.",
          "Il Portogallo senti il colpo, ma non perse calma.",
          "Nel secondo tempo aumento il ritmo, recupero palla piu alto e costrinse il Brasile a difendersi.",
          "Ronaldo ricevette un passaggio lungo, proteggeva il pallone, poi servi un compagno libero al centro.",
          "Il tiro entro rasoterra e lo stadio esplose.",
          "Sul finale Neymar provo un dribbling doppio e tiro forte, ma il portiere portoghese paro con coraggio.",
          "L'ultima azione fu del Portogallo, con un calcio di punizione battuto alto sopra la barriera.",
          "Il pallone sfioro la traversa e usci.",
          "La partita fini in parita, ma tutti parlarono delle finte, delle parate e della bellezza di due squadre capaci di giocare con il cuore."
        ].join(" ")
      },
      {
        title: "Mondiale immaginario: Spagna contro Brasile",
        text: [
          "La Spagna entro in campo con l'idea di passare la palla tante volte, senza fretta, cercando il momento giusto.",
          "Il Brasile invece voleva sorprendere con fantasia, cambi di ritmo e dribbling improvvisi.",
          "Era una partita immaginaria dei mondiali, ma per i bambini sugli spalti sembrava vera come un sogno.",
          "Lamine, giovane e coraggioso, partiva largo sulla destra e chiedeva palla con la mano.",
          "Neymar si muoveva tra centrocampo e attacco, pronto a inventare una giocata diversa dalle altre.",
          "Nei primi minuti la Spagna fece girare il pallone da un lato all'altro.",
          "Un passaggio corto, un controllo, un altro passaggio: il Brasile correva e aspettava l'occasione.",
          "All'improvviso Lamine ricevette, punto il difensore, rientro sul sinistro e tiro.",
          "Il portiere brasiliano paro, ma la palla rimase in area.",
          "Un attaccante spagnolo arrivo per primo e segno il vantaggio.",
          "Il Brasile non si spavento.",
          "Neymar prese palla vicino alla linea laterale, supero due avversari e servi un compagno con un passaggio preciso.",
          "Il tiro fu respinto, ma il pubblico applaudi la giocata.",
          "Nel secondo tempo il Brasile pareggio dopo una ripartenza: tre passaggi veloci e conclusione sotto la traversa.",
          "La Spagna torno a costruire con pazienza.",
          "Lamine provo ancora una finta, poi invece di tirare passo indietro a un compagno libero.",
          "Il tiro parti forte e basso, ma il portiere si allungo e salvo il risultato.",
          "La partita fini uno a uno.",
          "Gli allenatori dissero che era stata una lezione: la tecnica serve, ma serve anche scegliere il momento giusto per usarla."
        ].join(" ")
      },
      {
        title: "Mondiale immaginario: Francia contro Brasile",
        text: [
          "Francia e Brasile si incontrarono in una sera calda, con lo stadio illuminato come un grande teatro.",
          "I tifosi aspettavano Mbappe per la velocita e Neymar per la fantasia.",
          "La partita comincio con la Francia molto aggressiva.",
          "Mbappe scatto subito dietro i difensori, ricevette un lancio lungo e arrivo davanti al portiere.",
          "Il tiro fu potente, ma il portiere brasiliano chiuse lo specchio e respinse.",
          "Il Brasile rispose con calma, facendo girare palla e cercando di abbassare il ritmo.",
          "Neymar ricevette tra due avversari, giro su se stesso e guadagno un calcio di punizione.",
          "Sul tiro da fermo la palla passo sopra la barriera e fini di poco fuori.",
          "Nel primo tempo le occasioni furono tante, ma nessuno segno.",
          "A inizio ripresa la Francia trovo il vantaggio.",
          "Un centrocampista rubo palla, servi Mbappe in profondita e lui questa volta non sbaglio.",
          "Il Brasile pero aveva ancora energia.",
          "Neymar chiamo palla, finse il passaggio, entro in area e servi un compagno sul secondo palo.",
          "Il pareggio arrivo tra le urla del pubblico.",
          "Gli ultimi venti minuti furono un continuo cambio di fronte.",
          "La Francia colpi un palo, il Brasile costrinse il portiere a una grande parata.",
          "Alla fine il risultato rimase pari.",
          "I bambini che guardavano la partita capirono che nel calcio non vince sempre chi corre di piu o chi fa la finta piu bella.",
          "Vince davvero chi sa giocare insieme, rispettare l'avversario e non smettere di provarci."
        ].join(" ")
      },
      {
        title: "Mondiale immaginario: Spagna contro Portogallo",
        text: [
          "Spagna contro Portogallo era una partita vicina, quasi una sfida tra vicini di casa.",
          "Sugli spalti le bandiere si muovevano come onde, mentre i giocatori ascoltavano gli inni con attenzione.",
          "La Spagna voleva controllare il gioco con tanti passaggi.",
          "Il Portogallo voleva colpire in fretta, usando l'esperienza di Ronaldo e la corsa degli esterni.",
          "Lamine ricevette la prima palla importante sulla fascia, provo a saltare l'uomo e conquisto un calcio d'angolo.",
          "La difesa portoghese libero di testa e parti in contropiede.",
          "Ronaldo corse verso l'area, ricevette il pallone e tiro di prima intenzione.",
          "Il portiere spagnolo paro basso, trattenendo la palla con sicurezza.",
          "La Spagna continuo a passare, cercando un piccolo spazio.",
          "Al trentesimo minuto arrivo il gol: Lamine servi un compagno con un passaggio tagliato e il tiro fini all'angolino.",
          "Il Portogallo rispose dopo l'intervallo.",
          "Un cross dalla destra arrivo preciso sulla testa di Ronaldo, che salto altissimo e pareggio.",
          "La partita divenne emozionante e un po' nervosa.",
          "Ogni errore sembrava importante, ogni controllo poteva cambiare il risultato.",
          "A cinque minuti dalla fine Lamine provo un tiro a giro, ma il pallone usci di poco.",
          "Poi Ronaldo ebbe l'ultima occasione su punizione.",
          "Il tiro supero la barriera, ma il portiere spagnolo volo e salvo.",
          "Il pareggio finale sembro giusto.",
          "I giocatori si salutarono, e il pubblico applaudi una partita piena di tecnica, coraggio e momenti da raccontare."
        ].join(" ")
      },
      {
        title: "Una giornata nell'uomo primitivo",
        text: [
          "Tanto tempo fa, prima delle citta, delle strade e delle case moderne, viveva un bambino chiamato Taro.",
          "Taro abitava con il suo gruppo vicino a una grotta, tra alberi, rocce e un fiume limpido.",
          "Al mattino si svegliava presto, perche la luce del sole entrava piano tra le pietre.",
          "Gli adulti controllavano il fuoco, molto prezioso per scaldarsi, cuocere il cibo e tenere lontani gli animali.",
          "Taro aiutava a raccogliere bacche, radici e rami secchi.",
          "Osservava le impronte nel fango e cercava di capire quale animale fosse passato durante la notte.",
          "La sua nonna conosceva molte piante e spiegava quali si potevano mangiare e quali era meglio lasciare.",
          "Un cacciatore mostrava come usare una lancia con attenzione, senza sprecare energia.",
          "Nella grotta, sulle pareti, c'erano disegni di bisonti, mani, cervi e scene di caccia.",
          "Taro amava guardare quei segni, perche raccontavano storie anche senza parole scritte.",
          "Un giorno provo a disegnare un piccolo cavallo con carbone e terra colorata.",
          "Il disegno non era perfetto, ma tutti capirono cosa voleva raccontare.",
          "La sera il gruppo si sedette vicino al fuoco.",
          "Qualcuno batteva due pietre, qualcuno ascoltava, qualcuno raccontava con gesti larghi.",
          "Taro capi che vivere nella preistoria richiedeva coraggio, collaborazione e grande attenzione alla natura.",
          "Ogni giorno era una sfida, ma anche un modo per imparare dal mondo."
        ].join(" ")
      },
      {
        title: "La ricetta dei tortellini",
        text: [
          "La nonna Rosa diceva che i tortellini non sono solo una ricetta, ma una piccola storia fatta con le mani.",
          "Un sabato mattina mise sul tavolo farina, uova, carne, mortadella, prosciutto, formaggio e noce moscata.",
          "Prima preparo la pasta fresca, rompendo le uova al centro della farina.",
          "Impasto con calma, fino a ottenere una palla liscia e gialla.",
          "Poi la copri con un panno, per farla riposare.",
          "Intanto preparo il ripieno, tritando gli ingredienti e mescolandoli con cura.",
          "Tommy osservava tutto e faceva domande.",
          "La nonna spiego che il ripieno deve essere saporito, ma non troppo forte, perche ogni sapore deve stare bene con gli altri.",
          "Quando la pasta fu pronta, la tiro sottile con il mattarello.",
          "Taglio tanti quadratini piccoli e mise al centro di ognuno una pallina di ripieno.",
          "Poi mostro il gesto piu difficile: piegare, chiudere, girare intorno al dito e unire le punte.",
          "Il primo tortellino di Tommy sembrava un cappello storto.",
          "La nonna rise con dolcezza e disse che anche i tortellini imparano a diventare belli.",
          "Dopo molti tentativi, sul vassoio c'erano file ordinate di piccoli tesori.",
          "La nonna preparo il brodo caldo e li lascio cuocere piano.",
          "A pranzo tutti assaggiarono in silenzio per un momento.",
          "Tommy capi che leggere una ricetta e seguirla passo dopo passo somiglia a leggere una storia: ogni parola porta alla successiva."
        ].join(" ")
      },
      {
        title: "Curiosita' su Bologna",
        text: [
          "Bologna e' una citta piena di portici, torri, piazze e storie nascoste.",
          "Chi cammina sotto i portici puo attraversare molte strade restando riparato dalla pioggia o dal sole.",
          "Al centro della citta ci sono le Due Torri, alte e inclinate, che sembrano salutare chi arriva da lontano.",
          "La torre degli Asinelli e' molto famosa e, salendo tanti gradini, si puo vedere Bologna dall'alto.",
          "Piazza Maggiore e' un grande spazio dove le persone si incontrano, parlano, ascoltano musica e guardano i palazzi antichi.",
          "Vicino alla piazza si trova la fontana del Nettuno, con una statua grande e potente.",
          "Bologna e' conosciuta anche per la sua universita, una delle piu antiche d'Europa.",
          "Per questo tanti studenti arrivano da molte citta e portano lingue, idee e libri.",
          "La citta e' famosa per il buon cibo: tortellini, tagliatelle, lasagne, mortadella e crescentine.",
          "Ma Bologna non e' solo cucina.",
          "Ci sono canali nascosti che ricordano un tempo in cui l'acqua era importante per il lavoro e gli scambi.",
          "In alcune vie si possono scoprire finestrelle che mostrano scorci inattesi.",
          "Bologna viene chiamata la Dotta per lo studio, la Grassa per la cucina e la Rossa per i colori dei tetti e dei muri.",
          "Un bambino che visita Bologna puo leggere la citta come un libro: ogni portico e' una riga, ogni torre una parola alta, ogni piazza un capitolo pieno di voci."
        ].join(" ")
      },
      {
        title: "Curiosità sul mare",
        text: [
          "Il mare copre gran parte della Terra ed è pieno di vita, colori e segreti.",
          "Sotto la superficie nuotano pesci di mille forme: piccoli, grandi, lucenti e curiosi.",
          "I delfini sono animali intelligenti e giocano saltando tra le onde.",
          "Le balene sono enormi, ma mangiano soprattutto creature minuscole chiamate plancton.",
          "Il polpo ha otto braccia e sa cambiare colore per nascondersi tra le rocce.",
          "Alcune meduse brillano nel buio, come piccole lanterne galleggianti.",
          "Le tartarughe marine viaggiano per migliaia di chilometri e tornano sempre sulla spiaggia dove sono nate.",
          "Negli abissi, dove la luce non arriva, vivono pesci strani che producono luce da soli.",
          "Le onde nascono dal vento e arrivano fino alla riva con un rumore costante.",
          "La sabbia è fatta di tantissimi granelli, spesso pezzetti di conchiglie e di rocce consumate dal tempo.",
          "Il sale rende l'acqua del mare diversa da quella dei fiumi.",
          "Per questo galleggiare in mare è più facile.",
          "Gli scienziati studiano il mare con barche, robot e telecamere speciali.",
          "Ogni anno scoprono nuove specie, perché gran parte degli oceani è ancora sconosciuta.",
          "Proteggere il mare è importante: non bisogna gettare plastica e rifiuti nell'acqua.",
          "Un bambino che guarda il mare può immaginare un mondo intero che respira sotto le onde.",
          "Leggere parole come delfino, balena, conchiglia e tartaruga è come tuffarsi in una grande avventura azzurra."
        ].join(" ")
      },
      {
        title: "Mondiale immaginario: Italia contro Argentina",
        text: [
          "Italia e Argentina si sfidavano in una partita immaginaria dei mondiali, raccontata come una grande festa dello sport.",
          "Lo stadio era pieno di bandiere azzurre e biancocelesti, e il pubblico cantava prima del fischio iniziale.",
          "L'Italia voleva difendere con ordine e ripartire veloce, una vecchia tradizione degli azzurri.",
          "L'Argentina cercava fantasia e passaggi corti, guidata dal talento di Messi, abile a vedere spazi invisibili.",
          "Nei primi minuti l'Italia restò compatta, chiudendo gli spazi con attenzione.",
          "Messi provò un dribbling elegante, ma un difensore azzurro arrivò in scivolata e salvò tutto.",
          "Poco dopo l'Italia ripartì in contropiede e un attaccante calciò forte verso l'angolo.",
          "Il portiere argentino respinse con una parata sicura.",
          "La partita diventò intensa: un contrasto, un passaggio filtrante, un tiro deviato in angolo.",
          "Nel secondo tempo l'Argentina passò in vantaggio con una giocata di Messi, che servì un compagno solo davanti alla porta.",
          "L'Italia non si arrese.",
          "A dieci minuti dalla fine, su un calcio d'angolo, un difensore azzurro saltò più in alto di tutti e pareggiò di testa.",
          "Gli ultimi minuti furono pieni di emozioni, ma nessuno riuscì a segnare ancora.",
          "Quando l'arbitro fischiò, i giocatori si strinsero la mano con rispetto.",
          "I bambini sugli spalti capirono che una grande partita non vive solo del risultato.",
          "Vive del coraggio, dell'amicizia e dei momenti che restano nel cuore."
        ].join(" ")
      },
      {
        title: "Il pappagallo dell'ombrellone blu",
        text: [
          "Una mattina d'estate, sulla riva del mare, c'era un grande ombrellone blu piantato vicino agli scogli.",
          "Sopra l'ombrellone era appollaiato un pappagallo di nome Paco.",
          "Aveva piume verdi, gialle e rosse e parlava sempre tantissimo.",
          "«Che bella giornata!» disse Paco guardando il mare scintillante.",
          "Sotto l'acqua nuotavano molti pesci.",
          "C'erano pesci argentati che sembravano frecce, piccoli pesci gialli e un grosso pesce blu chiamato Berto.",
          "Paco osservava tutto dall'alto.",
          "A un certo punto una folata di vento fece volare il suo cappellino.",
          "«Oh no! Il mio cappellino!» gridò il pappagallo.",
          "Il cappellino cadde proprio tra gli scogli.",
          "Paco volò in basso e cercò di recuperarlo, ma gli scogli erano pieni di fessure e non riusciva a vederlo.",
          "Allora Berto il pesce blu uscì dall'acqua con la testa.",
          "«Posso aiutarti io!» disse.",
          "Subito arrivarono anche gli altri pesci.",
          "I piccoli pesci gialli esplorarono le fessure più strette, mentre quelli argentati nuotarono veloci tutto intorno agli scogli.",
          "Finalmente uno di loro trovò il cappellino incastrato tra due rocce.",
          "«Eccolo qui!» gridò.",
          "Con una piccola onda, Berto spinse il cappellino verso la spiaggia.",
          "Paco lo afferrò al volo con il becco.",
          "«Grazie, amici pesci!» disse felice.",
          "Per festeggiare, il pappagallo raccontò ai pesci storie di foreste lontane, alberi altissimi e frutti colorati.",
          "I pesci ascoltarono incantati mentre il sole tramontava sul mare.",
          "Da quel giorno, ogni mattina, Paco si posava sul suo ombrellone blu vicino agli scogli e chiacchierava con i suoi amici pesci.",
          "E tutti insieme trascorrevano giornate piene di avventure.",
          "Fine. 🦜🏖️🐟🌊"
        ].join(" ")
      },
      {
        title: "Tommaso, papa' e il pappagallo curioso",
        text: [
          "Una mattina d'estate, Tommaso e il suo papà Giovanni andarono al mare.",
          "Piantarono un grande ombrellone blu vicino agli scogli e si sedettero ad ascoltare il rumore delle onde.",
          "Sopra l'ombrellone, però, c'era già qualcuno.",
          "Era Paco, il pappagallo chiacchierone.",
          "«Ciao!» disse Paco.",
          "«Di cosa parlate oggi?»",
          "Tommaso sorrise.",
          "«Di tante cose! A me piacciono gli animali.»",
          "«Anche a me!» rispose Paco.",
          "«Qual è il tuo animale preferito?»",
          "«Le tartarughe di terra, le lucertole, gli insetti e gli uccelli!»",
          "Proprio in quel momento, tra gli scogli, comparve una piccola lucertola.",
          "«Guarda!» disse Tommaso.",
          "La lucertola si fermò al sole e poi scomparve velocissima tra le rocce.",
          "«Le lucertole sono incredibili!» esclamò Paco.",
          "Intanto, nell'acqua limpida, nuotavano decine di pesci.",
          "Tommaso si sporse per osservarli.",
          "«Papà, secondo te dove dormono i pesci?»",
          "Giovanni ci pensò un momento.",
          "«Molti pesci non dormono come noi. Si riposano restando quasi fermi.»",
          "«Proprio come faccio io dopo pranzo!» rise Paco.",
          "Tutti scoppiarono a ridere.",
          "Dopo un po', Tommaso trovò una piuma bianca sulla spiaggia.",
          "«Di che uccello sarà?»",
          "«Bella domanda!» disse Giovanni.",
          "«Forse di un gabbiano!» suggerì Paco.",
          "Tommaso la osservò attentamente come un piccolo scienziato.",
          "A lui piaceva fare domande.",
          "Tante domande.",
          "Forse cento al giorno.",
          "Forse mille.",
          "«Papà, quante stelle ci sono nell'universo?»",
          "«Tantissime.»",
          "«Più dei granelli di sabbia?»",
          "«Probabilmente sì.»",
          "«Più delle formiche del mondo?»",
          "«Forse sì.»",
          "«Più dei pesci del mare?»",
          "«Non lo so!» ammise Giovanni ridendo.",
          "«Finalmente una domanda difficile!» disse Paco.",
          "Nel frattempo un grosso pesce blu sbucò dall'acqua.",
          "Era Berto, il loro amico.",
          "«Di cosa state parlando?»",
          "«Di animali, stelle e curiosità.»",
          "«Allora siete nel posto giusto» disse Berto.",
          "Il pomeriggio passò così: una domanda dopo l'altra.",
          "Parlarono delle rane e dei girini.",
          "Delle tartarughe.",
          "Degli uccelli migratori.",
          "Degli squali.",
          "Del mare.",
          "Delle galassie lontane.",
          "E perfino dei dinosauri.",
          "Quando il sole iniziò a tramontare, il cielo diventò arancione e rosa.",
          "Tommaso guardò l'orizzonte.",
          "«Papà, quando sarò grande vorrei continuare a scoprire cose nuove.»",
          "Giovanni gli mise una mano sulla spalla.",
          "«È il modo migliore per imparare. Non smettere mai di fare domande.»",
          "Paco batté le ali.",
          "«E se vi viene una domanda difficile, sapete sempre dove trovarmi!»",
          "«Sull'ombrellone blu?» chiese Tommaso.",
          "«No!»",
          "«Tra gli scogli?»",
          "«No!»",
          "«In mezzo ai pesci?»",
          "«Nemmeno!»",
          "Paco sorrise e strizzò un occhio.",
          "«Dentro ogni buona domanda.»",
          "Tommaso ci pensò un momento.",
          "Poi sorrise.",
          "Era stata una bellissima giornata al mare.",
          "E forse, il giorno dopo, avrebbe avuto altre cento domande da fare.",
          "Fine. 🦜🌊🐟🏖️⭐📚"
        ].join(" ")
      }
    ]
  },
  {
    id: "sc-gl-qu",
    name: "SC SCE SCI, GL, QU",
    label: "Suoni complessi - SC SCE SCI, GL, QU",
    texts: [
      {
        title: "Lo scoiattolo Scintilla",
        text: [
          "Lo scoiattolo Scintilla viveva su una quercia altissima, vicino a un ruscello d'acqua fresca.",
          "Aveva una sciarpa rossa, un quaderno di foglie e una famiglia numerosa.",
          "Ogni mattina scendeva dallo scoglio per raccogliere ghiande, nocciole e qualche biglia colorata.",
          "Un giorno trovò un foglio bagnato vicino alla soglia della sua tana.",
          "Sul foglio c'era il disegno di uno scivolo che finiva dritto nel ruscello.",
          "Scintilla chiamò il coniglio Quirino e la quaglia Stella per capire meglio.",
          "Quirino lesse piano: scendi, scegli, conosci, sciogli.",
          "La quaglia invece guardava un quadro appeso a una quercia, con quattro pesci dipinti.",
          "Insieme decisero di seguire lo scivolo fino all'acqua.",
          "Scintilla scivolò per primo, ridendo come una scimmia felice.",
          "In fondo trovarono una bottiglia di vetro con dentro un biglietto arrotolato.",
          "Il biglietto diceva: chi sa scegliere con calma trova quello che cerca.",
          "Vicino alla bottiglia c'era un cesto pieno di aglio, maglie di lana e una griglia di pane caldo.",
          "Era il regalo di una famiglia di ricci che abitava sotto lo scoglio.",
          "Tutti mangiarono insieme, vicino al ruscello, mentre l'acqua scorreva piano.",
          "Scintilla capì che i suoni difficili, come sce, sci, gli e qu, diventano facili quando li leggi con pazienza.",
          "Da quel giorno, ogni quindici giorni, gli amici si trovavano sullo scoglio per leggere e ridere insieme."
        ].join(" ")
      },
      {
        title: "Il pesce Guglielmo e la conchiglia",
        text: [
          "Il pesce Guglielmo nuotava in un mare limpido, tra scogli, alghe e conchiglie lucenti.",
          "Era curioso e gli piaceva conoscere ogni angolo dell'acqua.",
          "Un giorno vide una scia luminosa che scendeva verso il fondo.",
          "Seguì la scia con coraggio, muovendo le pinne piano piano.",
          "Tra le foglie di un'alga trovò una bottiglia chiusa con un tappo di sughero.",
          "Dentro c'era un foglio con quattro parole: scegli, sogna, sali, respira.",
          "Guglielmo non capiva, così chiamò la sua famiglia di pesci.",
          "La sorella maggiore, che sapeva leggere meglio, lesse ogni parola con calma.",
          "Poi spiegò che leggere è come nuotare: serve respirare e non avere fretta.",
          "Un granchio di nome Quinto si avvicinò con le sue chele robuste.",
          "Disse che vicino allo scoglio c'era un quadro fatto di conchiglie.",
          "Il quadro mostrava uno scivolo d'acqua che portava a una grotta segreta.",
          "Guglielmo, la sorella e Quinto seguirono il disegno con attenzione.",
          "Nella grotta trovarono perle lucide, una maglia di alghe e una quaglia di pietra scolpita.",
          "Era un tesoro lasciato da pesci antichi a chi sa leggere e ascoltare.",
          "Tutti festeggiarono tra le bolle, felici di aver risolto l'enigma.",
          "Guglielmo capì che le parole con sc, gli e qu sono come correnti: basta seguirle con calma per arrivare lontano."
        ].join(" ")
      }
    ]
  },
  {
    id: "doppie",
    name: "Consonanti doppie",
    label: "Consonanti doppie - palla, gatto, nonna",
    texts: [
      {
        title: "Il gatto Tobby e la palla rossa",
        text: [
          "Il gatto Tobby aveva il pelo morbido e una palla rossa che amava più di ogni altra cosa.",
          "Viveva con la mamma, il babbo e la nonna in una casetta con il tetto rosso.",
          "Ogni mattina la nonna gli dava un po' di latte e qualche biscotto.",
          "Un giorno la palla rotolò dentro un sacco pieno di gomitoli e cuscini.",
          "Tobby provò a prenderla, ma cadde in un cassetto pieno di penne e gomme.",
          "Allora chiamò il pappagallo Beppe, che ripeteva sempre le parole due volte.",
          "Beppe disse: palla, palla, sacco, sacco, gatto, gatto.",
          "Tobby rise, perché il pappagallo lo faceva divertire un sacco.",
          "Insieme cercarono nella nebbia del mattino, vicino al ruscello e al faggio grande.",
          "Sotto una farfalla di carta trovarono finalmente la palla rossa.",
          "Per festeggiare, la nonna preparò biscotti caldi con burro e zucchero.",
          "Arrivarono anche il fratello e la sorella di Tobby, due gattini birichini.",
          "Tutti giocarono nel prato, correndo come cavalli felici.",
          "All'improvviso cominciò una pioggia leggera e tornarono di corsa sotto il tetto.",
          "Sul cuscino caldo, vicino al camino, Tobby si addormentò stringendo la palla.",
          "Nel sogno vide un coccodrillo gentile che gli regalava un sacco di formaggio.",
          "Quando si svegliò, capì che le parole con due lettere uguali, come palla, gatto e nonna, sono come abbracci: forti e doppi."
        ].join(" ")
      },
      {
        title: "La bottega del nonno Peppe",
        text: [
          "Il nonno Peppe aveva una bottega piccola, piena di attrezzi, barattoli e sacchi di stoffa.",
          "Sulla porta c'era un cartello con scritto: qui si aggiusta tutto, con pazienza e passione.",
          "Ogni giorno arrivavano bambini con giocattoli rotti: macchinine, bambole e palloni sgonfi.",
          "Il nonno usava un martello, un cacciavite e tanta calma.",
          "Quando un giocattolo era troppo difficile, non si arrabbiava mai.",
          "Diceva sempre che gli sbagli aiutano a imparare, come quando si legge una parola nuova.",
          "Un giorno arrivò Bobby con un trenino senza ruote e gli occhi pieni di lacrime.",
          "Il nonno gli mostrò una scatola con bulloni, molle e rotelle lucenti.",
          "Insieme scelsero i pezzi giusti e rimisero le ruote al trenino.",
          "Bobby leggeva le etichette ad alta voce: ferro, gomma, legno, ottone.",
          "Il nonno lo correggeva con dolcezza, facendogli ripetere le parole con le doppie.",
          "Disse che palla ha due elle e gatto due ti, come due amici vicini.",
          "Quando il trenino fu pronto, fischiò felice sulle rotaie del tavolo.",
          "Bobby applaudì e abbracciò il nonno, ringraziandolo tantissimo.",
          "Per festeggiare, mangiarono insieme due fette di torta con la marmellata.",
          "La bottega si riempì di risate, profumo di colla e di legno.",
          "Bobby capì che aggiustare un giocattolo e leggere una parola sono simili: servono attenzione, mani ferme e tanto cuore."
        ].join(" ")
      }
    ]
  },
  {
    id: "accenti",
    name: "Accenti e parole tronche",
    label: "Accenti e parole tronche - citta', perche', caffe'",
    texts: [
      {
        title: "Il viaggio di papà in città",
        text: [
          "Lunedì mattina papà disse: oggi andiamo in città, perché c'è una grande festa.",
          "Caterina era già pronta, con lo zaino e un sorriso più largo del solito.",
          "Salirono sull'autobus e guardarono fuori dal finestrino con curiosità.",
          "La città era piena di luci, negozi e persone che camminavano in fretta.",
          "Papà comprò un caffè per sé e una spremuta per Caterina.",
          "Poi si sedettero su una panchina vicino a una fontana che faceva tanta schiuma.",
          "Caterina chiese perché alcune parole hanno un piccolo segno sopra l'ultima vocale.",
          "Papà spiegò che quel segno è l'accento e dice alla voce dove appoggiarsi con forza.",
          "Lesse insieme a lei: città, però, perché, caffè, virtù.",
          "Spiegò che papà, lunedì e così finiscono con l'accento, perché la voce sale proprio alla fine.",
          "Caterina provò a leggerle, prima piano e poi con più sicurezza.",
          "Ogni volta che indovinava l'accento, papà le faceva l'occhiolino.",
          "Nel pomeriggio videro un colibrì in una gabbietta e un grande falò disegnato su un cartellone.",
          "Caterina rise, perché anche colibrì e falò avevano l'accento sull'ultima sillaba.",
          "Tornarono a casa stanchi ma felici, parlando di tutte le parole nuove.",
          "La sera, sul comò, Caterina mise un foglietto con le sue parole accentate preferite.",
          "Capì che l'accento è come una piccola spinta: dice alla voce di battere più forte sul finale.",
          "Da quel giorno, ogni lunedì, papà e Caterina leggevano insieme una nuova parola con l'accento."
        ].join(" ")
      },
      {
        title: "Il caffè della civetta",
        text: [
          "In fondo al bosco c'era un piccolo caffè gestito da una civetta gentile di nome Virtù.",
          "Ogni sera gli animali arrivavano lì per bere una tisana e raccontarsi la giornata.",
          "Il martedì veniva il riccio, il giovedì la lepre, e la domenica arrivava perfino il gufo più anziano.",
          "Virtù serviva tè caldo, biscotti e una fetta di torta al miele.",
          "Sul muro aveva appeso un cartello con tante parole speciali, tutte con l'accento.",
          "C'era scritto: città, perché, però, caffè, papà, lunedì, virtù, già, più.",
          "Ogni cliente, prima di sedersi, doveva leggere una parola ad alta voce.",
          "La lepre lesse perché e batté forte la voce sulla fine, proprio dove c'era l'accento.",
          "Il riccio provò caffè e rise, perché gli sembrava di starnutire.",
          "Virtù spiegò con calma che l'accento dice dove la voce deve salire.",
          "Disse che senza accento però diventa pero, l'albero delle pere, e il senso cambia.",
          "Gli animali capirono che un piccolo segno può cambiare tutta una parola.",
          "Quella sera lessero insieme una filastrocca piena di parole tronche.",
          "Ognuno provò a indovinare dove cadeva la voce, ridendo degli errori.",
          "Alla fine la civetta regalò a tutti un segnalibro con una parola accentata diversa.",
          "Il gufo ricevette virtù, la lepre ricevette città, il riccio ricevette papà.",
          "Tornarono a casa felici, ripetendo piano le loro parole sotto la luna."
        ].join(" ")
      }
    ]
  },
  {
    id: "lettere-simili",
    name: "Lettere che si confondono (b d p q)",
    label: "Lettere simili - b, d, p, q",
    texts: [
      {
        title: "Bobo, Dado e il baule",
        text: [
          "Bobo e Dado erano due amici che amavano disegnare su un grande quaderno.",
          "Bobo preferiva la lettera B di barca, banco e bandiera.",
          "Dado invece amava la D di dado, dito e dottore.",
          "Un giorno trovarono un baule di legno vicino a una quercia.",
          "Sul baule c'era un cartello con quattro parole: porta, palla, quadro, dado.",
          "Bobo provò ad aprirlo, ma la serratura era dura come un sasso.",
          "Dado disse di leggere bene ogni parola, perché qualcosa poteva nascondersi nelle lettere.",
          "Notarono che la b e la d si somigliano, ma guardano da parti diverse.",
          "La p e la q invece scendono sotto la riga, come due gemelli capovolti.",
          "Per non confonderle, Bobo immaginò la b con la pancia davanti e la d con la pancia dietro.",
          "Dado pensò alla p di piede e alla q di quadro, ripetendole piano.",
          "Finalmente capirono l'ordine giusto delle parole e il baule si aprì con un clic.",
          "Dentro trovarono pennelli, dadi colorati, biglie e una bandiera di stoffa.",
          "C'era anche un biglietto: chi distingue le lettere apre ogni porta.",
          "Bobo dipinse una barca blu, Dado disegnò un dado dorato.",
          "Poi appesero il quadro alla quercia, come un piccolo museo all'aperto.",
          "Quando tornarono a casa, raccontarono tutto con gli occhi pieni di gioia.",
          "Capirono che b, d, p e q sono lettere amiche: basta guardarle con calma per non sbagliare più."
        ].join(" ")
      },
      {
        title: "La partita di parole",
        text: [
          "In classe la maestra inventò un gioco speciale per leggere senza paura.",
          "Divise i bambini in due squadre: la squadra del banco e la squadra del dado.",
          "Sulla lavagna scrisse tante parole che iniziano con b, d, p e q.",
          "C'erano barca, dado, palla, quadro, bimbo, denti, porta, quaderno.",
          "Ogni bambino doveva leggere una parola e dire con quale lettera cominciava.",
          "Pietro lesse palla e batté le mani, perché aveva riconosciuto la p.",
          "Bianca lesse dado, poi guardò bene e non lo confuse con babo.",
          "La maestra spiegò che la b e la d hanno la stessa pancia, ma da lati diversi.",
          "Disse che la p scende in basso a sinistra e la q scende in basso a destra.",
          "I bambini ripeterono piano: b di banco, d di dito, p di pane, q di quadro.",
          "Poi provarono parole più difficili: bandiera, dottore, palloncino, quaderno.",
          "Quando qualcuno sbagliava, nessuno rideva: tutti aiutavano con dolcezza.",
          "Davide confuse bimbo con dimbo, ma riprovò subito e lesse giusto.",
          "La maestra disegnò una piccola mano che indicava la direzione di ogni lettera.",
          "Alla fine del gioco le due squadre avevano lo stesso punteggio.",
          "La maestra disse che avevano vinto tutti, perché avevano letto con coraggio.",
          "I bambini capirono che, guardando con calma, b, d, p e q smettono di confondere."
        ].join(" ")
      }
    ]
  }
];

const exerciseOrder = [
  "ca-co-cu-cia-cio-ciu",
  "ci-ce-gi-ge-chi-che-ghi-ghe",
  "gn",
  "sc-gl-qu",
  "doppie",
  "accenti",
  "lettere-simili",
  "storie-curiosita"
];

function getExerciseOrder(exercise) {
  const index = exerciseOrder.indexOf(exercise.id);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

exercises.sort((firstExercise, secondExercise) => {
  return getExerciseOrder(firstExercise) - getExerciseOrder(secondExercise);
});

orderTextsForVariety();

const state = {
  words: [],
  currentIndex: -1,
  errors: 0,
  errorIndexes: new Set(),
  syllablesPerSecond: 2.0,
  fontSize: 28,
  requestedWordCount: "100",
  sectionStartIndex: 0,
  readerName: "",
  timerId: null,
  clockId: null,
  countdownId: null,
  countdownRemaining: 0,
  countingDown: false,
  startedAt: 0,
  elapsedMs: 0,
  paused: false,
  finished: false,
  lastResult: null,
  visualSettings: {
    showWordBackground: false,
    showErrorMarks: false,
    hidePastWords: false,
    extendedFontRange: false,
    readingFont: "arial"
  },
  lengthSettings: {
    wordCountOptions: DEFAULT_WORD_COUNT_OPTIONS,
    hiddenExtraWords: 0
  },
  selectedExercise: exercises[0],
  selectedText: exercises[0].texts[0]
};

const setupPanel = document.querySelector("#setupPanel");
const settingsPanel = document.querySelector("#settingsPanel");
const readerPanel = document.querySelector("#readerPanel");
const resultPanel = document.querySelector("#resultPanel");
const historyPanel = document.querySelector("#historyPanel");
const readerNameInput = document.querySelector("#readerNameInput");
const readerNames = document.querySelector("#readerNames");
const exerciseSelect = document.querySelector("#exerciseSelect");
const textSelect = document.querySelector("#textSelect");
const wordCountSelect = document.querySelector("#wordCountSelect");
const speedInput = document.querySelector("#speedInput");
const speedValue = document.querySelector("#speedValue");
const fontSizeInput = document.querySelector("#fontSizeInput");
const fontSizeValue = document.querySelector("#fontSizeValue");
const sampleBox = document.querySelector("#sampleBox");
const sectionPicker = document.querySelector("#sectionPicker");
const prevSectionButton = document.querySelector("#prevSectionButton");
const nextSectionButton = document.querySelector("#nextSectionButton");
const sectionLabel = document.querySelector("#sectionLabel");
const sectionRange = document.querySelector("#sectionRange");
const previewText = document.querySelector("#previewText");
const settingsButton = document.querySelector("#settingsButton");
const startButton = document.querySelector("#startButton");
const historyButton = document.querySelector("#historyButton");
const wordBackgroundToggle = document.querySelector("#wordBackgroundToggle");
const errorHighlightToggle = document.querySelector("#errorHighlightToggle");
const hidePastWordsToggle = document.querySelector("#hidePastWordsToggle");
const extendedFontRangeToggle = document.querySelector("#extendedFontRangeToggle");
const readingFontSelect = document.querySelector("#readingFontSelect");
const wordCountOptionsInput = document.querySelector("#wordCountOptionsInput");
const hiddenExtraWordsInput = document.querySelector("#hiddenExtraWordsInput");
const backFromSettingsButton = document.querySelector("#backFromSettingsButton");
const activeExercise = document.querySelector("#activeExercise");
const activeTitle = document.querySelector("#activeTitle");
const activeReader = document.querySelector("#activeReader");
const textDisplay = document.querySelector("#textDisplay");
const readingArea = document.querySelector("#readingArea");
const countdownOverlay = document.querySelector("#countdownOverlay");
const countdownValue = document.querySelector("#countdownValue");
const countdownLabel = document.querySelector("#countdownLabel");
const timer = document.querySelector("#timer");
const errorCount = document.querySelector("#errorCount");
const pauseButton = document.querySelector("#pauseButton");
const finishButton = document.querySelector("#finishButton");
const restartButton = document.querySelector("#restartButton");
const downloadResultButton = document.querySelector("#downloadResultButton");
const resultHistoryButton = document.querySelector("#resultHistoryButton");
const scoreValue = document.querySelector("#scoreValue");
const awardBox = document.querySelector("#awardBox");
const trophyIcon = document.querySelector("#trophyIcon");
const awardTitle = document.querySelector("#awardTitle");
const awardMessage = document.querySelector("#awardMessage");
const animalSurprise = document.querySelector("#animalSurprise");
const animalIcon = document.querySelector("#animalIcon");
const animalTitle = document.querySelector("#animalTitle");
const animalMessage = document.querySelector("#animalMessage");
const confettiLayer = document.querySelector("#confettiLayer");
const specialAwardOverlay = document.querySelector("#specialAwardOverlay");
const specialAwardTitle = document.querySelector("#specialAwardTitle");
const specialAwardMessage = document.querySelector("#specialAwardMessage");
const closeSpecialAwardButton = document.querySelector("#closeSpecialAwardButton");
const finalReader = document.querySelector("#finalReader");
const finalTime = document.querySelector("#finalTime");
const finalWords = document.querySelector("#finalWords");
const finalSpeed = document.querySelector("#finalSpeed");
const finalErrors = document.querySelector("#finalErrors");
const scoreExplanation = document.querySelector("#scoreExplanation");
const resultMistakeBox = document.querySelector("#resultMistakeBox");
const resultMistakeWords = document.querySelector("#resultMistakeWords");
const historyReaderSelect = document.querySelector("#historyReaderSelect");
const historyPeriodSelect = document.querySelector("#historyPeriodSelect");
const historyTitle = document.querySelector("#historyTitle");
const historyChart = document.querySelector("#historyChart");
const historyEmpty = document.querySelector("#historyEmpty");
const historyMistakeBox = document.querySelector("#historyMistakeBox");
const historyMistakeWords = document.querySelector("#historyMistakeWords");
const historyReadCountBox = document.querySelector("#historyReadCountBox");
const historyReadCounts = document.querySelector("#historyReadCounts");
const historyTableBody = document.querySelector("#historyTableBody");
const reportTableBody = document.querySelector("#reportTableBody");
const downloadReportsButton = document.querySelector("#downloadReportsButton");
const clearHistoryButton = document.querySelector("#clearHistoryButton");
const backToSetupButton = document.querySelector("#backToSetupButton");

function init() {
  state.lengthSettings = loadLengthSettings();
  populateWordCountSelect();

  exercises.forEach((exercise, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = exercise.label || exercise.name;
    exerciseSelect.append(option);
  });

  readerNameInput.value = localStorage.getItem(LAST_READER_KEY) || "";
  state.visualSettings = loadVisualSettings();
  updateSettingsControls();
  applyVisualSettings();
  updateReaderSuggestions();
  updateTexts();
  updateFontSize();
  bindEvents();
}

function bindEvents() {
  readerNameInput.addEventListener("input", () => {
    state.readerName = getReaderName();
    applySavedProgressToCurrentSelection();
    updatePreview();
  });

  exerciseSelect.addEventListener("change", () => {
    state.selectedExercise = exercises[Number(exerciseSelect.value)];
    state.sectionStartIndex = 0;
    updateTexts();
  });

  textSelect.addEventListener("change", () => {
    state.selectedText = state.selectedExercise.texts[Number(textSelect.value)];
    applySavedProgressToCurrentSelection();
    updatePreview();
  });

  wordCountSelect.addEventListener("change", () => {
    state.requestedWordCount = wordCountSelect.value;
    applySavedProgressToCurrentSelection();
    updatePreview();
  });

  speedInput.addEventListener("input", () => {
    state.syllablesPerSecond = Number(speedInput.value);
    speedValue.textContent = state.syllablesPerSecond.toFixed(1);
  });

  fontSizeInput.addEventListener("input", () => {
    state.fontSize = Number(fontSizeInput.value);
    updateFontSize();
  });

  prevSectionButton.addEventListener("click", () => moveSection(-1));
  nextSectionButton.addEventListener("click", () => moveSection(1));
  settingsButton.addEventListener("click", showSettings);
  backFromSettingsButton.addEventListener("click", resetToSetup);
  wordBackgroundToggle.addEventListener("change", updateVisualSettingsFromControls);
  errorHighlightToggle.addEventListener("change", updateVisualSettingsFromControls);
  hidePastWordsToggle.addEventListener("change", updateVisualSettingsFromControls);
  extendedFontRangeToggle.addEventListener("change", updateVisualSettingsFromControls);
  readingFontSelect.addEventListener("change", updateVisualSettingsFromControls);
  wordCountOptionsInput.addEventListener("change", updateLengthSettingsFromControls);
  hiddenExtraWordsInput.addEventListener("input", updateLengthSettingsFromControls);
  startButton.addEventListener("click", startReading);
  historyButton.addEventListener("click", showHistory);
  pauseButton.addEventListener("click", togglePause);
  finishButton.addEventListener("click", finishReading);
  restartButton.addEventListener("click", resetToSetup);
  closeSpecialAwardButton.addEventListener("click", closeSpecialAward);
  downloadResultButton.addEventListener("click", downloadLastResultReport);
  resultHistoryButton.addEventListener("click", showHistory);
  backToSetupButton.addEventListener("click", resetToSetup);
  downloadReportsButton.addEventListener("click", downloadFilteredReportsCsv);
  clearHistoryButton.addEventListener("click", clearHistory);
  historyReaderSelect.addEventListener("change", renderHistory);
  historyPeriodSelect.addEventListener("change", renderHistory);

  readingArea.addEventListener("click", markError);
  readingArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      markError(event);
    }
  });

  window.addEventListener("resize", () => {
    if (!historyPanel.classList.contains("hidden")) {
      renderHistory();
    }
  });
}

function updateTexts() {
  textSelect.innerHTML = "";
  state.selectedExercise.texts.forEach((text, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = text.title;
    textSelect.append(option);
  });
  state.selectedText = state.selectedExercise.texts[0];
  applySavedProgressToCurrentSelection();
  updatePreview();
}

function updatePreview() {
  const section = getCurrentSection();
  const words = section.words;
  const shownText = words.slice(0, 80).join(" ");
  const suffix = words.length > 80 ? " ..." : "";
  previewText.textContent = `${shownText}${suffix}`;
  previewText.dataset.meta = `${section.displayCount} parole selezionate su ${section.fullCount}`;
  sectionLabel.textContent = section.isWholeStory ? "Tutta la storia" : `Sezione ${section.sectionNumber} di ${section.totalSections}`;
  sectionRange.textContent = `Parole ${section.start + 1}-${section.displayEnd} di ${section.fullCount}`;
  sectionPicker.classList.toggle("sectionPickerDisabled", section.isWholeStory || section.totalSections <= 1);
  prevSectionButton.disabled = !section.canGoPrev;
  nextSectionButton.disabled = !section.canGoNext;
}

function updateFontSize() {
  applyFontRange();
  fontSizeInput.value = String(state.fontSize);
  fontSizeValue.textContent = String(state.fontSize);
  sampleBox.style.fontSize = `${state.fontSize}px`;
  textDisplay.style.fontSize = `${state.fontSize}px`;
}

function applyFontRange() {
  const maxFontSize = state.visualSettings.extendedFontRange ? 72 : 46;
  fontSizeInput.max = String(maxFontSize);
  fontSizeInput.min = "12";
  if (state.fontSize > maxFontSize) {
    state.fontSize = maxFontSize;
    fontSizeInput.value = String(state.fontSize);
  }
}

function showSettings() {
  updateSettingsControls();
  showPanel(settingsPanel);
}

function loadVisualSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(VISUAL_SETTINGS_KEY) || "{}");
    return {
      showWordBackground: Boolean(parsed.showWordBackground),
      showErrorMarks: Boolean(parsed.showErrorMarks),
      hidePastWords: Boolean(parsed.hidePastWords),
      extendedFontRange: Boolean(parsed.extendedFontRange),
      readingFont: normalizeReadingFont(parsed.readingFont)
    };
  } catch {
    return {
      showWordBackground: false,
      showErrorMarks: false,
      hidePastWords: false,
      extendedFontRange: false,
      readingFont: "arial"
    };
  }
}

function loadLengthSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LENGTH_SETTINGS_KEY) || "{}");
    return {
      wordCountOptions: normalizeWordCountOptions(parsed.wordCountOptions),
      hiddenExtraWords: normalizeHiddenExtraWords(parsed.hiddenExtraWords)
    };
  } catch {
    return {
      wordCountOptions: DEFAULT_WORD_COUNT_OPTIONS,
      hiddenExtraWords: 0
    };
  }
}

function populateWordCountSelect(preferredValue = state.requestedWordCount) {
  wordCountSelect.innerHTML = "";
  state.lengthSettings.wordCountOptions.forEach((count) => {
    const option = document.createElement("option");
    option.value = String(count);
    option.textContent = `${count} parole`;
    wordCountSelect.append(option);
  });

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "Tutta la storia";
  wordCountSelect.append(allOption);

  const values = [...wordCountSelect.options].map((option) => option.value);
  wordCountSelect.value = values.includes(preferredValue) ? preferredValue : String(state.lengthSettings.wordCountOptions[0]);
  state.requestedWordCount = wordCountSelect.value;
}

function updateSettingsControls() {
  wordBackgroundToggle.checked = state.visualSettings.showWordBackground;
  errorHighlightToggle.checked = state.visualSettings.showErrorMarks;
  hidePastWordsToggle.checked = state.visualSettings.hidePastWords;
  extendedFontRangeToggle.checked = state.visualSettings.extendedFontRange;
  readingFontSelect.value = normalizeReadingFont(state.visualSettings.readingFont);
  wordCountOptionsInput.value = state.lengthSettings.wordCountOptions.join(", ");
  hiddenExtraWordsInput.value = String(state.lengthSettings.hiddenExtraWords);
}

function updateVisualSettingsFromControls() {
  state.visualSettings = {
    showWordBackground: wordBackgroundToggle.checked,
    showErrorMarks: errorHighlightToggle.checked,
    hidePastWords: hidePastWordsToggle.checked,
    extendedFontRange: extendedFontRangeToggle.checked,
    readingFont: normalizeReadingFont(readingFontSelect.value)
  };
  localStorage.setItem(VISUAL_SETTINGS_KEY, JSON.stringify(state.visualSettings));
  applyVisualSettings();
  updateFontSize();
}

function updateLengthSettingsFromControls() {
  const previousValue = wordCountSelect.value || state.requestedWordCount;
  state.lengthSettings = {
    wordCountOptions: normalizeWordCountOptions(wordCountOptionsInput.value),
    hiddenExtraWords: normalizeHiddenExtraWords(hiddenExtraWordsInput.value)
  };
  localStorage.setItem(LENGTH_SETTINGS_KEY, JSON.stringify(state.lengthSettings));
  populateWordCountSelect(previousValue);
  updateSettingsControls();
  applySavedProgressToCurrentSelection();
  updatePreview();
}

function applyVisualSettings() {
  document.body.classList.toggle("showWordBackground", state.visualSettings.showWordBackground);
  document.body.classList.toggle("showErrorMarks", state.visualSettings.showErrorMarks);
  document.body.classList.toggle("hidePastWords", state.visualSettings.hidePastWords);
  document.documentElement.style.setProperty("--reading-font", getReadingFontFamily(state.visualSettings.readingFont));
}

function getReadingFontFamily(fontKey) {
  const fonts = {
    system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    arial: 'Arial, Helvetica, sans-serif',
    verdana: 'Verdana, Geneva, sans-serif',
    tahoma: 'Tahoma, Geneva, sans-serif',
    trebuchet: '"Trebuchet MS", Arial, sans-serif',
    comic: '"Comic Sans MS", "Comic Sans", cursive',
    century: '"Century Gothic", "Apple Gothic", sans-serif',
    calibri: 'Calibri, Candara, "Segoe UI", sans-serif',
    "open-sans": '"Open Sans", Arial, sans-serif'
  };

  return fonts[fontKey] || fonts.arial;
}

function normalizeReadingFont(fontKey) {
  const allowedFonts = ["arial", "verdana", "tahoma", "trebuchet", "comic", "century", "calibri", "open-sans", "system"];
  return allowedFonts.includes(fontKey) ? fontKey : "arial";
}

function normalizeWordCountOptions(value) {
  const rawValues = Array.isArray(value) ? value : String(value || "").split(/[,\s;]+/);
  const unique = new Set();
  rawValues.forEach((item) => {
    const count = Math.round(Number(item));
    if (Number.isFinite(count) && count > 0 && count <= 2000) {
      unique.add(count);
    }
  });

  const options = [...unique].sort((a, b) => a - b);
  return options.length ? options : [...DEFAULT_WORD_COUNT_OPTIONS];
}

function normalizeHiddenExtraWords(value) {
  const extraWords = Math.round(Number(value));
  if (!Number.isFinite(extraWords) || extraWords < 0) return 0;
  return Math.min(extraWords, 500);
}

function getRequestedWordCount() {
  return Math.max(1, Math.round(Number(wordCountSelect.value)));
}

function getEffectiveWordCount(requestedWordCount) {
  return Math.min(2500, requestedWordCount + state.lengthSettings.hiddenExtraWords);
}

function startReading() {
  prepareRewardAudio();
  state.readerName = getReaderName();
  localStorage.setItem(LAST_READER_KEY, state.readerName);
  const section = getCurrentSection();
  state.words = section.words;
  state.currentIndex = -1;
  state.errors = 0;
  state.errorIndexes = new Set();
  state.elapsedMs = 0;
  state.paused = false;
  state.finished = false;
  state.countingDown = true;
  state.countdownRemaining = 3;
  state.startedAt = 0;

  activeExercise.textContent = state.selectedExercise.name;
  activeTitle.textContent = `${state.selectedText.title} - ${section.isWholeStory ? "tutta la storia" : `sezione ${section.sectionNumber}`} (${section.displayCount} parole)`;
  activeReader.textContent = state.readerName;
  errorCount.textContent = "0";
  timer.textContent = "0:00";
  pauseButton.textContent = "Pausa";
  renderWords();
  updateFontSize();

  showPanel(readerPanel);
  startCountdown();
}

function startCountdown() {
  window.clearInterval(state.countdownId);
  countdownOverlay.classList.remove("hidden");
  countdownValue.textContent = String(state.countdownRemaining);
  countdownLabel.textContent = "Preparati";

  state.countdownId = window.setInterval(() => {
    state.countdownRemaining -= 1;

    if (state.countdownRemaining > 0) {
      countdownValue.textContent = String(state.countdownRemaining);
      return;
    }

    if (state.countdownRemaining === 0) {
      countdownValue.textContent = "Via";
      countdownLabel.textContent = "Si legge";
      return;
    }

    window.clearInterval(state.countdownId);
    state.countdownId = null;
    countdownOverlay.classList.add("hidden");
    beginReadingTimer();
  }, 1000);
}

function beginReadingTimer() {
  state.countingDown = false;
  state.startedAt = Date.now();
  state.clockId = window.setInterval(updateClock, 250);
  advanceWord();
}

function scheduleNextWord() {
  window.clearTimeout(state.timerId);
  if (state.paused || state.finished) return;
  const currentWord = state.words[state.currentIndex] || "";
  const syllables = countSyllables(currentWord);
  const sps = state.syllablesPerSecond > 0 ? state.syllablesPerSecond : 1;
  const durationMs = Math.max(250, (syllables / sps) * 1000);
  state.timerId = window.setTimeout(advanceWord, durationMs);
}

function countSyllables(word) {
  const cleaned = String(word)
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^a-zàáâèéêìíîòóôùúûy]/g, "");
  if (!cleaned) return 1;
  const allVowels = "aàáâeèéêiìíîoòóôuùúûy";
  const weakUnaccented = "iuy";
  let syllables = 0;
  let inVowelRun = false;
  let prevVowel = "";

  for (const char of cleaned) {
    const isVowel = allVowels.includes(char);
    if (isVowel) {
      if (!inVowelRun) {
        syllables += 1;
        inVowelRun = true;
      } else {
        const diphthong = weakUnaccented.includes(prevVowel) || weakUnaccented.includes(char);
        if (!diphthong) {
          syllables += 1;
        }
      }
      prevVowel = char;
    } else {
      inVowelRun = false;
      prevVowel = "";
    }
  }

  return Math.max(1, syllables);
}

function getReaderName() {
  const name = readerNameInput.value.trim();
  return name || "Lettore";
}

function getSelectedWords() {
  return getCurrentSection().words;
}

function getCurrentSection() {
  const allWords = splitWords(state.selectedText.text);
  const fullCount = allWords.length;

  if (wordCountSelect.value === "all") {
    state.sectionStartIndex = 0;
    return {
      words: allWords,
      start: 0,
      end: fullCount,
      displayEnd: fullCount,
      displayCount: fullCount,
      fullCount,
      sectionNumber: 1,
      totalSections: 1,
      canGoPrev: false,
      canGoNext: false,
      isWholeStory: true
    };
  }

  const requestedSize = getRequestedWordCount();
  const sectionSize = getEffectiveWordCount(requestedSize);
  const totalSections = Math.max(1, Math.ceil(fullCount / sectionSize));
  const currentSectionIndex = Math.min(Math.floor(state.sectionStartIndex / sectionSize), totalSections - 1);
  const start = currentSectionIndex * sectionSize;
  const end = Math.min(start + sectionSize, fullCount);
  const displayEnd = Math.min(start + requestedSize, fullCount);
  state.sectionStartIndex = start;

  return {
    words: allWords.slice(start, end),
    start,
    end,
    displayEnd,
    displayCount: Math.max(0, displayEnd - start),
    fullCount,
    sectionNumber: currentSectionIndex + 1,
    totalSections,
    canGoPrev: currentSectionIndex > 0,
    canGoNext: currentSectionIndex < totalSections - 1,
    isWholeStory: false
  };
}

function moveSection(direction) {
  if (wordCountSelect.value === "all") return;
  const sectionSize = getEffectiveWordCount(getRequestedWordCount());
  const section = getCurrentSection();
  const nextSectionIndex = Math.max(0, Math.min(section.totalSections - 1, section.sectionNumber - 1 + direction));
  state.sectionStartIndex = nextSectionIndex * sectionSize;
  updatePreview();
}

function splitWords(text) {
  return text.trim().split(/\s+/).filter(Boolean);
}

function renderWords() {
  textDisplay.innerHTML = "";
  state.words.forEach((word, index) => {
    const span = document.createElement("span");
    span.className = "word";
    span.dataset.index = String(index);
    span.tabIndex = 0;
    span.textContent = word;
    textDisplay.append(span);
  });
}

function advanceWord() {
  if (state.paused) return;

  state.currentIndex += 1;
  if (state.currentIndex >= state.words.length) {
    finishReading();
    return;
  }

  updateWordClasses();
  scheduleNextWord();
}

function updateWordClasses() {
  const wordElements = textDisplay.querySelectorAll(".word");
  wordElements.forEach((wordElement, index) => {
    wordElement.classList.toggle("past", index < state.currentIndex);
    wordElement.classList.toggle("active", index === state.currentIndex);
    wordElement.classList.toggle("error", state.errorIndexes.has(index));
  });

  const activeWord = textDisplay.querySelector(".word.active");
  activeWord?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
}

function markError(event) {
  if (state.currentIndex < 0 || state.paused || state.countingDown || readerPanel.classList.contains("hidden")) {
    return;
  }

  const clickedWord = event?.target?.closest?.(".word");
  const errorIndex = clickedWord ? Number(clickedWord.dataset.index) : state.currentIndex;

  if (!Number.isInteger(errorIndex) || errorIndex < 0 || errorIndex >= state.words.length) {
    return;
  }

  if (!state.errorIndexes.has(errorIndex)) {
    state.errorIndexes.add(errorIndex);
    state.errors += 1;
    errorCount.textContent = String(state.errors);
    updateWordClasses();
  }
}

function togglePause() {
  if (state.countingDown) return;

  state.paused = !state.paused;
  pauseButton.textContent = state.paused ? "Riprendi" : "Pausa";

  if (state.paused) {
    state.elapsedMs += Date.now() - state.startedAt;
    window.clearTimeout(state.timerId);
  } else {
    state.startedAt = Date.now();
    scheduleNextWord();
  }
}

function updateClock() {
  timer.textContent = formatTime(getElapsedMs());
}

function getElapsedMs() {
  if (state.countingDown || !state.startedAt) return state.elapsedMs;
  if (state.paused) return state.elapsedMs;
  return state.elapsedMs + Date.now() - state.startedAt;
}

function finishReading() {
  if (!state.words.length || state.finished) return;

  if (state.countingDown) {
    cancelCountdown();
    resetToSetup();
    return;
  }

  state.finished = true;

  window.clearInterval(state.countdownId);
  window.clearTimeout(state.timerId);
  window.clearInterval(state.clockId);
  state.countdownId = null;
  state.timerId = null;
  state.clockId = null;
  state.countingDown = false;
  countdownOverlay.classList.add("hidden");

  const elapsedMs = getElapsedMs();
  const wordsRead = state.words.length;
  const wordsPerMinute = elapsedMs > 0 ? Math.round(wordsRead / (elapsedMs / 60000)) : 0;
  const totalSyllables = state.words.reduce((sum, word) => sum + countSyllables(word), 0);
  const sps = state.syllablesPerSecond > 0 ? state.syllablesPerSecond : 1;
  const expectedMs = (totalSyllables / sps) * 1000;
  const syllablesPerMinute = elapsedMs > 0 ? Math.round(totalSyllables / (elapsedMs / 60000)) : 0;
  const timeBonus = Math.max(0, Math.round((expectedMs - elapsedMs) / 1000));
  const accuracy = state.words.length > 0 ? Math.max(0, 100 - Math.round((state.errors / state.words.length) * 100)) : 0;
  const score = Math.max(0, Math.min(100, accuracy + timeBonus - state.errors * 5));
  const section = getCurrentSection();
  const errorDetails = getErrorDetails(section.start);
  const mistakeWords = getUniqueMistakeWords(errorDetails);
  const sectionLabelText = section.isWholeStory ? "Tutta la storia" : `Sezione ${section.sectionNumber}`;
  const sectionRangeText = `Parole ${section.start + 1}-${section.displayEnd}`;
  const awardLevel = getAwardLevel(score);
  const textReadCount = incrementTextReadCount(state.selectedExercise, state.selectedText);

  const result = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    day: getLocalDay(),
    readerName: state.readerName,
    exerciseName: state.selectedExercise.name,
    textTitle: state.selectedText.title,
    requestedWords: wordCountSelect.value,
    effectiveWords: wordsRead,
    hiddenExtraWords: wordCountSelect.value === "all" ? 0 : state.lengthSettings.hiddenExtraWords,
    sectionStart: section.start,
    sectionEnd: section.end,
    sectionDisplayEnd: section.displayEnd,
    sectionNumber: section.sectionNumber,
    sectionLabel: sectionLabelText,
    sectionRange: sectionRangeText,
    wordsRead,
    elapsedMs,
    wordsPerMinute,
    errors: state.errors,
    errorDetails,
    mistakeWords,
    accuracy,
    timeBonus,
    syllablesPerSecond: state.syllablesPerSecond,
    totalSyllables,
    syllablesPerMinute,
    fontSize: state.fontSize,
    textReadCount,
    awardLevel,
    score
  };

  saveResult(result);
  saveReaderProgress(result, section);
  applySavedProgressToCurrentSelection();
  state.lastResult = result;
  updateReaderSuggestions();

  scoreValue.textContent = String(score);
  renderAward(result);
  finalReader.textContent = state.readerName;
  finalTime.textContent = formatTime(elapsedMs);
  finalWords.textContent = String(wordsRead);
  finalSpeed.textContent = `${wordsPerMinute} parole/min`;
  finalErrors.textContent = String(state.errors);
  scoreExplanation.textContent = buildScoreExplanation(score, timeBonus);
  renderMistakeChips(resultMistakeWords, mistakeWords, "Nessuna parola sbagliata.");
  resultMistakeBox.classList.toggle("success", mistakeWords.length === 0);

  showPanel(resultPanel);

  if (awardLevel === "gold") {
    playGoldSound();
    launchConfetti();
    const goldCount = countGoldAwardsForReader(state.readerName);
    if (goldCount > 0 && goldCount % 5 === 0) {
      window.setTimeout(() => {
        showSpecialGoldAward(state.readerName, goldCount);
      }, 900);
    }
  }
}

function cancelCountdown() {
  window.clearInterval(state.countdownId);
  state.countdownId = null;
  state.countingDown = false;
  state.countdownRemaining = 0;
  countdownOverlay.classList.add("hidden");
}

function renderAward(result) {
  const level = getAwardLevel(result.score);
  awardBox.className = `award ${level}`;
  trophyIcon.className = `trophy ${level}`;
  animalSurprise.classList.add("hidden");

  if (level === "gold") {
    awardBox.classList.remove("hidden");
    awardTitle.textContent = `Coppa d'oro per ${result.readerName}!`;
    awardMessage.textContent = "Lettura precisa e con un ottimo ritmo. Complimenti, continua cosi.";
    renderAnimalSurprise(result.readerName);
    return;
  }

  awardBox.classList.add("hidden");
  renderEncouragingAnimal(result.readerName, level);
}

function renderAnimalSurprise(readerName) {
  const animals = [
    { icon: "🐆", name: "Ghepardo", message: "Il ghepardo corre veloce per festeggiare questa lettura." },
    { icon: "🦜", name: "Pappagallo tropicale", message: "Il pappagallo ripete: bravo, bravissimo!" },
    { icon: "🦒", name: "Giraffa", message: "La giraffa guarda dall'alto e applaude piano." },
    { icon: "🦓", name: "Zebra", message: "La zebra salta tra le righe della storia." },
    { icon: "🦩", name: "Fenicottero", message: "Il fenicottero balla per il tuo risultato d'oro." },
    { icon: "🐘", name: "Elefante", message: "L'elefante ricorda questa grande lettura." }
  ];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  animalIcon.textContent = animal.icon;
  animalTitle.textContent = `${animal.name} sorpresa per ${readerName}!`;
  animalMessage.textContent = animal.message;
  animalSurprise.classList.remove("hidden");
}

function renderEncouragingAnimal(readerName, level) {
  const animals = [
    { icon: "🐆", name: "Ghepardo", message: "Il ghepardo dice: hai finito la lettura, ora riparti ancora piu veloce." },
    { icon: "🦜", name: "Pappagallo tropicale", message: "Il pappagallo ti incoraggia: una parola alla volta si arriva lontano." },
    { icon: "🦒", name: "Giraffa", message: "La giraffa vede i tuoi progressi dall'alto e ti fa un grande sorriso." },
    { icon: "🦓", name: "Zebra", message: "La zebra dice che ogni riga letta e' una nuova striscia di coraggio." },
    { icon: "🐘", name: "Elefante", message: "L'elefante ricorda il tuo impegno e ti invita a provare ancora." }
  ];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  animalIcon.textContent = animal.icon;
  animalTitle.textContent = `${animal.name} incoraggia ${readerName}!`;
  animalMessage.textContent = level === "silver"
    ? `${animal.message} Sei molto vicino alla coppa d'oro.`
    : animal.message;
  animalSurprise.classList.remove("hidden");
}

function getAwardLevel(score) {
  if (score >= 90) return "gold";
  if (score >= 70) return "silver";
  return "bronze";
}

function countGoldAwardsForReader(readerName) {
  return loadResults().filter((result) => {
    const sameReader = (result.readerName || "Lettore") === readerName;
    const isGold = result.awardLevel === "gold" || (!result.awardLevel && Number(result.score) >= 90);
    return sameReader && isGold;
  }).length;
}

function showSpecialGoldAward(readerName, goldCount) {
  specialAwardTitle.textContent = `Super coppa d'oro per ${readerName}!`;
  specialAwardMessage.textContent = `Hai conquistato ${goldCount} coppe d'oro. Questo e' un premio speciale ogni 5 letture d'oro.`;
  specialAwardOverlay.classList.remove("hidden");
  playVictoryMusic();
  launchConfetti(120, 5200);
}

function closeSpecialAward() {
  specialAwardOverlay.classList.add("hidden");
}

function prepareRewardAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  if (!rewardAudioContext) {
    rewardAudioContext = new AudioContext();
  }
  if (rewardAudioContext.state === "suspended") {
    rewardAudioContext.resume();
  }
}

function playGoldSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = rewardAudioContext || new AudioContext();
  if (context.state === "suspended") {
    context.resume();
  }
  const now = context.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 987.77, 1174.66, 1318.51];

  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index % 2 === 0 ? "sine" : "triangle";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(context.destination);

    const start = now + index * 0.18;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.14, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);
    oscillator.start(start);
    oscillator.stop(start + 0.46);
  });

  [261.63, 392, 523.25].forEach((frequency) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.0001, now + 1.35);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 1.42);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.25);
    oscillator.start(now + 1.35);
    oscillator.stop(now + 2.3);
  });
}

function playVictoryMusic() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = rewardAudioContext || new AudioContext();
  if (context.state === "suspended") {
    context.resume();
  }

  const now = context.currentTime;
  const melody = [
    523.25, 659.25, 783.99, 1046.5,
    987.77, 1046.5, 1174.66, 1318.51,
    1046.5, 783.99, 880, 1046.5
  ];

  melody.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = index % 3 === 0 ? "triangle" : "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(context.destination);

    const start = now + index * 0.2;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.15, start + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
    oscillator.start(start);
    oscillator.stop(start + 0.54);
  });

  [261.63, 329.63, 392, 523.25].forEach((frequency) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.connect(gain);
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.0001, now + 2.2);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 2.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.1);
    oscillator.start(now + 2.2);
    oscillator.stop(now + 4.15);
  });
}

function launchConfetti(count = 70, durationMs = 3600) {
  confettiLayer.innerHTML = "";
  const colors = ["#ffe36e", "#1f8fdf", "#48a868", "#e85b4f", "#f7a83b"];

  for (let index = 0; index < count; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confettiPiece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    confettiLayer.append(piece);
  }

  window.setTimeout(() => {
    confettiLayer.innerHTML = "";
  }, durationMs);
}

function getErrorDetails(sectionStart) {
  return [...state.errorIndexes].sort((a, b) => a - b).map((relativeIndex) => {
    const word = state.words[relativeIndex] || "";
    return {
      word,
      normalizedWord: normalizeWord(word),
      relativeIndex,
      storyIndex: sectionStart + relativeIndex
    };
  });
}

function getUniqueMistakeWords(errorDetails) {
  return [...new Set(errorDetails.map((error) => error.normalizedWord).filter(Boolean))];
}

function saveResult(result) {
  const results = loadResults();
  results.push(result);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

function loadResults() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function orderTextsForVariety() {
  const readCounts = loadTextReadCounts();
  exercises.forEach((exercise) => {
    exercise.texts = exercise.texts
      .map((text) => ({
        text,
        count: readCounts[getTextReadKey(exercise, text)] || 0,
        tieBreaker: Math.random()
      }))
      .sort((first, second) => first.count - second.count || first.tieBreaker - second.tieBreaker)
      .map((item) => item.text);
  });
}

function incrementTextReadCount(exercise, text) {
  const readCounts = loadTextReadCounts();
  const key = getTextReadKey(exercise, text);
  const nextCount = (readCounts[key] || 0) + 1;
  readCounts[key] = nextCount;
  localStorage.setItem(TEXT_READ_COUNTS_KEY, JSON.stringify(readCounts));
  return nextCount;
}

function loadTextReadCounts() {
  if (typeof localStorage === "undefined") return {};
  try {
    const parsed = JSON.parse(localStorage.getItem(TEXT_READ_COUNTS_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function getTextReadKey(exercise, text) {
  return `${exercise.id || exercise.name}::${text.title}`;
}

function getReadableTextReadCounts() {
  const readCounts = loadTextReadCounts();
  return exercises
    .flatMap((exercise) =>
      exercise.texts.map((text) => ({
        word: text.title,
        count: readCounts[getTextReadKey(exercise, text)] || 0
      }))
    )
    .filter((item) => item.count > 0)
    .sort((first, second) => second.count - first.count || first.word.localeCompare(second.word))
    .slice(0, 12);
}

function saveReaderProgress(result, section) {
  const progress = loadReaderProgress();
  const key = getReaderProgressKey(result.readerName, state.selectedExercise, state.selectedText);
  const fullCount = section.fullCount || splitWords(state.selectedText.text).length;
  progress[key] = {
    nextStart: section.end < fullCount ? section.end : 0,
    updatedAt: result.createdAt,
    requestedWords: result.requestedWords,
    effectiveWords: result.effectiveWords,
    textTitle: result.textTitle
  };
  localStorage.setItem(READER_PROGRESS_KEY, JSON.stringify(progress));
}

function applySavedProgressToCurrentSelection() {
  if (!state.selectedExercise || !state.selectedText) {
    state.sectionStartIndex = 0;
    return;
  }

  const progress = loadReaderProgress();
  const key = getReaderProgressKey(getReaderName(), state.selectedExercise, state.selectedText);
  const saved = progress[key];
  const allWords = splitWords(state.selectedText.text);
  const nextStart = Math.round(Number(saved?.nextStart));
  state.sectionStartIndex = Number.isFinite(nextStart) && nextStart > 0 && nextStart < allWords.length ? nextStart : 0;
}

function loadReaderProgress() {
  try {
    const parsed = JSON.parse(localStorage.getItem(READER_PROGRESS_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function getReaderProgressKey(readerName, exercise, text) {
  return `${readerName || "Lettore"}::${exercise.id || exercise.name}::${text.title}`;
}

function getReaderNamesFromResults() {
  return [...new Set(loadResults().map((result) => result.readerName).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function updateReaderSuggestions() {
  readerNames.innerHTML = "";
  getReaderNamesFromResults().forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    readerNames.append(option);
  });
}

function showHistory() {
  populateHistoryReaders();
  showPanel(historyPanel);
  renderHistory();
}

function populateHistoryReaders() {
  const currentValue = historyReaderSelect.value || getReaderName();
  const names = getReaderNamesFromResults();
  historyReaderSelect.innerHTML = "";

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "Tutti i lettori";
  historyReaderSelect.append(allOption);

  names.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    historyReaderSelect.append(option);
  });

  if (names.includes(currentValue)) {
    historyReaderSelect.value = currentValue;
  } else if (names.includes(getReaderName())) {
    historyReaderSelect.value = getReaderName();
  } else {
    historyReaderSelect.value = "all";
  }
}

function renderHistory() {
  const results = getFilteredResults();
  const period = historyPeriodSelect.value || "day";
  const aggregated = aggregateResultsByPeriod(results, period);
  const mistakeSummary = aggregateMistakeWords(results);
  const textReadSummary = getReadableTextReadCounts();
  historyTitle.textContent = getHistoryTitle(period);

  historyEmpty.classList.toggle("hidden", aggregated.length > 0);
  historyMistakeBox.classList.toggle("hidden", results.length === 0);
  historyReadCountBox.classList.toggle("hidden", textReadSummary.length === 0);
  renderMistakeChips(historyMistakeWords, mistakeSummary, "Nessuna parola sbagliata salvata.");
  renderMistakeChips(historyReadCounts, textReadSummary, "Nessun brano letto salvato.");
  historyTableBody.innerHTML = "";
  reportTableBody.innerHTML = "";

  aggregated.slice().reverse().forEach((periodResult) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(periodResult.periodLabel)}</td>
      <td>${escapeHtml(periodResult.readerLabel)}</td>
      <td>${periodResult.sessions}</td>
      <td>${periodResult.averageScore}</td>
      <td>${periodResult.averageWpm}</td>
      <td>${periodResult.totalErrors}</td>
      <td>${escapeHtml(periodResult.mistakeLabel || "-")}</td>
    `;
    historyTableBody.append(row);
  });

  let activeReportGroup = "";
  results.slice().reverse().forEach((result) => {
    const periodInfo = getPeriodInfo(result, period);
    if (periodInfo.key !== activeReportGroup) {
      activeReportGroup = periodInfo.key;
      const groupRow = document.createElement("tr");
      groupRow.className = "reportGroupRow";
      groupRow.innerHTML = `<td colspan="10">${escapeHtml(periodInfo.label)}</td>`;
      reportTableBody.append(groupRow);
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(formatReportDateCell(result, period))}</td>
      <td>${escapeHtml(result.readerName || "-")}</td>
      <td>${escapeHtml(result.textTitle || "-")}</td>
      <td>${escapeHtml(getResultSectionLabel(result))}</td>
      <td>${result.wordsRead || 0}</td>
      <td>${formatTime(result.elapsedMs || 0)}</td>
      <td>${result.wordsPerMinute || 0}</td>
      <td>${result.errors || 0}</td>
      <td>${result.score || 0}</td>
      <td>${escapeHtml(getMistakeWordsFromResult(result).join(", ") || "-")}</td>
    `;
    reportTableBody.append(row);
  });

  drawHistoryChart(aggregated, period, results);
}

function getHistoryTitle(period) {
  const titles = {
    day: "Risultati giornalieri",
    week: "Risultati settimanali",
    month: "Risultati mensili",
    year: "Risultati annuali"
  };
  return titles[period] || "Risultati";
}

function getFilteredResults() {
  const selectedReader = historyReaderSelect.value || "all";
  return loadResults()
    .filter((result) => selectedReader === "all" || result.readerName === selectedReader)
    .sort((a, b) => getResultTimestamp(a) - getResultTimestamp(b));
}

function aggregateResultsByPeriod(results, period) {
  const grouped = new Map();

  results.forEach((result) => {
    const periodInfo = getPeriodInfo(result, period);
    const readerName = result.readerName || "Lettore";
    const key = `${periodInfo.key}|${readerName}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        periodKey: periodInfo.key,
        periodLabel: periodInfo.label,
        readerLabel: readerName,
        sessions: 0,
        scoreTotal: 0,
        wpmTotal: 0,
        totalErrors: 0,
        mistakeCounts: new Map()
      });
    }
    const group = grouped.get(key);
    group.sessions += 1;
    group.scoreTotal += result.score;
    group.wpmTotal += result.wordsPerMinute;
    group.totalErrors += result.errors;
    getMistakeWordsFromResult(result).forEach((word) => {
      group.mistakeCounts.set(word, (group.mistakeCounts.get(word) || 0) + 1);
    });
  });

  return [...grouped.values()]
    .map((group) => ({
      ...group,
      averageScore: Math.round(group.scoreTotal / group.sessions),
      averageWpm: Math.round(group.wpmTotal / group.sessions),
      mistakeLabel: formatMistakeSummary(group.mistakeCounts, 3)
    }))
    .sort((a, b) => a.periodKey.localeCompare(b.periodKey));
}

function aggregateMistakeWords(results) {
  const counts = new Map();
  results.forEach((result) => {
    getMistakeWordsFromResult(result).forEach((word) => {
      counts.set(word, (counts.get(word) || 0) + 1);
    });
  });
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([word, count]) => ({ word, count }));
}

function getMistakeWordsFromResult(result) {
  if (Array.isArray(result.errorDetails)) {
    return result.errorDetails.map((error) => normalizeWord(error.normalizedWord || error.word)).filter(Boolean);
  }
  if (Array.isArray(result.mistakeWords)) {
    return result.mistakeWords.map(normalizeWord).filter(Boolean);
  }
  return [];
}

function formatMistakeSummary(counts, limit) {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word, count]) => `${word} (${count})`)
    .join(", ");
}

function getPeriodInfo(result, period) {
  const date = getResultDate(result);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  if (period === "year") {
    return { key: String(year), label: String(year) };
  }

  if (period === "month") {
    return { key: `${year}-${month}`, label: `${month}/${year}` };
  }

  if (period === "week") {
    const week = getIsoWeek(date);
    return {
      key: `${week.year}-W${String(week.week).padStart(2, "0")}`,
      label: `Settimana ${week.week}, ${week.year}`
    };
  }

  return {
    key: `${year}-${month}-${day}`,
    label: `${day}/${month}/${year}`
  };
}

function getIsoWeek(date) {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
  return { year: utcDate.getUTCFullYear(), week };
}

function getResultDate(result) {
  if (result.createdAt) {
    const date = new Date(result.createdAt);
    if (!Number.isNaN(date.getTime())) return date;
  }
  if (result.day) {
    const [year, month, day] = result.day.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date();
}

function getResultTimestamp(result) {
  return getResultDate(result).getTime();
}

function formatPeriodShort(periodResult, period) {
  if (period === "day") {
    return (periodResult.periodLabel || "").slice(0, 5);
  }
  if (period === "week") {
    return (periodResult.periodKey || periodResult.key || "").replace("-", " ");
  }
  return periodResult.periodLabel || periodResult.label || "";
}

function getChartPeriods(aggregated) {
  const byPeriod = new Map();
  aggregated.forEach((item) => {
    if (!byPeriod.has(item.periodKey)) {
      byPeriod.set(item.periodKey, {
        key: item.periodKey,
        periodKey: item.periodKey,
        label: item.periodLabel,
        periodLabel: item.periodLabel
      });
    }
  });
  return [...byPeriod.values()].sort((a, b) => a.key.localeCompare(b.key));
}

function getReaderColor(index) {
  const colors = ["#1f8fdf", "#d15a45", "#38a169", "#8b5cf6", "#d9901f", "#0f766e", "#be4bdb", "#4b5563"];
  return colors[index % colors.length];
}

function drawChartLegend(ctx, readerNames, x, y) {
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "left";
  let cursorX = x;
  let cursorY = y;

  readerNames.forEach((readerName, index) => {
    const color = getReaderColor(index);
    const labelWidth = ctx.measureText(readerName).width + 34;
    if (cursorX + labelWidth > historyChart.getBoundingClientRect().width - 18) {
      cursorX = x;
      cursorY += 18;
    }
    ctx.fillStyle = color;
    ctx.fillRect(cursorX, cursorY - 8, 18, 4);
    ctx.fillStyle = "#193044";
    ctx.fillText(readerName, cursorX + 24, cursorY);
    cursorX += labelWidth + 14;
  });
}

function buildChartData(aggregated, period, rawResults) {
  if (period === "day") {
    const items = rawResults.map((result, index) => {
      const date = getResultDate(result);
      return {
        key: `${date.getTime()}-${index}`,
        label: formatChartTimeLabel(date),
        readerLabel: result.readerName || "Lettore",
        score: result.score || 0
      };
    });
    return {
      items,
      axisItems: items.map((item) => ({ key: item.key, label: item.label }))
    };
  }

  const axisItems = getChartPeriods(aggregated).map((item) => ({
    key: item.key,
    label: formatPeriodShort(item, period)
  }));
  const items = aggregated.map((item) => ({
    key: item.periodKey,
    label: item.periodLabel,
    readerLabel: item.readerLabel,
    score: item.averageScore
  }));
  return { items, axisItems };
}

function formatChartTimeLabel(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month} ${hours}:${minutes}`;
}

function drawTrendLine(ctx, series, color) {
  if (series.length < 2) return;
  const fit = linearFit(series.map((point, index) => ({ x: index, y: point.y })));
  if (!fit) return;

  const first = series[0];
  const last = series[series.length - 1];
  const y1 = fit.intercept;
  const y2 = fit.slope * (series.length - 1) + fit.intercept;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(first.x, y1);
  ctx.lineTo(last.x, y2);
  ctx.stroke();
  ctx.restore();
}

function linearFit(points) {
  const n = points.length;
  const sumX = points.reduce((sum, point) => sum + point.x, 0);
  const sumY = points.reduce((sum, point) => sum + point.y, 0);
  const sumXY = points.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumXX = points.reduce((sum, point) => sum + point.x * point.x, 0);
  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) return null;
  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

function drawHistoryChart(aggregated, period, rawResults = []) {
  const rect = historyChart.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(rect.width || 900));
  const height = 320;
  historyChart.width = width * dpr;
  historyChart.height = height * dpr;
  historyChart.style.height = `${height}px`;

  const ctx = historyChart.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const padding = { top: 54, right: 18, bottom: 54, left: 44 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#d7e5ef";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top);
  ctx.lineTo(padding.left, padding.top + plotHeight);
  ctx.lineTo(padding.left + plotWidth, padding.top + plotHeight);
  ctx.stroke();

  ctx.fillStyle = "#687987";
  ctx.font = "12px system-ui, sans-serif";
  [0, 25, 50, 75, 100].forEach((value) => {
    const y = padding.top + plotHeight - (value / 100) * plotHeight;
    ctx.strokeStyle = value === 0 ? "#d7e5ef" : "#eef4f8";
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(padding.left + plotWidth, y);
    ctx.stroke();
    ctx.fillText(String(value), 10, y + 4);
  });

  const chartData = buildChartData(aggregated, period, rawResults);

  if (!chartData.items.length) {
    ctx.fillStyle = "#687987";
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillText("Nessun risultato da mostrare", padding.left, padding.top + 42);
    return;
  }

  const axisItems = chartData.axisItems;
  const readerNames = [...new Set(chartData.items.map((item) => item.readerLabel))].sort((a, b) => a.localeCompare(b));
  const step = axisItems.length > 1 ? plotWidth / (axisItems.length - 1) : 0;
  const xForKey = new Map(axisItems.map((item, index) => [
    item.key,
    axisItems.length > 1 ? padding.left + index * step : padding.left + plotWidth / 2
  ]));

  readerNames.forEach((readerName, readerIndex) => {
    const color = getReaderColor(readerIndex);
    const series = chartData.items
      .filter((item) => item.readerLabel === readerName)
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((item) => ({
        x: xForKey.get(item.key),
        y: padding.top + plotHeight - (item.score / 100) * plotHeight,
        item
      }));

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    series.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    series.forEach((point) => {
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#193044";
      ctx.font = "12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(point.item.score), point.x, point.y - 12);
    });

    drawTrendLine(ctx, series, color);
  });

  drawChartLegend(ctx, readerNames, padding.left, 18);

  ctx.fillStyle = "#687987";
  ctx.font = "12px system-ui, sans-serif";
  ctx.textAlign = "center";
  axisItems.forEach((item, index) => {
    if (axisItems.length > 8 && index % Math.ceil(axisItems.length / 8) !== 0 && index !== axisItems.length - 1) return;
    ctx.fillText(item.label, xForKey.get(item.key), padding.top + plotHeight + 24);
  });

  ctx.textAlign = "left";
}

function clearHistory() {
  const confirmed = window.confirm("Cancellare tutti i risultati salvati in questo browser?");
  if (!confirmed) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(TEXT_READ_COUNTS_KEY);
  localStorage.removeItem(READER_PROGRESS_KEY);
  updateReaderSuggestions();
  populateHistoryReaders();
  renderHistory();
}

function downloadLastResultReport() {
  if (!state.lastResult) return;
  downloadCsv([state.lastResult], `tommy-read-${slugify(state.lastResult.readerName)}-${state.lastResult.day || getLocalDay()}.csv`);
}

function downloadFilteredReportsCsv() {
  const results = getFilteredResults();
  if (!results.length) return;
  const selectedReader = historyReaderSelect.value === "all" ? "tutti" : historyReaderSelect.value;
  const period = historyPeriodSelect.value || "day";
  downloadCsv(results, `tommy-read-resoconti-${slugify(selectedReader)}-${period}.csv`);
}

function downloadCsv(results, filename) {
  const header = [
    "data",
    "lettore",
    "esercizio",
    "testo",
    "sezione",
    "parole_lette",
    "tempo",
    "parole_minuto",
    "errori",
    "accuratezza",
    "bonus_tempo",
    "punteggio",
    "coppa",
    "parole_sbagliate"
  ];
  const rows = results.map((result) => [
    formatDateTime(result.createdAt),
    result.readerName || "",
    result.exerciseName || "",
    result.textTitle || "",
    getResultSectionLabel(result),
    result.wordsRead || 0,
    formatTime(result.elapsedMs || 0),
    result.wordsPerMinute || 0,
    result.errors || 0,
    result.accuracy ?? "",
    result.timeBonus ?? "",
    result.score || 0,
    result.awardLevel || getAwardLevel(result.score || 0),
    getMistakeWordsFromResult(result).join(" ")
  ]);
  const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function buildScoreExplanation(score, timeBonus) {
  if (score >= 90) {
    return `Ottima lettura: pochi errori e buon ritmo. Bonus tempo: ${timeBonus} punti.`;
  }
  if (score >= 70) {
    return `Buon lavoro: il punteggio considera errori, parole lette e tempo usato. Bonus tempo: ${timeBonus} punti.`;
  }
  return `Allenamento completato. Riprovare lo stesso testo puo' aiutare a leggere con meno errori e piu fluidita'. Bonus tempo: ${timeBonus} punti.`;
}

function resetToSetup() {
  showPanel(setupPanel);
  updatePreview();
}

function showPanel(panelToShow) {
  [setupPanel, settingsPanel, readerPanel, resultPanel, historyPanel].forEach((panel) => {
    panel.classList.toggle("hidden", panel !== panelToShow);
  });
}

function getLocalDay() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDay(day) {
  const [year, month, date] = day.split("-");
  return `${date}/${month}/${year}`;
}

function formatDayShort(day) {
  const [, month, date] = day.split("-");
  return `${date}/${month}`;
}

function formatDateTime(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatReportDateCell(result, period) {
  const date = getResultDate(result);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  if (period === "day") {
    return `${hours}:${minutes}`;
  }
  return formatDateTime(result.createdAt);
}

function getResultSectionLabel(result) {
  if (result.sectionLabel && result.sectionRange) {
    return `${result.sectionLabel} (${result.sectionRange})`;
  }
  if (Number.isFinite(result.sectionStart) && Number.isFinite(result.sectionEnd)) {
    const section = result.sectionNumber ? `Sezione ${result.sectionNumber}` : "Sezione";
    return `${section} (Parole ${result.sectionStart + 1}-${result.sectionEnd})`;
  }
  return result.requestedWords === "all" ? "Tutta la storia" : `${result.requestedWords || "-"} parole`;
}

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function slugify(value) {
  return String(value || "lettore")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "lettore";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderMistakeChips(container, words, emptyText) {
  container.innerHTML = "";

  if (!words.length) {
    const empty = document.createElement("span");
    empty.className = "emptyChip";
    empty.textContent = emptyText;
    container.append(empty);
    return;
  }

  words.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "wordChip";
    if (typeof item === "string") {
      chip.textContent = item;
    } else {
      chip.textContent = `${item.word} (${item.count})`;
    }
    container.append(chip);
  });
}

function normalizeWord(word) {
  return String(word)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
}

init();
