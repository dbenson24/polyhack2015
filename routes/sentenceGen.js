var joke_generator = require("./jokes");

// <script src="jokes.js"></script>;

var verbs = ["ran", "jogged", "raced", "rushed", "sprinted", "bolted", "darted", "departed", "escaped", "fled", "galloped", "hustled", "eloped", "paced", "scampered", "scooted", "scrambled", "scurried", "skedaddled", "skipped", "skittered", "sped", "sprang", "spurted", "trotted", "whisked", "walked", "hiked", "jaunted", "paraded", "strolled", "marched", "sauntered", "strided", "tramped", "treaded", "went", "raced", "roamed", "shuffled", "strutted", "trekked", "trudged", "wandered", "cantered", "meandered", "pranced", "slogged", "flew", "circled", "climbed", "drifted", "fluttered", "glided", "sped", "swooped", "hopped", "hovered", "whisked", "whooshed", "rolled", "crawled", "paddled", "waded", "freestyled", "dog-paddled", "breast-stroked", "swam", "danced", "fumbled", "leapt", "skipped", "jumped", "dashed", "staggered", "bounced", "vaulted"];

var adverbs = ["sneakily", "quietly", "covertly", "secretly", "surreptitiously", "feebly", "heartily", "mightily", "transparently", "lazily", "idly", "nonchalantly", "slackly", "slowly", "leisurely", "indolently", "gradually", "lethargically", "lingeringly", "listlessly", "slowly", "sluggishly", "calmly", "comfortably", "composedly", "tardily", "torpidly", "inactively", "laggardly", "languorously", "hurriedly", "hectically", "wildly", "desperately", "excitedly", "madly", "uncontrollably", "hysterically", "crazily", "agitatedly", "breathlessly", "lifelessly", "eagerly", "tensely", "apprehensively", "furiously", "frantically", "eagerly", "erratically", "feverishly", "frenziedly", "restlessly", "dementedly", "absurdly", "deliriously", "hastily", "rashly", "irrationally", "stormily", "speedily", "humerusly"];

var sent_ends = ["And then you sorta woke up, awk…",
        "And then your skeleton was like, \“Nah, not feelin\’ it\” and came back.",
        "And then your skeleton disintegrated into thin air, whoops.",
        "And then you farted in your sleep, so that was that.",
        "And then your skeleton decided it would rather write a \“Study Abroad\” blog, and left you.",
        "And then your skeleton decided it rather be a reality TV show star, and left you.",
        "And then your skeleton bought some skin and muscles on Amazon and decided to be you instead. PLOT TWIST.",
        "And then your skeleton found a love interest and eloped to a fancy vineyard in Italy.",
        "And then your skeleton caught fire and turned into ashes.",
        "And then a skeleton popped out. ",
        "And then it got really self aware about everyone seeing right through it. :( ",
        "And then it realized it had no body in this cold, dark world. ",
        "And then it buried itself deep down somewhere "
];

var prefixes = ["It ", "Then, it ", "Afterwards, it ", "But it quickly got bored. So it "];

//var js = document.createElement("joke_generator");
//js.type = "text/javascript";
//js.src = "jokes.js";

function createStory(location, i) {
        // var elem = document.getElementById("content") //"content" = html tag
        // elem.innerHTML += "<p>While you were asleep, your skeleton decided to take an adventure around $location.</p>"
        var randint;
        var verb;
        var adverb;
        var joke;
        var type = location.type;
        var attraction = location.name;
        // for (var i = 0; i<prefixes.length; i++){
        randint = Math.floor(Math.random() * verbs.length);
        verb = verbs[randint];
        randint = Math.floor(Math.random() * adverbs.length);
        adverb = adverbs[randint];
        joke = joke_generator(type);
        if(Math.floor(Math.random()*10)>4){
                var string = prefixes[i%prefixes.length] + " " + verb + " " + adverb + " to " + attraction + ", and " + joke + ".";
        } 
        else {
                var string = prefixes[i%prefixes.length] + " " + verb + " to " + attraction + ", and " + joke + ".";
        }
        //}
        //randint = Math.random()*sent_ends.length;
        //elem.innerHTML += sent_ends[randint];
        return string;
}

module.exports = createStory;
