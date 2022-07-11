// Handles SPA routing

const pageTitle = "Study Spotter"

document.addEventListener("click", (e) => {
    const {target} = e;
    if (!target.matches("a")) {
        return;
    }
    e.preventDefault();
    hashRoute(); 
})

const routes = {
    404: {
        template: "/templates/404.html",
        title: "404 | " + pageTitle,
        description: "Page not found"
    },
    "/": {
        template: "/templates/index.html",
        title: "Home | " + pageTitle,
        description: "this is the homepage"
    },
    ucla: {
        template: "/templates/colleges/ucla.html",
        title: "UCLA | " + pageTitle,
        description: "UCLA page"
    },
    ucsd: {
        template: "/templates/colleges/ucsd.html",
        title: "UCSD | " + pageTitle,
        description: "UCSD page"
    },
    reviews: {
        template: "/templates/reviews.html",
        title: "Reviews | " + pageTitle,
        description: "Reviews page"
    }
}

const hashRoute = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
}

const locationHandler = async () => {
    let location = window.location.hash.replace("#", "");
    if (location.length == 0) {
        location = "/";
    }
    const route = routes[location] || routes[404];
    const html = await fetch(route.template).then((response) =>
        response.text());
    document.getElementById("content").innerHTML = html; 
    document.title = route.title;
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
}

window.addEventListener("hashchange", locationHandler);
locationHandler();