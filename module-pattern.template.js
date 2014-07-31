/**
 * File: filename.js
 * 
 * AMD module pattern template.
 * Use to start a new module.
 * The filename will be used as the module's include name in requirejs.
 * 
 * @requires requiremodulenamehere
 * 
 * using the requires parameter in comments helps identify which files to include
 * before this file when manually including scripts (<script src="myscrip.js"></script>)
 * 
 * the term library and module are used interchangeably
 * 
 */

//Tip: root is just the window object

(function(root, factory) {
  if (typeof define == 'function' && define.amd)define(['ExistingModule'],factory);
  else  root.ExistingModule = factory(root.ExistingModule);
}(this, function(ExistingModule){
    
    //
    // MODULE AUGMENTATION EXAMPLE
    // 
    // Change an existing module. This means a library will be loaded and then 
    // have something added to it before it is returned to replace the original 
    // library with the new version.
    //
    
        // ExistingModule.myCustomModuleFunction = function(){};

        // return ExistingModule;       //The libraries now has the new function I gave it
    
    //
    // MODULE EXAMPLE
    // 
    // Making your own libary/module. This mean that a new object will be produced.
    // Existing libraries can be loaded so your code can use it.
    //
    
        //var MyNewModuleToExport = {};

        //MyNewModuleToExport.addFunctionsAndStuff = function(){
        //  ExistingModule.someUsefulFunction();
        //};

        //return MyNewModuleToExport;
    

    
}));