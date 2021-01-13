# Myndaleit
[Hlekkur](https://main.d3vs3norly6hqz.amplifyapp.com/).
## Almenn virkni
* Sækir myndir frá Google Images API miðað við leitarstreng sem notandi slær inn.
* Birtir myndir í grind, ásamt fyrirsögn og hlekk á uppruna.
* Takki til að láta "Koma sér á óvart" sem sækir orð af handahófi frá öðrum API og slær inn sem leitarstreng.
## Myndaleitin í mynd!
### Aðalvalmynd: 
![Aðalvalmynd](https://i.gyazo.com/c874a3f02013269f0aff23fe8300f2e4.png "Aðalvalmynd")
### Aðalhlaðmynd: 
![Aðalhlaðmynd](https://i.gyazo.com/29daad34cf1274ef31830ef9d13c5e58.png "Aðalhlaðmynd")
### Niðurstöður: 
![Niðurstöður](https://i.gyazo.com/c192a4febf548b010318f0ce347be1cb.png "Niðurstöður")
### Síðuflakk: 
![Síðuflakk](https://i.gyazo.com/0ac9423fbc8f0be28dd95813c606fbca.png "Síðuflakk")

### Komdu mér á óvart
Mig langaði til að hafa einhverja skemmtilega aukavirkni og ein af mínum hugmyndum var þessi. Ég fann ekki API á netinu sem hægt var að kalla á til að 
fá íslenskt orð af handahófi svo ég bjó bara til minn [eigin](https://github.com/Bjarturl/Random_ord_api). Fleiri hugmyndir voru 'Add to favorites' virkni, 'Komdu mér
aftur á óvart' takki sem færir þig beint inn á hlekk einnar niðurstöðu af handahófi o.fl.

## Vandamál
Ég rak mig snemma á það að APInn skilaði misjöfnum niðurstöðum fyrir sama leitarstreng. Til dæmis ef skoðað er myndina fyrir "Aðalhlaðmynd" hér að ofan og borið saman
við niðurstöður er fjöldi niðurstaða misjafn. Þetta er vegna þess að "totalResults" sem APInn skilar breytist hverju sinni. Workaround gæti verið að hafa Infinite Scroll
í staðinn fyrir Pagination og þá mögulega ekki birta fjölda niðurstaða.

## Niðurstaða
Mjög skemmtilegt verkefni og ánægjulegt að fá smá sköpunarfrelsi :)
