// controllers invoke methodes to handle request from client/browser

export const aboutController = {
    index: {
        handler: function (request, h) {
            // response from backend
            return h.view("about-view", { title: "About Us" });
          },
    }
}