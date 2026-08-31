# Mary P. Coaching — Online Personal Training Website

A responsive, single-page website for an online personal training / coaching business.

## Structure

```
index.html            Main page (hero, about, services, process, pricing, testimonials, FAQ, contact)
assets/css/style.css   All styling (responsive, mobile nav, animations)
assets/js/main.js      Interactivity: mobile menu, scroll reveal, animated stats,
                        testimonial slider, FAQ accordion, contact form validation
```

## Running locally

No build step required — it's plain HTML/CSS/JS. Just open `index.html` in a browser,
or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying

Works out of the box on any static host: GitHub Pages, Netlify, Vercel, or a plain web server.

## Customizing

- **Branding & copy**: edit text directly in `index.html`.
- **Colors/fonts**: edit the CSS variables at the top of `assets/css/style.css`.
- **Contact form**: the form currently validates client-side and shows a success message
  without sending data anywhere. To make it functional, connect it to a form backend such as
  [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/products/forms/)
  by adding an `action` attribute to the `<form id="contactForm">` element, or wire up your own
  backend endpoint.
- **Photo**: replace the `.photo-placeholder` block in the About section with an `<img>` tag
  pointing to a real photo in `assets/img/`.
