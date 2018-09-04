# 3D coding challenge

## Description of the problem and solution.
Basically, the application is a proof of concept to display a baseball bat with a simple animation when the camera is over it.

I addressed the problem of rendering a baseball object by searching an object that looks exactly and also has textures, then loading some libraries where did not added to THREE.js so manipulating and adding textures to the object was managed succesfully.

## Reasoning behind your technical choices, including architectural trade-offs you might have made, anything you left out, or what you might do differently if you were to spend additional time on the project.

About architecture, it was taken keeping in mind the complexity, for this application it was only required a simple `app.js` since no more complex animation are taking place, this file that serves as entrypoint for the app, deals with the application start up and looping.

Just belowe here, there is a demonstration how the architecture looks in terms of folder structuring:

-- src/  
--- app.js/ 
--- app.css/ 
--- index.html

## Link to other code you're particularly proud of.

I would like to share links to repos i proud of, but i have not access to them unfortunately

## Link to your resume or public profile.
https://www.linkedin.com/in/juan-carlos-mejia-ayala-28a613b5/

## Link to the hosted application.
https://still-lake-25646.herokuapp.com/

*Notes

If you're interested in running the project locally, i recommed to install docker and the run it by executing `docker-compose up`, otherwise `yarn dev` can be suitable instead.
