Je aanpassingen zitten nu in de **HEAD** van je lokale werk-repository.  
Om deze aanpassingen door te sturen naar je repository op een andere lokatie, voer dan volgend commando uit  
`git push origin master`  
Verander _master_ naar de branch-naam  
waar je je aanpassingen naar wil sturen.

Als je lokale werkbestanden niet gesynchroniseerd zijn  
met een bestaande repository (op een andere server bijvoorbeeld),  
voeg dan de bestaande repository toe aan je lokale repository  
`git remote add origin <server>`  
Nu kan je je lokale aanpassingen, en dus ook je lokale repository, synchroniseren met de server die je net hebt toegevoegd.
