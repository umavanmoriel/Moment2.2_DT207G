
# Webbplats

Webbplats för att hantera anställda. Webbplatsen kommunicerar med en REST-webbtjänst via Fetch API.

# Videodemonstration

Denna webbplats redovisas via video-demonstration : (Länk)[https://www.youtube.com/watch?v=lzFV2SV3oww]

# DT207G Moment 2.2

En webbplats som hanterar arbetserfarenheter. Webbplatsen kommunicerar med en REST-webbtjänst via Fetch API.


## Sidor

| Sida | Beskrivning |
|------|-------------|
| index.html | Visar alla arbetserfarenheter i en tabell. Kan ta bort poster. |
| add.html | Formulär för att lägga till nya arbetserfarenheter. |
| about.html | Information om webbplatsen, databasen och slutsatser. |

## Funktioner

| Metod | Beskrivning |
|-------|-------------|
| GET | Hämtar alla arbetserfarenheter från webbtjänsten |
| POST | Lägger till en ny arbetserfarenhet |
| DELETE | Tar bort en arbetserfarenhet |

## Teknik

- HTML
- CSS
- JavaScript (Fetch API)

## Installation

1. Klona repot:
   ```
   git clone https://github.com/umavanmoriel/Moment2.2_DT207G.git
2. Gå in i mappen:
   ```
   cd Moment2.2_DT207G
   ```

3. Installera beroenden:
   ```
   npm install
   ```

4. Starta utvecklingsservern:
   ```
   npm run start
   ```

5. Öppna webbläsaren på `http://localhost:1234`
