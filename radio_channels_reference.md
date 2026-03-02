# 📻 Beautify Channel - Documentazione Logica Canali & Abbonamenti
*(Ultimo Aggiornamento: Marzo 2026)*

Questo file spiega come funziona **ora** il motore dietro le quinte di Beautify Channel. Abbiamo aggiornato il sistema: i canali non sono più "bloccati" direttamente nel codice, ma sono al 100% gestibili da te tramite il **Channel Manager** nel pannello di amministrazione.

---

## ⚙️ I Due Pilastri della Visibilità (Come assegni la musica)

La visibilità dei canali nell'Area Riservata (chi può ascoltare cosa) dipende da due interruttori nel database, controllabili dall'Admin:

### 1. Il "Canale di Default" (Pubblico)
Se dal Channel Manager accendi la levetta **"Canale di Default"** per un canale (es. *Relax*, *Lounge*, *BeautiFy Channel Basic*), questo diventa istantaneamente **visibile e ascoltabile da tutti i clienti paganti o in prova**. È il modo per gestire i classici "6 canali" base in massa.

### 2. "L'Assegnazione Utenti" (Privato / White-Label)
Se un canale **NON** è di Default ma è "Privato", puoi sbloccarlo solo a chi dici tu.
Nel Channel Manager (quando lo attiveremo) ci sarà "Gestisci Assegnazioni", dove potrai mettere la spunta solo su istituti specifici (es. "Salone Zvenia").
Questo ti permette di creare **Canali Brandizzati per singoli Franchising** che nessun altro cliente BeautiFy vedrà mai.

---

## 🔒 Regole di Accesso (Cosa vedono gli utenti)

Ecco cosa succede esattamente quando un cliente fa il login, in base al suo abbonamento:

### 🔴 Utenti "Free" (Non Paganti o Scaduti)
- **Cosa vedono:** Non possono accedere ai canali radio. Vengono bloccati da un **Paywall** "Informativo" (o schermata di pricing) che dice: *"Il tuo periodo di prova o abbonamento è scaduto / non esiste. Procedi all'acquisto o contatta l'assistenza."*
- **Cosa ascoltano:** Niente. Il player non parte per loro.

### 🟡 Utenti "Free Trial" (Prova 7 Giorni)
- **Cosa vedono/ascoltano:** Entrano nell'Area Riservata e hanno l'esperienza completa. Vedono l'Hero Banner grosso in alto ("BeautiFy Channel Basic") e tutti i canali della griglia sottostante che tu hai impostato come **"Canali di Default"** (Relax, Lounge, ecc.).
- **Logica:** Vivi l'esperienza top per 7 giorni. Al termine, l'account viene declassato o scaduto a *Free*, perdendo l'accesso ai player e scontrandosi col Paywall.

### 🔵 Utenti "Basic"
- **Cosa vedono/ascoltano:** Esattamente come il Free Trial. Ascoltano il "BeautiFy Channel Basic" dal banner e tutti gli altri **"Canali di Default"** standard presenti nel catalogo.
- **Logica:** Pagano per avere la tranquillità e l'accesso ininterrotto al servizio base.

### 🟣 Utenti "Premium"
- **Cosa vedono/ascoltano:** Oltre a tutti i **"Canali di Default"** e il banner Basic, gli utenti Premium sono i candidati ideali per canali extra in futuro (Es. *Laser Channel*). Se decidi di vendere un pacchetto superiore, andrai semplicemente a creare quel canale sul DB e attivarlo per loro.

---

> **🚀 Nota per l'Admin (Mirko):**
> Essendo tu l'Admin, hai sempre il potere supremo. Attraverso la pagina `/admin/users`, puoi *cambiare al volo* il ruolo (User/Admin) o l'abbonamento (Free/Trial/Basic/Premium) di un cliente per risolvere problemi o estendere periodi di prova senza toccare righe di codice o database manualmente!
