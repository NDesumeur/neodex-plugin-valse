# Valse

Un jeu de rythme à une seule touche, dans le ciel de nuit : le soleil et la lune tournent l'un autour de l'autre sur un chemin de dalles. Au moment où l'astre qui tourne touche la dalle suivante, tape : il se pose, et c'est l'autre qui se met à tourner. Le chemin est dessiné par la musique. Joue les 1200 morceaux du plugin Rythme, ou ta propre musique.

*English version: [README.en.md](README.en.md)*

## Comment jouer

- **N'importe quelle touche** (lettres, flèches, Entrée) ou un **clic** : poser l'astre sur la dalle dorée.
- **Lire le chemin** : l'astre tourne d'un demi-tour par temps. Une **ligne droite** dure donc un temps, un **virage à angle droit** un demi-temps, un **virage serré** un quart de temps.
- **Trois points bleus** sur une dalle : l'astre y tourne plus lentement (une longue pause dans la musique).
- **Une boucle rose** : l'astre change de sens de rotation.
- Une dalle ratée devient rouge, mais la partie continue : l'astre suit toujours la musique.
- **Espace** : jouer · **P** : pause · **Plein écran** pendant la partie.

## Précision et points

Les notes sont jugées selon l'écart avec le bon moment : **Parfait** (environ ±45 ms), **Bien** (±90 ms), **OK** (±140 ms), sinon raté.

Les points d'une note augmentent de 1 % par note de combo, jusqu'au double à 100 notes de suite ; une note ratée remet le combo à zéro. À la fin, la précision donne une note : **S** à partir de 95 %, **A** à 90 %, **B** à 80 %, **C** à 70 %, **D** en dessous.

## Chansons et difficulté

L'onglet **Chansons** reprend les 1200 morceaux de Rythme, en quatre difficultés (Facile, Normal, Difficile, Expert). La difficulté de chaque niveau est calculée d'après ses notes (densité, passages chargés), de 1 à 10 étoiles.

## Mes musiques

Dans **Mes musiques**, crée un niveau à partir d'un **fichier audio** importé ou d'une musique de ta bibliothèque **NeoMusic** : le jeu trouve son tempo et ses temps forts et en fait un niveau, à la **difficulté** choisie (1 à 10 étoiles).

## Réglages

- **Volume** de la musique.
- **Son des clics** : le son joué à chaque note touchée, au choix parmi 10 (Doux, Clap, Bois, Grosse caisse, Cristal, Pop, Charleston, Caisse claire, Pluck, Tok) ou aucun. Perdre un combo de 10 ou plus joue un son « combo cassé ».
- **Décalage** (−300 à +300 ms) : il se règle tout seul après chaque partie selon ton retard ou ton avance moyens ; tu peux aussi le changer à la main.

## Données et synchronisation

Tes scores et notes par niveau et tes réglages sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Valse → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).

## Nouveautés de la version 1.1.0

- **Manette** : la croix, A, B, X, Y et les gâchettes hautes posent l'astre ; Start lance le morceau (A aussi, hors partie) ; Select met en pause.
- **Courbe de précision** sur l'écran de fin : ta justesse tout au long du morceau, avec les notes ratées marquées en rouge dessous, pour voir où tu as décroché.
