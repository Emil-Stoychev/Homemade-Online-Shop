# Client API Documentation
This is the API documentation where you will be able to find information on all information about the "*Online Shop*" project.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.


### Instalation and start client in client folder:

### To install all dependencies
```bash
npm i
```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Used dependencies:
- angular
- jwt-decode
- emoji-picker-react

# Introduction
The idea of the application is an Online Store where, after successful registration or login, you can browse, buy, like, comment and create your products that you want to sell!

### Different pages
  - Login
  - Register
  - Home
  - Catalog
  - Create
  - Edit
  - Profile
  - Messages
  - Own products
  - Details for product
  - Liked products

# How it works

- [x] **Welcome page**

Every ```guest``` can see a Welcome page with information about the site and some of the best products.

> Path
```
/ - You will receive best of three products from server.
```

- [x] **Catalog page**

Whether you are logged in or not you can see all products with details for every product, but if you not logged in, You do not have permission for functionality.

> Path
```
/catalog - You will receive all products
```

- [x] **Details page**

If you are logged in, you have permission to ```like/unlike``` if you are not the author of product, and to ```add comment``` and ```reply to comment```, also to ```like/unlike comment``` and ```edit/delete``` if you are author of comment! You also can ```buy product``` if you are not author or ```edit/delete``` product if you are!

> Path
```
/catalog/details/:productId - You will receive details for current product
```

- [x] **Create page**

If you are logged in, you can ```create``` your own product with ```title```, ```desc```, ```category```, ```price``` and ```image/s```.

> Path
```
/catalog/create
```

- [x] **Profile page**

if you are logged in, in profile page you can see your information about your account, you can see your ```profile image``` and ```edit``` it, also can see ```count of your own products```, ```liked products```, ```messages``` and your ```cash balance```. You can also ```delete your account```.

> Path
```
/profile
```

- [x] **Messages page**

If you are logged in, in messages page you can see ```your messages``` about ```your activity```. If you make ```edit/delete/create/buy/sold product```, you can see more info there!

> Path
```
/messages
```
