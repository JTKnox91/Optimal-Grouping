var entireClass = {
  "technical_refusals": {
    "Mary Polster": [],
    "Carla Hesse": [],
    "Edwin Olson": [],
    "Josef York": [
      "Edwin Olson"
    ],
    "Laura Mayberry": [
      "Tiffany Weaver"
    ],
    "Pamela Whitney": [
      "Tiffany Weaver",
      "Bonnie Taylor"
    ],
    "David Gulinson": [
      "Carla Hesse"
    ],
    "Andrew Stewart": [
      "Pamela Whitney",
      "Ruben Licursi"
    ],
    "Lauren White": [],
    "Mary Jennings": [
      "Bonnie Taylor",
      "Wendy Barnes"
    ],
    "Tiffany Weaver": [
      "Alan Brien"
    ],
    "Wendy Barnes": [
      "Bonnie Taylor",
      "Alan Brien"
    ],
    "Alan Brien": [
      "David Gulinson",
      "Gloria Walter"
    ],
    "Ruben Licursi": [
      "Teresa Seeger"
    ],
    "Steven Gray": [
      "David Gulinson",
      "Gloria Walter"
    ],
    "Ralph Gordon": [
      "Alan Brien"
    ],
    "Larry Young": [
      "Teresa Seeger",
      "Josef York",
      "Laura Mayberry"
    ],
    "Gloria Walter": [],
    "Bonnie Taylor": [],
    "Teresa Seeger": [
      "Larry Young",
      "Alan Brien"
    ]
  },
  "affinities": {
    "Mary Polster": [
      "Edwin Olson",
      "Bonnie Taylor",
      "Gloria Walter"
    ],
    "Carla Hesse": [
      "David Gulinson"
    ],
    "Edwin Olson": [
      "Ruben Licursi"
    ],
    "Josef York": [
      "Ralph Gordon",
      "Laura Mayberry",
      "Ruben Licursi",
      "Alan Brien",
      "Wendy Barnes"
    ],
    "Laura Mayberry": [
      "David Gulinson",
      "Edwin Olson",
      "Bonnie Taylor",
      "Alan Brien"
    ],
    "Pamela Whitney": [
      "Steven Gray",
      "Laura Mayberry",
      "Ruben Licursi",
      "Wendy Barnes"
    ],
    "David Gulinson": [
      "Bonnie Taylor",
      "Steven Gray"
    ],
    "Andrew Stewart": [
      "David Gulinson",
      "Mary Polster",
      "Tiffany Weaver",
      "Edwin Olson",
      "Steven Gray",
      "Carla Hesse",
      "Mary Jennings"
    ],
    "Lauren White": [
      "Andrew Stewart",
      "Steven Gray"
    ],
    "Mary Jennings": [
      "David Gulinson",
      "Larry Young",
      "Tiffany Weaver",
      "Teresa Seeger"
    ],
    "Tiffany Weaver": [
      "Lauren White",
      "Ralph Gordon"
    ],
    "Wendy Barnes": [
      "Pamela Whitney",
      "Andrew Stewart",
      "Gloria Walter",
      "Mary Jennings"
    ],
    "Alan Brien": [
      "Josef York",
      "Carla Hesse"
    ],
    "Ruben Licursi": [
      "David Gulinson",
      "Mary Polster",
      "Lauren White",
      "Gloria Walter",
      "Mary Jennings"
    ],
    "Steven Gray": [
      "Larry Young",
      "Laura Mayberry",
      "Wendy Barnes"
    ],
    "Ralph Gordon": [
      "Pamela Whitney",
      "Mary Polster",
      "Lauren White",
      "Bonnie Taylor",
      "Carla Hesse",
      "Wendy Barnes"
    ],
    "Larry Young": [
      "Edwin Olson"
    ],
    "Gloria Walter": [
      "David Gulinson",
      "Lauren White",
      "Tiffany Weaver",
      "Bonnie Taylor",
      "Ruben Licursi"
    ],
    "Bonnie Taylor": [
      "David Gulinson",
      "Lauren White",
      "Tiffany Weaver",
      "Laura Mayberry",
      "Alan Brien"
    ],
    "Teresa Seeger": [
      "David Gulinson",
      "Andrew Stewart",
      "Ralph Gordon"
    ]
  },
  "interpersonal_refusals": {
    "Mary Polster": [
      "David Gulinson"
    ],
    "Carla Hesse": [
      "Lauren White",
      "Bonnie Taylor"
    ],
    "Edwin Olson": [
      "Ralph Gordon"
    ],
    "Josef York": [],
    "Laura Mayberry": [
      "Gloria Walter"
    ],
    "Pamela Whitney": [
      "Larry Young"
    ],
    "David Gulinson": [
      "Mary Polster",
      "Josef York",
      "Alan Brien"
    ],
    "Andrew Stewart": [
      "Lauren White",
      "Teresa Seeger",
      "Alan Brien"
    ],
    "Lauren White": [],
    "Mary Jennings": [
      "Gloria Walter"
    ],
    "Tiffany Weaver": [
      "Bonnie Taylor",
      "Steven Gray"
    ],
    "Wendy Barnes": [
      "David Gulinson",
      "Lauren White",
      "Edwin Olson",
      "Teresa Seeger"
    ],
    "Alan Brien": [
      "Mary Polster",
      "Andrew Stewart",
      "Teresa Seeger",
      "Wendy Barnes"
    ],
    "Ruben Licursi": [
      "Edwin Olson",
      "Andrew Stewart"
    ],
    "Steven Gray": [
      "Mary Jennings"
    ],
    "Ralph Gordon": [
      "David Gulinson",
      "Edwin Olson",
      "Andrew Stewart",
      "Gloria Walter",
      "Mary Jennings"
    ],
    "Larry Young": [
      "Tiffany Weaver",
      "Bonnie Taylor",
      "Steven Gray",
      "Mary Jennings",
      "Alan Brien"
    ],
    "Gloria Walter": [
      "Mary Jennings"
    ],
    "Bonnie Taylor": [
      "Edwin Olson"
    ],
    "Teresa Seeger": []
  }
};

var makeGroups = function(json) {
  //ranking system
    //interpersonal_refusal (single): -10
    //interpersonal_refusl (mutal): -50
    //technical_refusal (single): -1
    //technical_refusal (mutual): -5
    //affinity (single): +3
    //affinity (mutal): +15

  //of all the arrangements, find the arrangement
  //where the worst group has the highest value (compared to the 
  //worst group in other arrangements)

  //copy of json so i don't have to worry about mutating
  var data = json;

  //easily modifiable ranking values
  var rankings = {
    'personalSingle': -10,
    'personalMutual': -30, //will be multiplied by 2 in group
    'technicalSingle': -1,
    'technicalMutual': -3, //will be multiplied by 2 in group
    'affinitySingle': 3,
    'affinityMutual': 9, //will be multiplied by 2 in group
  };

  var Person = function(name) {
    this.name = name;
    this.relationships = {
      personalSingle: [],
      personalMutual: [],
      technicalSingle: [],
      technicalMutuals: [],
      affinitySingles: [],
      affinityMutuals: []   
    };
  };

  var numberOfGroups = 0;
  for (var person in data.affinities) {
    numberOfGroups++;
  }
  numberOfGroups = Math.round(numberOfGroups / 4);

  //returns an array of people represented as objects
  //pass in the original array as argument and assume that
  //all people are represented as a key in affinities
  var makePeopleList = function(data) {
    var people = [];
    for (var person in data.affinities) {
      people.push(new Person(person));
    }

    return people;
  };

  //adds names of single affinities array to to person object
  var setAffinities = function(person) {
    person.relationships.affinitySingles = data.affinities[person.name];
  };

  //assumes single affinities have been set
  //moves apropriate people from single array to mutual array
  var setMutualAffinities = function(person) {
    var singles = person.relationships.affinitySingles;
    //for each single relationship
    for (var i = 0; i < singles.length; i++) {
      //if a mutual relationship exists (check in data)
      if (data.affinities[singles[i]].indexOf(person.name) !== -1) {
        //move the name from single relationship to mutual relationship
        person.relationships.affinityMutuals.push(singles[i]);
        singles[i] = null; //filter out the nulls later
      }
    }
    //filter the nulls out of singles
    var filtered = [];
    for (var n = 0; n < singles.length; n++) {
      if (singles[n] !== null) {
        filtered.push(singles[n]);
      }
    }
    person.relationships.affinitySingles = filtered;
  };

  //adds names of single techinal objections array to to person object
  var setTechnicals = function(person) {
    person.relationships.technicalSingle = data.technical_refusals[person.name];
  };

  //assumes single techinals have been set
  //moves apropriate people from single array to mutual array
  var setMutualTechnicals = function(person) {
    var singles = person.relationships.technicalSingle;
    //for each single relationship
    for (var i = 0; i < singles.length; i++) {
      //if a mutual relationship exists (check in data)
      if (data.affinities[singles[i]].indexOf(person.name) !== -1) {
        //move the name from single relationship to mutual relationship
        person.relationships.technicalMutuals.push(singles[i]);
        singles[i] = null; //filter out the nulls later
      }
    }
    //filter the nulls out of singles
    var filtered = [];
    for (var n = 0; n < singles.length; n++) {
      if (singles[n] !== null) {
        filtered.push(singles[n]);
      }
    }
    person.relationships.technicalSingle = filtered;
  };

  //adds names of single personal objections array to to person object
  var setPersonals = function(person) {
    person.relationships.technicalSingle = data.interpersonal_refusals[person.name];
  };

  //assumes single personals have been set
  //moves apropriate people from single array to mutual array
  var setMutalPersonals = function(person) {
    var singles = person.relationships.personalSingle;
    //for each single relationship
    for (var i = 0; i < singles.length; i++) {
      //if a mutual relationship exists (check in data)
      if (data.affinities[singles[i]].indexOf(person.name) !== -1) {
        //move the name from single relationship to mutual relationship
        person.relationships.personalMutual.push(singles[i]);
        singles[i] = null; //filter out the nulls later
      }
    }
    //filter the nulls out of singles
    var filtered = [];
    for (var n = 0; n < singles.length; n++) {
      if (singles[n] !== null) {
        filtered.push(singles[n]);
      }
    }
    person.relationships.personalSingle = filtered;
  };

  //sets all the relationship arrays for a persons
  var setAttributesForPerson = function(person) {
    setAffinities(person);
    setMutualAffinities(person);
    setTechnicals(person);
    setMutualTechnicals(person);
    setPersonals(person);
    setMutalPersonals(person);
  };

  //sets all the relationship arrays for all the people
  var setAttributesForPersons = function(persons) {
    for (var i = 0; i < persons.length; i++) {
      setAttributesForPerson(persons[i]);
    }
  };

  //get the score of a particular group (after arranging)
  var getGroupScore = function(group) {
    var score = 0;
    //for each member in the group
    for (var i = 0; i < group.members.length; i++) {
      var person = group.members[i];
      //for each type of relationship in person
      for (var relationship in person.relationships) {
        //for each person attached with that kind of relationship
        for (var p = 0; p < person.relationships[relationship].length; p++) {
          var otherPerson = person.relationships[relationship][p];
          //if that person is also in the group
          if (otherPerson in group.members) {
            //increment or decrement the score as needed
            score += rankings[relationship];
          }
        }
      }
    }

  };

  //get lowest score of the group with the lowest score (after arranging) 
  var getLowestGoupScore = function(arrangement) {
    var lowest = Number.POSITIVE_INFINITY;
    for (var group in arrangement) {
      lowest = Math.min(lowest, getGroupScore(arrangement[group]));
    }
    return lowest;
  };

  var Group = function() {
    this.members = [];
  };


  var makeRange = function(limit) {
    var range = [];
    for (var i = 0; i < limit; i++) {
      range.push(i);
    }
  };

  var shuffleRange = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  //randomly generate 100 combinations of groups
  var makeInitialArrangements = function(persons) {
    var arrangements = [];
    for (var i = 0; i < 100; i++) {
      var arrangement = [];
      for (var g = 0; g < numberOfGroups; g++) {
        arrangement.push(new Group());
      }
      var randomPersons = shuffleRange(persons);
      for (var p = 0; p < randomPersons.length; p++) {
        arrangement[p%numberOfGroups].members.push(randomPersons[p]);
      }
      arrangements.push(arrangement);
    }
    return arrangements;
  };

  //takes (ideally 100) arrangements and returns the top ten
  var topTen = function(arrangements) {
    return arrangements.sort(function(a,b) {
      return getLowestGoupScore(a) < getLowestGoupScore(b);
    }).slice(0,10);
  };

  //takes an array of arrangements and produces 10 slightly mutated versions of each
  //returns the top ten mutations
  var makeNewArrangements = function(arrangements) {

  };

  var persons = makePeopleList(data);
  setAttributesForPersons(persons);
  return topTen(makeInitialArrangements(persons))[0];
};

console.dir(makeGroups(entireClass));
