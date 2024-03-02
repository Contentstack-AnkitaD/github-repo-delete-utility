To generate a personal access token (PAT) on GitHub, follow these steps:

Navigate to GitHub Settings:
Go to the Settings page of your GitHub account. You can access it by clicking on your profile picture in the top-right corner of GitHub and selecting "Settings" from the dropdown menu.

Access Developer Settings:
In the Settings page, scroll down the left sidebar and click on "Developer settings".

Generate New Token:
Under Developer settings, click on "Personal access tokens".

Choose Classic Tokens
Click on second option, Tokens (classic).

Generate New Token:
Click on the "Generate new token" button. & choose 'Generate New Token(Classic)'

Provide Token Description:
Enter a description for the token so you can identify its purpose later. `Delete github repo script`

Select Scopes:
Choose the scopes (permissions) for the token based on what you intend to do with it. For this script, you'll likely need permissions related to repositories, such as `repo : Full control of private repositories` & `delete_repo : Delete repositories`

Generate Token:
Click on the "Generate token" button.

Copy Token:
Once the token is generated, GitHub will display the token value. Copy this token and store it securely. You won't be able to see the token again once you leave this page.

Use Token:
In your script or application, use this token as the auth parameter when authenticating with the GitHub API.

Keep Token Secure:
Treat your personal access token like a password and do not share it with anyone or expose it in public repositories.

Remember to regenerate your token if you believe it has been compromised or if you no longer need it.
