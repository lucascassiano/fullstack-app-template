# A fully integrated React + Express server, bundled by Parcel
[screenshot]: https://github.com/lucascassiano/fullstack-app-template/raw/master/screenshot.png "Screenshot"

* React
* Express server
* Parcel Bundler /*enables imports of*/
    * images (.svg, .png, .jpeg)
    * WebGL Files (.obj, .vert, .frag, .mat...)
    * CSS, LESS
* Auto-reloading Express server
* [react-hot-loader](https://github.com/gaearon/react-hot-loader) (version 3) running on Parcel
* Babel 7.1.0 for both React frontend **and** Express backend

## Roadmap
   1.✅ Back-end Live-reload ♻️
   2.✅ Parcel Bundler + Express Server + React implementation
   3.✅ Front-end Live-reload ♻️
   4. Postgres Connection 🐘
   5. GraphQL Integration 
   6. Modular GraphQL
   7. React Routers

### Install and run
In development:

```
npm install
npm start
```

In production: (if Using Google Cloud AppEngine)

```
npm run build
gcloud app deploy
```

## Authors

* [Lucas Cassiano](http://lcassiano.com)

## License
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) file for details
