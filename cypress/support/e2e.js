// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import addContext from "mochawesome/addContext";

Cypress.on("test:after:run", (test, runnable) => {  
  if (test.state === "failed") {    
    const folderName = runnable.invocationDetails.relativeFile.replace('cypress/e2e/', '')
    console.log('folderName', folderName)
    console.log(runnable)
    const screenshot =`assets/${folderName}/${runnable.parent.parent.title ? runnable.parent.parent.title + ' -- ': ''}${runnable.parent.title} -- ${test.title} (failed).png`;    
    console.log(screenshot)
    addContext({ test }, screenshot);  
  }
});

// Alternatively you can use CommonJS syntax:
// require('./commands')