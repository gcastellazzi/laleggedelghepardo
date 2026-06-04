# La Legge del Ghepardo

Piccola app browser per aiutare un bambino a esercitarsi nella lettura.

## Versione web

L'app e' pubblicata con GitHub Pages:

[Apri La Legge del Ghepardo](https://gcastellazzi.github.io/laleggedelghepardo/)

La pubblicazione e' configurata con GitHub Actions in `.github/workflows/pages.yml`.
Dopo ogni push su `main`, GitHub Pages aggiorna il sito con `index.html`, `styles.css` e `app-main.js`.

## Avvio

Apri `index.html` con un browser moderno.

In alternativa, dalla cartella del progetto puoi avviare un server locale:

```sh
python3 -m http.server 8000
```

Poi apri:

```text
http://localhost:8000
```

## Uso

1. Inserisci il nome del piccolo lettore.
2. Scegli il tipo di esercizio.
3. Scegli la storia.
4. Scegli quante parole leggere: 25, 50, 100, 150, 200 oppure tutta la storia.
5. Se la sezione non esaurisce la storia, usa le frecce dell'anteprima per scegliere la sezione successiva o precedente.
6. Imposta le sillabe al secondo. La velocità tiene conto di quante sillabe ha ogni parola: le parole lunghe restano evidenziate più a lungo, quelle corte meno, mantenendo un ritmo di lettura sillabico costante. Un valore più alto significa lettura più veloce.
7. Regola la dimensione del testo guardando l'esempio.
8. Premi `Inizia lettura`.
9. Aspetta il conto alla rovescia `3, 2, 1, Via`.
10. Durante la lettura, clicca o tocca la parola sbagliata. Se clicchi sullo sfondo viene registrata la parola evidenziata.
11. Premi `Finisci lettura` quando il bambino termina.

Il punteggio considera errori, tempo usato e un piccolo bonus se la lettura finisce prima del ritmo impostato in sillabe al secondo.
Ogni risultato viene salvato nello stesso browser con `localStorage`.
Per ogni lettura vengono salvate anche le parole sbagliate, con la posizione nella sezione e nella storia.
Alla fine compare un animale che incoraggia il piccolo lettore. Solo con la coppa d'oro compare anche una coppa grande, con un suono piu' lungo, i coriandoli e un animale esotico sorpresa.
Ogni 5 letture con coppa d'oro per lo stesso lettore compare anche una super coppa enorme con musica di vittoria.

## Impostazioni

Premi `Impostazioni` dalla schermata iniziale per scegliere gli aiuti visivi e il font di lettura:

- campitura azzurra sotto alle parole;
- bordo rosso sulle parole segnate come errore.
- parole gia' lette completamente nascoste invece che grigio chiaro.
- estensione della dimensione testo fino a 72 px. Senza questa opzione il range e' 12-46 px, con default 28 px.
- font di lettura tra Arial, Verdana, Tahoma, Trebuchet MS, Comic Sans MS, Century Gothic, Calibri, Open Sans e font di sistema.

Il font predefinito e' Arial, perche e' un sans-serif semplice, molto diffuso e leggibile. Per un piccolo lettore con DSA non esiste un font migliore per tutti: conviene provare 2-3 font, mantenere una dimensione comoda e scegliere quello con cui il bambino legge con meno fatica.

Le opzioni sono disattivate di default e vengono salvate nello stesso browser.

## Risultati

Premi `Vedi risultati` dalla schermata iniziale o dopo una lettura.

La schermata mostra:

- filtro per lettore;
- grafico con una linea colorata diversa per ogni lettore;
- parole sbagliate piu' spesso;
- tabella cumulativa con numero letture, media punteggio, parole/minuto, errori e parole difficili;
- resoconto di ogni singola lettura, con data, testo, sezione, tempo, parole/minuto, errori, punteggio e parole sbagliate.

Nel grafico giornaliero ogni punto e' una singola lettura, cosi si vede il trend reale durante la giornata. Settimana, mese e anno usano invece il punteggio medio aggregato. La linea tratteggiata mostra il fitting lineare dei risultati per ogni lettore.
Nel resoconto giornaliero le letture dello stesso giorno sono separate e mostrano l'orario della lettura.

I risultati restano salvati solo nel browser usato. Il pulsante `Cancella storico` elimina tutti i risultati locali.
Il pulsante `Scarica resoconti CSV` esporta i resoconti filtrati. Dopo ogni lettura puoi anche scaricare solo il resoconto appena completato.

## Testi inclusi

Esercizi sui suoni e sui gruppi di lettere (digrammi e trigrammi):

- `Suoni C - CA CO CU, CIA CIO CIU`
- `Suoni C/G - CI CE GI GE, CHI CHE GHI GHE`
- `Digramma GN - gnomo, pigna, ragno`
- `Suoni complessi - SC SCE SCI, GL, QU`

Esercizi su difficoltà ortografiche comuni nella lettura per bambini con DSA:

- `Consonanti doppie - palla, gatto, nonna`
- `Accenti e parole tronche - citta', perche', caffe'`
- `Lettere simili - b, d, p, q`

Esercizio di lettura libera:

- `Lettura libera - storie e curiosita'`

I testi sono storie da oltre 200 parole e sono definiti in `app-main.js`, nella costante `exercises`.
La categoria `Storie e curiosita'` include anche partite immaginarie in stile mondiale tra nazionali famose e curiosità su mare, spazio, preistoria e cucina.

Le nuove categorie seguono i protocolli comuni di allenamento alla lettura per bambini con DSA: lavoro sui gruppi consonantici e sui suoni complessi, sulle consonanti doppie, sull'accento tonico e sulla discriminazione delle lettere che si confondono (b/d/p/q). I testi nuovi usano le lettere accentate corrette (è, é, à, ò, ù, ì) per allenare anche il riconoscimento dell'accento.
