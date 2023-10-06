### AssetTracker

### Prerequisites 

* Node JS (https://nodejs.org/en)
* pnpm package manager (https://pnpm.io/)

### How to run

* Install dependencies

        pnpm install

* Create .env file

    _.env_ file must have the URL to db file. Since the project uses sqlite, URL would be "file:./dev.db"

* Generate Prisma Client

    Run 

        npx prisma generate

    on Terminal.


