/**
 * File: init.js
 * 
 * initializes the app code
 * 
 * @requires jquery
 * 
 */

//Tip: root is just the window object

(function(root, factory) {
  // LAUNCHER MODULE EXECUTION (EXECUTION CALL)
  // This example launches the factory function without requiring anything.
  // Add your modules/libraries to the array argument.
  // Use this as a main execution of launcher module.
  if (typeof define == 'function' && define.amd) require(['jquery'],factory);
  else  factory(root.$);
  // AUGMENT EXISITING MODULES (EXECUTION CALL)
  // UNCOMMENT BELOW AND COMMENT OUT OTHER EXECUTION CALLS
  // Use this to modify existing libraries
  //if (typeof define == 'function' && define.amd)define(['ExistingModule'],factory);
  //else  root.ExistingModule = factory(root.ExistingModule);
  // CREATE A NEW MODULE (EXECUTION CALL)
  // UNCOMMENT BELOW AND COMMENT OUT OTHER EXECUTION CALLS
  //if (typeof define == 'function' && define.amd)define(['ExistingModule'],factory);
  //else  root.NewModuleName = factory(root.ExistingModule);
}(this, function($){
    
    //This should bring in you main app functions
    //and execute them.
    console.log($.fn.jquery);

}));