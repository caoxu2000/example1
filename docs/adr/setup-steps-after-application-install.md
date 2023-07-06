# ADR: Setup Steps After Installing the Stealth Application

1. Install the stealth application from stealthadmin by running the software updater: `sudo software-updater stealthapplication-juno`. To open a stealthadmin terminal from stealth, run `su stealthadmin`, then enter stealthadmin as the password. This will allow you to install the app from stealthadmin without needing to log out and back into stealth.

2. Run the setup script configureApp.sh from the terminal by running `npm run appSetup:make` from the terminal inside the systemTest repo as stealth. This will remove the auto-start capability of the app.