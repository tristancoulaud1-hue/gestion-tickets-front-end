# Ticket Manager - Frontend

Bienvenue sur le Frontend de l'application **Ticket Manager**. Ce projet est une interface moderne développée avec React pour faciliter la gestion, le suivi et l'organisation de tickets de support.

Ce projet fonctionne de pair avec une API Backend.

## 🚀 Fonctionnalités Principales

* **Création de Tickets** : Formulaire intuitif (titre, description, priorité, tags) avec panneau rétractable.
* **Système de Modales** :
    * **Détails** : Consultation des informations complètes sans quitter la liste.
    * **Suppression Sécurisée** : Modale de confirmation (`SuppModal`) pour éviter les erreurs.
* **Filtrage & Tri** :
    * Barre de recherche textuelle.
    * Filtres par **Statut** (Open, In Progress, Done) et **Priorité**.
    * Tri dynamique (Date, Titre, Priorité).
* **UI/UX Moderne** :
    * Indicateurs visuels (Badges de couleur pour les statuts).
    * Utilisation des **Google Material Symbols** (icônes).
    * Design responsive et animations fluides.

## Stack Technique

* **Framework** : [React](https://react.dev/)
* **Build Tool** : [Vite](https://vitejs.dev/)
* **Styles** : CSS3 (Variables, Flexbox, Grid)
* **Icônes** : Google Fonts (Material Symbols Outlined)
* **HTTP Client** : Fetch API native

## Structure du Projet

Voici l'organisation exacte des fichiers sources :

```text
src/
├── components/          # Composants Réutilisables
│   ├── Pagination.jsx   # Gestion des pages (Précédent / Suivant)
│   ├── SuppModal.jsx    # Modale de confirmation de suppression
│   ├── TicketFilters.jsx# Barre de recherche et sélecteurs de tri
│   ├── TicketForm.jsx   # Formulaire de création de ticket
│   ├── TicketItem.jsx   # Ligne unique d'un ticket dans la liste
│   ├── TicketList.jsx   # Composant principal (Logique, État, Affichage)
│   └── TicketModal.jsx  # Affichage détaillé d'un ticket
├── services/
│   └── api.js           # Gestion des appels API (GET, POST, DELETE, PATCH)
├── styles/
│   └── main.css         # Feuille de style globale (Thème & Layout)
├── App.jsx              # Structure de la page (Header + Toggle Formulaire)
└── main.jsx             # Point d'entrée de l'application React

Installation et Démarrage
Prérequis : Assurez-vous d'avoir Node.js installé.

Installation des dépendances :

Bash
npm install
Lancement du serveur de développement :

Bash
npm run dev
L'application sera accessible sur http://localhost:5173 (par défaut).

Connexion au Backend : Le frontend est configuré pour communiquer avec un serveur local sur le port 8000.

Configuration visible dans : src/services/api.js

JavaScript
const API_BASE_URL = "[http://127.0.0.1:8000](http://127.0.0.1:8000)";


Projet réalisé dans le cadre d'un atelier de développement Web Fullstack.