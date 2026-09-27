# 1. fejezet · Ügynökalapok

> A „modell mint ágens” paradigmából kiindulva felépíti az **Ágens = LLM + Kontextus + Eszközök** alapképletet, és bemutatja a modellen túli versenyelőnyt jelentő harness-mérnökséget.

← [Vissza a magyar főoldalhoz](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/docs/hu/README.md) · 📖 [A fejezet olvasása](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/book-hu/chapter1.md)

## Hogyan olvassuk a kísérleteket?

A törzsszöveg rövid mechanizmus-skeletonokkal magyarázza a vezérlési folyamatot; a kísérleti könyvtárakban találhatók a teljes SDK-adapterek, naplók, tesztek és átvételi bizonyítékok. Nem kell minden fájlt sorról sorra elolvasni.

- **Starter:** Kezdje a céllal, a minimális paranccsal és az átvételi feltételekkel; induljon innen: [context](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter1/context/);
- **Builder:** Kövesse a belépési pontot, a fő ciklust, az állapot-/üzenetsémát, az eszközöket és az ellenőrzőt.
- **Maintainer:** Végül olvassa el a teszteket, a bizonyíték-manifeszteket, a hibakezelést, a visszaállítási útvonalakat és a provider-adaptereket.

Első olvasáskor átugorható a hitelesítő adatok betöltése, a megjelenítési réteg és a provider-kompatibilitás; a számok reprodukálásakor térjen vissza.

## Kapcsolódó projektek

| Kísérlet | Projekt | Típus | Leírás |
| :--: | --- | :--: | --- |
| 1-1 | [context](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter1/context/) | ✅ | Több LLM-szolgáltatóval végzett ablációs kísérleteken mutatja be a kontextus összetevőinek fontosságát. |
| 1-2 | [web-search-agent](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter1/web-search-agent/) | ✅ | Alapszintű mélykereső ágenst valósít meg többkörös kereséssel és információ-összesítéssel. |
| 1-3 | [search-codegen](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter1/search-codegen/) | ✅ | Webes keresést és kódsandboxot kapcsol össze összetettebb elemzési feladatokhoz. |
| 1-4 | [image-gen-workflow](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter1/image-gen-workflow/) | ✅ | Konkrét és tág igények × munkafolyamat (Kimi K3 átírás + Tongyi Wanxiang) és natív (Gemini / GPT-Image 2) kétútvonalas valós összevetése: konkrét igénynél a natív út a hűsegesebb (a plakátszöveget az átíró csomópont a negatív promptba tette), tág igénynél az átírás jelenetkonkretizálása fantáziát ad, de a GPT-Image 2 önmaga is kiegészíti a nézőpontot – az adapterréteg modell általi interiorizálásának empirikus bizonyítéka. |
| 7-1, 7-2 | [learning-from-experience](https://raw.githubusercontent.com/bojieli/ai-agent-book/HEAD/chapter1/learning-from-experience/) | ✅ | A Q-learninget és az LLM-alapú kontextuson belüli tanulást hasonlítja össze egy kincskereső játékban. |

## Projekttípusok

| Ikon | Típus | Jelentés |
| :--: | --- | --- |
| ✅ | **Önálló** | A teljes kód a repository-ban található, és az API-kulcsok beállítása után futtatható. |
| 📖 | **Reprodukciós útmutató** | Külső repository szükséges, amelyet külön kell `git clone` paranccsal letölteni. |
| 🚧 | **Folyamatban** | Az implementáció vagy az elfogadási bizonyíték még nem teljes. |
