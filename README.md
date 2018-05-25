# Dominic Cicilio's Profolio Website
Site: [dev.ciciliostudio.com](dev.ciciliostudio.com)

**Version 3.0 Beta**

There were three concepts that drove the creation of dev.ciciliostudio.com version 3.0

1) A website that feels alive
1) A simplistic approach
1) A website as a 3D world

Here are the reasons why these were the goals.

## A Website that Feels Alive
Website usability generally feels better when the user gets instant constant instant feedback from the UI. For example, when you finish filling out a username input field and a green checkmark appears next to it. Another example is when an icon does a small "micro expression" such as a small rotation or transition.

I wanted this website to feel inviting to individuals. Create a constant stream of good feelings to the user. 

In order to do this, I create what I am tagging as "Live Icons". This has probably already been done by some other individuals and so I'm not going to say I am not the first. In this context "Live icons" are icons from any icon library (ex: font-awesome) that are used with CSS transitions to create a feeling that the icon is alive. In this website, there are four live icons that each do different things on hover.

On top of the live icons. CSS transitions are used everywhere. In the welcome screen text. In the navigation. One issue to be aware of is that too many CSS transitions at once can cause lag, which takes people out of the illusion that the website is alive.

## A Simplistic Approach
This idea all started when trying to build a website for college swing dance club. I had so many ideas and put together (in my perspective as a web developer) a simplistic Vue.js application run with webpack and easy to execute npm tasks. It was great until I showed it to the person who was going to take over the application.

After trying to set up this project I found out that people who are unfamiliar or just getting started with web-development get quickly overwhelmed with the amount of technology used in modern web development. It also had me stand back an assess if all of this technology was really necessary. Most of the technology actually only helps improve the website a tiny bit.

In the end, I found that the best solution was the use of Visual Studio Code with the Live Server extension, just serving up HTML files, writing SCSS, and only running a small gulpfile that has only 1 task that needs to be run for everything to work. People can create some kick-butt websites from only HTML and CSS. There is no need for a monstrous technology stack in order to create a simple website.

- A blog post will be written on this approach.

## A Website as a 3D world
3D web-development has been a passion of mine for the past two years. With the creation of the WebVR API which is now the WebXR API, the web is starting to break boundaries people previously thought were impossible. I wanted to demonstrate my passion and the capabilities of this new technology.

## Style Guidelines

Sass Naming Convention: BEM 