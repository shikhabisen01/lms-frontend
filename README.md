# LMS Frontend

### Setup instruction

1. Clone the project
...
   git clone
...

2.Move into the directory
...
   cd lms-frontend
...

3.install dependencies 
... 
   npm i
...

4. run the server
...
   npm run dev
...

### Setup instructions for tailwind

[Tailwind official instuctions doc](https://tailwindcss.com/docs/installation)


1. Install tailwindcss
...
   npm install -D tailwindcss
...

2. Create tailwind config file
...
   npx tailwindcss init
...

3. Add file extensions to tailwind config file
   content: ["./index.html", "./src/**/*.{html,js}"]
...

4. Add the tailwind directives at the top of the `index.css`
   ```
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
   ```
5. Add the following details in the plugin property of tailwind config
```
   plugins: [require("daisyui"), require("@tailwindcss/line-clamp")]
```
### Adding plugins and dependencies

```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp

```

### Configure auto import sort esline

1. Install simple import sort
```
npm i -D eslint-plugin-simple-import-sort
```

2. Add rule in `.eslint.cjs`
```
'simple-import-sort/imports': 'error'
```

3. Add simple-import sort plugin in `.eslint.cjs`
```
  plugins: ['.....', 'simple-import-sort'],
```

4. To enable auto import sort on file save in vscode

   - Open `settings.json`
   - Add the following config
```
   "editor.codeActionsOnSave" : {
      "source.fixAll.eslint": true
   }
```