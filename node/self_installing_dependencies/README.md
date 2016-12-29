# Self installing dependencies
This sample includes a simple project that has internal modules (kept in folder `internal_modules`).
The main module and any internal modules may have dependencies.
I did this sample because sometimes developers (or any user of your app) might just forget to perform `npm install` before they can use it.

# The solution
The solution I propose is quite simple. There's an internal module named `install_deps` that check if the main module and all other internal modules
already have their dependencies installed (basically, checking if a folder named `node_modules` exists).
If not, it invokes `npm install` for the main module and each submodule.

# Testing
Just run `node index.js` in the root dir of this sample. It will automatically perform `npm install` wherever its is required.