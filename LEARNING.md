# 📚 LEARNING.md — Journal d’apprentissage

Ce document retrace les apprentissages réalisés lors du développement du projet **Ticket Manager** (Backend FastAPI + Frontend React).

L’objectif est de montrer :

- ce que j’ai appris techniquement,
- les problèmes rencontrés,
- comment ils ont été résolus,
- comment un LLM a été utilisé de manière critique.

---

## 🎯 Contexte du projet

Dans l’entreprise, les demandes (bugs, support, améliorations) arrivent via plusieurs canaux (emails, Slack, messages informels), ce qui entraîne :

- pertes d’informations,
- mauvaise priorisation,
- manque de visibilité sur l’avancement.

Le but du projet est de créer un **prototype fonctionnel** pour centraliser les tickets, avec :

- un backend Python (FastAPI),
- un frontend React,
- un stockage simple en fichier JSON (sans base de données).

---

## 🧠 Apprentissages techniques

### 1️⃣ Backend – Python & FastAPI

- Création d’une API REST avec **FastAPI**
- Séparation claire des responsabilités :
  - routes
  - services
  - modèles (Pydantic)
- Manipulation d’un fichier JSON comme stockage persistant
- Mise en place d’un CRUD complet (GET, POST, PATCH, DELETE)
- Ajout de filtres, tri et pagination via query parameters
- Gestion des erreurs HTTP (400, 404, 422)

### 2️⃣ Validation des données avec Pydantic

- Utilisation de `BaseModel`
- Validation stricte avec `Literal`
- Différence entre erreurs backend (422) et erreurs frontend
- Importance de la casse exacte (`In Progress` ≠ `In progress`)

### 3️⃣ Frontend – React

- Création de composants réutilisables :
  - TicketList
  - TicketItem
  - TicketFilters
  - Pagination
  - TicketModal
- Gestion de l’état avec `useState`
- Gestion des effets avec `useEffect`
- Bonnes pratiques :
  - plusieurs `useEffect` avec responsabilités distinctes
  - séparation logique UI / data
- Appels API via `fetch`
- Gestion de la pagination, du tri asc/desc et des filtres
- Création d’un modal pour afficher et modifier un ticket
- UX : loader, messages d’erreur, confirmation de suppression

---

## 🐛 Erreurs rencontrées & corrections

### ❌ Erreur 1 — 422 Unprocessable Entity

**Problème :**
Le backend refusait certaines requêtes PATCH.

**Cause :**
La validation Pydantic est stricte :

```json
"In progress" ❌
"In Progress" ✅
```

**Solution :**
Alignement strict des valeurs côté frontend avec les `Literal` du backend.

---

### ❌ Erreur 2 — Boucle infinie avec useEffect

**Problème :**
Le composant rechargeait les tickets en boucle.

**Cause :**
`setPage()` était appelé dans un `useEffect` qui dépendait de `page`.

**Solution :**
Séparer la logique en deux `useEffect` :

- un pour reset la page,
- un pour charger les données.

---

### ❌ Erreur 3 — Fonction non définie (`onOpen`)

**Problème :**
Erreur JavaScript lors du clic sur un ticket.

**Cause :**
La prop `onOpen` était utilisée mais non passée au composant.

**Solution :**
Ajouter explicitement la prop et vérifier les signatures des composants.

---

## 🤖 Utilisation du LLM (IA)

### Prompt 1 — Génération de tickets JSON

> « Génère 10 tickets réalistes pour une application de gestion de bugs »

---

### Prompt 2 — Compréhension de FastAPI & Pydantic

> « Explique-moi la validation Pydantic avec Literal et Optional »

---

### Prompt 3 — Architecture React

> « Quelle est la bonne pratique pour organiser des composants React avec filtres et pagination ? »

---

### ⚠️ Exemple où le LLM s’est trompé

Le LLM proposait un `useEffect` unique combinant reset page + fetch.

**Vérification :**
Tests manuels et raisonnement sur le cycle de vie React.

---

## 📈 Ce que je retiens

- Importance de la validation backend
- Découpage clair frontend / backend
- L’IA est un assistant, pas une vérité absolue

---

## 🚀 Améliorations possibles

- Authentification (JWT)
- Base de données (Mysql)
- Tests automatisés
- Dockerisation

---

## ✅ Conclusion

Ce projet nous a permis de travailler sur un prototype proche d’un contexte professionnel et de consolider nos compétences en Python, FastAPI et React.
