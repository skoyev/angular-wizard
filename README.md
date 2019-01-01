# Shipping Label Maker Wizzard Angular/NG Redux SPA Application

Shipping Label Maker is an application that collects shipping information from the user and
prints a shipping label. The heart of the app is a “Wizard” component whose primary
responsibility is to receive a series of steps from its parent and sequencing through them. The
steps will instruct the wizard to move forward or backwards, or end the wizard. The wizard
should not know anything about the business domain. It simply receives a domain object called
wizardContext from the parent and passes it on to the steps. Steps are free to modify the
wizardContext as they collect information from the user. 

Application has consist of the Login and Wizard application pages. Login page authentication required the user name == password. 

Wizard consist of the 4 steps:

Step 1: Enter Sender Address: (name, street, city, state, zip)
Step 2: Enter Receiver Address: (name, street, city, state, zip)
Step 3: Enter Weight Info: (weight)
Step 4: Enter Shipping Option Info: (Ground, Priority)
Step 5: Confirm Shipping Cost (calculation) 

## Technologies/Packagies

    "@angular/animations": "~7.1.0",
    "@angular/common": "~7.1.0",
    "@angular/compiler": "~7.1.0",
    "@angular/core": "~7.1.0",
    "@angular/forms": "~7.1.0",
    "@angular/platform-browser": "~7.1.0",
    "@angular/platform-browser-dynamic": "~7.1.0",
    "@angular/router": "~7.1.0",
    "core-js": "^2.5.4",
    "rxjs": "~6.3.3",

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

