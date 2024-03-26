import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;

const key="4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT";

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/story/random",(req,res)=>{
   res.json(shorts[Math.floor(Math.random()*shorts.length)]);
});

app.get("/story/:id",(req,res)=>{
   const id=parseInt(req.params.id);
   const story=shorts.find((short)=>short.id===id);

   res.json(story);
});

app.get("/story",(req,res)=>{
   const type=req.query.type;
   const stories=shorts.filter((short)=>short.type===type);

   res.json(stories);
});

app.post("/story/post",(req,res)=>{
    console.log(req.body);
  const newStory={
    id:shorts.length,
    title:req.body.title,
    story:req.body.story,
    type:req.body.type,
    rating:req.body.rate
  }

  shorts.push(newStory);
  res.json(shorts.slice(-1));

  

});

app.put("/story/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const updated={
        id:id,
        title:req.body.title,
        story:req.body.story,
        type:req.body.type,
        rating:req.body.rate
    }

    const index=shorts.findIndex((short)=> short.id===id);
    shorts[index]=updated;

    res.json(updated);
});

app.patch("/story/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const exist=shorts.find((short)=> short.id===id);

    const updated={
        id:id,
        title:req.body.title || exist.title,
        story:req.body.story || exist.story,
        type:req.body.type || exist.type,
        rating:req.body.rate || exist.rating
    }

    const index=shorts.findIndex((short)=> short.id === id);
    shorts[index]=updated;
    res.json(updated);
});

app.delete("/story/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=shorts.findIndex((short)=> short.id === id);
    
    if(index>-1){
        shorts.splice(index,1);
        res.send("Deleted successfully!!!");
    }else{
        res.send("Element not present!!!");
    }
    
});

app.delete("/all",(req,res)=>{
   const id=parseInt(req.params.id);
   const index=shorts.find((short)=> short.id===id);
   const pass=req.query.key;

   if(pass===key){
      shorts=[];
      res.send("Deleted all stories successfully!!!");
   }else{
    res.send("Unauthorized user!!!");
   }
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);

});



var shorts=[
    {
        id:1,
        title:"The Hare and the Tortoise",
        story:"There was once a hare who was friends with a tortoise. One day, he challenged the tortoise to a race. Seeing how slow the tortoise was going, the hare thought he’d win this easily. So, he took a nap while the tortoise kept on going. When the hare woke, he saw that the tortoise was already at the finish line. Much to his chagrin, the tortoise won the race while he was busy sleeping.",
        type:"kids",
        rating:7
    },{
        id:2,
        title:" The Dog and the Bone",
        story:"Once, there was a dog who wandered the streets night and day in search of food. One day, he found a big juicy bone, and he immediately grabbed it in his mouth and took it home. On his way home, he crossed a river and saw another dog with a bone in its mouth. He wanted that bone for himself, too. But as he opened his mouth, the bone he was biting fell into the river and sank. That night, he went home hungry.",
        type:"kids",
        rating:5
    },{
        id:3,
        title:"The Thirsty Crow",
        story:"After flying a long distance, a thirsty crow wandered the forest searching for water. Finally, he saw a pot half-filled with water. He tried to drink from it, but his beak wasn’t long enough to reach the water inside. He then saw pebbles on the ground, and one by one, he put them in the pot until the water rose to the brim. The crow then hastily drank from it and quenched his thirst.",
        type:"kids",
        rating:7
    },{
        id:4,
        title:"Lazy John",
        story:"There was a boy named John who was so lazy he couldn’t even change his clothes. One day, he saw the apple tree in their yard was full of fruits. He wanted to eat some apples, but he was too lazy to climb the tree and take the fruits. So he lay down underneath the tree and waited for the fruits to fall off. John waited until he was starving, but the apples never fell.",
        type:"kids",
        rating:8
    },{
        id:5,
        title:"The Fox and The Grapes",
        story:"Once, there was a hungry fox who stumbled upon a vineyard. After seeing the round, juicy grapes hanging in a bunch, the fox drooled. But no matter how high he jumped, he couldn’t reach for it. So he told himself that it was probably sour and left. That night, he had to sleep on an empty stomach.",
        type:"kids",
        rating:7
    },{
        id:6,
        title:"The Ant and The Grasshopper",
        story:"The ant and the grasshopper were good friends. In the summer, the ant works hard to fill his storage with food. While the grasshopper was enjoying the fine weather and playing all day. When winter came, the ant was lying cozily in his home, surrounded by the food he stored during the summer. While the grasshopper was in his home, hungry and freezing. He asked the ant for food, and the ant gave him some. But it wasn’t enough to last the entire winter. When he tried to ask the ant again, the latter replied: “I’m sorry my friend but my food is just enough for my family to last until the end of winter. If I give you more, we too will starve. We had the entire summer to prepare for the winter but you chose to play instead.",
        type:"kids",
        rating:5
    },{
        id:11,
        title:"The Ghost Of The Bloody Finger",
        story:"There was an old abandoned house in a small town that was considered haunted. And so, everyone stayed away from it. One man came forward, saying he is brave enough to spend the night alone in the house. As he prepares to go to bed in the haunted house, he hears a ghostly voice, “I am the ghost of the bloody finger! I am in the front hall.The man thinks it could be his imagination, and the sound could be of a howling wind. But the voice gets progressively louder as the ghost inches closer to him. “I am in the front hall,” is followed by, “I’m at the bottom of the stairs,”and then,“I’m at the top of the stairs.” Next, he hears the door creak. He covers his head with the blanket in fear. After a few minutes, the voice gently and sociably says, “I am the ghost of the bloody finger! Do you have a band-aid, young man?”",
        type:"horror",
        rating:6
    },{
        id:12,
        title:"The Big Toe",
        story:"Once upon a time, an old woman found a big toe in the woods. She goes home and puts the toe in a stew and has the best meal in weeks. Unfortunately, around midnight, the toe’s rather large and hairy owner comes to claim his toe. She hears the stomping sounds of heavy footsteps in her garden and the voice of a moaning creature saying, “Hairy toe! Hairy toe! I want my hair-r-r-ry toe!.The voice gets louder and louder. Finally, she sees a massive phantasmal creature in her doorway. Terrified, she shouts out, “I ate your hairy toe!” The giant comes into the room and says softly, “I know you did.No one saw the old woman ever again, and apart from footprints with a missing big toe in her garden, there were no clues of her disappearance.",
        type:"horror",
        rating:7
    },{
        id:13,
        title:"The Ball Pit",
        story:"A mother takes her three-year-old son out to lunch. Then he goes off to play in “the ball pit.” After about ten minutes, he emerges, wailing, and complaining of pain. She rushes him to the ER to discover he has been bitten by a snake (of all things!). The next day, she returns to the restaurant to complain about the snake bite to the manager. The manager tells her she should consider herself lucky as a child got eaten by a shark in the ball pit last week!",
        type:"horror",
        rating:8
    },{
        id:14,
        title:"Coffin",
        story:"One night, a man crosses the local cemetery while walking back home. As he passes the gates, he hears a sound, but he doesn’t dare to turn around. The bumping noise follows him, and then he stops to look back. He finds a coffin coming down the road, bumping from side to side! The coffin clunks along, going “BUMP BUMP BUMP” and follows him to his house. He hides in the bathroom. When the coffin bursts into the bathroom, he grabs the first thing he can find—a bottle of cough syrup. He throws it at the coffin, and the “coffin” stops!",
        type:"horror",
        rating:10
    },{
        id:15,
        title:"Yellow Ribbon",
        story:"Jane, a young lady, always wears a yellow ribbon around her neck. She never tells anyone, not even her husband, why she wears it. One day, when she is on her deathbed, her husband asks her one last time about it. She agrees to let him see for himself. He nervously unties the yellow ribbon with his trembling hands and is horrified to find his wife losing her head.",
        type:"horror",
        rating:7
    }
]