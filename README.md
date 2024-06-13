# ESAT Project

This project is a full-stack web application using Angular for the frontend and .NET Core 6 with Entity Framework Core 6 and SQL Server for the backend. The application manages customer data and their related details.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Project](#running-the-project)
- [License](#license)

## Technologies Used

- **Frontend**: Angular 14
- **Backend**: .NET Core 6 with Entity Framework Core 6
- **Database**: Microsoft SQL Server

## Project Structure
/project-root
/BackEnd
/ESAT-backend
Controllers/
Models/
Data/
...
/FrontEnd
/ESAT-front
src/
angular.json
package.json
...
.gitignore
README.md

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (with npm)
- **Angular CLI**
- **.NET Core SDK**
- **SQL Server**

## Setup Instructions

### Backend

1. **Navigate to the backend directory:**
   ```sh
   cd BackEnd/ESAT-backend
   ```
2. **Restore NuGet packages:**
    ```sh
    dotnet restore
    ```
3. **Update the database:**
    ```sh
    dotnet ef database update 
    ```
### Frontend

1. **Navigate to the frontend directory:**
    ```sh
    cd FrontEnd/ESAT-front
    ```
2. **Install npm packages:**
    ```sh
    npm install
    ```
2. **Open your browser and navigate to http://localhost:4200**
3. **Change apiUrl in environments/environment.ts to your api url**
