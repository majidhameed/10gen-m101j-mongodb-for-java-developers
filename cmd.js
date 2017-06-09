> db.things.find()
> db.things.save({a:1,b:2,c:3})
> db.things.save({a:3,b:4,c:6,d:200})
> db.things.save({a:1,b:1,fruit:['apple','orange','pear']})
> db.things.save({name:'andrew',address:{street:'elm drive', city:'Palo Alto',zip:94350,house_number:34}})
> db.things.find().pretty()

db.users.save({name:'Andrew Erlichson',city_of_birth:'Queens'})
db.users.save({name:'Richard Kreuter',city_of_birth:'Chicago', favorite_color:'Red'})

var j=db.users.findOne({name:"Andrew Erlichson"})

> j.favorite_color='Blue'
> db.users.save(j)

mvn archetype:generate

mvn compile exec:java -Dexec.mainClass="com.tengen.App"

> use course
switched to db course
> db.hello.insert({name:'MongoDB'})
> db.hello.findOne()
{ "_id" : ObjectId("5134fe5591330f5aeb4c0b19"), "name" : "MongoDB" }

mvn compile exec:java -Dexec.mainClass="com.tengen.HelloWorldMongoDBStyle"

> for (i=0;i<3;i++) print("hello, MongoDB developer!");
> for (i=0;i<3;i++) print("hello, MongoDB developer! " + i);
> help
> help keys

> for (i=0;i<3;i++) print(i);
0
1
2
> x=1
1
> y="abc"
abc
> z={ a:1 }
{ "a" : 1 }
> z.a
1
> z['a']
1

> w="a"
a
> z[w]
1
> z.w
>

> x={"a":1}
{ "a" : 1 }
> y="a";
a
> x[y]++;
1
> print(x.a);
2

> NumberInt(1)
NumberInt(1)
> NumberLong(1)
NumberLong(1)
> NumberLong(1) + NumberLong(3)
4

> new Date()
ISODate("2013-03-11T15:20:28.448Z")

> obj = {"a":1,"b":ISODate("2013-03-11T15:20:28.448Z"),"c":NumberLong(42)}
{ "a" : 1, "b" : ISODate("2013-03-11T15:20:28.448Z"), "c" : NumberLong(42) }

> doc = {"name":"Smith", "age":30, "profession":"hacker"}
{ "name" : "Smith", "age" : 30, "profession" : "hacker" }
> db.people.insert(doc)
> db.people.find()
{ "_id" : ObjectId("513df7add01d160979c61522"), "name" : "Smith", "age" : 30, "profession" : "hacker" }

> db.people.insert({"name":"Jones","age":35,"profession":"baker"})
> db.people.find()
{ "_id" : ObjectId("513df7add01d160979c61522"), "name" : "Smith", "age" : 30, "profession" : "hacker" }
{ "_id" : ObjectId("513df876d01d160979c61523"), "name" : "Jones", "age" : 35, "profession" : "baker" }

db.fruit.insert({'name':'apple','color':'red','shape':'round'})

> db.people.findOne()
{
        "_id" : ObjectId("513df7add01d160979c61522"),
        "name" : "Smith",
        "age" : 30,
        "profession" : "hacker"
}

> db.people.findOne({"name":"Jones"})
{
        "_id" : ObjectId("513df876d01d160979c61523"),
        "name" : "Jones",
        "age" : 35,
        "profession" : "baker"
}

> db.people.findOne({"name":"Jones"},{"name":true, "_id":false})
{ "name" : "Jones" }

> db.people.findOne({"name":"Jones"},{"name":1, "_id":0})
{ "name" : "Jones" }

db.users.findOne({'username':'dwight'},{'email':true,'_id':false})
OR
db.users.findOne({'username':'dwight'},{'email':1,'_id':0})

for (i = 0; i < 1000; i++) {
	names=["exam","essay","quiz"];
	for (var j = 0; j < 3; j++) {
		db.scores.insert({'student':i, type:names[j], score:Math.round(Math.random()*100)});
	}	
};

db.scores.find().pretty()

db.scores.find({type:"essay"})

> db.scores.find({student:19})
{ "_id" : ObjectId("513dfb75d01d160979c6155d"), "student" : 19, "type" : "exam", "score" : 97 }
{ "_id" : ObjectId("513dfb75d01d160979c6155e"), "student" : 19, "type" : "essay", "score" : 38 }
{ "_id" : ObjectId("513dfb75d01d160979c6155f"), "student" : 19, "type" : "quiz", "score" : 9 }

> db.scores.find({student:19,type:"essay"})
{ "_id" : ObjectId("513dfb75d01d160979c6155e"), "student" : 19, "type" : "essay", "score" : 38 }

> db.scores.find({student:19,type:"essay"},{"score":1,"_id":0})
{ "score" : 38 }

> db.scores.find({type:"essay",score:50},{"student":1,"_id":0})

> db.scores.find({'score':{$gt:95}})
{ "_id" : ObjectId("513dfb75d01d160979c6152f"), "student" : 3, "type" : "quiz", "score" : 98 }
{ "_id" : ObjectId("513dfb75d01d160979c61536"), "student" : 6, "type" : "exam", "score" : 97 }
{ "_id" : ObjectId("513dfb75d01d160979c6155d"), "student" : 19, "type" : "exam", "score" : 97 }
{ "_id" : ObjectId("513dfb75d01d160979c615db"), "student" : 61, "type" : "exam", "score" : 98 }
{ "_id" : ObjectId("513dfb75d01d160979c61629"), "student" : 87, "type" : "exam", "score" : 97 }
{ "_id" : ObjectId("513dfb75d01d160979c6165e"), "student" : 104, "type" : "quiz", "score" : 100 }

> db.scores.find({'score':{$gt:95},type:"essay"})

> db.scores.find({'score':{$gt:95,$lte :98},type:"essay"})
{ "_id" : ObjectId("513dfb75d01d160979c6171d"), "student" : 168, "type" : "essay", "score" : 98 }
{ "_id" : ObjectId("513dfb75d01d160979c61720"), "student" : 169, "type" : "essay", "score" : 98 }
{ "_id" : ObjectId("513dfb75d01d160979c6174d"), "student" : 184, "type" : "essay", "score" : 97 }
{ "_id" : ObjectId("513dfb75d01d160979c61750"), "student" : 185, "type" : "essay", "score" : 97 }
{ "_id" : ObjectId("513dfb75d01d160979c617e6"), "student" : 235, "type" : "essay", "score" : 98 }
{ "_id" : ObjectId("513dfb75d01d160979c617f2"), "student" : 239, "type" : "essay", "score" : 97 }

> db.people.insert({name:"Alice"})
> db.people.insert({name:"Bob"})
> db.people.insert({name:"Charlie"})
> db.people.insert({name:"Dave"})
> db.people.insert({name:"Edgar"})
> db.people.insert({name:"Fred"})

> db.people.find()
{ "_id" : ObjectId("513df7add01d160979c61522"), "name" : "Smith", "age" : 30, "profession" : "hacker" }
{ "_id" : ObjectId("513df876d01d160979c61523"), "name" : "Jones", "age" : 35, "profession" : "baker" }
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "name" : "Alice" }
{ "_id" : ObjectId("513dfe8dd01d160979c620dd"), "name" : "Bob" }
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }
{ "_id" : ObjectId("513dfe99d01d160979c620e0"), "name" : "Edgar" }
{ "_id" : ObjectId("513dfe9dd01d160979c620e1"), "name" : "Fred" }
> db.people.find({name:{$lt:"D"}})
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "name" : "Alice" }
{ "_id" : ObjectId("513dfe8dd01d160979c620dd"), "name" : "Bob" }
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
> db.people.find({name:{$lt:"D", $gt:"B"}})
{ "_id" : ObjectId("513dfe8dd01d160979c620dd"), "name" : "Bob" }
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
>

> db.people.insert({name:42})

// Comparision do not cross data type boundaries
// Order of the $gte and $lte does not matters

> db.people.find({ profession : {$exists:true}})
{ "_id" : ObjectId("513df7add01d160979c61522"), "name" : "Smith", "age" : 30, "profession" : "hacker"
{ "_id" : ObjectId("513df876d01d160979c61523"), "name" : "Jones", "age" : 35, "profession" : "baker" }
> db.people.find({ profession : {$exists:false}})
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "name" : "Alice" }
{ "_id" : ObjectId("513dfe8dd01d160979c620dd"), "name" : "Bob" }
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }
{ "_id" : ObjectId("513dfe99d01d160979c620e0"), "name" : "Edgar" }
{ "_id" : ObjectId("513dfe9dd01d160979c620e1"), "name" : "Fred" }
{ "_id" : ObjectId("513dff10d01d160979c620e2"), "name" : 42 }

> db.people.find({ name: {$type:2}});
{ "_id" : ObjectId("513df7add01d160979c61522"), "name" : "Smith", "age" : 30, "profession" : "hacker"
{ "_id" : ObjectId("513df876d01d160979c61523"), "name" : "Jones", "age" : 35, "profession" : "baker" }
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "name" : "Alice" }
{ "_id" : ObjectId("513dfe8dd01d160979c620dd"), "name" : "Bob" }
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }
{ "_id" : ObjectId("513dfe99d01d160979c620e0"), "name" : "Edgar" }
{ "_id" : ObjectId("513dfe9dd01d160979c620e1"), "name" : "Fred" }
> db.people.find({ name: {$regex:"a"}});
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }
{ "_id" : ObjectId("513dfe99d01d160979c620e0"), "name" : "Edgar" }
> db.people.find({ name: {$regex:"e$"}});
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "name" : "Alice" }
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }
>

> db.people.find({ name: {$regex:"^A"}});
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "name" : "Alice" }

db.users.find({'name':{$regex:'q'},'email':{$exists:true}})
// OR
db.users.find({'name':{$regex:'q'},'email':{$exists:1}})

> db.people.find({ $or: [{name: {$regex:"e$"}},{age:{$exists:true}}]});
{ "_id" : ObjectId("513df7add01d160979c61522"), "name" : "Smith", "age" : 30, "profession" : "hacker" }
{ "_id" : ObjectId("513df876d01d160979c61523"), "name" : "Jones", "age" : 35, "profession" : "baker" }
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "name" : "Alice" }
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }

db.scores.find({$or:[{score:{$lt:50}},{score:{$gt:90}}]})


> db.people.find({ $and: [{name: {$gt:"C"}},{name:{$regex:'a'}}]});
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }
{ "_id" : ObjectId("513dfe99d01d160979c620e0"), "name" : "Edgar" }

//equivalent to above

> db.people.find({name: {$gt:"C"},name:{$regex:'a'}})
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }
{ "_id" : ObjectId("513dfe99d01d160979c620e0"), "name" : "Edgar" }

// will return scores less than 60
db.scores.find({score:{$gt:50},score:{$lt:60}});

// this one is correct
db.scores.find({score:{$gt:50,$lt:60}});
// or last one is equivalent using and operator
db.scores.find({$and:[{score:{$gt:50}},{score:{$lt:60}}]});

> db.accounts.insert({name:"Howard",favorites:["pretzels","beer"]})
> db.accounts.insert({name:"George",favorites:["ice cream","pretzels"]})

> db.accounts.find({favorites:"pretzels"});
> db.accounts.find({favorites:"beer"});

> db.accounts.find({favorites:"beer",name:{$gt:"H"}});
> db.accounts.find({favorites:"pretzels",name:{$gt:"H"}});

> db.accounts.insert({name:"Irving",favorites:["beer","pretzels","cheese"]})
> db.accounts.insert({name:"John",favorites:["beer","cheese"]})

> db.accounts.find({favorites:{$all :["pretzels","beer"]}})
{ "_id" : ObjectId("513e1f124aab3168fb9c4121"), "name" : "Howard", "favorites" : [ "pretzels", "beer" ] }
{ "_id" : ObjectId("513e20d54aab3168fb9c4123"), "name" : "Irving", "favorites" : [ "beer", "pretzels", "cheese" ] }

> db.accounts.find({name:{$in :["Howard","John"]}})
{ "_id" : ObjectId("513e1f124aab3168fb9c4121"), "name" : "Howard", "favorites" : [ "pretzels", "beer" ] }
{ "_id" : ObjectId("513e20e44aab3168fb9c4124"), "name" : "John", "favorites" : [ "beer", "cheese" ] }

> db.accounts.find({favorites:{$in :["beer","ice cream"]}})
{ "_id" : ObjectId("513e1f124aab3168fb9c4121"), "name" : "Howard", "favorites" : [ "pretzels", "beer" ] }
{ "_id" : ObjectId("513e1f3d4aab3168fb9c4122"), "name" : "George", "favorites" : [ "ice cream", "pretzels" ] }
{ "_id" : ObjectId("513e20d54aab3168fb9c4123"), "name" : "Irving", "favorites" : [ "beer", "pretzels", "cheese" ] }
{ "_id" : ObjectId("513e20e44aab3168fb9c4124"), "name" : "John", "favorites" : [ "beer", "cheese" ] }

> db.accounts.find({favorites:{$all :["beer","ice cream"]}})
>

> db.users.insert({name:"richar", email: {work:"richard@10gen.com",personal:"kreuter@example.com"}});
> db.users.find();
{ "_id" : ObjectId("513e3aa20b461c42565125e4"), "name" : "richar", "email" : { "work" : "richard@10gen.com", "personal" : "kreuter@example.com" } }
> db.users.find({"email" : { "work" : "richard@10gen.com", "personal" : "kreuter@example.com" }})
{ "_id" : ObjectId("513e3aa20b461c42565125e4"), "name" : "richar", "email" : { "work" : "richard@10gen.com", "personal" : "kreuter@example.com" } }

> db.users.find({ "email" : { "work" : "richard@10gen.com" }})
>

> db.users.find({ "email.work" : "richard@10gen.com" })
{ "_id" : ObjectId("513e3aa20b461c42565125e4"), "name" : "richar", "email" : { "work" : "richard@10gen.com", "personal" : "kreuter@example.com" } }

db.catalog.find({"price":{$gt:10000},"reviews.rating":{$gte:5}})

> cur = db.people.find(); null;
null

> cur.hasNext()
true
> cur.next()
{
        "_id" : ObjectId("513df7add01d160979c61522"),
        "name" : "Smith",
        "age" : 30,
        "profession" : "hacker"
}

> while (cur.hasNext()) printjson(cur.next());

> cur = db.people.find(); null;
> cur.limit(5); null;

> cur = db.people.find(); null;
null
> cur.sort({name:-1}); null;
null
> while (cur.hasNext()) printjson(cur.next());
{
        "_id" : ObjectId("513df7add01d160979c61522"),
        "name" : "Smith",
        "age" : 30,
        "profession" : "hacker"
}
{
        "_id" : ObjectId("513df876d01d160979c61523"),
        "name" : "Jones",
        "age" : 35,
        "profession" : "baker"
}
{ "_id" : ObjectId("513dfe9dd01d160979c620e1"), "name" : "Fred" }
{ "_id" : ObjectId("513dfe99d01d160979c620e0"), "name" : "Edgar" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }
{ "_id" : ObjectId("513dfe90d01d160979c620de"), "name" : "Charlie" }
{ "_id" : ObjectId("513dfe8dd01d160979c620dd"), "name" : "Bob" }
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "name" : "Alice" }
{ "_id" : ObjectId("513dff10d01d160979c620e2"), "name" : 42 }

> cur = db.people.find(); null;
null
> cur.sort({name:-1}).limit(3); null;
null
> while (cur.hasNext()) printjson(cur.next());
{
        "_id" : ObjectId("513df7add01d160979c61522"),
        "name" : "Smith",
        "age" : 30,
        "profession" : "hacker"
}
{
        "_id" : ObjectId("513df876d01d160979c61523"),
        "name" : "Jones",
        "age" : 35,
        "profession" : "baker"
}
{ "_id" : ObjectId("513dfe9dd01d160979c620e1"), "name" : "Fred" }

> cur = db.people.find(); null;
null
> cur.sort({name:-1}).limit(3).skip(2); null;
null
> while (cur.hasNext()) printjson(cur.next());
{ "_id" : ObjectId("513dfe9dd01d160979c620e1"), "name" : "Fred" }
{ "_id" : ObjectId("513dfe99d01d160979c620e0"), "name" : "Edgar" }
{ "_id" : ObjectId("513dfe94d01d160979c620df"), "name" : "Dave" }

db.scores.find({type:"exam"}).sort({score:-1}).skip(50).limit(20)

> db.scores.count({type:"exam"})
1000

> db.scores.count({type:"essay",score:{$gt:90}})
97

> db.people.update({name:"Smith"}, { name:"Thompson", salary:50000 });

> db.people.update({name:"Alice"}, { $set:{'age':30} });
> db.people.find({name:'Alice'})
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "age" : 30, "name" : "Alice" }

> db.people.update({name:"Alice"}, { $set:{'age':31} });

> db.people.find({name:'Alice'})
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "age" : 31, "name" : "Alice" }

> db.people.find({name:'Alice'})
{ "_id" : ObjectId("513dfe89d01d160979c620dc"), "age" : 32, "name" : "Alice" }

> db.people.find({name:'Bob'})
{ "_id" : ObjectId("513dfe8dd01d160979c620dd"), "name" : "Bob" }
> db.people.update({name:"Bob"}, { $inc:{'age':1} });
> db.people.find({name:'Bob'})
{ "_id" : ObjectId("513dfe8dd01d160979c620dd"), "age" : 1, "name" : "Bob" }

db.users.update({'username':'splunker'},{$set:{'country':'RU'}})

> db.people.update({name:"Jones"}, { $unset:{'profession':1} });
> db.people.find({name:'Jones'})
{ "_id" : ObjectId("513df876d01d160979c61523"), "age" : 35, "name" : "Jones" }

db.users.update({'username':'jimmy'},{$unset:{'interests':1}})

> db.arrays.insert({_id:0,a:[1,2,3,4]})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 1, 2, 3, 4 ] }
> db.arrays.update({_id:0},{$set:{"a.2":5}})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 1, 2, 5, 4 ] }
> db.arrays.update({_id:0},{$push:{a:6}})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 1, 2, 5, 4, 6 ] }
> db.arrays.update({_id:0},{$pop:{a:1}})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 1, 2, 5, 4 ] }
> db.arrays.update({_id:0},{$pop:{a:-1}})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 2, 5, 4 ] }
> db.arrays.update({_id:0},{$pushAll:{a:[7,8,9]}})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 2, 5, 4, 7, 8, 9 ] }
> db.arrays.update({_id:0},{$pull:{a:5}})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 2, 4, 7, 8, 9 ] }
> db.arrays.update({_id:0},{$pullAll:{a:[2,4,8]}})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 7, 9 ] }
> db.arrays.update({_id:0},{$addToSet:{a:5}})
> db.arrays.update({_id:0},{$addToSet:{a:5}})
> db.arrays.findOne();
{ "_id" : 0, "a" : [ 7, 9, 5 ] }

> db.people.insert({name:"William"})

// multi true need to be there to update multiple docs otherwise it will update only 1 arbitraty doc
> db.people.update({}, {$set : {title:"Dr"}},{multi:true});

db.scores.update({score:{$lt:70}},{$inc:{score:20}},{multi:true})

> db.people.remove({name:"Alice"})
> db.people.remove({name:{$gt:"M"}})

> db.people.remove()
> db.people.find()

// will remove everything (data+indexes) and is fast
> db.people.drop()
true

db.scores.remove({score:{$lt:60}})

> db.people.insert({_id:"Smith", age:30});
> db.people.insert({_id:"Smith", age:30});
E11000 duplicate key error index: test.people.$_id_  dup key: { : "Smith" }
> db.runCommand({getLastError:1})
{ "n" : 0, "connectionId" : 1, "err" : null, "ok" : 1 }
> db.people.insert({_id:"Jones", age:30});
> db.runCommand({getLastError:1})
{ "n" : 0, "connectionId" : 1, "err" : null, "ok" : 1 }
> db.people.insert({_id:"Jones", age:30});
E11000 duplicate key error index: test.people.$_id_  dup key: { : "Jones" }
> db.runCommand({getLastError:1})
{
        "err" : "E11000 duplicate key error index: test.people.$_id_  dup key: { : \"Jones\" }",
        "code" : 11000,
        "n" : 0,
        "connectionId" : 1,
        "ok" : 1
}
> db.people.update({},{$set:{title:"Dr"}},{multi:true})
> db.runCommand({getLastError:1})
{
        "updatedExisting" : true,
        "n" : 2,
        "connectionId" : 1,
        "err" : null,
        "ok" : 1
}
>

> db.people.update({name:"Thompson"},{$set:{title:"Dr"}},{upsert:true})
> db.runCommand({getLastError:1})
{
        "updatedExisting" : false,
        "upserted" : ObjectId("513e4967b2ca9743a835b249"),
        "n" : 1,
        "connectionId" : 1,
        "err" : null,
        "ok" : 1
}

> db.people.remove()
> db.runCommand({getLastError:1})
{ "n" : 3, "connectionId" : 1, "err" : null, "ok" : 1 }

db.grades.find({type:'exam',score:{$gte:65}}).sort({score:1}).limit(1)

> db.students.insert({_id:0,"name":"Andrew Erlichson", "teachers": [0,1]})
> db.students.insert({_id:1,"name":"Richard Kreuter", "teachers": [0,1,3]})
> db.students.insert({_id:2,"name":"Eliot Horowitz", "teachers": [1,2,3]})
> db.students.insert({_id:3,"name":"Mark Heinrich", "teachers": [0,3]})

> db.teachers.insert({_id:0, "name": "Mark Horowitz"})
> db.teachers.insert({_id:1, "name": "John Hennessy"})
> db.teachers.insert({_id:2, "name": "Bruce Wolley"})
> db.teachers.insert({_id:3, "name": "James Plummer"})

> db.students.ensureIndex({'teachers':1})

> db.students.find({'teachers':{'$all':[1,3]}})
> db.students.find({'teachers':{'$all':[1,3]}}).explain()

> db.twitter.find({"retweet_count":{$gt:5}},{retweet_count:1,text:1}).count()

> db.twitter.find({"text":/London/},{text:1})
{ "_id" : NumberLong("312495962394341376"), "text" : "March 23: MongoDB March Madness Hackathon in London http://t.co/UzQRmLVtpz" }

> db.twitter.find({"text":/MongoDB/},{screen_name:1})

> db.students.ensureIndex({student_id:1})

// all indexes in current db
> db.system.indexes.find()

// all indexes for particular collection
> db.students.getIndexes()

> db.students.dropIndex({student_id:1})

> db.bbb.insert({a:1,b:1})
> db.bbb.ensureIndex({a:1,b:1})
> db.bbb.insert({a:[1,2,3],b:1})
> db.bbb.insert({a:5,b:[1,2,3]})
> db.bbb.find()

> db.bbb.getIndexes()

> db.bbb.insert({a:[1,2,4],b:[1,2,3]})
cannot index parallel arrays [b] [a]

//creating index at any location in the doc is possible
> db.people.ensureIndex({'address.tag':1})

> db.stuff.insert({'thing':'pear'})
> db.stuff.insert({'thing':1})
> db.stuff.insert({'thing':'pear'})
> db.stuff.insert({'thing':'apple'})
> db.stuff.getIndexes()
> db.stuff.ensureIndex({'thing':1},{unique:true})
E11000 duplicate key error index: test.stuff.$thing_1  dup key: { : "pear" }

> db.stuff.find()
{ "_id" : ObjectId("51506460ea1247e135548301"), "thing" : "pear" }
{ "_id" : ObjectId("51506466ea1247e135548302"), "thing" : 1 }
{ "_id" : ObjectId("5150646dea1247e135548303"), "thing" : "pear" }
{ "_id" : ObjectId("51506475ea1247e135548304"), "thing" : "apple" }
> db.stuff.remove({ "_id" : ObjectId("5150646dea1247e135548303")})
> db.stuff.ensureIndex({'thing':1},{unique:true})

> db.stuff.insert({'thing':'apple'})
E11000 duplicate key error index: test.stuff.$thing_1  dup key: { : "apple" }

//_id is implicitly unique
> db.stuff.insert({_id:1,b:1})
> db.stuff.insert({_id:1,b:2})
E11000 duplicate key error index: test.stuff.$_id_  dup key: { : 1.0 }

// removing duplicates when creating unique indexes

> db.things.insert({thing:'pear',color:'green'})
> db.things.insert({thing:'apple',color:'red'})
> db.things.insert({thing:'pear',shape:'round'})
> db.things.find()
{ "_id" : ObjectId("515066caea1247e135548308"), "thing" : "pear", "color" : "green" }
{ "_id" : ObjectId("515066d3ea1247e135548309"), "thing" : "apple", "color" : "red" }
{ "_id" : ObjectId("515066e1ea1247e13554830a"), "thing" : "pear", "shape" : "round" }

> db.things.ensureIndex({thing:1},{unique:true})
E11000 duplicate key error index: test.things.$thing_1  dup key: { : "pear" }

> db.things.ensureIndex({thing:1},{unique:true,dropDups:true})
> db.things.find()
{ "_id" : ObjectId("515066caea1247e135548308"), "thing" : "pear", "color" : "green" }
{ "_id" : ObjectId("515066d3ea1247e135548309"), "thing" : "apple", "color" : "red" }

> db.products.insert({'item':'DVI-to-VGA cable'})
> db.products.insert({'item':'iphone cradle'})
> db.products.insert({'item':'jeans',size:'32x32'})
> db.products.insert({'item':'polo shirt',size:'medium'})

> db.products.ensureIndex({size:1},{unique:true})
E11000 duplicate key error index: test.products.$size_1  dup key: { : null }

> db.products.ensureIndex({size:1},{unique:true,sparse:true})

> db.products.find().sort({size:1})
{ "_id" : ObjectId("51506915ea1247e135548311"), "item" : "jeans", "size" : "32x32" }
{ "_id" : ObjectId("5150692bea1247e135548312"), "item" : "polo shirt", "size" : "medium" }

// if index is sparse the docs that dont have the entry for the sparse key won't return in SORT result

> db.products.dropIndex({size:1},{unique:true})
{ "nIndexesWas" : 2, "ok" : 1 }
> db.products.find().sort({size:1})
{ "_id" : ObjectId("515068f7ea1247e13554830f"), "item" : "DVI-to-VGA cable" }
{ "_id" : ObjectId("51506901ea1247e135548310"), "item" : "iphone cradle" }
{ "_id" : ObjectId("51506915ea1247e135548311"), "item" : "jeans", "size" : "32x32" }
{ "_id" : ObjectId("5150692bea1247e135548312"), "item" : "polo shirt", "size" : "medium" }

> for (i=0;i<1000;i++) {db.foo.insert({a:i,b:i,c:i});}

> db.foo.ensureIndex({a:1,b:1,c:1})

> db.foo.find({c:1}).explain()
{
        "cursor" : "BasicCursor", // Means no index used 
....
> db.foo.find({a:49}).explain()
{
        "cursor" : "BtreeCursor a_1_b_1_c_1", // Means index is used
        "isMultiKey" : false, // not multi key index
        "n" : 1, // No. of docs to be returned
        "nscannedObjects" : 1, // No. of docs scanned to find doc
        "nscanned" : 1, // No. of index or docs entries
        "nscannedObjectsAllPlans" : 1,
        "nscannedAllPlans" : 1,
        "scanAndOrder" : false,
        "indexOnly" : false, // Whether or not query is satiesfied by just the index 
                             // i.e. we dont need to goto actual collection to return the result
        "nYields" : 0,
        "nChunkSkips" : 0,
        "millis" : 0,
        "indexBounds" : {
        "a" : [
                [
                         49,
                         49
                ]
        ],

> db.foo.find({a:54},{a:1,b:1,_id:0}).explain().indexOnly
true

> db.foo.find({$and:[{c:{$gt:25}},{c:{$lte:50}}]}).sort({a:1}).explain()

> db.foo.dropIndex({a:1,b:1,c:1})
{ "nIndexesWas" : 2, "ok" : 1 }
> db.foo.ensureIndex({a:1,b:1})

> db.foo.find({$and:[{c:{$gt:25}},{c:{$lte:50}}]}).sort({a:1}).explain()
{
        "cursor" : "BtreeCursor a_1_b_1",
        "isMultiKey" : false,
        "n" : 25,
        "nscannedObjects" : 100, // scanned full collection
        "nscanned" : 100, // scanned full collection
        "nscannedObjectsAllPlans" : 200,
        "nscannedAllPlans" : 200,
        "scanAndOrder" : false,
        "indexOnly" : false,
        "nYields" : 0,
        "nChunkSkips" : 0,
        "millis" : 1,

 // if we have
 > db.foo.ensureIndex({a:1,b:1,c:1})

 // then
> db.foo.find({b:3, c:4}) // not uses index
> db.foo.find({a:3}) // uses index
> db.foo.find({c:1}).sort({a:1, b:1})   // uses index
> db.foo.find({c:1}).sort({a:-1, b:1}) // not uses index
> db.foo.find({c:1}).sort({a:-1}) // uses index  "cursor" : "BtreeCursor a_1_b_1_c_1 reverse",

> db.foo.stats()
> db.foo.totalIndexSize()

> db.foo.dropIndex({a:1,b:1,c:1})
> db.foo.ensureIndex({a:1})
> db.foo.ensureIndex({b:1})
> db.foo.ensureIndex({c:1})
> db.foo.ensureIndex({d:1})
> db.foo.ensureIndex({c:1})

> db.foo.find({a:10,b:10,c:10}).explain() // uses a index

> db.foo.find({a:10,b:10,c:10}).hint({$natural:1}).explain() // dont use any index

> db.foo.find({a:10,b:10,c:10}).hint({c:1}).explain() // use c index

> db.foo.ensureIndex({e:1},{sparse:true})

> db.foo.find({a:10,b:10,c:10}).hint({e:1}) // will return NO/Zero documents
> db.foo.find({a:10,b:10,c:10}).hint({e:1}).explain()

// Geo Spatial Indexes
> db.stores.insert({name:"Rubys",type:"Barber",location:[40,74]})
> db.stores.insert({name:"Ace Hardware",type:"Hardware",location:[40.232,-74.343]})
> db.stores.insert({name:"Tickle Candy",type:"Food",location:[41.232,-75.343]})
> db.stores.ensureIndex({location:'2d',type:1})

> db.stores.find({location:{$near:[50,50]}})

// maxDistance in radians
> db.runCommand({geoNear:'stores',near:[50,50],spherical:true,maxDistance:1})

> db.system.profile.find({ns:/test.foo/}).sort({ts:1}).pretty()

> db.system.profile.find({millis:{$gt:100}}).sort({ts:1}).pretty()

> db.getProfilingLevel()
1
> db.getProfilingStatus()
{ "was" : 1, "slowms" : 2 }
> db.setProfilingLevel(1,4)
{ "was" : 1, "slowms" : 2, "ok" : 1 }
> db.getProfilingStatus()
{ "was" : 1, "slowms" : 4 }
> db.setProfilingLevel(0)
{ "was" : 1, "slowms" : 4, "ok" : 1 }
> db.getProfilingStatus()
{ "was" : 0, "slowms" : 4 }
> db.getProfilingLevel()
0

// highlevel overview about where mongo is spending time
mongotop 5

// highlevel performance overview of mongodb installatin
// To figure out whether index fits in memory or not see "idx miss %"
mongostat 10

mongo < products.js
> use agg
> db.products.aggregate([{$group:{"_id":"$manufacturer","num_products":{"$sum":1}}}])
> db.products.aggregate([{$group:{"_id":"$category","num_products":{"$sum":1}}}])
// More readable
> db.products.aggregate([{$group:{"_id":{'maker':"$manufacturer"},"num_products":{"$sum":1}}}])

// Compund Grouping
> db.products.aggregate([{$group:{_id:{manufacturer:"$manufacturer",category:"$category"},"num_products":{"$sum":1}}}])

// _id  can be a Compound key instead of scalar values
> db.foo.insert({_id:{name:'andrew',class:'m101'}, 'hometown':'NY'})
> db.foo.find()
{ "_id" : { "name" : "andrew", "class" : "m101" }, "hometown" : "NY" }
> db.foo.insert({_id:{name:'andrew',class:'m101'}, 'hometown':'NY'})
E11000 duplicate key error index: agg.foo.$_id_  dup key: { : { name: "andrew", class: "m101" } }

// sum
> db.products.aggregate([{$group:{"_id":{'maker':"$manufacturer"},"sum_prices":{"$sum":"$price"}}}])
> db.zips.aggregate([{$group:{_id:"$state","population":{$sum:"$pop"}}}])

// avg
> db.products.aggregate([{$group:{"_id":{'category':"$category"},"avg_price":{"$avg":"$price"}}}])
> db.zips.aggregate([{$group:{_id:"$state","average_pop":{$avg:"$pop"}}}])

// addToSet
> db.products.aggregate([{$group:{"_id":{"maker":"$manufacturer"},"categories":{"$addToSet":"$category"}}}])
> db.zips.aggregate([{$match:{"city":"PALO ALTO"}},{$group:{"_id":"$city","postal_codes":{$addToSet:"$_id"}}}])
> db.zips.aggregate([{$group:{"_id":"$city","postal_codes":{$addToSet:"$_id"}}}])

// push
> db.products.aggregate([{$group:{"_id":{"maker":"$manufacturer"},"categories":{"$push":"$category"}}}])

// max
> db.products.aggregate([{$group:{"_id":{"maker":"$manufacturer"},"maxprice":{"$max":"$price"}}}])
> db.zips.aggregate([{$group:{"_id":"$state","pop":{$max:"$pop"}}}])

// double grouping
> db.grades.aggregate([
        {$group:{_id:{class_id:"$class_id",student_id:"$student_id"},"average":{$avg:"$score"}}},
        {$group:{_id:"$_id.class_id","average":{$avg:"$average"}}}
])

// project
> db.products.aggregate([
        {
                $project:{
                        _id:0,"maker":{$toLower:"$manufacturer"},"details":{
                                "category":"$category","price":{
                                        $multiply:["$price",10]
                                }
                        },"item":"$name"
                }
        }
])

// If you want to include a key exactly as it is named in the source document, you just write key:1
> db.zips.aggregate([{$project:{"_id":0,"city":{$toLower:"$city"},"pop":1,"state":1,"zip":"$_id"}}])

// limit
> db.zips.aggregate([{$project:{"_id":0,"city":{$toLower:"$city"},"pop":1,"state":1,"zip":"$_id"}},{$limit:1}])

// match
> db.zips.aggregate([{$match:{"state":"NY"}}])

// match and group
> db.zips.aggregate([{$match:{"state":"NY"}},{$group:{"_id":"$city","population":{"$sum":"$pop"},"zip_codes":{$addToSet:"$_id"}}}])

// match, group and project
> db.zips.aggregate([
        {$match:{"state":"NY"}},
        {$group:{"_id":"$city","population":{"$sum":"$pop"},"zip_codes":{$addToSet:"$_id"}}},
        {$project:{_id:0,"city":"$_id",population:1,zip_codes:1}}
])

> db.zips.aggregate([{$match:{"pop":{$gt:100000}}}])

// sort
> db.zips.aggregate([
        {$match:{"state":"NY"}},
        {$group:{"_id":"$city","population":{"$sum":"$pop"}}},
        {$project:{_id:0,"city":"$_id",population:1}},
        {$sort:{population:-1}}
])

> db.zips.aggregate([{$sort:{state:1,city:1}}])

> db.zips.aggregate([
        {$match:{"state":"NY"}},
        {$group:{"_id":"$city","population":{"$sum":"$pop"}}},
        {$project:{_id:0,"city":"$_id",population:1}},
        {$sort:{population:-1}},
        {$skip:10},
        {$limit:5}
])

// first
> db.zips.aggregate([
        {$group:{"_id":{"state":"$state","city":"$city"},"population":{$sum:"$pop"}}},
        {$sort:{"_id.state":1,"population":-1}},
        {$group:{"_id":"$_id.state","city":{$first:"$_id.city"},"population":{$first:"$population"}}}
])

> db.zips.aggregate([
        {$group:{"_id":{"state":"$state","city":"$city"},"population":{$sum:"$pop"}}},
        {$sort:{"_id.state":1,"population":-1}},
        {$group:{"_id":"$_id.state","city":{$first:"$_id.city"},"population":{$first:"$population"}}},
        {$sort:{"_id":1}}
])

// unwind
> db.posts.aggregate([{$unwind:"$tags"},{$group:{"_id":"$tags","count":{$sum:1}}},{$sort:{"count":-1}},{$limit:10},{$project:{_id:0,tag:"$_id",count:1}
}])


> db.test.insert({tags:[1,3,5,6,5,2]})
> db.test.insert({tags:[5,5,6,5,2]})
> db.test.find()
{ "_id" : ObjectId("515a46e4c47439b6da5a9414"), "tags" : [ 1, 3, 5, 6, 5, 2 ] }
{ "_id" : ObjectId("515a46f8c47439b6da5a9415"), "tags" : [ 5, 5, 6, 5, 2 ] }

> db.test.aggregate({$unwind:"$tags"})

// Exact Reverse of unwind regardless of tags unique or not
> db.test.aggregate([{$unwind:"$tags"},{$group:{_id:"$_id","tags":{$push:"$tags"}}}])

// Reverse of unwind if tags are unique
> db.test.aggregate([{$unwind:"$tags"},{$group:{_id:"$_id","tags":{$addToSet:"$tags"}}}])

> db.inventory.aggregate([{$unwind:"$sizes"},{$unwind:"$colors"},{$group:{_id:{"size":"$sizes","color":"$colors"},count:{$sum:1}}}])

// Double $unwind
db.inventory.aggregate([{$unwind:"$sizes"},{$unwind:"$colors"}])

// Reverse of Double $unwind
db.inventory.aggregate([
        {$unwind:"$sizes"},{$unwind:"$colors"},
        {$group:{_id:{name:"$name",sizes:"$sizes"},"colors":{$push:"$colors"}}},
        {$group:{_id:{name:"$_id.name",colors:"$colors"},"sizes":{$push:"$_id.sizes"}}}
])

// Reverse of Double $unwind if the docs are unique
db.inventory.aggregate([
        {$unwind:"$sizes"},{$unwind:"$colors"},
        {$group:{_id:"$name","sizes":{$addToSet:"$sizes"}, colors:{$addToSet:"$colors"}}}
])

// Homework: HW 5.1
> db.posts.aggregate([
        {$unwind:"$comments"},
        {$group:{_id:"$comments.author",count:{$sum:1}}},
        {$sort:{count:-1}}
])

// Homework: HW 5.2
> db.zips.aggregate([
        {$match:{$or:[{"state":"CA"},{"state":"NY"}]}},
        {$group:{_id:{state:"$state",city:"$city"},city_pop:{$sum:"$pop"}}},
        {$match:{"city_pop":{$gt:25000}}},
        {$group:{_id:"$city",avg_pop:{$avg:"$city_pop"}}}
])

// Replica Set Configuration - Start
mkdir \data\rs1 \data\rs2 \data\rs3
mongod --replSet rs1 --dbpath /data/rs1 --port 27017
mongod --replSet rs1 --dbpath /data/rs2 --port 27018
mongod --replSet rs1 --dbpath /data/rs3 --port 27019

config = {
        _id:"rs1", members:[
        {_id:0, host:"localhost:27017", priority:0, slaveDelay:5},
        {_id:1, host:"localhost:27018"},
        {_id:2, host:"localhost:27019"}
        ]
}

rs.initiate(config)
// Replica Set Configuration - End

rs.status()

rs1:PRIMARY> db.people.insert({'name':'Andrew'})

rs1:SECONDARY> db.people.find()
error: { "$err" : "not master and slaveOk=false", "code" : 13435 }
rs1:SECONDARY> rs.slaveOk()
rs1:SECONDARY> db.people.find()
{ "_id" : ObjectId("5162d93235fd694ece763b69"), "name" : "Andrew" }

rs1:PRIMARY> rs.stepDown()

// FINAL
//1

// Example
> db.messages.aggregate([
  {$unwind:"$headers.To"},
  {$match:{"headers.From":"andrew.fastow@enron.com","headers.To":"john.lavorato@enron.com"}},
  {$group:{"_id":"_id",count:{"$sum":1}}}
  ])

> db.messages.aggregate([
  {$unwind:"$headers.To"},
  {$match:{"headers.From":"andrew.fastow@enron.com","headers.To":"jeff.skilling@enron.com"}},
  {$group:{"_id":"_id",count:{"$sum":1}}}
  ])
{ "result" : [ { "_id" : "_id", "count" : 3 } ], "ok" : 1 }

//2
> db.messages.aggregate([
  {$unwind:"$headers.To"},
  {$group:{"_id":{"from":"$headers.From","to":"$headers.To"},count:{"$sum":1}}},
  {$sort:{count:-1}},
  {$limit:5}
  ])

//3
> db.messages.update(
        {"headers.Message-ID":"<8147308.1075851042335.JavaMail.evans@thyme>"},
        {$push:{"headers.To":"mrpotatohead@10gen.com"}}
);
897h6723ghf25gd87gh28

//4
postsCollection.update(new BasicDBObject("permalink", permalink), 
                new BasicDBObject("$inc", new BasicDBObject("comments."+ordinal+".num_likes",1)));
983nf93ncafjn20fn10f

//5 
[
        { "v" : 1, "key" : {"_id" : 1}, "ns" : "test.fubar", "name" : "_id_" }, 0
        { "v" : 1, "key" : {"a" : 1,"b" : 1},     "ns" : "test.fubar", "name" : "a_1_b_1" }, 1
        { "v" : 1, "key" : {"a" : 1,"c" : 1},     "ns" : "test.fubar", "name" : "a_1_c_1" }, 1
        { "v" : 1, "key" : {"c" : 1},     "ns" : "test.fubar","name" : "c_1"}, 1
        { "v" : 1, "key" : {"a" : 1, "b" : 1, "c" : -1},  "ns" : "test.fubar", "name" : "a_1_b_1_c_-1"} 1
]

