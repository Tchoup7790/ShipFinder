# ShipFinder
## Objectif : Créer une interface de simulation de tarif d’expédition
Le but de l’exercice est de créer une interface web et une petite API et de les faire communiquer entre elles.
### Besoins :
En tant qu’utilisateur je souhaite pouvoir récupérer des tarifs d’expédition pour différents pays afin de savoir quelle est la meilleure offre à proposer à mes clients.

___
### Spécifications techniques :
Pour le Front l’interface devra être en VueJS 3 / Typescript / Vuetify.

Les composants utilisés pour créer ton interface doivent être fait avec Vuetify.

Pour le Back l’API devra être construite avec NestJs / Typescript.

Des validateurs de la donnée doivent être mis en place sur la requête de récupération des offres.

Pas besoin de faire une base de données (mais si t’es chaud pour le faire va y), tu peux utiliser uniquement des mocks.
___
### Critères d’acceptation :
Lorsque je renseigne un poids, un pays et des dimensions et que je clique sur “Calculer” alors je peux consulter un maximum de 2 offres parmi les moins chères entre les différents transporteurs. Je dois dans la mesure du possible avoir une offre économique et une express.

Lorsque que je clique sur la liste des transporteurs alors j’ai accès à une liste de transporteurs (Fedex / UPS / Colissimo / Chronopost)

Lorsque je filtre sur un transporteur je reçois uniquement les offres liées à ce transporteur.

Lorsque je clique sur la liste des pays alors j’ai accès à une liste de 5 pays (France, Canada, USA, Belgique, Royaume-uni)

Lorsque je renseigne des dimensions (Longueur / Largeur / Hauteur) alors les champs sont limités (Min: 10 / Max: 100) et l’unité utilisée est le cm.

___
### Précisions sur les données à utiliser :
Les offres sont séparées en deux types : Express et Économique

Les offres Express sont calculées par rapport au poids volumétrique tandis que les offres économiques le sont avec le poids du colis.

Formule pour calculer le poids volumétrique : Longueur x Largeur x Hauteur / 5000

Tu devras tenir compte de cette donnée pour déterminer le tarif et comparer les offres entre elles.

Les transporteurs fonctionnent avec des tranches de poids. Je veux des tarifs pour chacun des transporteurs selon ces tranches de poids (0-250gr / 250-500gr / 500-1kg / 1kg-2kg / 2kg - 10kg).
