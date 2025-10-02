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
*you can define schema inside drizzle. it not exactly what reads and writes data, but the schema is required so the db knows the shape of the data. sometimes with things like betterauth, it defines the schema for you 

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

i got an error about "buffers" which is a node.js global, and not natively avaialble in browsers. to the best of my understanding this is bc i tried to run code that should be for the backend on the frontend. paris mentioned in his lecture that this is a hgue mindfuck when using react router. i understand that to overcome this you need to use loaders and actions that take care of interacting with the server for you. 

loaders: a function you attach to a route, which runs before the routes component renders usually to fetch data. the stuff it returns in avaialble via the useloaderdata hook inside the route component 

actions: run in response to a request, ideal for things like login, singup, deleting a post, any mutation. actions can read the form data via request.formdata and return a response or redirect. 


goal2: get a functioning route to login via betterauth, but begin by creating a call to betteraut api wit login deets. 

The <Form method="post"> automatically submits to the route’s action.

If the route has an action defined in the route config, the form submission triggers it.

You don’t need any extra event handlers on the form or button.

# notes after mental breakdown #1 
i need a better auth server instance 
tjere's a frontend better auth client and backend better auth client

loader always runs on server 
clientloader runs in client : usestate useeffect, async work

post request: action  
get reqest: loader


<--------------------->
# DAY TWO NOTES!! :DDDD 

better auth flow. 
frontend makes api call tox like login --> betterauth handler checks database via drizzle adapter ---> tells frontend if it was successful 

installed tailwindcss with react router
https://tailwindcss.com/docs/installation/framework-guides/react-router

installed shadcn with react router

now let's make the whole thing look a little better. 
i have some questions
1. is there a way to just apply global css or do i hvae to put all the divs to their own tailwind class? like can i just changes some things in app.css and make it apply everywhere 
2. what is the purpose of app.css if we are also using utility classes? 
3. is app.css the only place where styling happens in my app? if not, where else? do we want all styling to happen in one place? 

<------------->
for the last hour or so before leaving. 

want to protect chat behind a login page, and also protect chat/post 
just realized protected is not protected (is it?)

1. redirect to chat after logging in. (easy part)
2. don't expose chat, redirect to login page, and login page redirects to chat. 

i am confused. betterauth thinks i am logged in, so i can see chat and protected as scout@gmail.com. how can i log out? 

implement log out, and then try protecting chat. 

rn the problem is:
    - you can sign in even when you're signed in.
    - you can create a new account even when you're signed in. 
    - you're always signed in and can't sign out, so i can't test whether my chat is protected. 

ideally:
    - if you're signed in, you can't create new account and can't sign in anymore. 
    - you can sign out and then chat will be protected. 

I do not understand why it is that when the loader that tests whether there is a session is placed in chat.tsx, it helps prevent access to chat without login, but when it is in chat_actions it does not. I expect React router to go looking for the loader to run it before chat component is run and rendered, and throw the redirect if user session is not present. also, it's not console logging, which means something deeper is happening that I don't fully get... 

ok so it is logging in the backend. lol. lmao even 

<----->
gpt-4o seems to support streaming lots more effortlessly than gpt-5-nano. wonder whats up with that. 

lets get some good styping done.

<---->
WIN: I clarified my idea for my project! :D thanks andrew. 

EOD Generator 

- connect to GitHub, get pull requests. 
    - support login with github
    - have chatbot tell you a list of your pull requests today? 

[USER EXISTS]
when a user logs in, ba+drizzle checks the db for the user, and then finds the user's account with a github oauth token. the token is used to connect with github's api, which allows backend to access the pull requests. the backend can send the information to the openAI API so that the bot has access to it when formulating its response. 

<---->

goal no.1 of the day :D done 
* get oauth+github login working. make sure to save oauth token to database. 
yes, raudikons access token is in the account table under access token, identified by their user_id 

goal no2. of the day... 
* be able to make any api call. ask it for your pull requests and it tells it to you in plain text or something. 


later 
* write some text and store it in the database 
* make a prompt that generates an eod
* go into the code and explain it a little bit or just get the commit message 

- **Access Token Request:** Use the received code to request an access token from GitHub <- i think this only happens once and not again for the same user 
   - **API Requests:** Use the access token to make API calls on behalf of the user.

3. **Use GitHub API:**
   - Make requests to GitHub's API using the access token to interact with the user's repositories, pull requests, etc.

4. **Handle Security:**
   - Securely store client secret and access tokens.
   - Ensure your app handles user data and permissions responsibly.

goal no2. of the day... 
* be able to make any api call. ask it for your pull requests and it tells it to you in plain text or something. 
- nede to make an authenticated request to github api 
## mini goal 2.1, make a button that displays your pull requests in plain text when you click it. put it in chat page 

sound effects for your eod? 

my goals should be aligned with outcomes... not necessarily research. just try to do outcomes and do resaerch if you need to. 

how to use betterauth to get oauth token and make request to github ? i have to check database. is it a db.select 


  const gh_account = await authClient.accountInfo({
        accountId: bauth_session?.session.userId || ''
    })

    // const date = '2025-09-22'
    // // get the data from github
    // const prsRes = await octokit.request(`GET /search/issues?q=type:pr+author:${gh_account.data?.user.name}+created:${date}`,
    //     {
    //         owner: `${gh_account.data?.user.name}`,
    //         repo: 'REPO',
    //         headers: {
    //             'X-GitHub-Api-Version': '2022-11-28',
    //             'accept': 'application/json'
    //         }
    //     })

