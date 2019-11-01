# Film Fest

##  Overview

Film Fest app aims to offer to their userbase a realiable source of information about films and how the public is evaluating them, granting always updated info to them.

# Features

<img src="docimg/screenshots/landing.png"/>

Film Fest app provides updated movie profiles that can be searched by term and genre. Also offers a movie shuffle for those who doesn't know what to see and want to be surprised

<img src="docimg/screenshots/genre-list.png"/>

To unlock other features it is necessary to login

<img src="docimg/screenshots/login.png"/>

In order to deliver a more customized experience, film fest also offers watchlist function to save your favourite movies or those that you want to see in a future.

<img src="docimg/screenshots/watchlist.png"/>
<img src="docimg/screenshots/personal-area.png"/>
<img src="docimg/screenshots/footer.png"/>

# Tech Specs

## Functional Description

<img src="docimg/UseCases.png"/>

>Search, movie specs, genre lists and random movies are ready to use without login. Personal area and watchlist only are reachable and fully functional when we login.

## Technical Description

<img src="docimg/BlockDiagram.png"/>

>Film Fest uses two databases, on one hand uses SKYLABCODERS HEROKUAPP which provides a secure database to store our users information. On the other hand, our other database is THE MOVIE DB which offers updated movie profiles.

<img src="docimg/Components.png"/>

>Film Fest component structure allow to re-utilize them for different uses, like landing component

<img src="docimg/WorkFlow.png"/>

>When we run Film Fest we arrive on landing where Initial Movies logic provides trending movies from now and ever. we can use it as movie searcher, but in order to activate watchlist function it is necessary to register and login.

<img src="docimg/DataModel.png"/>

>App processes are always logged into THE MOVIE DB database in order to offer searchs, querys and movie specs.

<img src="docimg/jasmine.png"/>

>All logic have been tested with Jasmine Framework