# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Meta Pixel lead events

The site sends the standard `Contact` event and a custom `WhatsAppClick` event when a visitor opens WhatsApp from the header, a blog note, or a tour detail. Inquiry form submissions send `Lead`, and opening tour details sends `ViewContent`.

Set `VITE_META_WHATSAPP_EVENT_NAME` at build time to rename the custom WhatsApp event. It defaults to `WhatsAppClick`. In Meta Events Manager, create a custom conversion from that event, or optimize an ad set for the standard `Contact` event. The Pixel ID is currently initialized in `index.html`.
