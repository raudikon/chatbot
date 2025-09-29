# Mission 1

Goal: Get the /login page working. Take in email via a form and a submit button. 

Refine model - 
* every route is nested, even if it's a standalone page. you need outlet to render anything other than the url home screen 
* <Form ...> from react-router-dom is not a normal HTML form but a special component that integrates with React Router's actions system. On submit, it calls the action function on that route instead of doing a page reload 

# Mission 2 

Goal: Set up Drizzle 


what do i remember about drizzle setup process? 

*gotta setup env file and gitignore it 
*you gotta install drizzle 
*you can define schema inside drizzle. it not exactly what reads and writes data, but the schema is required so the db knows the shape of the data

<--some relevant code->

const db = drizzle(process.env.DATABASE_URL!);
db.insert
db.select (check existence) 

*need to connect to supabase via url with db password inside
*drizzle kit manages read/write to supabase 

<---->

1. get dotenv, drizzle-orm and drizzle-kit
2. go to supabase, set up project, hit connect and copy the link with pw and paste it in a .env file. gitignore it immediately 
3. set up a directory db in the app or src file and define in it a db connection 9like export const db = drizzle(url) or something like that. 
4. make tables by defining schema.ts inside db directory. 

At this point, you might wanna check if your db instance is live. You can do this by pushing something small to the db via an insert function in index.ts. 

const newGame: typeof ttc_table.$inferInsert = {

            id: uuidv4(),
            name: playerName as string,
            gameState:
            {
                currentPlayer: 'X',
                winner: null,
                board: [['_ ', '_ ', '_ '], ['_ ', '_ ', '_ '], ['_ ', '_ ', '_ ']],
                playerName: playerName
            }
        }


        let game_json = await db.insert(ttc_table).values(newGame).returning()

newGame is an object we want to insert, and the type ttc_table.$inferInsert tells drizzle to infer the type of row the table expects based on table schema. Typing it this way tells typescrip that the object must match the shape ttc_Table expects for an insert operation. It's a type guard based on table schema, and tells you at compile time not runtime. 

but actually, i dont need to make a schema file rn since i'm using betterauth to setup auth. it generates a schema for you. consult docs https://www.better-auth.com/docs/installation

<---->

* No need to make a schema file for users when you use betterAuth. betterauth generates an auth-schema for you 
* but in order to migrate the schema to database, you need to use drizzle kit migrate, which means you need to set up drizzle kit configuration file. 

betterauth docs: And in this file, import Better Auth and create your auth instance. Make sure to export the auth instance with the variable name auth or as a default export.c

ok, why are these two things equivalent ? what exactly is a default export? 

gotta put ! after process.env.DATABASE_URL? 

<--->

using better auth. after you setup yo db and pw... consult docs obvi, but i have some notes.
1. install package 
2. set secret key env var
3. create a better auth instance 
4. configure database using drizzle orm adapter
5. generate database-schema. npx @better-auth/cli generate
HELL YEA, YOU GET A FREE SCHEMA. but this is a better-auth cli generate, not a drizzle generate, it doesnt create a drizzle/ folder. the drizzle generate does that. the folder is necessary to eventually migrate your db, im guessin its bc it tells outputs from betterauth/drizzle/supbabase where to go or osmething? not sure. point is, YOU DONT GET A FREE DRIZZLE/ FOLDER. You need to run drizzle generate then you can migrate. 

# notes after lunch 

goal: let's get a frontend up and working that can pass parameters to a login function, the login function will redirect logged in user to homepage which displays hello email. 