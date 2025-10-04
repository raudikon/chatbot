? How come return insert inserts the message but db.insert does not. Is it because insert = ... is getting assigned to a promise db.insert, and return insert actually calls it? It could be solved by insert = await? 

# What's left to do 

- Styling 
- Retrieving old messages for self-discovery 
- Refine prompt 



<Card><CardHeader><CardTitle>Card Title</CardTitle><CardDescription>Card Description</CardDescription><CardAction>Card Action</CardAction></CardHeader><CardContent><p>Card Content</p></CardContent><CardFooter><p>Card Footer</p></CardFooter></Card><h1 className="text-3xl">EOD Generator</h1> {

  user ? <div><p>Hi,
  {
  user.user.name
}

thanks for logging in </p><Link to="/chat"><Button>EOD Generator</Button></Link></div> : <div><p>To use,
please log in or sign up.</p><Link to='/login'><button>Log In</button></Link><Link to='/signup'><button>Sign Up</button></Link></div>
}

Make button light blue with bold text, 
increase text spacing, 
text font is not right, 
add beautiful background. 

wins: ADDED MOVING BACKGORUND!!!
ls: spent a bunch of time doing tweakcn colors and ykonw what they didnt even match the video i chose lol 

homepage styling #2
make cards a little transparent 
edit font to be cuter 
increas


<Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>


* implemented conditional rendering of homepage depending on user login status 

* problem 1: /login exposes a page without video playing in background
- possible solve: put it in root 
* problem 2: back to home button in login
* problem 3: signup aint work at all :# 


go on a walk and come back. 
* put video in root component 
* begin working on message styling; is there a library for this? 

when i click begin nothing renders? chat should render 

done
#put video in root 
#remove unncessary code from chat.tsx that went into getPullReqs

current 
- make chat a... component... lol 