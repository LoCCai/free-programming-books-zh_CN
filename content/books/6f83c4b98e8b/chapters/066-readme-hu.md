# 3. fejezet · Felhasználói memória és tudásbázis

> Lehetővé teszi, hogy az ágens munkameneteken át emlékezzen a felhasználóra, és memórián, RAG-on, strukturált indexeken és tudásgráfokon keresztül külső tudáshoz férjen hozzá.

← [Vissza a magyar főoldalhoz](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/docs/hu/README.md) · 📖 [A fejezet olvasása](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/book-hu/chapter3.md)

## Hogyan olvassuk a kísérleteket?

A törzsszöveg rövid mechanizmus-skeletonokkal magyarázza a vezérlési folyamatot; a kísérleti könyvtárakban találhatók a teljes SDK-adapterek, naplók, tesztek és átvételi bizonyítékok. Nem kell minden fájlt sorról sorra elolvasni.

- **Starter:** Kezdje a céllal, a minimális paranccsal és az átvételi feltételekkel; induljon innen: [user-memory](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/user-memory/) / [retrieval-pipeline](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/retrieval-pipeline/);
- **Builder:** Kövesse a belépési pontot, a fő ciklust, az állapot-/üzenetsémát, az eszközöket és az ellenőrzőt.
- **Maintainer:** Végül olvassa el a teszteket, a bizonyíték-manifeszteket, a hibakezelést, a visszaállítási útvonalakat és a provider-adaptereket.

Első olvasáskor átugorható a hitelesítő adatok betöltése, a megjelenítési réteg és a provider-kompatibilitás; a számok reprodukálásakor térjen vissza.

## Kapcsolódó projektek

| Kísérlet | Projekt | Típus | Leírás |
| :--: | --- | :--: | --- |
| 3-1, 3-2 | [user-memory](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/user-memory/) | ✅ | Hosszú távú felhasználói memóriát épít a preferenciákhoz és az interakciós előzményekhez. |
| 3-1 | [user-memory-evaluation](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/user-memory-evaluation/) | ✅ | A felhasználói memóriarendszerek pontosságát, relevanciáját és hatékonyságát értékeli. |
| 3-2 | [mem0](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/mem0/) · [memobase](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/memobase/) | ✅ | A Mem0 és Memobase keretrendszerekkel készült memóriaimplementációkat hasonlítja össze. |
| 3-3 | [log-sanitization](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/log-sanitization/) | ✅ | Helyi modellel észleli és maszkolja a naplókban lévő titkokat és személyes adatokat. |
| 3-4 | [dense-embedding](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/dense-embedding/) | ✅ | Az ANNOY és HNSW közelítő legközelebbi szomszéd indexeket hasonlítja össze. |
| 3-5 | [sparse-embedding](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/sparse-embedding/) | ✅ | Ritka vektoros, BM25-alapú keresőmotort valósít meg az alapoktól. |
| 3-6 | [retrieval-pipeline](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/retrieval-pipeline/) | ✅ | A sűrű és ritka visszakeresést neurális újrarangsorolással egyesíti. |
| 3-7 | [structured-index](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/structured-index/) | ✅ | A RAPTOR és GraphRAG strukturált indexelési megközelítéseit veti össze. |
| 3-8 | [agentic-rag](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/agentic-rag/) | ✅ | A hagyományos RAG-ot hasonlítja össze az iteratív visszakeresést végző Agentic RAG-gal. |
| 3-9 | [agentic-rag-for-user-memory](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/agentic-rag-for-user-memory/) | ✅ | Agentic RAG-ot alkalmaz munkameneteken átívelő beszélgetési előzmények visszakeresésére. |
| 3-10 | [contextual-retrieval](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/contextual-retrieval/) | ✅ | Kontextuselőtagot ad a szövegrészletekhez a visszakeresési hibák csökkentésére. |
| 3-11 | [contextual-retrieval-for-user-memory](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/contextual-retrieval-for-user-memory/) | ✅ | Az Advanced JSON Cards és Contextual RAG megoldásokat kétrétegű memóriává egyesíti. |
| 3-12 | [structured-knowledge-extraction](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter3/structured-knowledge-extraction/) | ✅ | Döntési tényezőket és esetprototípusokat nyer ki bírósági határozatok adathalmazából. |

## Projekttípusok

| Ikon | Típus | Jelentés |
| :--: | --- | --- |
| ✅ | **Önálló** | A teljes kód a repository-ban található, és az API-kulcsok beállítása után futtatható. |
| 📖 | **Reprodukciós útmutató** | Külső repository szükséges, amelyet külön kell `git clone` paranccsal letölteni. |
| 🚧 | **Folyamatban** | Az implementáció vagy az elfogadási bizonyíték még nem teljes. |
