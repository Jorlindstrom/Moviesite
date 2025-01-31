import express from "express";
import { engine } from "express-handlebars";

function initApp(api) {
  const app = express();

  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", "./templates");

  app.get("/", async (request, response) => {
    response.render("index", {
      layout: "index-layout",
      title: "Retro - biografen som visar filmer från förr -",
      description:
        "Retro biografen ligger i västerås och visar filmer från förr",
      keywords:
        "Biograf,retro, 50-tal, 70-tal, 80-tal, 90-tal, 00-tal, Västerås",
    });
  });

  app.get("/about", async (request, response) => {
    response.render("about", {
      layout: "about-layout",
      title: "Om ossida",
      description:
        "Retro biografen ligger i västerås och visar filmer från förr",
      keywords:
        "Biograf,retro, 50-tal, 70-tal, 80-tal, 90-tal, 00-tal, Västerås",
    });
  });

  app.get("/contact", async (request, response) => {
    response.render("contact", {
      layout: "contact-layout",
      title: "Kontaktsida",
      description:
        "Retro biografen ligger i västerås och visar filmer från förr",
      keywords:
        "Biograf,retro, 50-tal, 70-tal, 80-tal, 90-tal, 00-tal, Västerås",
    });
  });

  app.get("/cafe", async (request, response) => {
    response.render("cafe", {
      layout: "cafe-layout",
      title: "Kafesida",
      description:
        "Retro biografen ligger i västerås och visar filmer från förr",
      keywords:
        "Biograf,retro, 50-tal, 70-tal, 80-tal, 90-tal, 00-tal, Västerås",
    });
  });

  app.get("/movies", async (request, response) => {
    try {
      const movies = await api.loadMovies();
      response.render("movies", {
        layout: "movies-layout",
        title: "Filmsida",
        description:
          "Retro biografen ligger i Västerås och visar filmer från förr",
        keywords:
          "Biograf,retro, 50-tal, 70-tal, 80-tal, 90-tal, 00-tal, Västerås",
        movies, // Skicka filmerna till Handlebars
      });
    } catch (error) {
      console.error("Error fetching all movies:", error);
      response.status(500).send("Error fetching all movies.");
    }
  });

  app.get("/movies/:movieId", async (request, response) => {
    try {
      const movie = await api.loadMovie(request.params.movieId);

      if (!movie) {
        return response.status(404).render("404", {
          layout: "main", // Standardlayout or no layout at all
          title: "404 - Page Not Found",
        });
      }

      response.render("movie", {
        layout: "movie-layout",
        title: movie.title,
        description:
          "Retro biografen ligger i Västerås och visar filmer från förr",
        keywords:
          "Biograf,retro, 50-tal, 70-tal, 80-tal, 90-tal, 00-tal, Västerås",
        movie, // Send movie to handelbars
      });
    } catch (error) {
      console.error("Error fetching the movie:", error);
        response.status(500).render('500', {
          layout: "main",
          title: "500 – Internal Server Error",
        })
    }
  });

  app.use("/static", express.static("./static"));

  return app;
} //ends initApp

export default initApp;
