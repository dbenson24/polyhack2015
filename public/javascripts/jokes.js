//Establishment Type Logic

//ENUM Geographic, hotel, restaurant, attraction

//"Your skeleton..." is a prefix from the portion of the sentance before these are encountered

function joke_generator(attraction_type) {
	if (attraction_type == "geographic") {
		return joke_generator_geographic(attraction_type);
	}
	if (attraction_type == "hotel") {
		return joke_generator_hotel(attraction_type);
	}
	if (attraction_type == "restaurant") {
		return joke_generator_restaurant(attraction_type);
	}
	if (attraction_type == "attraction") {
		return joke_generator_attraction(attraction_type);
	}
}

function joke_generator_geographic(attraction_type) {
        var jokes_geographic = {
"was mistaken for a chew toy by a particularly aggressive bear",
"was tinged slightly green by tripping forcefully into fresh grass",
"wandered aimlessly for hours, contemplating the nature of undeath",
"gazed solemnly into the night, terrifying the onlooking children",
"lost in a conflict against a swarm of angry bees",
"enjoyed the torrential rain on a dark and stormy night",
"swatted an errant fly with its femur",
"destroyed an ant colony with its foul breath",
"delighted in the scent of nature before realizing it had no nose",
"dug a hole in the ground large enough to bury himself prematurely"
        };
	var choice = Math.rand_int(0, joke_geographic.length);
        return jokes_geographic[choice];
}

function joke_generator_hotel(attraction_type) {
	var jokes_hotel = 
"was immediately worshipped upon walking in on a goth convention",
"gave an innocent maid a heart attack by jumping out of a closet",
"posed motionless in the lobby before getting up and walking away",
"objected to a random couple's wedding",
"got tangled in the hotel room bedsheet",
"pulled the fire alarm and ran into the night",
"pressed all the buttons in the elevator and immediately left the building",
"climbed on top of a chandalier and crashed it into the floor",
"scared the sheet out of a ghost who was trying to haunt its room",
"tried to book a room, but the receptionist turned it away until to-marrow"};
	var choice = Math.rand_int(0, joke_geographic.length);
        return jokes_hotel[choice];
}

function joke_generator_restaurant(attraction_type) {
	var jokes_restaurant = {"almost was mistaken for a rack of ribs",
"ordered the spiciest food on the menu just to watch the chef cry",
"walked into a continetal breakfast hosted by cannibals",
"was asked by the friendly hostess if it \"wanted to put some meat on its bones\"",
"had a bone to pick with the establishment for refusing him service",
"gave the manager some biting criticism for not finding its jokes humerus",
"asked the waiter for some wine and a spirit",
"wanted to order some spicy food, but didn't have the stomach for it",
"devoured its meal all the way down to the bone",
"found the food quite hard to swallow"};
	var choice = Math.rand_int(0, joke_geographic.length);
        return jokes_restaurant[choice];
}

function joke_generator_attraction(attraction_type) {
	var jokes_attration = {"literally stole candy from a crying baby",
"was the first person to be exempt from x-rays before entering the premises",
"was arrested for loitering, even though it was just skull-king around",
"snuck into the event to freak out innocent bystanders",
"tried to blend into the crowd by stealing a streaker's clothes",
"sobbed in a corner after being told it was \"heartless\"",
"wanted to break in, but just didn't have the spine to do so",
"got everyone sick due to its constant coughing",
"came across a skeletal snake, but ran away because it was a rattler",
"played nonconsensual fetch with an overly-curious pitbull"};
	var choice = Math.rand_int(0, joke_geographic.length);
        return jokes_attraction[choice];
}
