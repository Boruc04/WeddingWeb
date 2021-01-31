# Wedding Web

Application build for the purpose of my own wedding over time evolved into small training project, where I can try and test new technologies.

![Wedding web main page](img/main_page_image.PNG)

## Build Status

| Application | Build Status | CodeQL |
|-------------|--------------|--------|
| WeddingWeb | [![Build Status](https://dev.azure.com/Boruc/WeddingWeb/_apis/build/status/Boruc04.WeddingWeb?branchName=master)](https://dev.azure.com/Boruc/WeddingWeb/_build/latest?definitionId=8&branchName=master) | ![CodeQL](https://github.com/Boruc04/WeddingWeb/workflows/CodeQL/badge.svg) |

## Technology involved

The aim of the application is to test the latest available technology but currently it is using

- .NET Core 3.1
- Angular 11
- Azure Web Apps

## Getting Started

Application can be started with an F5 experience right after cloning repo.

## Architecture overview

TODO: provide the architecture diagram

## Branching strategy

The main branch is the [master](https://github.com/Boruc04/WeddingWeb/tree/master) branch, all features/bugfixes/hotfixes should be created out from the master branch.

Branching strategy follows the [Microsoft Release Flow](https://docs.microsoft.com/azure/devops/learn/devops-at-microsoft/release-flow) - the purpose of that exercise is to test it in the real scenario.

## Future plans

- introduce Key Vault
- introduce CI/CD for release branch.
- gallery with authentication via AAD
- video share with authentication via AAD
- separate apps
- containerize apps
