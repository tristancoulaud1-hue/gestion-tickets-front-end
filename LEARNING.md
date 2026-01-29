# 📚 LEARNING.md — Journal d’apprentissage

Ce document retrace les apprentissages réalisés lors du développement collectif du projet **Ticket Manager** (Backend FastAPI + Frontend React).

L’objectif est de montrer :
- Ce que **nous** avons appris techniquement.
- Les problèmes que **nous** avons rencontrés et leurs résolutions.
- Comment **nous** avons utilisé un LLM de manière critique.

---

## 🎯 Contexte du projet

Le but de notre projet est de créer un **prototype fonctionnel** pour centraliser les tickets (bugs, support, améliorations) afin d'éviter les pertes d'informations et le manque de visibilité, avec :
- Un backend Python (FastAPI).
- Un frontend React.
- Un stockage simple en fichier JSON.

---

## 🧠 Apprentissages techniques

### 1️⃣ Backend – Python & FastAPI
- **Architecture** : Nous avons appris à créer une API REST structurée avec FastAPI.
- **Organisation** : Nous avons séparé les responsabilités entre les routes, les services et les modèles Pydantic.
- **Persistance** : Nous avons manipulé un fichier JSON pour simuler une base de données persistante.
- **Logique métier** : Nous avons implémenté un CRUD complet incluant des filtres complexes, le tri et la pagination.

### 2️⃣ Frontend – React & UI/UX
- **Composants atomiques** : Nous avons découpé l'interface en petits composants réutilisables (`SuppModal`, `TicketItem`, `Pagination`) pour faciliter la maintenance.
- **Sécurisation des actions** : Nous avons mis en place un workflow de "double validation" via une modale de confirmation personnalisée pour éviter les suppressions accidentelles.
- **Enrichissement visuel** : Nous avons intégré les **Google Material Symbols** via CDN pour rendre l'interface plus intuitive.
- **Styles dynamiques** : Nous avons utilisé des variables CSS et des classes conditionnelles pour colorer les tickets selon leur statut ou leur priorité.

---

## 🛠 Problèmes rencontrés & Solutions

### ❌ Erreur 1 — Problème de typage JSON
**Problème :** Les IDs des tickets passaient parfois de `int` à `str` après l'enregistrement.
**Solution :** Nous avons forcé le typage dans le service Backend et vérifié que le Frontend envoyait les données au bon format.

### ❌ Erreur 2 — La Pagination "Fantôme"
**Problème :** La page 1 ne se rechargait pas lors d'un changement de filtre.
**Solution :** Nous avons séparé la logique en deux `useEffect` distincts (un pour réinitialiser la page, un pour charger les données).

### ❌ Erreur 3 — Propagation des événements (Event Bubbling)
**Problème :** En cliquant sur le bouton "Supprimer", la modale de détails du ticket s'ouvrait aussi.
**Cause :** L'événement de clic remontait du bouton vers le parent `<li>`.
**Solution :** Nous avons ajouté `e.stopPropagation()` sur tous les éléments cliquables internes pour isoler les actions.

---

## 🤖 Utilisation du LLM (IA)

### Prompt 1 — Architecture React
> « Quelle est la bonne pratique pour organiser des composants React avec filtres et pagination ? »

### Prompt 2 — Refactoring & UX
> « Comment transformer un simple bouton texte en bouton avec icône Google Material sans casser mon layout Flexbox ? »

### Prompt 3 — Sécurité UI
> « Nous voulons créer une modale de confirmation de suppression sans bibliothèque externe, comment passer les données du ticket proprement ? »

### ⚠️ Exemple où le LLM s’est trompé
L'IA nous a initialement proposé de créer un fichier CSS par composant, ce qui aurait dispersé notre code.
**Notre décision :** Nous avons choisi de centraliser les styles dans `main.css` avec des variables pour garder une cohérence globale plus simple à gérer à deux.

---

## 📈 Ce que nous retenons

- **L'importance du feedback** : Une application doit prévenir l'utilisateur avant une erreur (modale) et être claire visuellement (icônes).
- **Le travail d'équipe** : La séparation nette entre le Backend et le Frontend nous a permis de progresser en parallèle efficacement.
- **L’IA comme assistant** : Elle nous fait gagner du temps sur la syntaxe, mais nous restons les architectes des choix finaux.