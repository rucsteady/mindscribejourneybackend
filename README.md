# today i like

today i like

Is a web application where people can enter what they like today.

Basic idea:

The start page offers a simple form [today i like: ...] Plus a name, nothing more.

sitemap:

home, with today i like form, are stored in the mongo db likes, here the likes of the day are randomly displayed. contact, here is a contact formular shirts, here will be shirts with the best i like sayings, with random design

In the further course of development there will be the possibility to create an account and to have a profile, here you will see your daily likes.

There will be the possibility to connect with other people who are in the same city and have the same daly likes.

A chat function will be added later in the development.

The design:

The basic design is in black and white. It should be minimalistic and rich in contrast.


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
