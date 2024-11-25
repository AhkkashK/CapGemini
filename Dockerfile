# Utiliser une image officielle de Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json (si vous avez un fichier package-lock.json)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port sur lequel le serveur écoute
EXPOSE 3000

# Lancer le serveur avec la commande `node server.js`
CMD ["node", "--max-old-space-size=8192", "server.js"]
