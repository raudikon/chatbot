? How come return insert inserts the message but db.insert does not. Is it because insert = ... is getting assigned to a promise db.insert, and return insert actually calls it? It could be solved by insert = await? 

# What's left to do 

- Styling 
- Retrieving old messages for self-discovery 