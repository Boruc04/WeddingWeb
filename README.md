# Wedding Web

Application build for the purpose of my own wedding over time evolved into small training project, where I can try and test new technologies.

![Wedding web main page](img/main_page_image.PNG)

## Build Status

| Application | Build Status |
|-------------|--------------|
| WeddingWeb | [![Build Status](https://dev.azure.com/Boruc/WeddingWeb/_apis/build/status/wedding-web-master?branchName=master)](https://dev.azure.com/Boruc/WeddingWeb/_build/latest?definitionId=31&branchName=master) | 

## Technology involved

The aim of the project is to test and learn the latest technology. Some of those currently used:

- .NET 5.0
- Angular 11 (LTS packages if possible)
- Azure
- Terraform

## Getting Started

### Visual Studio (F5 experience)

- clone repository
- open project in Visual Studio
- run project

## Architecture overview

TODO: provide the architecture diagram

## Development

The branching strategy follows the [GitHub Flow](https://guides.github.com/introduction/flow/)

- `master`: Contains the latest stable code, all PRs must be against it.

Any other branch is considered temporary and could be deleted at any time.

### Renew TLS/SSL certificate

Please follow [the instruction](infrastructure/cert/renew-certificate.md) to be able to renew certificate.

### Prepare photo gallery

- Adjust dates on photos so they can be easily sorted, download [BulkFileChanger](https://www.nirsoft.net/utils/bulk_file_changer.html).
- Rename files so they will all use guid, use command bellow.

```ps
 ls | %{Rename-Item $_ -NewName ("$(New-Guid).jpg")}
```

## Future plans

- introduce terraform
- gallery with authentication via AAD
- video share with authentication via AAD
- separate apps
- containerize apps
- introduce automatic TLS/SSL cert renewal

## Credits

- [.NET Microservices Sample Reference Application - eShopOnContainers](https://github.com/dotnet-architecture/eShopOnContainers/) it is a great inspiration for all the work that I'm doing.
- [BenjaminBrandmeier/angular2-image-gallery](https://github.com/BenjaminBrandmeier/angular2-image-gallery) I've used the source code from the angular2-image-gallery rather than npm package because of lack of compatibility with the Angular@11.
