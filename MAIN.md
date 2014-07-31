#JavaScript Build Environment

This is a guide to creating a basic JavaScript build environment for a website.

##git
[http://github.com](http://github.com)

Git is a version management tool similar to subversion. Github is an a code repository that 
git will be downloading all of our code from.

###Download and install  
[Download and install](http://git-scm.com/downloads) git.  
Make sure to select any options that 
allow you to use git through the command line (if available).

##node.js
[http://nodejs.org/](http://nodejs.org/)
###Overview

node.js is a command line tool that can execute javascript code. It's base environment needed for everything to execute.  

Every package that you install for node.js will use the package manager command, `npm`  

###Download and install

[download and install node.js](http://nodejs.org)  

##Project Boilerplate  
Having an HTML boilerplate will be handy to test the environment.  

**Clone, copy and configure the HTML5Boilerplate**  
   1. Run this command from your project's root folder:  
      `git clone https://github.com/h5bp/html5-boilerplate.git`  
   2. A new folder is created with the project inside.  
      Copy everything into the project's root folder **EXCEPT** the `.git` folder.  
   3. Now delete the cloned folder.  
   4. Open up `index.html` and get rid of all `<script>` tags. We will be loading Javascript a different way.

##Grunt  
[http://gruntjs.com/](http://gruntjs.com/)
###What the heck is Grunt?

Grunt is used to define and execute instructions, which are called *tasks*. These tasks are the building blocks that form the build process. **Grunt can download, install, and execute plugins that are created for specific tasks, such as compressing a javascript file or checking your code for mistakes**. It can also execute node.js commands, allowing non-plugin tasks to be run. 

###Install  

install [grunt task runner](http://gruntjs.com/) with the command:  
   `npm install -g grunt-cli`  

###Setting up a new project  

To use Grunt in your project you must first set up the appropriate config files and install it.
We'll use some predefined templates to help us get a project going.

   1. Install grunt initialization template plugin with the command:  
   	  `npm install -g grunt-init`
   2. Download and install a basic grunt template with the command:  
      `git clone https://github.com/gruntjs/grunt-init-gruntfile.git %HOMEPATH%/.grunt-init/gruntfile`
   3. Next, navigate the the project's folder in the command line.
   4. See your available templates with the command:  
      `grunt-init`  
      Note the name of the template you wish to use, in this case it's `gruntfile`
   5. Add the template to your project with the command:  
      `grunt-init gruntfile`
   6. Press enter at each prompt to accept the default option.  
   
Two new files have been added to your project.  
`Grunfile.js` is the main configuration file for the project, tasks are defined here.  
`package.json` defines the all the packages that the project needs to run. When you add 
packages to your project, they will be saved here. When installing a project, grunt will 
download these packages to the appropriate location.  

You'll want to **comment out most of the Gruntfile.js `grunt.initConfig` argument**.
Just leave the `meta` and `banner` property for now.

###Installing a project

Installing a project allows grunt to go out and fetch all of its dependencies.  
A new folder named `node_modules` is created to store these files in the root of the project.

Install the project by running the following command from the project's root folder containing `Gruntfile.js`:    
`npm install`  

Your project is now ready to add packages.  

**Install requirejs**  
Add your first project package with the following command:  
`npm install grunt-contrib-requirejs --save-dev`

##Bower  
[http://bower.io/](http://bower.io/)  

###Overview  
Bower will manage open source libraries used in the project
 
###Install  
From the command line, enter:  
`npm install -g bower`

###Setup project with bower
Initializing the project allows installed packages to be recorded and better managed.  
Follow the prompts that follow after entering the following command from the project root folder:  
`bower init`  

- When prompted about modules, select `node`.
- When prompted for keeping the project private, select `Y`  

A `bower.json` file had now been created in the project's root folder. This will keep track 
of Bower's dependencies.  

###Use  
Use the link above for syntax on install libraries.  
For this project, we're going to install a couple libraries.  
`bower install reqiurejs --save-dev`  
Include the script in `index.html`:  
`<script src="bower_components/requirejs/require.js"></script>`

##Bower tools for Grunt

A few tools for Grunt will help us leverage some power from Bower.  

###Add requirejs tools

**Install**  
`npm install grunt-bower-requirejs --save-dev`  

**Configure**  
Add this object to `Grunfile.js` file's `grunt.initConfig({})` object and set the `rsConfig` property to the config file you will to create. `baseUrl` should be set to `js/`, where all 
the modules created for this project will be.  

    bower: {
       target: {
          rjsConfig: 'requireConfig.js',
          options:{
            baseUrl:'js/',
			exclude:['almond']
		  }
       }
    }  

Add this line after grunt.initConfig({}):  
`grunt.loadNpmTasks('grunt-bower-requirejs');`  

And add the bower task to the default task:
`grunt.registerTask('default', ['bower']);`  
This means that when the default task runs, the bower task is included.  
The default task is the `grunt` command

Execute this command to generate the requirejs configuration.  
`grunt bower`  

Create a file name `.bowerrc` and add this as the contents:  

     {
        "scripts": {
           "postinstall": "grunt bower"
        }
     }

This will run the task every time a new library is added through bower!

##Using requirejs  

Requirejs is a library that allows files to be explicitly included in AMD modules.  
Start by creating an initialization module that will be responsible for launching the app.  

   - Use the `module-pattern.template.js` file as a template.  
   - Duplicate and rename it to `init.js`.  
   - Modify the script to simply execute.  
     See the `init.js` example in this project, but the template should be good enough.

Include your configuration script from the previous steps.  
`<script src="requireConfig.js"></script>`  

and then include the `init.js` file just created.  
`<script src="init.js"></script>`  

If you launch `index.html` the code in `init.js` will execute withing the requirejs environment.  

Let's try adding a library to the project. In the command line enter the following:  
`bower install jquery --save-dev`

Now make your init file load the jquery library:

    /**
    * File: init.js
    * 
    * initializes the app code
    * 
    * @requires jquery
    */

    //Tip: root is just the window object

    (function(root, factory) {
       // LAUNCHER MODULE EXECUTION (EXECUTION CALL)
       // Add your modules/libraries to the array argument.
       // Use this as a main execution of launcher module.
       if (typeof define == 'function' && define.amd) require(['jquery'],factory);
       else  factory(root.$);
    }(this, function($){
    
    //This should bring in you main app functions
    //and execute them.
    console.log($.fn.jquery);

    }));   

Config grunt to compile javascript payload with requirejs  

**Install almond**  
This is just a version of requirejs that was meant to be compiled.  
`bower install almond --save-dev`  

**Add build path**  
Add a folder named `build` in the root of the project.

**Add requirejs build configuration**
Add this to the Gruntfile  

    requirejs: {
      compile: {
        options:{
        	//path to the grunt-bower-requirejs generated config.js file
        	mainConfigFile:'requireConfig.js',
            optimize:'none',
			//name of the launch script that declares the main dependencies to compile                                                 
            include:['../init'],
			//inserts function to launch itself                                                 
            //insertRequire: ['../init'],   
            //AMD launcher library                             
            name:'../bower_components/almond/almond',
            //compiled output file path and name                                                                                                                                                  
            out:'build/build.js',   
            //keeps global namespace pristine                                        
            wrap:false                                                           
        }
      }
    }

Add this line near the other `loadNpmTasks` function calls.  
`grunt.loadNpmTasks('grunt-contrib-requirejs');`