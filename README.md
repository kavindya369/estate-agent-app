# Getting Started 
After extracting the ZIP file, you'll need to reinstall the dependencies since the node_modules folder is excluded. To do so, navigate to the project directory and run npm install. Once the installation is complete, start the project using npm start. This will set up the project and launch the development server.


If you encounter dependency conflicts during npm install, use the following commands as workarounds:

First, try running npm install --legacy-peer-deps to resolve conflicts while preserving peer dependency rules.
If the issue persists, use npm install --force to force the installation.