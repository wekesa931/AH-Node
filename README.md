# AH-Node
Authors-Haven with node, typescript, postgres

Users (for authentication)
```
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "bio": "I work at statefarm",
    "image": null
  }
}
```
to run linting: `eslint '**/*.ts' --fix`

for successful migrations:
```
sequelize db:migrate:undo:all &&  sequelize db:migrate && sequelize db:seed:all && node grantsSeeders.js
```
`sudo -u postgres psql`

Creating a model: `npx sequelize-cli model:generate --name Profile --attributes firstName:string`
npx sequelize-cli model:generate --name Profile --attributes firstName:string,lastName:string,email:string,username:string,bio:string,image:string