# today i like

today i like

Ist ein Webanwendung, bei der Leute eintragen können was sie heute gut finden.

Grundidee:

Die Startseite bietet ein einfaches Formular [today i like: …]
Dazu ein Name, mehr nicht.

Sitemap:

home, mit today i like form, werden in der mongo db gespeichert
likes, hier werden die likes des tages random angezeigt.
contact, hier gibt es ein contact formular
shirts, hier wird es shirts mit den besten i like sprüchen geben, mit random design

Im weiteren verlauf der Entwicklung wird es die möglichkeit geben, sich einen Account zu machen und ein Profil zu haben, hier wird man seine bisherigen daily likes sehen.

Es wird die Möglichkeit geben sich mit anderen Leuten zu verbinden, die in der gleichen Stadt sind und die gleichen daly likes haben.

Eine Chat Funktion wird später im Verlauf der Entwicklung hinzugefügt.

Das Design:

Grundlegend ist das Design in Schwarz und Weiß gehalten.
Es soll minimalistisch und kontrastreich sein.


## How to Clone and Run the App Properly
If you have [node](http://nodejs.org/) you can install with [npm](http://npmjs.org) as node-modules folder is not uploaded to manage the size of the project.
```
npm install
```
After creating node-modules, you can run the web app by using package script:
```
npm start
```
Or Simply run:
```
node main.js
```

## Current Update
```
Switch to branch Sprint01 to check the latest progress (02. June 2020)
```
today i like


## Work Flow for Developers
If it's the first time:
```
git clone <repo url>
```
If not, it's always best to first pull new commits from the repo (Whenever switching to an existing branch, it's always good to pull first):
```
git pull
```
Then switch to the branch you want to work on, usually better to create a new branch for the story:
```
git branch <branch name>
```
Then switch to the newly created branch:
```
git checkout <branch name>
```
If the terminal shows you have uncommited changes so you can't switch branch, you can usually store/stash it first:
```
git stash save <name of the stashed content>
```
You can still get it back later by:
1. check what number the stashed content is:
```
git stash list
```
2. Then apply it back
```
git stash apply stash@{numberhere}
```
If you want to delete a branch locally (!do with caution!)
```
git branch -d <branch name>
```
Or remotely:
```
git push origin --delete  <branch name>
```
